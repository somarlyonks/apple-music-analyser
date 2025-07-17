import {CSVReaderProps} from 'react-csv-reader'
import {animated, useSpring} from '@react-spring/web'

import {IAnalyseResults} from 'src/libs/computation'
import {red} from 'src/libs/constants'

import AppleMusic from '../../icons/AppleMusic'
import Uploader from './Uploader'
import Resolving from './Resolving'
import OverviewResult from './OverviewResult'
import Flex from 'src/components/Flex'


interface IProps {
    results?: IAnalyseResults
    dataHandler?: CSVReaderProps['onFileLoaded']
    resolving?: number
}

const AnimatedFlex = animated(Flex)

export default function ResultsSectionOverview ({results, dataHandler, resolving}: IProps) {
    const [spring] = useSpring({
        color: results ? '#fff' : '#121314',
        background: results ? red : '#fff',
    }, [results])

    return (
        <AnimatedFlex
            className={`results-section overview results-section--full${results ? '' : ' results-section--empty'}`}
            alignItems="center"
            verticle
            style={spring}
        >
            <Flex alignItems="flex-start">
                <Flex verticle grow>
                    <h1>Apple Music Analyser</h1>
                    {results
                        ? <OverviewResult overviewPlayResult={results.overviewPlayResult} />
                        : resolving // TODO: @sy exception compatibility
                            ? <Resolving resolving={resolving} />
                            : dataHandler && <Uploader dataHandler={dataHandler} />
                    }
                </Flex>
                <Flex className="result-card">
                    <AppleMusic className="with-drop-shadow" />
                </Flex>
            </Flex>
        </AnimatedFlex>
    )
}
