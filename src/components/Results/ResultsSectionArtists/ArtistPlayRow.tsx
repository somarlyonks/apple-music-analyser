import {CSSProperties} from 'react'
import Flex from '@csszen/components.flex'
import {animated} from 'react-spring'

import {IArtistPlayResult} from '../../../libs/computation'

import PlayDuration from '../PlayDuration'


interface IProps {
    result: Pick<IArtistPlayResult, 'name' | 'time'>
    style?: CSSProperties
}

const AnimatedFlex = animated(Flex)

export default function ArtistPlayRow ({result, style}: IProps) {
    return (
        <AnimatedFlex className="result artist" verticle style={style}>
            <Flex alignItems="center">
                <Flex grow><h3 className="ellipsis">{result.name}</h3></Flex>
                <PlayDuration className="ellipsis" time={result.time} />
            </Flex>
        </AnimatedFlex>
    )
}
