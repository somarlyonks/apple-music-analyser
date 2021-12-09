import Flex from '@csszen/components.flex'

import {ISongPlayResult} from '../../libs/computation'

import SongPlayRow from './SongPlayRow'
import SongPlayCard from './SongPlayCard'


interface IProps {
    results: ISongPlayResult[]
}

function biasedRatio (n: number, bias: number) {
    return bias + (n * (100 - bias))
}

export default function ResultsSectionSongs ({results}: IProps) {
    return (
        <Flex className="results-section songs" alignItems="flex-start">
            <SongPlayCard song={results[0]} />
            <Flex className="results-wrapper" verticle grow>
                <h2>Most Played Songs</h2>
                <Flex className="results" verticle>
                    {results.slice(1, 8).map(song => (
                        <SongPlayRow song={song} key={song.key} style={{
                            width: `${biasedRatio(song.time / results[1].time, 50)}%`,
                            opacity: `${biasedRatio(song.time / results[1].time, 1 << 4)}%`,
                        }} />
                    ))}
                </Flex>
            </Flex>
        </Flex>
    )
}
