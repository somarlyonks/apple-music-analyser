import {CSSProperties} from 'react'

import {ISongPlayResult} from 'src/libs/computation'

import PlaysLocale from '../PlaysLocale'
import PlayDuration from '../PlayDuration'
import Flex from 'src/components/Flex'


interface IProps {
    song: ISongPlayResult
    tip?: string
    style?: CSSProperties
}

export default function SongPlayRow ({song, tip, style}: IProps) {
    return (
        <Flex className="result song" verticle style={style}>
            <Flex justifyContent="space-between" alignItems="center">
                <h3 className="ellipsis">{song.name}</h3>
                <Flex><PlaysLocale plays={song.plays} /></Flex>
            </Flex>
            <Flex justifyContent="space-between">
                <span className="ellipsis">{song.artist}{!!tip && <Asterisk title={tip} />}</span>
                <PlayDuration className="ellipsis" time={song.time} />
            </Flex>
        </Flex>
    )
}

function Asterisk ({title}: {title?: string}) {
    return <sup role="tooltip" title={title}>*</sup>
}
