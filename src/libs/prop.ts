export default function prop<T> (key: keyof T) {
    return (obj: T) => obj[key]
}
