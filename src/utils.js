// return *positive* remainder of n divided by m.
export function mod(n, m) {
    return ((n % m) + m) % m;
}