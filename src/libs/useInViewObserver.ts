import {useState, MutableRefObject} from 'react'
import useInterSectionObserver from '@csszen/hooks.useintersectionobserver'


export default function useInViewObserver<T extends HTMLElement = HTMLDivElement> (
    options?: IntersectionObserverInit
): [boolean, MutableRefObject<T>] {
    const [inView, setInView] = useState(false)

    const $observeAnchor = useInterSectionObserver<T>(entry => {
        setInView(entry.isIntersecting)
    }, options)

    return [inView, $observeAnchor]
}
