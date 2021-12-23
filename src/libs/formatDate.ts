export default function formatDate (datetime: Date) {
    // NOTE: this is the only specified locale by now
    return new Date(datetime).toLocaleDateString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}
