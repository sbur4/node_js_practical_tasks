class PrintResultService {
    printToLog(process) {
        console.clear();

        const timeNow = new Date().toLocaleString();
        console.log(`[${timeNow}] ${process}`);
    }
}

module.exports = PrintResultService;