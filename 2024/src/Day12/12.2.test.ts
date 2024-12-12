import { Garden, GardenPlot, Region } from './12.2.logic';
import { describe, expect, test } from '@jest/globals';

describe('Day 12 - Part 2', () => {
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
            test(`should return 4 for the perimeters of a 3x1 region`, () => {
                const plot1 = new GardenPlot('A');
                const plot2 = new GardenPlot('A');
                const plot3 = new GardenPlot('A');
                
                const garden = new Garden();
                garden.addRow([plot1, plot2, plot3]);
                garden.connectPlots();
                garden.markRegions();

                expect(garden.regions[0].calculatePerimeter()).toBe(4);
            });

            test(`should return 8 for the perimeter of a C shaped region`, () => {
                const plot1 = new GardenPlot('A');
                const plot2 = new GardenPlot('A');
                const plot3 = new GardenPlot('A');
                const plot4 = new GardenPlot('A');
                const plot5 = new GardenPlot('B');
                const plot6 = new GardenPlot('B');
                const plot7 = new GardenPlot('A');
                const plot8 = new GardenPlot('A');
                const plot9 = new GardenPlot('A');
                
                const garden = new Garden();
                garden.addRow([plot1, plot2, plot3]);
                garden.addRow([plot4, plot5, plot6]);
                garden.addRow([plot7, plot8, plot9]);
                garden.connectPlots();
                garden.markRegions();

                expect(garden.regions[0].calculatePerimeter()).toBe(8);
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