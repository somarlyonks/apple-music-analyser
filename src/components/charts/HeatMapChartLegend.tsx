import Flex from '@csszen/components.flex'

import getLinearColorByValue from 'src/libs/getLinearColorByValue'


interface IProps {
    blockSize?: number
    blockGap?: number
    borderRadius?: number
}

// tslint:disable-next-line: no-magic-numbers
export default function HeatMapChartLegend ({blockSize = 11, blockGap = 4, borderRadius = 2}: IProps) {
    return (
        <Flex alignItems="center">
            <Flex className="color--fg2">Less</Flex>
            {Array.from(Array(4), (_, i) => (
                <svg width={blockSize} height={blockSize} style={{marginRight: `${blockGap / 2}px`, marginLeft: `${blockGap / 2}px`}}>
                    <rect
                        width={blockSize}
                        height={blockSize}
                        rx={borderRadius}
                        fill={getLinearColorByValue(i, 3, {minColor: '#ebedf0'})}
                    />
                </svg>
            ))}
            <Flex className="color--fg2">More</Flex>
        </Flex>
    )
}
