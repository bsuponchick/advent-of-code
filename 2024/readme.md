# Setting Up
Ensure you install all node modules using Yarn or NPM

# Handling Input
Each day's problems will have a specified input, which can be loaded via the input.txt file in that day's directory.

The template uses the readline and fs libraries to create an input stream from that file. It also provides a parseLine function which is used to parse a single line of input. Add custom handling logic to the parseLine function after creating a new problem using the template.

# Running a Script
This project uses ts-node to execute TypeScript commands directly from the command line.  To run a specific file via node, use the following command:

`npx ts-node <Filename> <args>`

For example, to execute Day 1 problem 1, navigate to the Day1 directory and execute:

`npx ts-node 1.1`

This will result in problem 1 being executed.  

# Testing
Testing can be done via Jest.  In addition, the ability to pass test data to the execute function can be done using the --test argument.  Doing so will load data from test.txt instead of input.txt.

All tests can be run using the command:

`yarn run test`

A single test file can be run using the command: 

`npx yarn <<filename>>`

For example, to execute the tests for Day 1 Problem 1, use the command:

`npx jest 1.1.test`