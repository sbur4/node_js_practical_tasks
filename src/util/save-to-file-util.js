const FS = require('fs');
const SaveToFileError = require('../exception/save-to-file-exception');

class SaveToFileUtil {
    saveToFile(buffer, callback) {
        if (!buffer) {
            console.error('Buffer is null or undefined. Unable to save to file.');
            return;
        }

        FS.appendFile('activityMonitor.log', buffer, (err) => {
            if (err) {
                console.error('Error saving to file:', err);
                if (callback) {
                    callback(err);
                } else {
                    throw new SaveToFileError(`Can't save to file: ${err}`);
                }
            } else {
                buffer = null;

                if (callback) {
                    callback(null);
                }
            }
        });
    }
}

module.exports = SaveToFileUtil;