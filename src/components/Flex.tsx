import {ReactNode, HTMLAttributes, forwardRef} from 'react'
import type {Property, Globals} from 'csstype'

import {useBem} from '../libs/useBem'


type SelfPosition = 'center' | 'end' | 'flex-end' | 'flex-start' | 'self-end' | 'self-start' | 'start'
type ContentDistribution = 'space-around' | 'space-between' | 'space-evenly' | 'stretch'
type ContentPosition = 'center' | 'end' | 'flex-end' | 'flex-start' | 'start'

type AlignItems = Globals | SelfPosition | 'baseline' | 'normal' | 'stretch'
type JustifyContent = Globals | ContentDistribution | ContentPosition | 'left' | 'normal' | 'right'
type AlignContent = Globals | ContentDistribution | ContentPosition | 'baseline' | 'normal'
type FlexDirection = Globals | 'column' | 'column-reverse' | 'row' | 'row-reverse'
type AlignSelf = Globals | SelfPosition | 'auto' | 'baseline' | 'normal' | 'stretch'
type Order = Globals | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface IFlexProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
    central?: boolean
    full?: boolean
    // shortcuts
    verticle?: boolean
    stretch?: boolean
    grow?: boolean
    shrink?: boolean
    // raw
    alignItems?: AlignItems
    justifyContent?: JustifyContent
    alignContent?: AlignContent
    wrap?: true | Property.FlexWrap
    direction?: FlexDirection
    alignSelf?: AlignSelf
    /** Globals or 0-9 */
    order?: Order
}

export default forwardRef<HTMLDivElement, IFlexProps>(function Flex (props, ref) {
    const {central, ...rawProps} = props

    const defaultProps: Pick<IFlexProps, 'alignItems' | 'justifyContent' | 'alignContent'> = {
        alignItems: 'normal',
        justifyContent: 'normal',
        alignContent: 'normal',
    }

    if (central) Object.assign(defaultProps, {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    })

    const {
        className: propClassName = '',
        children,
        full,
        verticle,
        grow,
        shrink,
        stretch,
        alignItems = defaultProps.alignItems,
        justifyContent = defaultProps.justifyContent,
        alignContent = defaultProps.alignContent,
        wrap = 'nowrap',
        direction = 'row',
        alignSelf = 'auto',
        order = 0,
        // tslint:disable-next-line: trailing-comma
        ...extraProps
    } = rawProps

    const className = useBem('cz-flex', '', [
        full && 'full',
        'flex-grow-' + (grow ? '1' : '0'),
        'flex-shrink-' + ((shrink === undefined || shrink) ? '1' : '0'),
        'flex-basis-' + ((grow || shrink) ? '0' : 'auto'),
        'align-items-' + (stretch ? 'stretch' : alignItems),
        'justify-content-' + justifyContent,
        'align-content-' + alignContent,
        'flex-wrap-' + (wrap === true ? 'wrap' : wrap),
        'flex-direction-' + (verticle ? 'column' : direction),
        'align-self-' + alignSelf,
        'order-' + order,
    ], [
        grow, shrink,
        alignItems, alignContent, justifyContent, wrap, verticle, direction,
        alignSelf, order,
    ]) + ` ${propClassName}`

    if (central) return (
        <div {...extraProps} className={className} ref={ref}>
            <div className="cz-flex-container">
                {children}
            </div>
        </div>
    )

    return (
        <div {...extraProps} className={className} ref={ref}>
            {children}
        </div>
    )
})
