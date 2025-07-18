// tslint:disable: no-magic-numbers
import {Property} from 'csstype'

import getLinearColorByValue from 'src/libs/getLinearColorByValue'


interface IProps {
    datas: number[][]
    xLabels?: string[]
    yLabels?: string[]
    blockSize?: number
    blockGap?: number
    blockBorderRadius?: number
    fontSize?: number
    tipId?: string
    tipper?: ITipper
}

type ITipper = F1<N, S>

export default function HeatMapChart ({
    datas,
    xLabels = [], yLabels = [], fontSize = 10,
    blockSize = 11, blockGap = 4, blockBorderRadius = 2,
    tipId, tipper,
}: IProps) {
    const maxValue = Math.max(...datas.map(data => Math.max(...data.filter(v => !isNaN(v)))))
    const offsetX = yLabels.length && fontSize * 2.5
    const offsetY = xLabels.length && fontSize * 1.2
    const viewPortX = offsetX + datas.length * (blockSize + blockGap) - blockGap
    const viewPortY = offsetY + datas[0].length * (blockSize + blockGap) - blockGap

    return (
        <svg fontSize={fontSize} viewBox={`0 0 ${viewPortX} ${viewPortY}`}>
            <g transform={`translate(${offsetX}, ${offsetY})`}>
                {datas.map((column, columnIndex) => (
                    <Column
                        key={columnIndex}
                        datas={column}
                        size={blockSize}
                        gap={blockGap}
                        maxValue={maxValue}
                        index={columnIndex * datas[0].length}
                        borderRadius={blockBorderRadius}
                        x={getOffsetDistance(blockSize, blockGap, columnIndex)}
                        tipId={tipId}
                        tipper={tipper}
                    />
                ))}
                {xLabels.map((label, i) => (!!label && (
                    <text
                        key={`${label}-${i}`}
                        dominantBaseline="hanging"
                        x={getOffsetDistance(blockSize, blockGap, i)}
                        y={-offsetY}
                    >{label}</text>
                )))}
                {yLabels.map((label, i) => (!!label && (
                    <text
                        key={`${label}-${i}`}
                        textAnchor="start"
                        dominantBaseline="middle"
                        x={-offsetX}
                        y={getOffsetDistance(blockSize, blockGap, i) + (blockSize + blockGap) * 0.5}
                    >{label}</text>
                )))}
            </g>
        </svg>
    )
}

function Column ({datas, x, size, gap, maxValue, index, borderRadius, tipId, tipper}: {
    size: number
    datas: number[]
    x: number
    gap: number
    maxValue: number
    index: number
    borderRadius: number
    tipId?: string
    tipper?: ITipper
}) {
    return (
        <g transform={`translate(${x}, 0)`}>
            {datas.map((data, dataIndex) => (!isNaN(data) && (
                <Block
                    key={dataIndex}
                    index={index + dataIndex}
                    size={size}
                    x={0}
                    y={getOffsetDistance(size, gap, dataIndex)}
                    fill={getLinearColorByValue(data, maxValue, {minColor: '#ebedf0'})}
                    borderRadius={borderRadius}
                    tipId={tipId}
                    tipper={tipper}
                />
            )))}
        </g>
    )
}

function Block ({size, index, title, x, y, fill = 'currentcolor', borderRadius = 2, tipId, tipper}: {
    size: number
    index: number
    title?: string
    x: number
    y: number
    fill?: Property.Color
    borderRadius?: number
    tipId?: string
    tipper?: ITipper
}) {
    return (
        <rect
            width={size}
            height={size}
            x={x}
            y={y}
            fill={fill}
            rx={borderRadius}
            data-tooltip-id={tipId}
            data-tooltip-content={tipper && tipper(index)}
        >{title && <title>{title}</title>}</rect>
    )
}

function getOffsetDistance (size: number, gap: number, index: number) {
    return index * (size + gap)
}
