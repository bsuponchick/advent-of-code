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

        console.log(`Size for directory ${this.name} is ${size}`);
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
    const candidates = [];

    const lteq100k = (directory) => {
        const size = directory.calculateSize();
        if (size <= 100000) {
            candidates.push({
                name: directory.name,
                size
            });
        }

        directory.directories.forEach((child) => {
            lteq100k(child);
        });
    }

    lteq100k(root);

    console.log(`Directories smaller than 100k are ${JSON.stringify(candidates)}`);

    const totalFileSize = candidates.reduce((accumulator, currentValue) => accumulator + currentValue.size, 0);
    console.log(`The total size of all files in directories of 100k or smaller is ${totalFileSize}`);
});
