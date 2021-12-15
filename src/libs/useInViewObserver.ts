import {useState} from 'react'
import useInterSectionObserver from '@csszen/hooks.useintersectionobserver'


export default function useInViewObserver (
    options?: IntersectionObserverInit
): [boolean, ReturnType<typeof useInterSectionObserver>] {
    const [inView, setInView] = useState(false)

    const $observeAnchor = useInterSectionObserver(entry => {
        setInView(entry.isIntersecting)
    }, options)

    return [inView, $observeAnchor]
}
