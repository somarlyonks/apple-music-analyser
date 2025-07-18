import useMeasure from 'react-use-measure'

import {IArtistPlayResult, ResultsMapper} from '../../../libs/computation'

import Flex from 'src/components/Flex'
import BubbleChart from '../../charts/BubbleChart'


interface IProps {
    artists: IArtistPlayResult[]
    inView: boolean
    onActivate?: (index: number) => void
}

export default function ArtistPlayBubbles ({artists, inView, onActivate}: IProps) {
    const [ref, bounds] = useMeasure()
    return (
        <Flex className="result-card artist" verticle ref={ref}>
            <BubbleChart
                inView={inView}
                width={bounds.width}
                height={bounds.width}
                artifacts={ResultsMapper.biasResultsTimes(artists.slice(0, 7), 1 / 2, bounds.width / 5)
                    .map(result => ({
                        id: result.name,
                        value: result.time,
                    }))
                }
                onActivate={onActivate}
            />
        </Flex>
    )
}
