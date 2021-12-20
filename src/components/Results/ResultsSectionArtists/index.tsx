import {useCallback, useEffect, useState} from 'react'
import Flex from '@csszen/components.flex'

import {useSprings} from 'react-spring'

import {IArtistPlayResult} from 'src/libs/computation'
import biasedRatio from 'src/libs/biasedRatio'
import useInViewObserver from 'src/libs/useInViewObserver'
import {red} from 'src/libs/constants'

import ArtistPlayBubbles from './ArtistPlayBubbles'
import ArtistPlayRow from './ArtistPlayRow'


interface IProps {
    artists: IArtistPlayResult[]
}

const getElementCssProperty = ($el: HTMLElement, key: string) => getComputedStyle($el).getPropertyValue(key)

export default function ResultsSectionArtists ({artists}: IProps) {
    const [inView, $observeAnchor] = useInViewObserver({
        rootMargin: '50px 0px 50px 0px',
    })
    const [activatedIndex, setActivatedIndex] = useState(-1)
    const [fontColor, setFontColor] = useState('black')
    const handleActivate = useCallback((index: number) => {
        setActivatedIndex(index)
    }, [])

    const [springs] = useSprings(7, i => ({
        x: activatedIndex === i ? 5 : 0,
        color: activatedIndex === i ? red : fontColor,
    }), [activatedIndex, fontColor])

    useEffect(() => {
        if ($observeAnchor.current) setFontColor(getElementCssProperty($observeAnchor.current, 'color'))
    }, [])

    return (
        <Flex ref={$observeAnchor} className="results-section artists" alignItems="flex-start">
            <Flex className="results-wrapper" verticle grow>
                <h2>Most Played Artists</h2>
                <Flex className="results" verticle>
                    {artists.slice(0, 7).map((artist, i) => (
                        <ArtistPlayRow artist={artist} key={artist.name} style={{
                            opacity: `${biasedRatio(artist.time / artists[1].time, 1 << 4)}%`,
                            ...springs[i] as unknown as ANY,
                        }} />
                        // TODO: @sy animation to display top songs of activated artists
                    ))}
                </Flex>
            </Flex>
            <ArtistPlayBubbles inView={inView} artists={artists} onActivate={handleActivate} />
        </Flex>
    )
}
