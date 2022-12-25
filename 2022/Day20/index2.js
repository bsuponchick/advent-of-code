const pipe = (...fns) => v => fns.reduce((a, f) => f(a), v);
const parse = input =>
  input.split("\n").filter(Boolean).map(Number);
const mixing = (file, rounds = 1, key = 1) => {
  file = file.map(v => v * key).map(d => [d]);
  const buffer = [...file];
  while (rounds--)
    file.forEach(v => {
      const i = buffer.indexOf(v);
      buffer.splice(i, 1);
      buffer.splice((i + v[0]) % buffer.length, 0, v);
    });

  return buffer.flat();
};
const sumGroveCoords = file =>
  (zeroIndex =>
    [1000, 2000, 3000]
      .map(v => (v + zeroIndex) % file.length)
      .map(i => file[i])
      .reduce((sum, v) => sum + v))(
    file.findIndex(v => v === 0)
  );

const part1 = pipe(parse, mixing, sumGroveCoords);
const part2 = pipe(
  parse,
  v => mixing(v, 10, 811589153),
  sumGroveCoords
);

export { part1, part2 };