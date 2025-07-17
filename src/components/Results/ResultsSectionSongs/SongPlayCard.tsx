import {ISongPlayResult} from 'src/libs/computation'
import useSongPost from 'src/libs/useSongPost'

import PlaysLocale from '../PlaysLocale'
import PlayDuration from '../PlayDuration'
import Hr from '../../Hr'
import Flex from 'src/components/Flex'


interface IProps {
    song: ISongPlayResult
}

export default function SongPlayCard ({song}: IProps) {
    const songPost = useSongPost(song)

    return (
        <Flex className="result-card song">
            <Flex className="result-card__content" verticle grow style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url('${songPost}')`}}>
                <Flex className="result-card__title" verticle grow>
                    <h3 className="song">{song.name}</h3>
                    <span className="artist">{song.artist}</span>
                </Flex>
                <Hr />
                <Flex className="result-card__play" verticle>
                    <Flex><PlaysLocale plays={song.plays} /></Flex>
                    <Flex><PlayDuration time={song.time} /></Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
