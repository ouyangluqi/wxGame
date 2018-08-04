const Log = require("Log")

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
            var result = cc.sys.localStorage.getItem('xw_miniGame_x1');
            if(result == null) {
                Log.logD("The result is null")
                cc.sys.localStorage.setItem('xw_miniGame_x1', 0);
                if(CC_WECHATGAME) {
                    var kvDataList = new Array();
                    kvDataList.push({
                        key: "xw_miniGame_x1",
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
            var result = cc.sys.localStorage.getItem('xw_miniGame_x1');
            if(scoreNum > result) {
                cc.sys.localStorage.setItem('xw_miniGame_x1', scoreNum);
                if(CC_WECHATGAME) {
                    var kvDataList = new Array();
                    kvDataList.push({
                        key: "xw_miniGame_x1",
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
        }
    }
})