class Identifier {
    private readonly imageExtensionsList: string[] = [
        "jpg", "gif", "png", "svg", "webp", "raw", "tiff", "bmp", "pdf", "jpeg",
        "heif", "heic", "indd", "ai", "psd", "eps", "dng", "cr2", "nef", "orf", "sr2",
        "aviff", "avif"
    ];
    
    
    
    StartWith(url: string): boolean {
        return url.startsWith("https://") || url.startsWith("http://") || url.startsWith("C:");
    }
    
    
    EndWith(url: string): boolean {
        const extension = this.ReadExtension(url);
    
        for (let extensionT of this.imageExtensionsList) {
            if (extension.includes(extensionT)) {
                return true;
            }
        }
        return false;
    }

    ReadExtension(url: string) {
        const originalName = url.toLowerCase()
        const extension: string[] = originalName.split(".");

        return extension[extension.length - 1];
    }

    Identifier(url: string) {
        const startWith = this.StartWith(url);
        const endsWith = this.EndWith(url);

        if(startWith && endsWith) {
            return {
                type: "link",
                image: "yes"
            }
        } else if (startWith && !endsWith) {
            return {
                type: "link",
                image: "no"
            }
        } else if (!startWith && !endsWith) {
            return {
                type: "text",
                image: "no"
            }
        } else  {
            return {
                type: "text",
                image: "no"
            }
        }
    }

}