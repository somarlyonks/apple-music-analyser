type ITagger<T, TTag extends string> = (x: T, i: number, xs: T[]) => TTag
type IGroupResolver<TX, TTag extends string, TR> = (r: Record<TTag, TR>, x: TX, tag: TTag, i: number, xs: TX[]) => TR


function groupBy<TX, TTag extends string, TR> (xs: TX[], tagging: ITagger<TX, TTag>): Record<TTag, TX[]>
function groupBy<TX, TTag extends string, TR> (
    xs: TX[],
    tagging: ITagger<TX, TTag>,
    resolver: IGroupResolver<TX, TTag, TR>
): Record<TTag, TR>
function groupBy<TX, TTag extends string, TR> (
    xs: TX[],
    tagging: ITagger<TX, TTag>,
    resolver: IGroupResolver<TX, TTag, TR> = (r, x, tag) => (r[tag] || [] as ANY).concat(x)
) {
    return xs.reduce((r, x, i) => Object.assign(r, (tag => ({
        [tag]: resolver(r, x, tag, i, xs),
    }))(tagging(x, i, xs))), {} as Record<TTag, TR>)
}

export default groupBy
