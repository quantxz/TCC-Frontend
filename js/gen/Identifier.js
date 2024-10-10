"use strict";
var Identifier = /** @class */ (function () {
    function Identifier() {
        this.imageExtensionsList = [
            "jpg", "gif", "png", "svg", "webp", "raw", "tiff", "bmp", "pdf", "jpeg",
            "heif", "heic", "indd", "ai", "psd", "eps", "dng", "cr2", "nef", "orf", "sr2",
            "aviff", "avif", "jfif"
        ];
    }
    Identifier.prototype.StartWith = function (url) {
        return url.startsWith("https://") || url.startsWith("http://");
    };
    Identifier.prototype.EndWith = function (url) {
        var extension = this.ReadExtension(url);
        for (var _i = 0, _a = this.imageExtensionsList; _i < _a.length; _i++) {
            var extensionT = _a[_i];
            if (extension.includes(extensionT)) {
                return true;
            }
        }
        return false;
    };
    Identifier.prototype.ReadExtension = function (url) {
        var originalName = url.toLowerCase();
        var extension = originalName.split(".");
        return extension[extension.length - 1];
    };
    Identifier.prototype.Identifier = function (url) {
        var startWith = this.StartWith(url);
        var endsWith = this.EndWith(url);
        if (startWith && endsWith) {
            return {
                type: "link",
                image: "yes"
            };
        }
        else if (startWith && !endsWith) {
            return {
                type: "link",
                image: "no"
            };
        }
        else if (!startWith && !endsWith) {
            return {
                type: "text",
                image: "no"
            };
        }
        else {
            return {
                type: "text",
                image: "no"
            };
        }
    };
    return Identifier;
}());
