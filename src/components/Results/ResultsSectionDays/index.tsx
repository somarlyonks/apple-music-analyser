import Flex from '@csszen/components.flex'
import {Tooltip} from 'react-tooltip'
import {useCallback} from 'react'

import {ISongPlayDayResult, ResultsMapper} from 'src/libs/computation'
import useInViewObserver from 'src/libs/useInViewObserver'
import formatDate from 'src/libs/formatDate'

import HeatMapChart from '../../charts/HeatMapChart'
import HeatMapChartLegend from '../../charts/HeatMapChartLegend'
import PlayDuration from '../PlayDuration'
import PlaysLocale from '../PlaysLocale'


interface IProps {
    results: ISongPlayDayResult[]
}

export default function ResultsSectionDays ({results}: IProps) {
    const [inView, $observeAnchor] = useInViewObserver()

    const {heatMapDatas, xLabels, yLabels} = collectHeatMapDatas(results)
    const datas = heatMapDatas.map(heatMapData => heatMapData.map(v => v.value))

    const tooltipRenderer = useCallback(({content}: {content: string | null}) => {
        const index = parseInt(content || '', 10)
        if (isNaN(index)) return null

        const heatMapData = heatMapDatas[index / 7 | 0][index % 7]
        const dayResult = heatMapData.data

        if (!dayResult) return (<section>No records</section>)
        return (
            <article>
                <h1>{dayResult.date}</h1>
                <p className="abatract">Played <PlaysLocale plays={dayResult.songCount} suffix="song" /> songs for <PlayDuration time={dayResult.time} />.</p>
                <section>
                    <h2>Most Played Song</h2>
                    <p>{dayResult.song.name} - {dayResult.song.artist}</p>
                </section>
                <section>
                    <h2>Most Played Artist</h2>
                    <p>{dayResult.artist.name}</p>
                </section>
            </article>
        )
    }, [results])

    return (
        <Flex ref={$observeAnchor} className="results-section days" alignItems="flex-start">
            <Flex className="results-wrapper" verticle grow>
                <h2>Playing Time by Date</h2>
                <Flex className="results" verticle>
                    <HeatMapChart
                        datas={datas}
                        xLabels={xLabels}
                        yLabels={yLabels}
                        tipper={String}
                    />
                    {inView && <Tooltip className="tooltip" place="right" render={tooltipRenderer} />}
                    <Flex>
                        <Flex grow><span className="color--red">*</span><p className="font-weight--lighter">Hover the blocks to view details.</p></Flex>
                        <HeatMapChartLegend />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

function getDaysInYear (year: number) {
    // tslint:disable-next-line: no-magic-numbers
    return ((year % 4 === 0 && year % 100 > 0) || year % 400 === 0) ? 366 : 365
}

interface IHeatMapData {
    data?: ISongPlayDayResult
    value: number
}

function collectHeatMapDatas (days: ISongPlayDayResult[]) {
    const normalizedDays = ResultsMapper.normalizeResultsTimes(days)
    const year = new Date(normalizedDays[0].date).getFullYear()
    const jan1st = new Date(`${year}-01-01`)
    const heatMapDatas: IHeatMapData[][] = [Array.from(Array(jan1st.getUTCDay()), () => ({value: NaN}))]
    const xLabels: string[] = ['Jan']
    const yLabels: string[] = ['', 'Mon', '', 'Wed', '', 'Fri', '']

    const dayMilliseconds = 24 * 60 * 60 * 1000
    const daysInYear = getDaysInYear(year)
    let currentMonth = jan1st.getUTCMonth()
    for (let dayIndex = 0, matchedDayIndex = 0; dayIndex < daysInYear; dayIndex++) {
        const day = new Date(+jan1st + dayMilliseconds * dayIndex)
        const targetDay = normalizedDays[matchedDayIndex] || {}

        const lastWeek = heatMapDatas[heatMapDatas.length - 1]
        if (lastWeek.length === 6) {
            const dayMonth = day.getUTCMonth()
            if (dayMonth !== currentMonth) {
                currentMonth = dayMonth
                xLabels.push(day.toLocaleString('en', {month: 'short'}))
            } else {
                xLabels.push('')
            }
        }
        if (lastWeek.length === 7) {
            heatMapDatas.push([])
        }

        const currentWeek = heatMapDatas[heatMapDatas.length - 1]
        if (formatDate(day) === targetDay.date) {
            currentWeek.push({
                value: targetDay.time,
                data: Object.assign({}, days[matchedDayIndex]),
            })
            matchedDayIndex += 1
        } else {
            currentWeek.push({
                value: 0,
            })
        }
    }

    return {heatMapDatas, xLabels, yLabels}
}
