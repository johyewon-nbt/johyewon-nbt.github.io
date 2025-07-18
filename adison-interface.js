var androidPlatform = "android";
var iOSPlatform = "ios";

function getPlatform() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("android")) {
        return androidPlatform;
    } else if (
        userAgent.includes("iphone") ||
        userAgent.includes("ipad") ||
        userAgent.includes("ipod")
    ) {
        return iOSPlatform;
    }
}

function close() {
    const platform = getPlatform();
    if (platform == androidPlatform) {
        SharedWeb.close();
    } else {
        iOSPostMessageHandler("close");
    }
}

function perform(uriString) {
    const platform = getPlatform();
    if (platform == androidPlatform) {
        SharedWeb.perform(uriString);
    } else {
        iOSPostMessageHandler("perform", uriString);
    }
}

function open(uriString, options) {
    const platform = getPlatform();
    if (platform == androidPlatform) {
        SharedWeb.open(uriString, options);
    } else {
        iOSPostMessageHandler("open", uriString, options);
    }
}

function openExternal(uriString, options) {
    const platform = getPlatform();
    if (platform == androidPlatform) {
        SharedWeb.openExternal(uriString, options);
    } else {
        iOSPostMessageHandler("openExternal", uriString, options);
    }
}


function getUid() {
    const platform = getPlatform();
    if (platform == androidPlatform) {
        var uid = window.SharedWeb.getUid();
        alert("uid = " + uid);
    } else {
        var uid = iOSPostMessageHandler("getUid");
        alert("uid = " + uid);
    }
}

function getGender() {
    const platform = getPlatform();
    if (platform == androidPlatform) {
        var gender = window.SharedWeb.getGender();
        alert("gender = " + gender);
    } else {
        var uid = iOSPostMessageHandler("getGender");
        alert("gender = " + gender);
    }
}

function getAdvertisingId() {
    var _this = this;
    var rand_1 = "asyncJava_" + Math.floor(Math.random() * 1000000);
    window[rand_1] = {};
    // func called from android
    window[rand_1].callback = function (isSuccess, result) {
        console.log("rand", rand_1, isSuccess, result);
        if (isSuccess) window[rand_1].resolve(result);
        else window[rand_1].reject(result);
        delete window[rand_1]; // clean up
    };

    const platform = getPlatform();
    if (platform == androidPlatform) {
        window.SharedWeb.getAdvertisingId(rand_1);
    } else {
        iOSPostMessageHandler("getAdvertisingId", rand_1);
    }

    return new Promise(function (resolve, reject) {
        window[rand_1].resolve = function (data) {
            resolve(data);
        };
        window[rand_1].reject = function (err) {
            return reject(err);
        };
    });
}


function getSdkVersion() {
    var _this = this;
    var rand_1 = "asyncJava_" + Math.floor(Math.random() * 1000000);
    window[rand_1] = {};
    // func called from android
    window[rand_1].callback = function (isSuccess, result) {
        console.log("rand", rand_1, isSuccess, result);
        if (isSuccess) window[rand_1].resolve(result);
        else window[rand_1].reject(result);
        delete window[rand_1]; // clean up
    };

    const platform = getPlatform();
    if (platform == androidPlatform) {
        window.SharedWeb.getSdkVersion(rand_1);
    } else {
        iOSPostMessageHandler("getSdkVersion", rand_1);
    }

    return new Promise(function (resolve, reject) {
        window[rand_1].resolve = function (data) {
            resolve(data);
        };
        window[rand_1].reject = function (err) {
            return reject(err);
        };
    });
}


function setTitle(title) {
    const platform = getPlatform();
    if (platform == androidPlatform) {
        SharedWeb.setTitle(title);
    } else {
        window.webkit.messageHandlers.SharedWeb.postMessage({
            command: "setTitle",
            title: "",
        });
    }
}

function showAlert(message) {
    const platform = getPlatform();
    if (platform == androidPlatform) {
        SharedWeb.showAlert(message);
    } else {
        window.webkit.messageHandlers.SharedWeb.postMessage({
            command: "showAlert",
            message: message,
        });
    }
}

function showAlert(message, callback) {
    const platform = getPlatform();
    if (platform == androidPlatform) {
        SharedWeb.showAlert(message, callback);
    } else {
        window.webkit.messageHandlers.SharedWeb.postMessage({
            command: "showAlert",
            message: message,
            callback: callback,
        });
    }
}

function showConfirm(message, options) {
    const platform = getPlatform();
    if (platform == androidPlatform) {
        SharedWeb.showConfirm(message, options);
    } else {
        window.webkit.messageHandlers.SharedWeb.postMessage({
            command: "showConfirm",
            message: message,
        });
    }
}

function copyToClipboard(text) {
    const platform = getPlatform();
    if (platform == androidPlatform) {
        SharedWeb.copyToClipboard(text);
    } else {
        iOSPostMessageHandler("copyToClipboard");
    }
}

function iOSPostMessageHandler(command, callback) {
    webkit.messageHandlers.SharedWeb.postMessage({
        command: command,
        callback: callback,
    });
}
