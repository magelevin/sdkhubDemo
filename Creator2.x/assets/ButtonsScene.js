
var conf = require('Configs');
if (CC_EDITOR) {
  if (!Editor.CocosService_sdkhubDemo) {
    Editor.CocosService_sdkhubDemo = true;
    Editor.log(Editor.lang === "zh"
      ? "欢迎使用 SDKHub 服务！"
      : "Welcome to SDKHub service!");
    Editor.log(Editor.lang === "zh"
      ? "这是一个简单的 SDKHub 示例 Demo，通过本示例您可以快速了解如何使用 SDKHub 来接入原生第三方 SDK！"
      : "This is a simple SDKHub sample demo. You can learn how to use SDKHub to intergrate third SDKs !"
    );
  }
}

cc.Class({
  extends: cc.Component,

  properties: {
    scrollView: {
      default: null,
      type: cc.ScrollView
    },
    prefabButton: {
      default: null,
      type: cc.Prefab,
    },
    nodeToast: {
      default: null,
      type: cc.Node,
    },
    lblCallback: {
      default: null,
      type: cc.Label,
    },

    toastTimeCount: 0,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.nodeToast.active = false;
    this.scrollView.scrollToTop(0.1);
    this.toastTimeCount = 0;

    //Save a Image for Archive Function.
    if (!jsb.fileUtils.isFileExist(jsb.fileUtils.getWritablePath() + 'archiveIcon.png'))
    {
      var data = jsb.fileUtils.getDataFromFile(cc.url.raw("resources/rect1.png"));
      var filePath = jsb.fileUtils.getWritablePath() + 'archiveIcon.png';
      console.log(jsb.fileUtils.writeDataToFile(data, filePath));
    }

    this.topConfig = conf.top;

    if (sdkhub.getSupportPluginIds().indexOf("User") != -1) {
      this.topConfig.push("Account & Game");
      sdkhub.getUserPlugin().setListener(this.onUserResult, this);
    }
    if (sdkhub.getSupportPluginIds().indexOf("Fee") != -1) {
      this.topConfig.push("IAP");
      sdkhub.getFeePlugin().setListener(this.onFeeResult, this);
    }
    if (sdkhub.getSupportPluginIds().indexOf("Ads") != -1) {
      this.topConfig.push("Ads");
      sdkhub.getAdsPlugin().setListener(this.onAdsResult, this);
    }
    if (sdkhub.getSupportPluginIds().indexOf("Push") != -1) {
      this.topConfig.push("Push");
      sdkhub.getPushPlugin().setListener(this.onPushResult, this);
    }
    if (sdkhub.getSupportPluginIds().indexOf("Custom") != -1) {
      this.topConfig.push("Custom");
      sdkhub.getCustomPlugin().setListener(this.onCustomResult, this);
    }
    this.setButtons(this.topConfig);
  },

  update(dt) {
    if (this.toastTimeCount > 0) {
      this.toastTimeCount -= dt;
    }
    else {
      this.nodeToast.active = false;
    }
  },

  setButtons(menu) {
    this.scrollView.content.removeAllChildren(true);
    for (let index = 2; index < menu.length; ++index) {
      let buttonItem = cc.instantiate(this.prefabButton);
      buttonItem.name = menu[index];
      this.scrollView.content.addChild(buttonItem);
      buttonItem.y = - (buttonItem.height / 2) + ((index - 2) * - buttonItem.height);
      buttonItem.getComponent(this.prefabButton.name).setContent(menu[0], menu[1], menu[index], this.topConfig);
    }
    this.scrollView.content.height = (menu.length - 2) * this.prefabButton.data.height;
  },

  isJSON(str) {
    if (typeof str == 'string') {
      try {
        var obj = JSON.parse(str);
        if (typeof obj == 'object' && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
  },

  showToast(code, msg) {
    var ret = "code = " + code + ",\n\n";
    if (this.isJSON(msg)) {
      var jsonObj = JSON.parse(msg);
      if (jsonObj["type"]) {
        ret += "type = " + jsonObj["type"] + ",\n\n";
        delete jsonObj["type"];
      }
      if (jsonObj["rtnCode"]) {
        ret += "rtnCode = " + jsonObj["rtnCode"] + ",\n\n";
        delete jsonObj["rtnCode"];
      }
      if (jsonObj["msg"]) {
        ret += "msg = " + jsonObj["msg"] + ",\n\n";
        delete jsonObj["msg"];
      }
      var otherParams = JSON.stringify(jsonObj);
      if (otherParams.length >= 103) {
        otherParams = otherParams.slice(0, 100) + "...";
      }
      ret += "otherParams = " + otherParams;
    }
    else {
      if (msg.length >= 103) {
        msg = msg.slice(0, 100) + "...";
      }
      ret += "msg = " + msg;
    }
    this.lblCallback.string = ret;
    this.nodeToast.active = true;
    this.toastTimeCount = 3;
  },

  onUserResult: function (code, msg) {
    console.log("on user result action.");
    console.log("code: " + code);
    console.log("msg: " + msg);
    this.showToast(code, msg);
    switch (code) {
      case sdkhub.UserResultCode.kLoginSucceed:
        console.log("kLoginSucceed", msg);
        break;
    }
  },

  onFeeResult: function (code, msg) {
    console.log("on fee result action.");
    console.log("code: " + code);
    console.log("msg: " + msg);
    this.showToast(code, msg);
    switch (code) {
      // Process the "consumeOwnedPurchase" method logic, temp storage the payment receipt.
      // pay succeed
      case sdkhub.FeeResultCode.kFeeSucceed:
        conf.paymentReceipt.unshift(JSON.parse(msg));
        console.log("kFeeSucceed", conf.paymentReceipt);
        break;
      // obtainOwnedPurchases succeed
      case sdkhub.FeeResultCode.kFeeExtension + 106:
        // Recommended to check the Plugin ID when using extended callbacks
        if (sdkhub.getFeePlugin().getPluginId() == "FeeHuawei"){
          conf.paymentReceipt = JSON.parse(msg);
          console.log("obtainOwnedPurchases", JSON.stringify(conf.paymentReceipt));
        }
        break;
    }
  },

  onAdsResult: function (code, msg) {
    console.log("on ads result action.");
    console.log("code: " + code);
    console.log("msg: " + msg);
    this.showToast(code, msg);
    switch (code) {
      case sdkhub.AdsResultCode.kAdsShown:
        console.log("kAdsShown", msg);
        break;
    }
  },

  onPushResult: function (code, msg) {
    console.log("on push result action.");
    console.log("code: " + code);
    console.log("msg: " + msg);
    this.showToast(code, msg);
    switch (code) {
      case sdkhub.PushResultCode.kStartPushSucceed:
        console.log("kStartPushSucceed", msg);
        break;
    }
  },

  onCustomResult: function (code, msg) {
    console.log("on custom result action.");
    console.log("code: " + code);
    console.log("msg: " + msg);
    this.showToast(code, msg);
    switch (code) {
      case 10000:
        console.log("onCustomResult, Extension", msg);
        break;
    }
  },
});
