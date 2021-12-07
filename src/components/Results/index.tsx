// import {HeatMapGrid} from 'react-grid-heatmap'
import Flex from '@csszen/components.flex'

import {IAnalyseResults} from '../../libs/computation'

import MonthChart from './MonthChart'
import NumberLocale from './NumberLocale'
import ResultError from '../ResultError'
import ArtistResultCard from './ArtistResultCard'
import SongResultRow from './SongResultRow'


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
        <Flex className="results-wrapper" verticle>
            <Flex className="results-section overview" verticle>
                <h2>Overview</h2>
            </Flex>

            <Flex className="results-section songs" verticle>
                <h2>Most Played Songs</h2>
                <Flex className="results" verticle>
                    {songPlayResults.slice(0, 10).map(song => (
                        <SongResultRow song={song} key={song.key} />
                    ))}
                </Flex>
            </Flex>

            <Flex className="results-section artists" verticle>
                <h2>Most Played Artists</h2>
                <Flex className="results" wrap>
                    {artistPlayResults.slice(0, 10).map(artist => (
                        <ArtistResultCard artist={artist} key={artist.name} />
                    ))}
                </Flex>
            </Flex>

            <Flex className="results-section months" verticle>
                <h2>Played Hours by Month</h2>
                <Flex className="results">
                    <MonthChart months={songPlayMonthResults} />
                </Flex>
            </Flex>


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
