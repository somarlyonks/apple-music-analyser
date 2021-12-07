import Flex from '@csszen/components.flex'

import {IArtistPlayResult} from '../../libs/computation'
import formatDuration from '../../libs/formatduration'

import NumberLocale from './NumberLocale'


interface IProps {
    artist: IArtistPlayResult
}

export default function ArtistResultCard ({artist}: IProps) {
    return (
        <Flex className="result artist" verticle>
            <Flex>
                <h3>{artist.name}</h3>
            </Flex>
            <Flex verticle>
                <Flex className="lead"><NumberLocale value={artist.plays} /> Plays</Flex>
                <Flex>{formatDuration(artist.time)}</Flex>
            </Flex>
        </Flex>
    )
}
