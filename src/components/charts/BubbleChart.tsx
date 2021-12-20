// tslint:disable: no-magic-numbers
import {useCallback, useEffect, useState} from 'react'
import * as d3 from 'd3'
import {useSprings, animated, config} from 'react-spring'

import {red} from 'src/libs/constants'
import getLinearColorByValue from 'src/libs/getLinearColorByValue'


interface IPropNode {
    id: string,
    value: number,
}

interface IArtifact extends d3.SimulationNodeDatum, IPropNode {
    //
}

interface IProps {
    artifacts: IPropNode[],
    width: number,
    height: number,
    bubbleStrokeWidth?: number,
    inView?: boolean
    onActivate?: (index: number) => void
}

export default function BubbleChart ({
    artifacts,
    width,
    height,
    bubbleStrokeWidth = 1,
    inView = true,
    onActivate,
}: IProps) {
    const [activatedIndex, setActivatedIndex] = useState(-1)
    const activatedIndexHandler = useCallback((index: number) => () => {
        setActivatedIndex(index)
        if (onActivate) onActivate(index)
    }, [setActivatedIndex])

    const springCallback = useCallback((nodes: IArtifact[]) => (i: number) => ({
        x: inView ? (nodes[i]?.x ?? width / 2) : width / 2,
        y: inView ? (nodes[i]?.y ?? height / 2) : height / 2,
        r: (i === activatedIndex ? 1.1 : 1) * nodes[i].value,
        fill: i === activatedIndex
            ? d3.rgb(red).brighter(1).toString()
            : getLinearColorByValue(nodes[i].value, nodes[0].value),
        config: config.wobbly,
    }), [inView, activatedIndex])
    const [springs, setSprings] = useSprings(
        artifacts.length,
        springCallback(artifacts)
    )

    useEffect(() => {
        const nodes = JSON.parse(JSON.stringify(artifacts)) as unknown as IArtifact[]
        const simulation = d3
            .forceSimulation(nodes)
            .velocityDecay(0.55)
            .force('center', d3.forceCenter().x(width / 2).y(height / 2))
            .force('collide', d3.forceCollide(
                (d, i) => d.value * 1.01 * (i === activatedIndex ? 1.1 : 1) + bubbleStrokeWidth
            ))

        forceSimulationEnd(simulation).then(() => {
            setSprings(springCallback(nodes))
        })

        return () => {
            simulation.stop()
        }
    }, [artifacts, setSprings, bubbleStrokeWidth, width, height, inView, activatedIndex])

    return (
        <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMinYMin meet"
        >
            <g>
                {springs.map((spring, index) => (
                    <animated.circle
                        key={artifacts[index].id}
                        stroke={red}
                        strokeWidth={bubbleStrokeWidth}
                        r={spring.r}
                        fill={spring.fill}
                        cx={spring.x}
                        cy={spring.y}
                        onMouseEnter={activatedIndexHandler(index)}
                        onMouseLeave={activatedIndexHandler(-1)}
                    />
                ))}
            </g>
        </svg>
    )
}

function forceSimulationEnd (simulation: d3.Simulation<IArtifact, undefined>): Promise<void> {
    return new Promise((resolve, reject) => {
        simulation.on('end', resolve)
        simulation.alpha(0)

        try {
            const n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()))
            for (let i = 0; i < n; ++i) simulation.tick()
        } catch (err) {
            reject(err)
        }
    })
}
