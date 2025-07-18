import {useMemo} from 'react'
import useMeasure from 'react-use-measure'

import {ISongPlayMonthResult} from 'src/libs/computation'
import useInViewObserver from 'src/libs/useInViewObserver'

import Flex from 'src/components/Flex'
import LineChart from '../../charts/LineChart'


interface IProps {
    results: ISongPlayMonthResult[]
}

export default function ResultsSectionMonths ({results}: IProps) {
    const [inView, $observeAnchor] = useInViewObserver()
    const [ref, bounds] = useMeasure()

    const datas = useMemo(() => {
        // tslint:disable-next-line: no-magic-numbers
        const tmpDatas = Array.from(Array(12), (_, i) => ({
            x: i,
            y: 0,
        }))
        results.forEach(result => {
            if (tmpDatas[result.monthOrder]) {
                tmpDatas[result.monthOrder].y = result.time
            }
        })

        return tmpDatas
    }, [results])

    return (
        <Flex ref={$observeAnchor} className="results-section months" alignItems="flex-start">
            <Flex className="results-wrapper" verticle grow>
                <h2>Played Hours by Month</h2>
                <Flex className="results" verticle ref={ref}>
                    {/* tslint:disable-next-line: no-magic-numbers */}
                    <LineChart datas={datas} width={bounds.width} height={bounds.width / 16 * 9} inView={inView} />
                </Flex>
            </Flex>
        </Flex>
    )
}
