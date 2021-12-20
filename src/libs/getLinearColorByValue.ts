import {scaleLinear, rgb} from 'd3'

import {red} from './constants'


interface IOptions {
    minValue?: number
    minColor?: string
    maxColor?: string
}

export default function getLinearColorByValue (value: number, maxValue: number, {
    minValue = 0,
    minColor = '#fff',
    maxColor = rgb(red).brighter(2).toString(),
}: IOptions = {}) {
    return scaleLinear([minColor, maxColor]).domain([minValue, maxValue])(value).toString()
}
