export class Helper {
    
    constructor(fs) {
        this.fs = fs;
    }

    readFile (callback, returnJson = false, filePath, encoding = 'utf8') {
        this.fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }
            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    writeFile (fileData, callback, filePath, encoding = 'utf8') {
        this.fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }
            callback();
        });
    };

}