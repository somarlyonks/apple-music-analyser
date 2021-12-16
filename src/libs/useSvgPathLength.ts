import {useEffect, useRef, useState, DependencyList, RefObject} from 'react'


export default function useSvgPathLength (deps: DependencyList): [number, RefObject<SVGPathElement>] {
    const $path = useRef<SVGPathElement>(null)
    const [length, setLength] = useState(0)
    useEffect(() => {
        if ($path.current) setLength($path.current.getTotalLength())
    }, deps)

    return [length, $path]
}
