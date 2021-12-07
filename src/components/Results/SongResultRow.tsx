import Flex from '@csszen/components.flex'

import {ISongPlayResult} from '../../libs/computation'
import formatDuration from '../../libs/formatduration'

import NumberLocale from './NumberLocale'


interface IProps {
    song: ISongPlayResult
}

export default function SongResultRow ({song}: IProps) {
    return (
        <Flex className="result song" verticle>
            <Flex justifyContent="space-between" alignItems="center">
                <h3>{song.name}</h3>
                <Flex><NumberLocale value={song.plays} /> Plays</Flex>
            </Flex>
            <Flex justifyContent="space-between">
                <h4>{song.artist}</h4>
                <Flex>{formatDuration(song.time)}</Flex>
            </Flex>
        </Flex>
    )
}
