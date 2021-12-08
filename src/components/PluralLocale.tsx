import {useMemo} from 'react'


export interface IProps {
    value: number
    suffix: string
    pluralSuffix?: string
    languageCode?: string
}

export default function NumberLocale ({value, languageCode, suffix, pluralSuffix}: IProps) {
    const formatter = useMemo(() => new Intl.PluralRules(languageCode), [])
    return <span>{formatter.select(value) === 'one' ? suffix : (pluralSuffix || (`${suffix}s`))}</span>
}
