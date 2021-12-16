import Flex from '@csszen/components.flex'
import ContainerDimensions from 'react-container-dimensions'

import {IArtistPlayResult, ResultsMapper} from '../../libs/computation'

import BubbleChart from '../charts/BubbleChart'


interface IProps {
    artists: IArtistPlayResult[]
    inView: boolean
    onActivate?: (index: number) => void
}

export default function ArtistPlayBubbles ({artists, inView, onActivate}: IProps) {
    return (
        <Flex className="result-card artist" verticle>
            <ContainerDimensions>
                {({width}) => (
                    <BubbleChart
                        inView={inView}
                        width={width}
                        height={width}
                        artifacts={ResultsMapper.biasResultsTimes(artists.slice(0, 7), 1 / 2, width / 5)
                            .map(result => ({
                                id: result.name,
                                value: result.time,
                            }))
                        }
                        onActivate={onActivate}
                    />
                )}
            </ContainerDimensions>
        </Flex>
    )
}
