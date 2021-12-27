import PlaysLocale from '../PlaysLocale'
import {useSpring, animated, to, config} from 'react-spring'


export default function Resolving ({resolving}: {
    resolving?: number
}) {
    const [spring] = useSpring({
        from: {
            n: 0,
        },
        to: {
            n: 3,
        },
        config: config.stiff,
        loop: true,
    }, [resolving])
    return (
        <section>
            <h3>Resolving <animated.span>{to(spring.n, n => '.'.repeat(n))}</animated.span></h3>
            <p><PlaysLocale plays={resolving || 0} suffix="record" /> collected.</p>
        </section>
    )
}
