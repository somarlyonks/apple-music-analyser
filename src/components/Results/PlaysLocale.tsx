import NumberLocale from '../NumberLocale'
import PluralLocale from '../PluralLocale'


interface IProps {
    plays: number
    languageCode?: string
    suffix?: string
}

export default function PlaysLocale ({plays, languageCode, suffix = 'play'}: IProps) {
    return (
        <><NumberLocale value={plays} languageCode={languageCode} />&nbsp;<PluralLocale value={plays} suffix={suffix} languageCode={languageCode} /></>
    )
}
