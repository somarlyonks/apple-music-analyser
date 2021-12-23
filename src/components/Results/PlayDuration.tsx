import formatDuration from '../../libs/formatDuration'


interface IProps {
    time: number
    className?: string
}

export default function PlayDuration ({time, className}: IProps) {
    return (
        <span className={className}>{formatDuration(time)}</span>
    )
}
