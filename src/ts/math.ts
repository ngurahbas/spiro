export function sinByRev(rev: number):number {
    let angle = rev * Math.PI * 2;
    return Math.sin(angle);
}

export function cosByRev(rev: number):number {
    let angle = rev * Math.PI * 2;
    return Math.cos(angle);
}