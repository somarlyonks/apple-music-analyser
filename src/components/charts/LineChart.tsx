import {useEffect, useRef, useState, DependencyList, RefObject, useCallback} from 'react'
import {useSpring, animated, config} from 'react-spring'

import {red} from 'src/libs/constants'


interface IProps {
    datas: IPoint2[]
    width: number
    height: number
    inView?: boolean
}

function useSvgPathLength (deps: DependencyList): [number, RefObject<SVGPathElement>] {
    const $path = useRef<SVGPathElement>(null)
    const [length, setLength] = useState(0)
    useEffect(() => {
        if ($path.current) setLength($path.current.getTotalLength())
    }, deps)

    return [length, $path]
}

export default function LineChart ({datas, width, height, inView}: IProps) {
    const padding = [height / 50, width / 50, height / 50, width / 50]
    const path = calculatePath(scalePoints(datas, {width, height, padding}))
    const [pathLength, $fullPath] = useSvgPathLength([path])

    return (
        <svg viewBox={`0 0 ${width} ${height}`}>
            <path ref={$fullPath} d={path} fill="none" stroke="none" />
            {pathLength && (
                <AnimatedLine
                    path={path}
                    length={pathLength}
                    inView={inView}
                    strokeWidth={width / 50 / 5}
                />
            )}
        </svg>
    )
}

interface IPoint2 {
    x: number
    y: number
}

function prop<T> (key: keyof T) {
    return (obj: T) => obj[key]
}

interface IScaleOptions {
    width: number
    height: number
    padding?: number[]
}

function scalePoints (points: IPoint2[], {
    width,
    height,
    padding = [10, 5, 5, 10],
}: IScaleOptions): IPoint2[] {
    points = JSON.parse(JSON.stringify(points)) as IPoint2[]
    points = points.sort((l, r) => l.x - r.x)

    const [oTop = 0, oRight = 0, oBottom = 0, oLeft = 0] = padding
    width = width - oLeft - oRight
    height = height - oTop - oBottom

    const xMin = points[0].x
    const xMax = points[points.length - 1].x
    const yMax = Math.max(...points.map(prop('y')))
    const yMin = 0

    return points.map(point => {
        const xScaleFactor = width / (xMax - xMin)
        const yScaleFactor = height / (yMax - yMin)

        return {
            x: oLeft + (point.x - xMin) * xScaleFactor,
            y: oTop + height - (point.y - yMin) * yScaleFactor,
        }
    })
}

function calculatePath (points: IPoint2[]): string {
    function computeBezierCommand (point: IPoint2, i: number): string {
        const [cpsX, cpsY] = computeControlPoint(points[i - 1], points[i - 2], point, false)
        const [cpeX, cpeY] = computeControlPoint(point, points[i - 1], points[i + 1], true)
        return `C ${cpsX} ${cpsY}, ${cpeX} ${cpeY}, ${point.x} ${point.y}`
    }

    function computeControlPoint (
        currentPoint: IPoint2,
        previousPoint: IPoint2,
        nextPoint: IPoint2,
        reverse: boolean
    ): number[] {
        const smoothing = 0.2
        const oppositeLine = computeOppositeLine(
            previousPoint || currentPoint,
            nextPoint || currentPoint
        )
        const angle = oppositeLine.angle + (reverse ? Math.PI : 0)
        const length = oppositeLine.length * smoothing
        const x = currentPoint.x + Math.cos(angle) * length
        const y = currentPoint.y + Math.sin(angle) * length
        return [x, y]
    }

    function computeOppositeLine (pointA: IPoint2, pointB: IPoint2) {
        const lengthX = pointB.x - pointA.x
        const lengthY = pointB.y - pointA.y
        return {
            length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
            angle: Math.atan2(lengthY, lengthX),
        }
    }

    return points.reduce(
        (r, point, i) => !i ? r : `${r} ${computeBezierCommand(point, i)}`,
        `M ${points[0].x} ${points[0].y}`
    )
}

function AnimatedLine ({
    path,
    length,
    inView,
    lineColor = red,
    strokeWidth = 2,
}: {
    path: string
    length: number
    inView?: boolean
    lineColor?: string
    strokeWidth?: number
}) {
    const springCallback = useCallback(() => ({
        length: inView ? 1 : length,
        config: config.slow,
    }), [inView, length])
    const [spring, setSpring] = useSpring(springCallback)

    useEffect(() => {
        setSpring(springCallback())
    }, [length, inView])

    return (
        <>
            <animated.path
                fill="none"
                stroke={lineColor}
                strokeWidth={strokeWidth}
                strokeDashoffset={spring.length}
                strokeDasharray={length}
                d={path}
            />
            <animated.path
                fill="none"
                stroke={lineColor}
                strokeWidth={strokeWidth * 3}
                strokeDashoffset={spring.length}
                strokeLinecap="round"
                strokeDasharray={`0 ${length}`}
                d={path}
            />
        </>
    )
}
