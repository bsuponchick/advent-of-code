import { Garden, GardenPlot, Region } from './12.1.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 12 - Part 1', () => {
    describe(`GardenPlot`, () => {
        describe(`Constructor`, () => {
            test(`should initialize correctly`, () => {
                const plot = new GardenPlot('A');

                expect(plot.label).toBe('A');
                expect(plot.region).toBeNull();
                expect(plot.north).toBeNull();
                expect(plot.east).toBeNull();
                expect(plot.south).toBeNull();
                expect(plot.west).toBeNull();
            });
        });

        describe(`When setNorth is called...`, () => {
            test(`should set the north property`, () => {
                const plot = new GardenPlot('A');
                const northPlot = new GardenPlot('B');

                plot.setNorth(northPlot);

                expect(plot.north).toBe(northPlot);
            });
        });

        describe(`When setEast is called...`, () => {
            test(`should set the east property`, () => {
                const plot = new GardenPlot('A');
                const eastPlot = new GardenPlot('B');

                plot.setEast(eastPlot);

                expect(plot.east).toBe(eastPlot);
            });
        });

        describe(`When setSouth is called...`, () => {
            test(`should set the south property`, () => {
                const plot = new GardenPlot('A');
                const southPlot = new GardenPlot('B');

                plot.setSouth(southPlot);

                expect(plot.south).toBe(southPlot);
            });
        });

        describe(`When setWest is called...`, () => {
            test(`should set the west property`, () => {
                const plot = new GardenPlot('A');
                const westPlot = new GardenPlot('B');

                plot.setWest(westPlot);

                expect(plot.west).toBe(westPlot);
            });
        });

        describe(`When canMoveNorth is called...`, () => {
            test(`should return true if north is not null`, () => {
                const plot = new GardenPlot('A');
                const northPlot = new GardenPlot('B');

                plot.setNorth(northPlot);

                expect(plot.canMoveNorth()).toBe(true);
            });

            test(`should return false if north is null`, () => {
                const plot = new GardenPlot('A');

                expect(plot.canMoveNorth()).toBe(false);
            });
        });

        describe(`When canMoveEast is called...`, () => {
            test(`should return true if east is not null`, () => {
                const plot = new GardenPlot('A');
                const eastPlot = new GardenPlot('B');

                plot.setEast(eastPlot);

                expect(plot.canMoveEast()).toBe(true);
            });

            test(`should return false if east is null`, () => {
                const plot = new GardenPlot('A');

                expect(plot.canMoveEast()).toBe(false);
            });
        });

        describe(`When canMoveSouth is called...`, () => {
            test(`should return true if south is not null`, () => {
                const plot = new GardenPlot('A');
                const southPlot = new GardenPlot('B');

                plot.setSouth(southPlot);

                expect(plot.canMoveSouth()).toBe(true);
            });

            test(`should return false if south is null`, () => {
                const plot = new GardenPlot('A');

                expect(plot.canMoveSouth()).toBe(false);
            });
        });

        describe(`When canMoveWest is called...`, () => {
            test(`should return true if west is not null`, () => {
                const plot = new GardenPlot('A');
                const westPlot = new GardenPlot('B');

                plot.setWest(westPlot);

                expect(plot.canMoveWest()).toBe(true);
            });

            test(`should return false if west is null`, () => {
                const plot = new GardenPlot('A');

                expect(plot.canMoveWest()).toBe(false);
            });
        });

        describe(`When hasRegion is called...`, () => {
            test(`should return true if region is not null`, () => {
                const plot = new GardenPlot('A');
                const region = new Region(1);
                plot.setRegion(region);

                expect(plot.hasRegion()).toBe(true);
            });

            test(`should return false if region is null`, () => {
                const plot = new GardenPlot('A');

                expect(plot.hasRegion()).toBe(false);
            });
        });

        describe(`When getRegion is called...`, () => {
            test(`should return the region`, () => {
                const plot = new GardenPlot('A');
                const region = new Region(1);
                plot.setRegion(region);

                expect(plot.getRegion()).toBe(region);
            });
        });

        describe(`When setRegion is called...`, () => {
            test(`should set the region`, () => {
                const plot = new GardenPlot('A');
                const region = new Region(1);
                plot.setRegion(region);

                expect(plot.region).toBe(region);
            });
        });

        describe(`When getLabel is called...`, () => {
            test(`should return the label`, () => {
                const plot = new GardenPlot('A');

                expect(plot.getLabel()).toBe('A');
            });
        });

        describe(`When crawlRegion is called...`, () => {
            test(`should set the regionId and call crawlRegion on adjacent plots`, () => {
                const plot = new GardenPlot('A');
                const northPlot = new GardenPlot('A');
                const eastPlot = new GardenPlot('A');
                const southPlot = new GardenPlot('A');
                const westPlot = new GardenPlot('A');
                const region = new Region(1);

                plot.setNorth(northPlot);
                plot.setEast(eastPlot);
                plot.setSouth(southPlot);
                plot.setWest(westPlot);

                plot.crawlRegion(region);

                expect(plot.getRegion()).toBe(region);
                expect(northPlot.getRegion()).toBe(region);
                expect(eastPlot.getRegion()).toBe(region);
                expect(southPlot.getRegion()).toBe(region);
                expect(westPlot.getRegion()).toBe(region);
            });
            
            test(`should not call crawlRegion on adjacent plots if they don't have a matching label`, () => {
                const plot = new GardenPlot('A');
                const northPlot = new GardenPlot('B');
                const eastPlot = new GardenPlot('C');
                const southPlot = new GardenPlot('D');
                const westPlot = new GardenPlot('E');
                const region = new Region(1);

                plot.setNorth(northPlot);
                plot.setEast(eastPlot);
                plot.setSouth(southPlot);
                plot.setWest(westPlot);

                plot.crawlRegion(region);

                expect(plot.getRegion()).toBe(region);
                expect(northPlot.getRegion()).toBeNull();
                expect(eastPlot.getRegion()).toBeNull();
                expect(southPlot.getRegion()).toBeNull();
                expect(westPlot.getRegion()).toBeNull();
            });
        });

        describe(`When calculatePerimeter is called...`, () => {
            test(`should return 3 when two plots that share a label are side by side`, () => {
                const row = [new GardenPlot('A'), new GardenPlot('A')];
                const garden = new Garden();
                garden.addRow(row);
                garden.connectPlots();
                garden.markRegions();
                
                expect(row[0].calculatePerimeter()).toBe(3);
            });

            test(`should return 4 when no adjacent plots share a label`, () => {
                const row = [new GardenPlot('A'), new GardenPlot('B')];
                const garden = new Garden();
                garden.addRow(row);
                garden.connectPlots();
                garden.markRegions();
                
                expect(row[0].calculatePerimeter()).toBe(4);
            });
        });
    });

    describe(`Garden`, () => {
        describe(`Constructor`, () => {
            test(`should initialize correctly`, () => {
                const garden = new Garden();

                expect(garden.plots).toEqual([]);
                expect(garden.regions).toEqual([]);
            });
        });

        describe(`When addRow is called...`, () => {
            test(`should add the row to the plots property`, () => {
                const garden = new Garden();
                const row = [new GardenPlot('A'), new GardenPlot('B')];

                garden.addRow(row);

                expect(garden.plots).toEqual([row]);
            });
        });

        describe(`When addRegion is called...`, () => {
            test(`should add the region to the regions property`, () => {
                const garden = new Garden();
                const region = new Region(1);

                garden.addRegion(region);

                expect(garden.regions).toEqual([region]);
            });
        });

        describe(`When connectPlots is called...`, () => {
            test(`should connect the plots`, () => {
                const garden = new Garden();
                const row1 = [new GardenPlot('A'), new GardenPlot('B')];
                const row2 = [new GardenPlot('C'), new GardenPlot('D')];
                garden.addRow(row1);
                garden.addRow(row2);

                garden.connectPlots();

                expect(row1[0].north).toBeNull();
                expect(row1[0].east).toBe(row1[1]);
                expect(row1[0].south).toBe(row2[0]);
                expect(row1[0].west).toBeNull();

                expect(row1[1].north).toBeNull();
                expect(row1[1].east).toBeNull();
                expect(row1[1].south).toBe(row2[1]);
                expect(row1[1].west).toBe(row1[0]);

                expect(row2[0].north).toBe(row1[0]);
                expect(row2[0].east).toBe(row2[1]);
                expect(row2[0].south).toBeNull();
                expect(row2[0].west).toBeNull();

                expect(row2[1].north).toBe(row1[1]);
                expect(row2[1].east).toBeNull();
                expect(row2[1].south).toBeNull();
                expect(row2[1].west).toBe(row2[0]);
            });
        });

        describe(`When markRegions is called...`, () => {
            test(`should mark the regions`, () => {
                const garden = new Garden();
                const row1 = [new GardenPlot('A'), new GardenPlot('A')];
                const row2 = [new GardenPlot('A'), new GardenPlot('A')];
                garden.addRow(row1);
                garden.addRow(row2);

                garden.connectPlots();
                garden.markRegions();

                expect(row1[0].getRegion().id).toBe(1);
                expect(row1[1].getRegion().id).toBe(1);
                expect(row2[0].getRegion().id).toBe(1);
                expect(row2[1].getRegion().id).toBe(1);

                expect(garden.regions.length).toBe(1);
            });

            test(`should mark the regions`, () => {
                const garden = new Garden();
                const row1 = [new GardenPlot('A'), new GardenPlot('B')];
                const row2 = [new GardenPlot('B'), new GardenPlot('A')];
                garden.addRow(row1);
                garden.addRow(row2);

                garden.connectPlots();
                garden.markRegions();

                expect(row1[0].getRegion().id).toBe(1);
                expect(row1[1].getRegion().id).toBe(2);
                expect(row2[0].getRegion().id).toBe(3);
                expect(row2[1].getRegion().id).toBe(4);

                expect(garden.regions.length).toBe(4);
            });
        });

        describe(`When calculateTotalPriceOfFencing is called...`, () => {
            test(`should return the sum of the prices of the regions`, () => {
                const garden = new Garden();
                const region1 = new Region(1);
                const region2 = new Region(2);
                garden.addRegion(region1);
                garden.addRegion(region2);

                region1.calculatePrice = jest.fn(() => 1);
                region2.calculatePrice = jest.fn(() => 2);

                expect(garden.calculateTotalPriceOfFencing()).toBe(3);
            });
        });
    });

    describe(`Region`, () => {
        describe(`Constructor`, () => {
            test(`should initialize correctly`, () => {
                const region = new Region(1);

                expect(region.id).toBe(1);
                expect(region.plots).toEqual([]);
            });
        });

        describe(`When addPlot is called...`, () => {
            test(`should add the plot to the plots property`, () => {
                const region = new Region(1);
                const plot = new GardenPlot('A');

                region.addPlot(plot);

                expect(region.plots).toEqual([plot]);
            });

            test(`should set the plot's region property`, () => {
                const region = new Region(1);
                const plot = new GardenPlot('A');

                region.addPlot(plot);

                expect(plot.region).toBe(region);
            });
        });

        describe(`When calculateArea is called...`, () => {
            test(`should return the number of plots in the region`, () => {
                const region = new Region(1);
                region.addPlot(new GardenPlot('A'));
                region.addPlot(new GardenPlot('A'));
                region.addPlot(new GardenPlot('A'));

                expect(region.calculateArea()).toBe(3);
            });
        });

        describe(`When calculatePerimeter is called...`, () => {
            test(`should return the sum of the perimeters of the plots in the region`, () => {
                const region = new Region(1);
                const plot1 = new GardenPlot('A');
                const plot2 = new GardenPlot('A');
                const plot3 = new GardenPlot('A');
                region.addPlot(plot1);
                region.addPlot(plot2);
                region.addPlot(plot3);

                plot1.calculatePerimeter = jest.fn(() => 1);
                plot2.calculatePerimeter = jest.fn(() => 2);
                plot3.calculatePerimeter = jest.fn(() => 3);

                expect(region.calculatePerimeter()).toBe(6);
            });
        });

        describe(`When calculatePrice is called...`, () => {
            test(`should return the area multiplied by the perimeter`, () => {
                const region = new Region(1);
                region.calculateArea = jest.fn(() => 3);
                region.calculatePerimeter = jest.fn(() => 4);

                expect(region.calculatePrice()).toBe(12);
            });
        });
    });
});