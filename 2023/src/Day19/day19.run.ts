import fs from "fs";
import path from "path";
import { getRatingCombinations } from "./day19";

const fileInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), {
  encoding: "utf8",
  flag: "r",
});

let combinations = getRatingCombinations(fileInput);

console.log(`Combinations: ${combinations}`);
/*
123972546935551

19720144371901

const checkingRanges = [];
let checkingCounter = 0;
const foundRanges = [];

type PaddedRange = Record<string, [string, string]>;

const renderRange = (range: PaddedRange) =>
  `X:${range.x[0]}-${range.x[1]} - M:${range.m[0]}-${range.m[1]} - A:${range.a[0]}-${range.a[1]} - S:${range.s[0]}-${range.s[1]}`;

function render() {
  checkingRanges.reverse();
  const found = [];
  let parts = 0;
  const t = setInterval(() => {
    if (checkingRanges.length === 0) {
      clearInterval(t);
      return;
    }
    const [num, checking] = checkingRanges.pop();
    while (foundRanges[0][0] <= num) {
      const foundRange = foundRanges.shift();
      found.unshift(`${renderRange(foundRange[1])} Parts: ${foundRange[2]}`);
      parts += foundRange[2];
    }
    if (found.length > 20) {
      found.splice(20);
    }
    const buff = [];
    buff.push(`Check: ${renderRange(checking)}`);
    buff.push("\n");
    buff.push(`Total Parts: ${parts}`);
    buff.push("\n");
    buff.push(`Found: ${found.join("\nFound: ")}`);
    buff.push("\n");

    console.clear();
    console.log(buff.join("\n"));
  }, 50);
}

const pad = (range: Range): PaddedRange => {
  const paddedRange = {};

  ["x", "m", "a", "s"].forEach((rating) => {
    paddedRange[rating] = [
      range[rating][0].toString().padStart(4, "0"),
      range[rating][1].toString().padStart(4, "0"),
    ];
  });

  return paddedRange;
};

const countRange = (range: Range) =>
  Object.values(range).reduce((acc, [min, max]) => acc * (max - min + 1), 1);

 */