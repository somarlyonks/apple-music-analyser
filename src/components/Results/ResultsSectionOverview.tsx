import Flex from '@csszen/components.flex'
import {CSVReaderProps} from 'react-csv-reader'
import {useSprings, animated, to, SpringValue, useSpring} from 'react-spring'

import {IAnalyseResults} from 'src/libs/computation'
import {red} from 'src/libs/constants'

import Uploader from '../Uploader'
import AppleMusic from '../icons/AppleMusic'
import PluralLocale from '../PluralLocale'


interface IProps {
    results?: IAnalyseResults
    dataHandler?: CSVReaderProps['onFileLoaded']
    resolving?: boolean
}

// TODO: @sy Resolving spring
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
                    {!results
                        ? (resolving
                            ? <span>Resolving...</span>
                            : dataHandler && <Uploader dataHandler={dataHandler} />
                        )
                        : <OverviewResult overviewPlayResult={results.overviewPlayResult} />
                    }
                </Flex>
                <Flex className="result-card">
                    <AppleMusic className="with-drop-shadow" />
                </Flex>
            </Flex>
        </AnimatedFlex>
    )
}

function OverviewResult ({overviewPlayResult}: Pick<IAnalyseResults, 'overviewPlayResult'>) {
    const durationSegments = formatDuration(overviewPlayResult.time)
    const durationSegment0 = durationSegments[0]

    const numbers = [
        overviewPlayResult.songCount,
        overviewPlayResult.artistCount,
        overviewPlayResult.dayCount,
        durationSegments[0][0],
    ]

    const [springs] = useSprings(numbers.length, i => ({
        value: numbers[i],
        from: {
            value: 0,
        },
    }), [overviewPlayResult])

    return (
        <div className="results">
            <Flex className="result font-size--h2" alignItems="baseline">
                <span>In Year {overviewPlayResult.year}</span>
            </Flex>

            <Flex className="result" alignItems="baseline">
                <span>Played</span>
                <AnimatedNumber springValue={springs[0].value} />
                <PluralLocale value={overviewPlayResult.songCount} suffix="Song" />
            </Flex>

            <Flex className="result" alignItems="baseline">
                <span>By</span>
                <AnimatedNumber springValue={springs[1].value} />
                <PluralLocale value={overviewPlayResult.artistCount} suffix="Artist" />
            </Flex>

            <Flex className="result" alignItems="baseline">
                <span>In</span>
                <AnimatedNumber springValue={springs[2].value} />
                <PluralLocale value={overviewPlayResult.dayCount} suffix="Day" />
            </Flex>

            <Flex className="result" alignItems="baseline">
                <span>For</span>
                <AnimatedNumber springValue={springs[3].value} /><PluralLocale value={durationSegment0[0]} suffix={durationSegment0[1]} />
            </Flex>
        </div>
    )
}

function AnimatedNumber ({springValue}: {springValue: SpringValue<number>}) {
    return (
        <animated.strong>{to(springValue, v => v | 0)}</animated.strong>
    )
}

function formatDuration (milliseconds: number) {
    const seconds = milliseconds / 1000
    const minutes = seconds / 60
    const hours = minutes / 60

    const segments: Array<[number, string]> = [
        [hours | 0, 'hour'],
        [minutes % 60 | 0, 'minute'],
        [seconds % 60 | 0, 'second'],
    ]

    return segments.filter(segment => segment[0]).slice(0, 2)
}
