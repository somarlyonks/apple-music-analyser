import Flex from '@csszen/components.flex'

import {IAnalyseResults} from '../../libs/computation'

import ResultError from '../ResultError'
import Hr from '../Hr'
import ResultsSectionSongs from './ResultsSectionSongs'
import ResultsSectionArtists from './ResultsSectionArtists'
import ResultsSectionMonths from './ResultsSectionMonths'
import ResultsSectionDays from './ResultsSectionDays'
import ResultsSectionHours from './ResultsSectionHours'


export default function Results ({
    songPlayResults,
    artistPlayResults,
    songPlayMonthResults,
    songPlayDayResults,
    songPlayHourResults,
}: IAnalyseResults) {
    if (songPlayResults.length <= 1) return <ResultError />

    return (
        <Flex className="results-container" verticle grow>
            <Flex className="results-section overview" verticle>
                <h2>Overview</h2>
            </Flex>

            <Hr />

            <ResultsSectionSongs results={songPlayResults} artists={artistPlayResults} />

            <Hr />

            <ResultsSectionArtists artists={artistPlayResults} />

            <Hr />

            <ResultsSectionMonths results={songPlayMonthResults} />

            <Hr />

            <ResultsSectionDays results={songPlayDayResults} />

            <Hr />

            <ResultsSectionHours results={songPlayHourResults} />
        </Flex>
    )
}
