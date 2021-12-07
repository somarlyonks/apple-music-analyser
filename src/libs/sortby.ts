const sortBy: <T> (key: keyof T, reversed?: boolean) => <T2 extends T> (xs: T2[]) => T2[] =
    (key, reversed) => xs => reversed ? xs.sort((l, r) => +r[key] - +l[key]) : xs.sort((l, r) => +l[key] - +r[key])

export default sortBy
