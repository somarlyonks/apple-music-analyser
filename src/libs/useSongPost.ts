import {useState, useEffect} from 'react'

import {ISongPlayResult} from './computation'


export default function useSongPost ({name, artist}: ISongPlayResult) {
    const [imageURL, setImageURL] = useState('')

    useEffect(() => {
        const searchTerm = `${name} ${artist}`

        fetch(`/api/songpost?term=${searchTerm}`).then(response =>
            response.ok && !response.json().then(result => {
                setImageURL(result.artworkUrl30.replace('30x30bb', '300x300bb'))
            })
        ).catch(console.error)
    }, [])

    return imageURL
}
