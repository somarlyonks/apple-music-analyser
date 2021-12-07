import {ISongPlayMonthResult, millisecondsToHours} from '../../libs/computation'
import {Line} from 'react-chartjs-2'


interface IProps {
    months: ISongPlayMonthResult[]
}

export default function MonthChart ({months}: IProps) {
    const labels = months.map(month => month.month)
    const data = months.map(month => millisecondsToHours(month.time))
    // TODO: @sy hide the legend

    return (
        <Line
            className="result month-chart"
            data={{
                labels,
                datasets: [
                    {
                        label: 'Played Hours',
                        data,
                        fill: 'rgba(220,220,220,1)',
                        borderColor: '#FB7E2A',
                        pointBackgroundColor: 'rgba(220,220,220,0.2)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        tension: 0.3,
                    },
                ],
            }}
            width="600"
            height="300"
            options={{
            }}
        />
    )
}
