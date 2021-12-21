import Flex from '@csszen/components.flex'

import {ISongPlayHourResult, ResultsMapper} from 'src/libs/computation'
import useInViewObserver from 'src/libs/useInViewObserver'

import HeatMapChart from '../../charts/HeatMapChart'


interface IProps {
    results: ISongPlayHourResult[]
}

export default function ResultsSectionHours ({results}: IProps) {
    const [, $observeAnchor] = useInViewObserver()

    const {datas, xLabels, yLabels} = collectHeatMapDatas(results)

    return (
        <Flex ref={$observeAnchor} className="results-section hours" alignItems="flex-start">
            <Flex className="results-wrapper" verticle grow>
                <h2>Playing Time by Hour of Day</h2>
                <Flex className="results" verticle>
                    {/* <HeatMapChart
                        datas={datas.map(data => [data.reduce((r, x) => r + x)])}
                        xLabels={xLabels}
                        yLabels={['']}
                        blockGap={0.5}
                        blockBorderRadius={0}
                        fontSize={4}
                    /> */}
                    <HeatMapChart
                        datas={datas}
                        xLabels={xLabels}
                        yLabels={yLabels}
                        // tslint:disable-next-line: no-magic-numbers
                        blockGap={0.5}
                        blockBorderRadius={0}
                        fontSize={4}
                    />
                </Flex>
            </Flex>
        </Flex>
    )
}

function collectHeatMapDatas (results: ISongPlayHourResult[]) {
    const normalizedResults = ResultsMapper.normalizeResultsTimes(results)
    const datas = Array.from(Array(24), () => Array.from(Array(7), () => 0))

    // tslint:disable-next-line: no-magic-numbers
    const xLabels: string[] = Array.from(Array(24), (_, i) => i % 3 ? '' : `${i % 12 || 12}${i > 11 ? 'P' : 'A'}M`)
    const yLabels: string[] = ['', 'Mon', '', 'Wed', '', 'Fri', '']

    normalizedResults.forEach(result => {
        const hour = parseInt(result.hour, 10)
        datas[hour % 24][hour / 24 | 0] = result.time
    })

    return {datas, xLabels, yLabels}
}
