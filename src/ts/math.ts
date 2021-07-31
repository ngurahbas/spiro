export function sinByRev(rev: number): number {
    let angle = rev * Math.PI * 2;
    return Math.sin(angle);
}

export function cosByRev(rev: number): number {
    let angle = rev * Math.PI * 2;
    return Math.cos(angle);
}

export function gcd(a: number, b: number) {
    if (a == 0)
        return b;

    while (b != 0) {
        if (a > b)
            a = a - b;
        else
            b = b - a;
    }

    return a;
}

export function lcm(a: number, b: number) {
    return (a * b) / gcd(a, b);
}