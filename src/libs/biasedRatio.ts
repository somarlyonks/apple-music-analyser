export default function biasedRatio (n: number, bias: number) {
    return bias + (n * (100 - bias))
}
