import { Command } from 'commander';
import * as fs from 'fs';
import * as mustache from 'mustache';

const program = new Command();

program
    .name('aoc-templater')
    .version('1.0.0')
    .description('AoC Templater');

program.command('create-year')
        .description('Create a new year directory')
        .argument('<year>', 'The year to create')
        .option('--days <days>', 'The number of days to create')
        .action(async (year, options) => {
            console.log(`Creating year ${year}`);
            console.log(`Creating ${options.days} days`);

            // Check to see if a year directory already exists
            if (fs.existsSync(`../../${year}`)) {
                console.error(`Year ${year} already exists`);
                return;
            } else {
                fs.mkdirSync(`../../${year}`);

                // Create the days directories
                let defaultDays = 25;
                if (options.days) {
                    defaultDays = parseInt(options.days);
                }
                for (let i = 1; i <= defaultDays; i++) {
                    fs.mkdirSync(`../../${year}/Day${i}`);

                    // Create the day files
                    await fs.readFile(`../templates/day/logic.mustache`, (err, data) => {
                        if (err) {
                            console.error(`Error reading logic template: ${err}`);
                            throw err;
                        }

                        var logicPartOneContent = mustache.render(data.toString(), { day: i, part: 1, year: year });
                        var logicPartTwoContent = mustache.render(data.toString(), { day: i, part: 2, year: year });

                        fs.writeFileSync(`../../${year}/Day${i}/${i}.1.logic.ts`, logicPartOneContent);
                        fs.writeFileSync(`../../${year}/Day${i}/${i}.2.logic.ts`, logicPartTwoContent);
                    });

                    await fs.readFile(`../templates/day/test.mustache`, (err, data) => {
                        if (err) {
                            console.error(`Error reading test template: ${err}`);
                            throw err;
                        }

                        var testPartOneContent = mustache.render(data.toString(), { day: i, part: 1, year: year });
                        var testPartTwoContent = mustache.render(data.toString(), { day: i, part: 2, year: year });

                        fs.writeFileSync(`../../${year}/Day${i}/${i}.1.test.ts`, testPartOneContent);
                        fs.writeFileSync(`../../${year}/Day${i}/${i}.2.test.ts`, testPartTwoContent);
                    });

                    await fs.readFile(`../templates/day/run.mustache`, (err, data) => {
                        if (err) {
                            console.error(`Error reading run template: ${err}`);
                            throw err;
                        }

                        var runPartOneContent = mustache.render(data.toString(), { day: i, part: 1, year: year });
                        var runPartTwoContent = mustache.render(data.toString(), { day: i, part: 2, year: year });

                        fs.writeFileSync(`../../${year}/Day${i}/${i}.1.ts`, runPartOneContent);
                        fs.writeFileSync(`../../${year}/Day${i}/${i}.2.ts`, runPartTwoContent);
                    });

                    await fs.readFile(`../templates/day/input.txt.mustache`, (err, data) => {
                        if (err) {
                            console.error(`Error reading input template: ${err}`);
                            throw err;
                        }

                        var inputContent = mustache.render(data.toString(), { day: i, year: year });
                        fs.writeFileSync(`../../${year}/Day${i}/input.txt`, inputContent);
                    });

                    await fs.readFile(`../templates/day/test.txt.mustache`, (err, data) => {
                        if (err) {
                            console.error(`Error reading test template: ${err}`);
                            throw err;
                        }

                        var testContent = mustache.render(data.toString(), { day: i, year: year });
                        fs.writeFileSync(`../../${year}/Day${i}/test.txt`, testContent);
                    });

                    // Create the year files
                    await fs.readFile(`../templates/year/package.json.mustache`, (err, data) => {
                        if (err) {
                            console.error(`Error reading package template: ${err}`);
                            throw err;
                        }

                        var packageContent = mustache.render(data.toString(), { year: year });
                        fs.writeFileSync(`../../${year}/package.json`, packageContent);
                    });

                    await fs.readFile(`../templates/year/readme.md.mustache`, (err, data) => {
                        if (err) {
                            console.error(`Error reading readme template: ${err}`);
                            throw err;
                        }

                        var readmeContent = mustache.render(data.toString(), { year: year });
                        fs.writeFileSync(`../../${year}/readme.md`, readmeContent);
                    });

                    await fs.readFile(`../templates/year/tsconfig.json.mustache`, (err, data) => {
                        if (err) {
                            console.error(`Error reading tsconfig template: ${err}`);
                            throw err;
                        }

                        var tsconfigContent = mustache.render(data.toString(), { year: year });
                        fs.writeFileSync(`../../${year}/tsconfig.json`, tsconfigContent);
                    });

                    await fs.readFile(`../templates/year/.prettierrc.mustache`, (err, data) => {
                        if (err) {
                            console.error(`Error reading prettierrc template: ${err}`);
                            throw err;
                        }

                        var prettierrcContent = mustache.render(data.toString(), { year: year });
                        fs.writeFileSync(`../../${year}/.prettierrc`, prettierrcContent);
                    });

                    await fs.readFile(`../templates/year/jest.config.js.mustache`, (err, data) => {
                        if (err) {
                            console.error(`Error reading jest config template: ${err}`);
                            throw err;
                        }

                        var jestConfigContent = mustache.render(data.toString(), { year: year });
                        fs.writeFileSync(`../../${year}/jest.config.js`, jestConfigContent);
                    });
                }
            }
        });

program.parse(process.argv);