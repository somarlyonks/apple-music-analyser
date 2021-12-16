import Flex from '@csszen/components.flex'

import {IAnalyseResults} from '../../libs/computation'

import NumberLocale from '../NumberLocale'
import ResultError from '../ResultError'
import Hr from '../Hr'
import ResultsSectionSongs from './ResultsSectionSongs'
import ResultsSectionArtists from './ResultsSectionArtists'
import ResultsSectionMonths from './ResultsSectionMonths'


export default function Results ({
    songPlayResults,
    artistPlayResults,
    songPlayMonthResults,
    songPlayDayResults,
}: IAnalyseResults) {
    if (songPlayResults.length <= 1) return <ResultError />

    const {firstDay, lastDay} = traverseDays(songPlayDayResults)

    const daysTodayCount = Math.round((+lastDay - +firstDay) / (1000 * 60 * 60 * 24))
    const dayswithoutmusic = daysTodayCount - songPlayDayResults.length

    return (
        <Flex className="results-container" verticle grow>
            <Flex className="results-section overview" verticle>
                <h2>Overview</h2>
            </Flex>

            <Hr />

            <ResultsSectionSongs results={songPlayResults} />

            <Hr />

            <ResultsSectionArtists artists={artistPlayResults} />

            <Hr />

            <ResultsSectionMonths results={songPlayMonthResults} />

            <Hr />

            <Flex className="results-section days" verticle>
                <h2>Playing Time by Date</h2>
                {/* <CalendarHeatmap
                    startDate={firstDay}
                    endDate={lastDay}
                    values={heatmapData}
                    showWeekdayLabels
                /> */}
                <p>There were <strong><NumberLocale value={dayswithoutmusic} /></strong> out of <strong><NumberLocale value={daysTodayCount} /></strong> days you didn't listen to music.</p>
            </Flex>

            <Flex className="results-section hours" verticle>
                <h2>Playing Time by Hour of Day</h2>
                {/* <HeatMapGrid
                    square
                    xLabels={xLabels}
                    yLabels={yLabels}
                    data={hoursArray}
                /> */}
            </Flex>
        </Flex>
    )
}

function traverseDays (days: IAnalyseResults['songPlayDayResults']) {
    const heatmapData = [] // TODO: @sy process the calendar data

    days.forEach(({date, time}) => {
        heatmapData.push({
            date,
            time,
        })
    })

    return days.reduce(({firstDay, lastDay, maxValue}, {date, time}) => ({
        firstDay: new Date(date) < firstDay ? new Date(date) : firstDay,
        lastDay: new Date(date) > lastDay ? new Date(date) : lastDay,
        maxValue: Math.max(maxValue, time),
    }), {
        firstDay: new Date(),
        lastDay: new Date('2015-01-01T01:00:00'),
        maxValue: 0,
    })
}
