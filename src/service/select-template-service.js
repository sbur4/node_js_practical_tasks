class SelectTemplateService {
    constructor(platform, osOutputTemplate) {
        this.platform = platform;
        this.osOutputTemplate = osOutputTemplate;
    }

    getTemplate() {
        switch (this.platform) {
            case 'linux':
                return this.osOutputTemplate.getLinuxOutputTemplate();
            case 'darwin':
                return this.osOutputTemplate.getMacOutputTemplate();
            case 'win32':
                return this.osOutputTemplate.getWindowsOutputTemplate();
            default:
                console.error(`Unsupported platform: ${this.platform}`);
                return '';
        }
    }
}

module.exports = SelectTemplateService;