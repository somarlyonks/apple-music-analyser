import {CSSProperties} from 'react'
import Flex from '@csszen/components.flex'
import {animated} from 'react-spring'

import {IArtistPlayResult} from '../../../libs/computation'

import PlayDuration from '../PlayDuration'


interface IProps {
    artist: IArtistPlayResult
    style?: CSSProperties
}

const AnimatedFlex = animated(Flex)

export default function ArtistPlayRow ({artist, style}: IProps) {
    return (
        <AnimatedFlex className="result artist" verticle style={style}>
            <Flex alignItems="center">
                <Flex grow><h3 className="ellipsis">{artist.name}</h3></Flex>
                <PlayDuration className="ellipsis" time={artist.time} />
            </Flex>
        </AnimatedFlex>
    )
}
