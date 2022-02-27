// return *positive* remainder of n divided by m.
export function mod(n, m) {
    return ((n % m) + m) % m;
}

export function sleep(time) {
    return new Promise((res) => setTimeout(res, time));
}

function randInt(a, b) {
    return a + Math.floor((b - a) * Math.random());
}

export function randEl(list) {
    return list[randInt(0, list.length)];
}
