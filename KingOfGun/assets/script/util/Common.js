var Common = cc.Class({

    statics: {
        getHistoryScore:function () {
            var result = this._readData('historyScore');
            if(result == null) {
                this._saveData('historyScore', 0);
                return 0;
            }
            return result;
        },

        checkScoreAndSave:function (scoreNum) {
            var result = this._readData('historyScore');
            if(scoreNum > result) {
                this._saveData('historyScore', scoreNum);
            }
        },

        //////////////////////////////////////////////////////////////////

        _readData:function(keyStr) {
            cc.sys.localStorage.getItem(keyStr);
        },

        _saveData:function(keyStr, data) {
            cc.sys.localStorage.setItem(keyStr, data);
            if(CC_WECHATGAME) {
                _uploadWXData(keyStr, data);
            }
        },

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
    }
})