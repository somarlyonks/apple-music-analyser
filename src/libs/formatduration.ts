export default function formatDuration (milliseconds: number) {
    const seconds = milliseconds / 1000
    const minutes = seconds / 60
    const hours = minutes / 60
    const days = hours / 24

    const segments = [
        [days | 0, 'd'],
        [hours % 60 | 0, 'h'],
        [minutes % 60 | 0, 'm'],
        [seconds % 60 | 0, 's'],
    ]

    return segments.filter(segment => segment[0]).map(segment => `${segment[0]} ${segment[1]}`).join(' ')
}
