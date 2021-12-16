import Flex from '@csszen/components.flex'
import ContainerDimensions from 'react-container-dimensions'

import {ISongPlayMonthResult} from 'src/libs/computation'
import useInViewObserver from 'src/libs/useInViewObserver'

import LineChart from '../../charts/LineChart'


interface IProps {
    results: ISongPlayMonthResult[]
}

export default function ResultsSectionMonths ({results}: IProps) {
    const [inView, $observeAnchor] = useInViewObserver()
    const datas = results.map((result, i) => ({
        x: i,
        y: result.time,
    }))

    return (
        <Flex ref={$observeAnchor} className="results-section months" alignItems="flex-start">
            <Flex className="results-wrapper" verticle grow>
                <h2>Played Hours by Month</h2>
                <Flex className="results" verticle>
                    <ContainerDimensions>
                        {({width}) => (
                            // tslint:disable-next-line: no-magic-numbers
                            <LineChart datas={datas} width={width} height={width / 16 * 9} inView={inView} />
                        )}
                    </ContainerDimensions>
                </Flex>
            </Flex>
        </Flex>
    )
}
