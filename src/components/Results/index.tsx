import Flex from '@csszen/components.flex'

import {IAnalyseResults} from '../../libs/computation'

import ResultError from '../ResultError'
import Hr from '../Hr'
import ResultsSectionSongs from './ResultsSectionSongs'
import ResultsSectionArtists from './ResultsSectionArtists'
import ResultsSectionMonths from './ResultsSectionMonths'
import ResultsSectionDays from './ResultsSectionDays'


export default function Results ({
    songPlayResults,
    artistPlayResults,
    songPlayMonthResults,
    songPlayDayResults,
}: IAnalyseResults) {
    if (songPlayResults.length <= 1) return <ResultError />

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

            <ResultsSectionDays results={songPlayDayResults} />

            <Hr />

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
