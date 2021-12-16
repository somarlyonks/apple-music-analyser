import {CSSProperties} from 'react'
import Flex from '@csszen/components.flex'

import {ISongPlayResult} from 'src/libs/computation'

import PlaysLocale from '../PlaysLocale'
import PlayDuration from '../PlayDuration'


interface IProps {
    song: ISongPlayResult
    style?: CSSProperties
}

function Asterisk ({title}: {title?: string}) {
    return <sup role="tooltip" title={title}>*</sup>
}

export default function SongPlayRow ({song, style}: IProps) {
    return (
        <Flex className="result song" verticle style={style}>
            <Flex justifyContent="space-between" alignItems="center">
                <h3 className="ellipsis">{song.name}</h3>
                <Flex><PlaysLocale plays={song.plays} /></Flex>
            </Flex>
            <Flex justifyContent="space-between">
                <span className="ellipsis">{song.artist}{<Asterisk title="This artist also appears in most played artists." />}</span>
                <PlayDuration className="ellipsis" time={song.time} />
            </Flex>
        </Flex>
    )
}
