export const mix = (value: bigint, secret: bigint): bigint => {
    return value ^ secret;
};

export const prune = (secret: bigint): bigint => {
    return secret % 16777216n;
};

export const evolve = (secret: bigint): bigint => {
    let evolvedSecret: bigint = secret;

    // Step one is to multiply the secret by 64, then mix that result into the secret and prune the result
    evolvedSecret = prune(mix(evolvedSecret * 64n, evolvedSecret));

    // // Step two is to divide the secret by 32, round down to the nearest integer, then mix that result into the secret and prune the result
    evolvedSecret = prune(mix((evolvedSecret / 32n) /1n, evolvedSecret));

    // // Step three is to multiply the secret by 2048, then mix the result into the secret and prune the result
    evolvedSecret = prune(mix(evolvedSecret * 2048n, evolvedSecret));

    return evolvedSecret;
};

export const getXthEvolution = (secret: bigint, x: number, cache: Map<bigint, bigint>): bigint => {
    let currentSecret: bigint = secret;
    let nextSecret: bigint = 0n;

    for (let i = 0; i < x; i++) {
        if (cache.get(currentSecret)) {
            currentSecret = cache.get(currentSecret);
        } else {
            nextSecret = evolve(currentSecret);
            cache.set(currentSecret, nextSecret);
            currentSecret = nextSecret;
        }
    }

    return nextSecret;
}