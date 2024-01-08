const OS = require('os');
const {exec} = require('child_process');
const EventEmitter = require('events');
const OsOutputTemplate = require("../config/os-output-template");
const SelectTemplateService = require("../service/select-template-service");
const PrintResultService = require("../service/print-result-service");
const SaveResult = require("../service/save-result-service");

const platform = OS.platform();
const osOutputTemplate = new OsOutputTemplate();
const selectTemplateService = new SelectTemplateService(platform, osOutputTemplate);

const eventEmitter = new EventEmitter();
const saveResultService = new SaveResult();
const printResultService = new PrintResultService();

const observeActiveProcess = () => {
    new Promise((resolve, reject) => {
        exec(selectTemplateService.getTemplate(), {encoding: 'utf-8'}, (err, stdout) => {
            if (err) {
                console.error(err)
                reject(err)
            }
            resolve(stdout)
        })
    })
        .then((process) => {
            eventEmitter.emit('processRetrieved', process)
            console.log('Process retrieved:', process);
        })
        .catch((err) => {
            console.error('Error observing active process:', err.message);
        })
}

eventEmitter.on('processRetrieved', (process) => {
    printResultService.printToLog(process)

    saveResultService.startSaving(process);
    setTimeout(() => {
        saveResultService.stopSaving();
    }, 1000);
})

setInterval(observeActiveProcess, 100) // time refresh

module.exports = {observeActiveProcess};