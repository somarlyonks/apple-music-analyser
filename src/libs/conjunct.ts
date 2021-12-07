export default function conjunct<T> (...fns: L<F1<T, boolean>>): F1<T, boolean> {
    return (arg: T) => fns.every(fn => fn(arg))
}
