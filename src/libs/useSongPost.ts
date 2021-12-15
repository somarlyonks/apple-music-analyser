import {useState, useEffect} from 'react'

import {ISongPlayResult} from './computation'


async function searchItunes (term: string) {
    const url = `https://itunes.apple.com/search?term=${term}&country=US&limit=1&media=music&entity=musicTrack`
    const response = await fetch(url)
    const {results} = await response.json()

    if (results?.length) return results[0]
    throw new Error('failed to search Itunes')
}


export default function useSongPost ({name, artist}: ISongPlayResult) {
    const [imageURL, setImageURL] = useState('')

    useEffect(() => {
        const searchTerm = `${name} ${artist}`

        searchItunes(searchTerm).then(result =>
            setImageURL(result.artworkUrl30.replace('30x30bb', '300x300bb'))
        ).catch(console.error)
    }, [])

    return imageURL
}
