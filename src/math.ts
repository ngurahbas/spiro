function sinByRev(rev: number):number {
    let calRev = rev % 1;
    let angle = calRev * Math.PI * 2;
    return Math.sin(angle);
}

function cosByRev(rev: number):number {
    let calRev = rev % 1;
    let angle = calRev * Math.PI * 2;
    return Math.cos(angle);
}

export { sinByRev, cosByRev };