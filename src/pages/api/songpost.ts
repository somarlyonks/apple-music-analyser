import type {NextApiRequest, NextApiResponse} from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {term = 'term'} = req.query

    return searchItunes(term as string)
        .then(r => res.status(r.status).send(r.body))
        .catch(r => res.status(r.status).send(r.body))
}

async function searchItunes (term: string) {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&country=US&limit=1&media=music&entity=musicTrack`
    const response = await fetch(url)
    if (!response.ok) return response

    const {results} = await response.json()

    if (results?.length) return {
        ok: true,
        status: 200,
        body: results[0],
    }
    throw new Error('failed to search Itunes')
}
