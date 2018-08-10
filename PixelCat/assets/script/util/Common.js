const Log = require("Log")
const ParamConst = require("ParamConst")

var Common = cc.Class({

    statics: {
        //全局音效开关
        canPlayAudioTag : true,

        //新手引导标识
        hasShowGuideTag : false,

        _uploadWXData: function (keyStr, valueData) { //上报到微信服务器：历史最高分
            var kvDataList = new Array();
            kvDataList.push({
                key: keyStr,
                value: "" + valueData
            });
            wx.setUserCloudStorage({
                KVDataList: kvDataList
            })
        },

        getHistoryScore:function () {
            Log.logD("getHistroyScore")
            var result = cc.sys.localStorage.getItem(ParamConst.wxKey);
            if(result == null) {
                Log.logD("The result is null")
                cc.sys.localStorage.setItem(ParamConst.wxKey, 0);
                if(CC_WECHATGAME) {
                    var kvDataList = new Array();
                    kvDataList.push({
                        key: ParamConst.wxKey,
                        value: "0"
                    });
                    wx.setUserCloudStorage({
                        KVDataList: kvDataList,
                        success: function() {
                            Log.logD("reset score success")
                        },
                        fail: function() {
                            Log.logD("reset score fail")
                        }
                    })
                }
                return 0;
            } 
            return result;
        },

        checkScoreAndSave:function (scoreNum) {
            var result = cc.sys.localStorage.getItem(ParamConst.wxKey);
            if(scoreNum > result) {
                cc.sys.localStorage.setItem(ParamConst.wxKey, scoreNum);
                if(CC_WECHATGAME) {
                    var kvDataList = new Array();
                    kvDataList.push({
                        key: ParamConst.wxKey,
                        value: scoreNum+""
                    });
                    wx.setUserCloudStorage({
                        KVDataList: kvDataList,
                        success: function() {
                            Log.logD("reset score success")
                        },
                        fail: function() {
                            Log.logD("reset score fail")
                        }
                    })
                }
            }
        },

        /*
        countKeyLogin: "login",
        countKeyMaxScore: "maxScore",
        countKeyCommboNum: "commboNum",
        countKeyTotalScore: "totalScore",
        countKeyTotalCoin: "totalCoin",
        countKeyShare: "share",
        */
        initDataCount:function() {
            Common._initItem(ParamConst.countKeyLogin,0);
            Common._initItem(ParamConst.countKeyMaxScore,0);
            Common._initItem(ParamConst.countKeyCommboNum,0);
            Common._initItem(ParamConst.countKeyTotalScore,0);
            Common._initItem(ParamConst.countKeyTotalCoin,0);
            Common._initItem(ParamConst.countKeyShare,0);

            Common._initItem(ParamConst.countKeyLoginDate,0);

            Common._initItem(ParamConst.countKeyRolePix,1);
            Common._initItem(ParamConst.countKeyRoleWhite,0);
            Common._initItem(ParamConst.countKeyRoleFish,0);

            Common._initItem(ParamConst.countKeyRoleSkin,"cat");

            Common._initItem(ParamConst.countKeyXGold, 0);
        },

        _initItem:function(key,defaultValue) {
            var value = cc.sys.localStorage.getItem(key);
            if(value == null || value == "" || isNaN(value)) {
                Log.logD("==store== value is null" + key + "==" + value)
                cc.sys.localStorage.setItem(key, defaultValue);
            }
            else {
                Log.logD("==store== value is not null" + key + " " + value);
            }
        },

        /*
        achIndexLogin: "login",
        achIndexMaxScore: "maxScore",
        achIndexCommboNum: "commboNum",
        achIndexTotalScore: "totalScore",
        achIndexTotalCoin: "totalCoin",
        achIndexShare: "share",
        */
        initAchIndex:function() {
            Common._initItem(ParamConst.achIndexLogin,-1);
            Common._initItem(ParamConst.achIndexMaxScore,-1);
            Common._initItem(ParamConst.achIndexCommboNum,-1);
            Common._initItem(ParamConst.achIndexTotalScore,-1);
            Common._initItem(ParamConst.achIndexTotalCoin,-1);
            Common._initItem(ParamConst.achIndexShare,-1);
        },

        setDataCount:function(countKey, countValue) {
            cc.sys.localStorage.setItem(countKey, countValue);
        },

        getDataCount:function(countKey) {
            return Number(cc.sys.localStorage.getItem(countKey));
        },

        getDataCountStr:function(countKey) {
            return cc.sys.localStorage.getItem(countKey);
        },

        getAchIndex:function(achKey) {
            return Number(cc.sys.localStorage.getItem(achKey+"Index"));
        },

        setAchIndex:function(achKey,index) {
            cc.sys.localStorage.setItem(achKey+"Index", index);
        },

        //只有开发的时候可以使用
        clearAllData:function() {
            // if(CC_DEV) {
                Log.logD("**************** clear all data ******************");
                cc.sys.localStorage.clear();
            // }
        }
    }
})