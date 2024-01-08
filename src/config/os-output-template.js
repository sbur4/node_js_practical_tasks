class OsOutputTemplate {
    constructor() {
        this.linux = 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
        this.darwin = 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
        this.win32 = 'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, '
            + 'WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"';
    }

    getLinuxOutputTemplate() {
        return this.linux;
    }

    getMacOutputTemplate() {
        return this.darwin;
    }

    getWindowsOutputTemplate() {
        return this.win32;
    }
}

module.exports = OsOutputTemplate;