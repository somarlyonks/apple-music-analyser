import {useMemo} from 'react'


export interface IProps {
    value: bigint | number
    languageCode?: string
}

export default function NumberLocale ({value, languageCode}: IProps) {
    const formatter = useMemo(() => new Intl.NumberFormat(languageCode), [])
    return <span>{formatter.format(value)}</span>
}
