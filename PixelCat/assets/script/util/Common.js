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
            return Global.historyScore;
        },

        checkScoreAndSave:function (scoreNum) {
            var result = Global.historyScore;
            if(scoreNum > result) {
                Global.historyScore = scoreNum;
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
                } else {
                    cc.sys.localStorage.setItem(ParamConst.wxKey, scoreNum);
                }
            }
        },

        initHistoryScore:function() {
            if(CC_WECHATGAME) {
                wx.getUserCloudStorage({
                    keyList: [ParamConst.wxKey],
                    success: res => {
                        var dList = res.KVDataList
                        console.log("getUserCloudStorage success");
                        for(var i = 0; i < dList.length; i++) {
                            if (dList[i].key == ParamConst.wxKey) {
                                console.log("getUserCloudStorage value: " + dList[i].value);
                                if(dList[i].value!=null) {
                                    Global.historyScore = dList[i].value;
                                }
                                return;
                            }
                        }
                    },
                    fail: res => {
                        console.log("getUserCloudStorage fail");
                    }
                })
            } else {
                var result = cc.sys.localStorage.getItem(ParamConst.wxKey);
                if(result!=null) {
                    Global.historyScore = result;
                }
            }
        },
    }
})