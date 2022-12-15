const { hasUncaughtExceptionCaptureCallback } = require('process');

class File {
    constructor (name, size) {
        this.name = name;
        this.size = size;
    }
}

class Directory {
    constructor(name, parent) {
        this.name = name;
        this.files = [];
        this.directories = [];
        this.parent = parent;
    }

    calculateSize = () => {
        let size = 0;
        this.files.forEach((file) => {
            size = size + file.size;
        });

        this.directories.forEach((directory) => {
            size = size + directory.calculateSize();
        });

        return size;
    }
}

let root = null;
let currentDirectory = null;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

lineReader.on('line', (line) => {
    if (line.charAt(0) === '$') {
        // This is a command
        if (line.startsWith('$ cd')) {
            const directoryName = line.substring(5);
            // Changing directories, move the current directory
            if (directoryName === '..') {
                currentDirectory = currentDirectory.parent;
            } else {
                if (currentDirectory === null) {
                    currentDirectory = new Directory(directoryName, null);
                } else {
                    const targetDirectory = currentDirectory.directories.find((directory) => {
                        return directory.name === directoryName;
                    });
    
                    if (targetDirectory) {
                        currentDirectory = targetDirectory;
                    } else {
                        throw new Error(`Error: No directory found with name ${directoryName} to cd into`);
                    }
                }
    
                if (root === null) {
                    root = currentDirectory;
                }
            }
        } else if (line.startsWith('$ ls')) {
            // Listing directory, do nothing
        }
    } else if (line.startsWith('dir')) {
        // This is a directory, create a new child directory if one doesn't already exist with the same name
        const directoryName = line.substring(4);
        if (currentDirectory !== null) {
            // Check to see if there's already an existing child directory with this name in the current directory
            const existingChildDirectory = currentDirectory.directories.find((directory) => {
                return directory.name === directoryName;
            });

            if (!existingChildDirectory) {
                currentDirectory.directories.push(new Directory(directoryName, currentDirectory));
            }
        }
    } else {
        // This is a file, create a new file in the current directory
        const parts = line.split(' ');
        
        // Check to see if there's already an existing file with this name in the current directory
        const existingFile = currentDirectory.files.find((file) => {
            return file.name === parts[1];
        });

        if (!existingFile) {
            currentDirectory.files.push(new File(parts[1], Number.parseInt(parts[0], 10)));
        }
    }
}).on('close', () => {
    const TOTAL_DISK_SPACE = 70000000;
    const REQUIRED_DISK_SPACE = 30000000;
    const DISK_SPACE_USED = root.calculateSize();
    const FREE_DISK_SPACE = TOTAL_DISK_SPACE - DISK_SPACE_USED;
    const DISK_SPACE_NEEDED = REQUIRED_DISK_SPACE - FREE_DISK_SPACE;

    console.log(`Root disk space used is ${DISK_SPACE_USED}`);
    console.log(`Free disk space is ${FREE_DISK_SPACE}`);
    console.log(`We need to free up ${DISK_SPACE_NEEDED} disk space`);

    const candidates = [];

    const lteqDiskSpaceNeeded = (directory) => {
        const size = directory.calculateSize();
        if (size >= DISK_SPACE_NEEDED) {
            candidates.push({
                name: directory.name,
                size
            });
        }

        directory.directories.forEach((child) => {
            lteqDiskSpaceNeeded(child);
        });
    }

    lteqDiskSpaceNeeded(root);

    candidates.sort((a, b) => {
        if (a.size < b.size) {
            return -1;
        } else if (a.size > b.size) {
            return 1;
        } else {
            return 0;
        }
    });

    console.log(`The smallest directory we can delete under ${DISK_SPACE_NEEDED} is ${candidates[0].name}, which is ${candidates[0].size}`);
});
