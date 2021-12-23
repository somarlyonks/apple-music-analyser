import {useCallback} from 'react'
import {useTrail, animated, to} from 'react-spring'
import Flex from '@csszen/components.flex'

import {ISongPlayResult, IArtistPlayResult} from '../../../libs/computation'
import biasedRatio from '../../../libs/biasedRatio'
import useInViewObserver from '../../../libs/useInViewObserver'

import SongPlayRow from './SongPlayRow'
import SongPlayCard from './SongPlayCard'


interface IProps {
    results: ISongPlayResult[]
    artists: IArtistPlayResult[]
}

const AnimatedSongPlayRow = animated(SongPlayRow)

export default function ResultsSectionSongs ({results, artists}: IProps) {
    const [inView, $observeAnchor] = useInViewObserver()

    const trail = useTrail(7, {
        config: {mass: 5, tension: 2000, friction: 200},
        opacity: inView ? 1 : 0,
        width: inView ? 100 : 0,
        from: {
            opacity: 0,
            width: 0,
        },
    })

    const isMostPlayedArtist = useCallback(
        (songArtist: string) => !!artists.find(artist => artist.name === songArtist),
        [artists]
    )

    return (
        <Flex ref={$observeAnchor} className="results-section songs" alignItems="flex-start">
            <SongPlayCard song={results[0]} />
            <Flex className="results-wrapper" verticle grow>
                <h2>Most Played Songs</h2>
                <Flex className="results" verticle>
                    {trail.map(({width, opacity}, i) => (
                        <AnimatedSongPlayRow
                            tip={isMostPlayedArtist(results[i + 1].artist) ? 'This artist also appears in most played artists.' : ''}
                            song={results[i + 1]}
                            key={results[i + 1].key}
                            style={{
                                width: to(width, w => `${w * biasedRecordRatio(results, i + 1, 50) / 100}%`),
                                opacity: to(opacity, o => `${o * biasedRecordRatio(results, i + 1, 1 << 4)}%`),
                            }}
                        />
                    ))}
                </Flex>
            </Flex>
        </Flex>
    )
}

function biasedRecordRatio (results: ISongPlayResult[], index: number, bias: number) {
    return biasedRatio(results[index].time / results[1].time, bias)
}
