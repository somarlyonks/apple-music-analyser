import {useCallback, useState} from 'react'

import {ISongPlayHourResult, ResultsMapper} from 'src/libs/computation'
import useInViewObserver from 'src/libs/useInViewObserver'

import Flex from 'src/components/Flex'
import HeatMapChart from '../../charts/HeatMapChart'
import HeatMapChartLegend from '../../charts/HeatMapChartLegend'


interface IProps {
    results: ISongPlayHourResult[]
}

export default function ResultsSectionHours ({results}: IProps) {
    const [, $observeAnchor] = useInViewObserver()
    const [showWeekDays, setShowWeekDays] = useState(false)
    const toggleShowWeekDays = useCallback(() => setShowWeekDays(prev => !prev), [setShowWeekDays])

    const {datas, xLabels, yLabels} = collectHeatMapDatas(results)

    const chartStyle = {
        blockGap: 0.5,
        blockBorderRadius: 0,
        fontSize: 4,
    }

    return (
        <Flex ref={$observeAnchor} className="results-section hours" alignItems="flex-start">
            <Flex className="results-wrapper" verticle grow>
                <h2>Playing Time by Hour of Day</h2>
                <Flex className="results" verticle>
                    {!showWeekDays && (
                        <HeatMapChart
                            datas={normalizeNumberss(datas.map(data => [data.reduce((r, x) => r + x)]))}
                            xLabels={xLabels}
                            yLabels={['Day']}
                            {...chartStyle}
                        />
                    )}
                    {showWeekDays && (
                        <HeatMapChart
                            datas={datas}
                            xLabels={xLabels}
                            yLabels={yLabels}
                            {...chartStyle}
                        />
                    )}
                    <Flex>
                        <Flex className="toggle" grow onClick={toggleShowWeekDays}>
                            <span>{showWeekDays ? 'Show day.' : 'Show weekdays.'}</span>
                        </Flex>
                        <HeatMapChartLegend blockBorderRadius={0} />
                    </Flex>
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

function normalizeNumberss (numberss: number[][]) {
    if (numberss.reduce((r, numbers) => r + numbers.length, 0) <= 1) return numberss
    const max = Math.max(...numberss.map(numbers => numbers[0]))
    const min = Math.min(...numberss.map(numbers => numbers[0]))
    const range = max - min

    return numberss.map(numbers => [(numbers[0] - min) / range])
}
