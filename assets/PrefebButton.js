
var conf = require('Configs');

cc.Class({
    extends: cc.Component,

    properties: {
        lblButton: {
            default: null,
            type: cc.Label,
        },
        btnButton: {
            default: null,
            type: cc.Button,
        },
        parentname: null, // 上一个节点名称
        currentname: null, // 当前节点名称
    },

    start() {
        this.btnButton.node.on('touchend', this.buttonPressed.bind(this));
        this.btnScene = cc.find("Canvas").getComponent("ButtonsScene");
    },

    buttonPressed() {
        console.log(this.currentname, this.lblButton.string + " button pressed");

        if (this.parentname == "top" && this.lblButton.string == "return") {
            this.btnScene.setButtons(this.topConfig);
            return;
        }
        else if (this.parentname == "user" && this.lblButton.string == "return") {
            this.btnScene.setButtons(conf.user);
            return;
        }
        else if (this.currentname == "top") {
            if (this.lblButton.string == "Account & Game") {
                this.btnScene.setButtons(conf.user);
            }
            else if (this.lblButton.string == "IAP") {
                this.btnScene.setButtons(conf.fee);
            }
            else if (this.lblButton.string == "Ads") {
                this.btnScene.setButtons(conf.ads);
            }
            else if (this.lblButton.string == "Custom") {
                this.btnScene.setButtons(conf.custom);
            }
            return;
        }
        //处理三级菜单
        else if (this.currentname == "user") {
            if (this.lblButton.string == "showAchievements") {
                this.btnScene.setButtons(conf.showAchievements);
                return;
            }
            else if (this.lblButton.string == "unlockAchievement") {
                this.btnScene.setButtons(conf.unlockAchievement);
                return;
            }
            else if (this.lblButton.string == "submitScore") {
                this.btnScene.setButtons(conf.submitScore);
                return;
            }
            else if (this.lblButton.string == "showLeaderBoard") {
                this.btnScene.setButtons(conf.showLeaderBoard);
                return;
            }
        }
        // User System
        if (this.currentname == "user") {
            for (var i = conf.INIT_METHOD; i < conf.user.length; i++) {
                if (this.lblButton.string == conf.user[i]) {
                    switch (i) {
                        case conf.INIT_METHOD:
                            //login
                            this.user.login();
                            break;
                        case conf.INIT_METHOD + 1:
                            //logout
                            this.user.logout();
                            break;
                        case conf.INIT_METHOD + 2:
                            //showToolBar
                            this.user.showToolBar(1);
                            break;
                        case conf.INIT_METHOD + 3:
                            //hideToolBar
                            this.user.hideToolBar();
                            break;
                        case conf.INIT_METHOD + 4:
                            //cancelAuthorization
                            this.user.callFuncWithParam("cancelAuthorization");
                            break;
                        case conf.INIT_METHOD + 5:
                            //getUserInfo
                            var userInfo = this.user.getUserInfo();
                            console.log("userInfo", JSON.stringify(userInfo));
                            break;
                        case conf.INIT_METHOD + 10:
                            //submitEvent
                            var params = {
                                "eventId": "A29DB82609936BE9DBB44CF7AFBBAECD5D2B7F14A05FB2B37EF543E7622F7B7F",
                                "growAmount": "20"
                            };
                            this.user.callFuncWithParam("submitEvent", params);
                            break;
                        case conf.INIT_METHOD + 11:
                            //getEvent
                            //eventIds
                            //forceLoad
                            var params = {};
                            this.user.callFuncWithParam("getEvent", params);
                            break;
                        case conf.INIT_METHOD + 12:
                            //submitPlayerEventStart
                            this.user.callFuncWithParam("submitPlayerEventStart");
                            break;
                        case conf.INIT_METHOD + 13:
                            //getPlayerExtraInfo
                            this.user.callFuncWithParam("getPlayerExtraInfo");
                            break;
                        case conf.INIT_METHOD + 14:
                            //submitPlayerEventEnd
                            this.user.callFuncWithParam("submitPlayerEventEnd");
                            break;
                        case conf.INIT_METHOD + 15:
                            //getGamePlayerStats
                            var params = 0;
                            this.user.callFuncWithParam("getGamePlayerStats", params);
                            break;
                        case conf.INIT_METHOD + 16:
                            //getGameSummary
                            var params = 0;
                            this.user.callFuncWithParam("getGameSummary", params);
                            break;
                        default:
                            console.log("user function: '" + this.lblButton.string + "' not called");
                    }
                }
            }
        }
        else if (this.currentname == "fee") {
            for (var i = conf.INIT_METHOD; i < conf.fee.length; i++) {
                if (this.lblButton.string == conf.fee[i]) {
                    switch (i) {
                        case conf.INIT_METHOD:
                            //feeForProduct
                            var params = {
                                //HMS 按商品 ID 配置支付所需参数
                                "Product_Id": "com.sdkboxv2.sample.item3", // 商品ID, 必传
                                "EXT": "test", //透传参数，可为空

                                //HMS 按价格支付所需参数
                                "payType": "1", //0: 按价格支付 1: 按商品配置支付，默认为1，若传 0 则需要以下参数
                                    //必传参数
                                "Product_Name": "10元宝", //商品名称，必传
                                "Product_Price": "0.02",  //商品价格，float 必传
                                "Product_Count": "2",  //商品数量，int 必传，最终支付价格 = 商品价格 x 商品数量 取两位小数
                                    //可选参数，不传则取默认值
                                "priceType": "0", // 0: consumable; 1: non-consumable; 默认为 "0"
                                "serviceCatalog": "X6", //游戏设置为"X6"，应用设置为"X5"，默认为 "X6"
                                "currency": "CNY", //货币，默认 "CNY"
                                "country": "CN", //国家或地区，默认 "CN"

                                //其他支付可能所需参数
                                "Product_Desc": "gold",
                                "Coin_Name": "元宝",
                                "Coin_Rate": "10",
                                "Role_Id": "123456",
                                "Role_Name": "test",
                                "Role_Grade": "1",
                                "Role_Balance": "1",
                                "Vip_Level": "1",
                                "Party_Name": "test",
                                "Server_Id": "1",
                                "Server_Name": "test",
                            }
                            this.fee.feeForProduct(params);
                            break;
                        case conf.INIT_METHOD + 1:
                            //isEnvReady
                            this.fee.callFuncWithParam("isEnvReady");
                            break;
                        case conf.INIT_METHOD + 2:
                            //obtainProductInfo
                            var params = {
                                "productIdList": "com.sdkboxv2.sample.huawei.item1,com.sdkboxv2.sample.item3",
                                "priceType": 0
                            };
                            this.fee.callFuncWithParam("obtainProductInfo", params);
                            break;
                        case conf.INIT_METHOD + 3:
                            //consumeOwnedPurchase
                            console.log("consumeOwnedPurchase, called after feeForProduct")
                            params = "{\"autoRenewing\":false,\"orderId\":\"202006231714212348205ba9f1.102164071\",\"packageName\":\"com.sdkboxv2.sample.huawei\",\"applicationId\":102164071,\"kind\":0,\"productId\":\"2\",\"productName\":\"10元宝\",\"purchaseTime\":1592921796000,\"purchaseTimeMillis\":1592921796000,\"purchaseState\":0,\"developerPayload\":\"test\",\"purchaseToken\":\"00000172e189b07b496ba512cbccfd7f28c03bac99018e984ac700fcac55591cd9da2631508eacbdx434e.1.102164071\",\"consumptionState\":0,\"confirmed\":0,\"purchaseType\":0,\"currency\":\"CNY\",\"price\":1,\"country\":\"CN\",\"payOrderId\":\"sandbox2020062310163668593BBDD\",\"payType\":\"4\"}";
                            this.fee.callFuncWithParam("consumeOwnedPurchase", params);
                            break;
                        case conf.INIT_METHOD + 4:
                            //obtainOwnedPurchases
                            var params = 0;
                            this.fee.callFuncWithParam("obtainOwnedPurchases", params);
                            break;
                        case conf.INIT_METHOD + 5:
                            //obtainOwnedPurchaseRecord
                            var params = 0;
                            this.fee.callFuncWithParam("obtainOwnedPurchaseRecord", params);
                            break;
                        case conf.INIT_METHOD + 6:
                            //startIapActivity
                            var params = {
                                "reqType": "TYPE_SUBSCRIBE_MANAGER_ACTIVITY"
                            };
                            this.fee.callFuncWithParam("startIapActivity", params);
                            break;

                        default:
                            console.log("fee function: '" + this.lblButton.string + "' not called");
                    }
                }
            }
        }
        else if (this.currentname == "ads") {
            for (var i = conf.INIT_METHOD; i < conf.ads.length; i++) {
                if (this.lblButton.string == conf.ads[i]) {
                    switch (i) {
                        case conf.INIT_METHOD:
                            //showBannerAd
                            var params = { "adType": "Banner", "adId": "testw6vs28auh3", "pos": "0", "adSize": "BANNER_SIZE_360_144" };
                            console.log("showBannerAd");
                            this.ads.showAds(params);
                            break;
                        case conf.INIT_METHOD + 1:
                            //preloadRewardAd
                            var params = { "adType": "Reward", "adId": "testx9dtjwj8hp" };
                            this.ads.preloadAds(params);
                            break;
                        case conf.INIT_METHOD + 2:
                            //showRewardAd
                            var params = { "adType": "Reward", "adId": "testx9dtjwj8hp" };
                            this.ads.showAds(params);
                            break;
                        case conf.INIT_METHOD + 3:
                            //preloadInterstitialAd
                            var params = { "adType": "Interstitial", "adId": "testb4znbuh3n2" };
                            this.ads.preloadAds(params);
                            break;
                        case conf.INIT_METHOD + 4:
                            //showInterstitialAd
                            var params = { "adType": "Interstitial", "adId": "testb4znbuh3n2" };
                            this.ads.showAds(params);
                            break;
                        default:
                            console.log("ads function: '" + this.lblButton.string + "' not called");
                    }
                }
            }
        }
        else if (this.currentname == "custom") {
            for (var i = conf.INIT_METHOD; i < conf.custom.length; i++) {
                if (this.lblButton.string == conf.custom[i]) {
                    switch (i) {
                        case conf.INIT_METHOD:
                            //custom1
                            break;
                        case conf.INIT_METHOD + 1:
                            //custom2
                            break;
                        case conf.INIT_METHOD + 2:
                            //custom3
                            break;
                        case conf.INIT_METHOD + 3:
                            //custom4
                            break;
                        case conf.INIT_METHOD + 4:
                            //custom5
                            break;
                        case conf.INIT_METHOD + 5:
                            //custom6
                            break;
                        case conf.INIT_METHOD + 6:
                            //custom7
                            break;
                        case conf.INIT_METHOD + 7:
                            //custom8
                            console.log("custom8 invoked");
                            break;
                        default:
                            console.log("custom function: '" + this.lblButton.string + "' not called");
                    }
                }
            }
        }
        else if (this.currentname == "showAchievements") {
            for (var i = conf.INIT_METHOD; i < conf.showAchievements.length; i++) {
                if (this.lblButton.string == conf.showAchievements[i]) {
                    switch (i) {
                        case conf.INIT_METHOD:

                            var params = {
                                "type": "getShowAchievementListIntent"
                            };
                            this.user.callFuncWithParam("showAchievements", params);

                            break;
                        case conf.INIT_METHOD + 1:
                            //getAchievementList
                            var params = {
                                "type": "getAchievementList",
                                "forceReload": "1"
                            };
                            this.user.callFuncWithParam("showAchievements", params);
                            break;
                        default:
                            console.log("showAchievements function: '" + this.lblButton.string + "' not called");
                    }
                }
            }
        }
        else if (this.currentname == "unlockAchievement") {
            for (var i = conf.INIT_METHOD; i < conf.unlockAchievement.length; i++) {
                if (this.lblButton.string == conf.unlockAchievement[i]) {
                    switch (i) {
                        case conf.INIT_METHOD:
                            //visualizeWithResult
                            var params = {
                                "type": "visualizeWithResult",
                                "achievementId": "5D9580837D32CB59CFEC89DAD39470CDF9B672033A2D6F14689BC01335818444"
                            };
                            this.user.unlockAchievement(params);
                            break;
                        case conf.INIT_METHOD + 1:
                            //growWithResult
                            var params = {
                                "type": "growWithResult",
                                "achievementId": "5D9580837D32CB59CFEC89DAD39470CDF9B672033A2D6F14689BC01335818444",
                                "stepsNum": "3"
                            };
                            this.user.unlockAchievement(params);
                            break;
                        case conf.INIT_METHOD + 2:
                            //makeStepsWithResult
                            var params = {
                                "type": "makeStepsWithResult",
                                "achievementId": "5D9580837D32CB59CFEC89DAD39470CDF9B672033A2D6F14689BC01335818444",
                                "stepsNum": "3"
                            };
                            this.user.unlockAchievement(params);
                            break;
                        case conf.INIT_METHOD + 3:
                            //reachWithResult
                            var params = {
                                "type": "reachWithResult",
                                "achievementId": "5D9580837D32CB59CFEC89DAD39470CDF9B672033A2D6F14689BC01335818444"
                            };
                            this.user.unlockAchievement(params);
                            break;
                        default:
                            console.log("unlockAchievement function: '" + this.lblButton.string + "' not called");
                    }
                }
            }
        }
        else if (this.currentname == "submitScore") {
            for (var i = conf.INIT_METHOD; i < conf.submitScore.length; i++) {
                if (this.lblButton.string == conf.submitScore[i]) {
                    switch (i) {
                        case conf.INIT_METHOD:
                            //getRankingSwitchStatus
                            var params = {
                                "type": "getRankingSwitchStatus",
                            };
                            this.user.submitScore(params);
                            break;
                        case conf.INIT_METHOD + 1:
                            //setRankingSwitchStatus
                            var params = {
                                "type": "setRankingSwitchStatus",
                                "stateValue": 1
                            };
                            this.user.submitScore(params);
                            break;
                        case conf.INIT_METHOD + 2:
                            //submitRankingScore
                            var params = {
                                "type": "submitRankingScore",
                                "rankingId": "2008EE56BB773FA325FFB1349D0D206A8B0EC3E9E2F0D32E786E574ADD10E7A1",
                                "score": "15000",
                                "scoreTips": "分数",
                                "timeDimension": "1"
                            };
                            this.user.submitScore(params);
                            break;
                        default:
                            console.log("submitScore function: '" + this.lblButton.string + "' not called");
                    }
                }
            }
        }
        else if (this.currentname == "showLeaderBoard") {
            for (var i = conf.INIT_METHOD; i < conf.showLeaderBoard.length; i++) {
                if (this.lblButton.string == conf.showLeaderBoard[i]) {
                    switch (i) {
                        case conf.INIT_METHOD:
                            //getRankingsIntent
                            var params = {
                                "type": "getRankingsIntent",
                            };
                            this.user.showLeaderBoard(params);
                            break;
                        case conf.INIT_METHOD + 1:
                            //getRankingSummary
                            var params = {
                                "type": "getRankingSummary",
                                "rankingId": "2008EE56BB773FA325FFB1349D0D206A8B0EC3E9E2F0D32E786E574ADD10E7A1",
                                "isRealTime": "1"
                            };
                            this.user.showLeaderBoard(params);
                            break;
                        //"getMoreRankingScores", "getRankingTopScores"
                        case conf.INIT_METHOD + 2:
                            //getCurrentPlayerRankingScore
                            var params = {
                                "type": "getCurrentPlayerRankingScore",
                                "rankingId": "2008EE56BB773FA325FFB1349D0D206A8B0EC3E9E2F0D32E786E574ADD10E7A1",
                                "timeDimension": "2"
                            };
                            this.user.showLeaderBoard(params);
                            break;
                        case conf.INIT_METHOD + 3:
                            //getPlayerCenteredRankingScores
                            var params = {
                                "type": "getPlayerCenteredRankingScores",
                                "rankingId": "2008EE56BB773FA325FFB1349D0D206A8B0EC3E9E2F0D32E786E574ADD10E7A1",
                                "timeDimension": "2",
                                "maxResults" : "15",
                                "isRealTime" : "1"
                            };
                            this.user.showLeaderBoard(params);
                            break;
                        case conf.INIT_METHOD + 4:
                            //getMoreRankingScores
                            var params = {
                                "type": "getMoreRankingScores",
                                "rankingId": "2008EE56BB773FA325FFB1349D0D206A8B0EC3E9E2F0D32E786E574ADD10E7A1",
                                "offsetPlayerRank": "1",
                                "maxResults" : "15",
                                "pageDirection": "0",
                                "isRealTime": "1"
                            };
                            this.user.showLeaderBoard(params);
                            break;
                        case conf.INIT_METHOD + 5:
                            //getRankingTopScores
                            var params = {
                                "type": "getRankingTopScores",
                                "rankingId": "2008EE56BB773FA325FFB1349D0D206A8B0EC3E9E2F0D32E786E574ADD10E7A1",
                                "offsetPlayerRank": "1",
                                "maxResults" : "15",
                                "pageDirection": "0",
                                "timeDimension": "2"
                            };
                            this.user.showLeaderBoard(params);
                            break;
                        default:
                            console.log("showLeaderBoard function: '" + this.lblButton.string + "' not called");
                    }
                }
            }
        }
    },

    setContent(current, parent, name, topconfig, user, fee, ads) {
        this.parentname = parent;
        this.currentname = current;
        this.lblButton.string = name;
        this.topConfig = topconfig;
        this.user = user;
        this.fee = fee;
        this.ads = ads;
    }

    // update (dt) {},
});
