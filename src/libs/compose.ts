function compose<R1, R> (fn1: F0<R1>, fn2: F1<R1, R>): F0<R>
function compose<T1, R1, R> (fn1: F1<T1, R1>, fn2: F1<R1, R>): F1<T1, R>
function compose<T1, T2, R1, R> (fn1: F2<T1, T2, R1>, fn2: F1<R1, R>): F2<T1, T2, R>
function compose<T1, T2, T3, R1, R> (fn1: F3<T1, T2, T3, R1>, fn2: F1<R1, R>): F3<T1, T2, T3, R>
function compose<T1, R1, R2, R> (fn1: F1<T1, R1>, fn2: F1<R1, R2>, fn3: F1<R2, R>): F1<T1, R>
function compose<T1, T2, R1, R2, R> (fn1: F2<T1, T2, R1>, fn2: F1<R1, R2>, fn3: F1<R2, R>): F2<T1, T2, R>
function compose<T1, T2, T3, R2, R1, R> (fn1: F3<T1, T2, T3, R1>, fn2: F1<R1, R2>, fn3: F1<R2, R>): F3<T1, T2, T3, R>
function compose (...fns: F[]) {
    return fns.reduce((c, fn) => (...args: ANY[]) => fn(c(...args)))
}

export default compose
