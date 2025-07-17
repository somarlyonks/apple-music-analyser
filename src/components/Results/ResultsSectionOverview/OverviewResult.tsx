import {useSprings, animated, to, SpringValue} from 'react-spring'

import {IAnalyseResults} from 'src/libs/computation'

import Flex from 'src/components/Flex'
import PluralLocale from '../../PluralLocale'


export default function OverviewResult ({overviewPlayResult}: Pick<IAnalyseResults, 'overviewPlayResult'>) {
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
