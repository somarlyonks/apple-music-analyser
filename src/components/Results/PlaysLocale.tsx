import NumberLocale from '../NumberLocale'
import PluralLocale from '../PluralLocale'


interface IProps {
    plays: number
    languageCode?: string
}

export default function PlaysLocale ({plays, languageCode}: IProps) {
    return (
        <><NumberLocale value={plays} languageCode={languageCode} />&nbsp;<PluralLocale value={plays} suffix="play" languageCode={languageCode} /></>
    )
}
