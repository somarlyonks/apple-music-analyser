import Flex from '@csszen/components.flex'
import {CSVReaderProps} from 'react-csv-reader'

import {IAnalyseResults} from '../../libs/computation'

import Hr from '../Hr'
import ResultsSectionOverview from './ResultsSectionOverview'
import ResultsSectionSongs from './ResultsSectionSongs'
import ResultsSectionArtists from './ResultsSectionArtists'
import ResultsSectionMonths from './ResultsSectionMonths'
import ResultsSectionDays from './ResultsSectionDays'
import ResultsSectionHours from './ResultsSectionHours'


interface IProps {
    results?: IAnalyseResults
    dataHandler?: CSVReaderProps['onFileLoaded']
    resolving?: boolean
}

export default function Results ({results, dataHandler, resolving}: IProps) {
    return (
        <Flex className="results-container" alignItems="center" verticle grow>
            <ResultsSectionOverview results={results} dataHandler={dataHandler as ANY} resolving={resolving} />

            {results && (
                <>
                    <ResultsSectionSongs results={results.songPlayResults} artists={results.artistPlayResults} />

                    <Hr />

                    <ResultsSectionArtists artists={results.artistPlayResults} />

                    <Hr />

                    <ResultsSectionMonths results={results.songPlayMonthResults} />

                    <Hr />

                    <ResultsSectionDays results={results.songPlayDayResults} />

                    <Hr />

                    <ResultsSectionHours results={results.songPlayHourResults} />
                </>
            )}
        </Flex>
    )
}
