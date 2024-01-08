const SaveToFileUtil = require("../util/save-to-file-util");

class SaveResultService {
    constructor() {
        this.saveToFileUtil = new SaveToFileUtil();
        this.buffer = null;
        this.intervalId = null;
    }

    startSaving(process) {
        this.intervalId = setInterval(() => {
            const timeNow = new Date().toLocaleString();
            const newChunk = Buffer.from(`${timeNow} : ${process}`);

            this.buffer = this.buffer
                ? Buffer.concat([this.buffer, newChunk])
                : newChunk;

            this.saveToFileUtil.saveToFile(this.buffer);
        }, 200);
    }

    stopSaving() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

module.exports = SaveResultService;