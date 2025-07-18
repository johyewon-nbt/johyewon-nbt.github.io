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

/**
 * SharedWebViewJsInterface.getSdkVersion() (동기 반환) 사용
 * - Android: 바로 String? 반환 (예: "1.0.0" 또는 null)
 * - JS에서 통일 포맷으로 가공: { "sdk_version": "<value>" }
 * - 실패 시: {}
 * - 성공 여부 alert 포함
 */
function getSdkVersion() {
    const platform = getPlatform();
    var isSuccess = false;
    var jsonStr = "{}";

    if (platform === androidPlatform) {
        try {
            var v = window.SharedWeb.getSdkVersion(); // 동기 호출!
            if (v != null && v !== "") {
                jsonStr = JSON.stringify({ sdk_version: String(v) });
                isSuccess = true;
            }
        } catch (e) {
            // 그대로 fail 유지
        }
    } else {
        // iOS 쪽은 아직 명세가 없으므로 messageHandler로 요청 후 기본 실패 처리
        // 필요하면 나중에 iOS 대응 추가
        try {
            // 비동기 구조라면 별도 구현 필요. 지금은 자리표시.
            window.webkit?.messageHandlers?.SharedWeb?.postMessage({
                command: "getSdkVersion"
            });
        } catch (_) {}
    }

    alert("getSdkVersion success=" + isSuccess + " / result=" + jsonStr);
    return jsonStr; // 호출자에서 원하면 JSON.parse 해서 사용
}

// 기존 코드 스타일: window.* 에 바인딩
window.getSdkVersion = getSdkVersion;

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

function showConfirm(message, positiveText, positiveCallback, negativeText, negativeCallback) {
    const platform = getPlatform();
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
