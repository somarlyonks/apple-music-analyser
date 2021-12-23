import formatPlural from './formatPlural'


export default function formatDuration (milliseconds: number) {
    const seconds = milliseconds / 1000
    const minutes = seconds / 60
    const hours = minutes / 60

    const segments: Array<[number, string]> = [
        [hours | 0, 'hour'],
        [minutes % 60 | 0, 'minute'],
        [seconds % 60 | 0, 'second'],
    ]

    return segments.filter(segment => segment[0]).map(segment => formatPlural(...segment)).slice(0, 2).join(' ')
}
