import { Range, getDestinationForSource } from "./1.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const seeds: number[] = [];
const seedToSoilRanges: Range[] = [];
const soilToFertilizerRanges: Range[] = [];
const fertilizerToWaterRanges: Range[] = [];
const waterToLightRanges: Range[] = [];
const lightToTemperatureRanges: Range[] = [];
const temperatureToHumidityRanges: Range[] = [];
const humidityToLocationRanges: Range[] = [];

const execute = () => {
    if (debug) {
        console.log(`There are ${seeds.length} seeds`);
        console.log(`There are ${seedToSoilRanges.length} seedToSoilRanges`);
        console.log(`There are ${soilToFertilizerRanges.length} soilToFertilizerRanges`);
        console.log(`There are ${fertilizerToWaterRanges.length} fertilizerToWaterRanges`);
        console.log(`There are ${waterToLightRanges.length} waterToLightRanges`);
        console.log(`There are ${lightToTemperatureRanges.length} lightToTemperatureRanges`);
        console.log(`There are ${temperatureToHumidityRanges.length} temperatureToHumidityRanges`);
        console.log(`There are ${humidityToLocationRanges.length} humidityToLocationRanges`);
    }

    let closestLocation = Infinity;

    seeds.forEach((seed) => {
        const location = getDestinationForSource(humidityToLocationRanges, getDestinationForSource(temperatureToHumidityRanges, getDestinationForSource(lightToTemperatureRanges, getDestinationForSource(waterToLightRanges, getDestinationForSource(fertilizerToWaterRanges, getDestinationForSource(soilToFertilizerRanges, getDestinationForSource(seedToSoilRanges, seed)))))));

        if (location < closestLocation) {
            closestLocation = location;
        }
    });

    console.log(`The closest location is ${closestLocation}`);
}

const parseSeeds = (line: string) => {
    line.split(' ').forEach((seed) => {
        seeds.push(parseInt(seed, 10));
    });
};

const parseSeedToSoil = (line: string) => {
    parseMapAndAddToRanges(line, seedToSoilRanges);
};

const parseSoilToFertilizer = (line: string) => {
    parseMapAndAddToRanges(line, soilToFertilizerRanges);
};

const parseFertilizerToWater = (line: string) => {
    parseMapAndAddToRanges(line, fertilizerToWaterRanges);
};

const parseWaterToLight = (line: string) => {
    parseMapAndAddToRanges(line, waterToLightRanges);
};

const parseLightToTemperature = (line: string) => {
    parseMapAndAddToRanges(line, lightToTemperatureRanges);
};

const parseTemperatureToHumidity = (line: string) => {
    parseMapAndAddToRanges(line, temperatureToHumidityRanges);
};

const parseHumidityToLocation = (line: string) => {
    parseMapAndAddToRanges(line, humidityToLocationRanges);
};

const parseMapAndAddToRanges = (line: string, ranges: Range[]) => {
    const [destinationRangeStart, sourceRangeStart, rangeLength] = line.split(' ');
    ranges.push(new Range(parseInt(sourceRangeStart, 10), parseInt(destinationRangeStart, 10), parseInt(rangeLength, 10)));
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./seeds.txt')
});

lineReader.on('line', (line) => {
    parseSeeds(line);
}).on('close', () => {
    lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('./seedToSoil.txt')
    });

    lineReader.on('line', (line) => {
        parseSeedToSoil(line);
    }).on('close', () => {
        lineReader = require('readline').createInterface({
            input: require('fs').createReadStream('./soilToFertilizer.txt')
        });

        lineReader.on('line', (line) => {
            parseSoilToFertilizer(line);
        }).on('close', () => {
            lineReader = require('readline').createInterface({
                input: require('fs').createReadStream('./fertilizerToWater.txt')
            });
    
            lineReader.on('line', (line) => {
                parseFertilizerToWater(line);
            }).on('close', () => {
                lineReader = require('readline').createInterface({
                    input: require('fs').createReadStream('./waterToLight.txt')
                });
        
                lineReader.on('line', (line) => {
                    parseWaterToLight(line);
                }).on('close', () => {
                    lineReader = require('readline').createInterface({
                        input: require('fs').createReadStream('./lightToTemperature.txt')
                    });
            
                    lineReader.on('line', (line) => {
                        parseLightToTemperature(line);
                    }).on('close', () => {
                        lineReader = require('readline').createInterface({
                            input: require('fs').createReadStream('./temperatureToHumidity.txt')
                        });
                
                        lineReader.on('line', (line) => {
                            parseTemperatureToHumidity(line);
                        }).on('close', () => {
                            lineReader = require('readline').createInterface({
                                input: require('fs').createReadStream('./humidityToLocation.txt')
                            });
                    
                            lineReader.on('line', (line) => {
                                parseHumidityToLocation(line);
                            }).on('close', () => {
                                execute();
                            });
                        });
                    });
                });
            });
        });
    });
});

export {};