export default function suffixPlural (x: number, suffix: string, pluralSuffix?: string) {
    const rule = new Intl.PluralRules()
    if (rule.select(x) === 'one') return suffix
    return pluralSuffix || (suffix + 's')
}
