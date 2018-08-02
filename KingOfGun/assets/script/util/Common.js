var Common = cc.Class({

    statics: {
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
            var result = cc.sys.localStorage.getItem('historyScore');
            if(result == null) {
                cc.sys.localStorage.setItem('historyScore', 0);
                if(CC_WECHATGAME) {
                    var kvDataList = new Array();
                    kvDataList.push({
                        key: historyScore,
                        value: "0"
                    });
                    wx.setUserCloudStorage({
                        KVDataList: kvDataList
                    })
                }
                return 0;
            }
            return result;
        },

        checkScoreAndSave:function (scoreNum) {
            var result = cc.sys.localStorage.getItem('historyScore');
            if(scoreNum > result) {
               cc.sys.localStorage.setItem('historyScore', scoreNum);
               if(CC_WECHATGAME) {
                var kvDataList = new Array();
                kvDataList.push({
                    key: historyScore,
                    value: scoreNum
                });
                wx.setUserCloudStorage({
                    KVDataList: kvDataList
                })
            }
           }
        },
    }
})