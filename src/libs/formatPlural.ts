import suffixPlural from './suffixPlural'


export default function formatPlural (x: number, suffix: string, pluralSuffix?: string) {
    const formatedSuffix = suffixPlural(x, suffix, pluralSuffix)
    return `${x} ${formatedSuffix}`
}
