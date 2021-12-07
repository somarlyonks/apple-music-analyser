import {useState, useEffect} from 'react'

import {ISongPlayResult} from './computation'


export default function useSongPost ({name, artist}: ISongPlayResult) {
    const [imageURL, setImageURL] = useState('')

    useEffect(() => {
        const searchTerm = `${name} ${artist}`
        const url = `https://itunes.apple.com/search?term=${searchTerm}&country=US&media=music&entity=musicTrack`

        fetch(url).then(response => response.json().then(data => {
            if (data.results.length) setImageURL(data.results[0].artworkUrl30.replace('30x30bb', '300x300bb'))
            else throw new Error('Bad Response')
        })).catch(console.error)
    }, [])

    return imageURL
}
