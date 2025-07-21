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

function open(uriString) {
    const platform = getPlatform();
    if (platform == androidPlatform) {
        SharedWeb.open(uriString);
    } else {
        iOSPostMessageHandler("open", uriString);
    }
}

function openExternal(uriString, options) {
    const platform = getPlatform();
    if (platform == androidPlatform) {
        SharedWeb.openExternal(uriString, options);
    } else {
        iOSPostMessageHandler("openExternal", { uriString: uriString, options: options });
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

function getBirthYear() {
    const platform = getPlatform();
    if (platform == androidPlatform) {
        var birthYear = window.SharedWeb.getBirthYear();
        alert("birthYear = " + birthYear);
    } else {
        var birthYear = iOSPostMessageHandler("getBirthYear");
        alert("birthYear = " + birthYear);
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
    const platform = getPlatform();
    if (platform == androidPlatform) {
        var adId = window.SharedWeb.getAdvertisingId();
        alert("advertising id = " + adId);
    } else {
        var adId = iOSPostMessageHandler("getAdvertisingId");
        alert("advertising id = " + adId);
    }
}

function getSdkVersion() {
    const platform = getPlatform();
    var isSuccess = false;
    var jsonStr = "{}";

    if (platform === androidPlatform) {
        try {
            var v = window.SharedWeb.getSdkVersion();
            if (v != null && v !== "") {
                jsonStr = JSON.stringify({ sdk_version: String(v) });
                isSuccess = true;
            }
        } catch (e) {
        }
    } else {
        try {
            window.webkit?.messageHandlers?.SharedWeb?.postMessage({
                command: "getSdkVersion"
            });
        } catch (_) {}
    }

    alert("getSdkVersion success=" + isSuccess + " / result=" + jsonStr);
    return jsonStr;
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

function showAlert(message, callback) {
    const platform = getPlatform();
    if (platform == androidPlatform) {
        if (callback) {
            SharedWeb.showAlert(message, callback);
        } else {
            SharedWeb.showAlert(message);
        }
    } else {
        const payload = {
            command: "showAlert",
            message: message,
        };
        if (callback) {
            payload.callback = callback;
        }
        window.webkit.messageHandlers.SharedWeb.postMessage(payload);
    }
}

function showConfirm(message, positiveText, negativeText) {
    const platform = getPlatform();
    const positiveCallback = "onConfirm";
    const negativeCallback = "onCancel";
    if (platform == androidPlatform) {
        SharedWeb.showConfirm(message, positiveText, positiveCallback, negativeText, negativeCallback);
    } else {
        window.webkit.messageHandlers.SharedWeb.postMessage({
            command: "showConfirm",
            message: message,
            positiveText: positiveText,
            positiveCallback: positiveCallback,
            negativeText: negativeText,
            negativeCallback: negativeCallback
        });
    }
}

function onConfirm() {
    alert("확인 누름");
}

function onCancel() {
    alert("취소 누름");
}

function copyToClipboard(text) {
    const platform = getPlatform();
    if (platform == androidPlatform) {
        SharedWeb.copyToClipboard(text);
    } else {
        iOSPostMessageHandler("copyToClipboard", text);
    }
}

function iOSPostMessageHandler(command, data) {
    const payload = { command: command };
    if (data !== undefined) {
        payload.data = data;
    }
    webkit.messageHandlers.SharedWeb.postMessage(payload);
}
