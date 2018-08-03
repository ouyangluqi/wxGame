cc.Class({
    extends: cc.Component,

    properties: {
        rankingScrollView: cc.ScrollView,
        scrollViewContent: cc.Node,
        prefabRankItem: cc.Prefab,
        loadingLabel: cc.Node
    },

    start: function () {
        this._removeChild()
        if (CC_WECHATGAME) {
            window.wx.onMessage(data => {
                console.log("接收主域发来的消息:", data)
                if (data.messageType == 0) {
                    this._removeChild()
                } else if(data.messageType == 1) {
                    this._fetchFriendData(data.mainMenuNum)
                }
            })
        } else {

        }
    },

    _removeChild: function () {
        // this.node.removeChildByTag(1000)
        this.rankingScrollView.node.active = false
        this.scrollViewContent.removeAllChildren()
        this.loadingLabel.getComponent(cc.Label).string = "玩命加载中..."
        this.loadingLabel.active = true
    },

    _fetchFriendData: function(mainMenuNum) {
        this._removeChild()
        this.rankingScrollView.node.active = true
        if (CC_WECHATGAME) {
            wx.getUserCloudStorage({
                keyList: ["xw_miniGame_x1"],
                success: res => {
                    var dList = res.KVDataList
                    console.log("getUserCloudStorage success");
                    for(var i = 0; i < dList.length; i++) {
                        if (dList[i].key == "xw_miniGame_x1") {
                            console.log("getUserCloudStorage value: " + dList[i].value);
                            break;
                        }
                    }
                },
                fail: res => {
                    console.log("getUserCloudStorage fail");
                }
            })

            wx.getUserInfo({
                openIdList: ['selfOpenId'],
                success: (userRes) => {
                    this.loadingLabel.active = false
                    console.log('success', userRes.data)
                    let userData = userRes.data[0]
                    // 取出好友数据
                    wx.getFriendCloudStorage({
                        keyList: [mainMenuNum],
                        success: res => {
                            console.log('wx.getFriendCloudStorage success', res)
                            let data = res.data
                            data.sort((a, b) => {
                                if (a.KVDataList.length == 0 && b.KVDataList.length == 0) {
                                    return 0
                                }
                                if (a.KVDataList.length == 0) {
                                    return 1
                                }
                                if (b.KVDataList.length == 0) {
                                    return -1
                                }
                                return b.KVDataList[0].value - a.KVDataList[0].value;
                            })
                            for (let i = 0; i < data.length; i++) {
                                var playerInfo = data[i]
                                var item = cc.instantiate(this.prefabRankItem)
                                console.log("The data is " + i + " === " + playerInfo)
                                item.getComponent('RankItem').init(i, playerInfo)
                                this.scrollViewContent.addChild(item)
                            }
                            if (data.length <= 8) {
                                let layout = this.scrollViewContent.getComponent(cc.Layout)
                                layout.resizeMode = cc.Layout.ResizeMode.NONE
                            }

                            console.log("The scrollViewContent child Count: " + this.scrollViewContent.childrenCount)
                        },
                        fail: res => {
                            console.log("wx.getFriendCloudStorage fail", res);
                            this.loadingLabel.getComponent(cc.Label).string = "数据加载失败，请检测网络，谢谢。"
                        },
                    });
                },
                fail: res => {
                    this.loadingLabel.getComponent(cc.Label).string = "数据加载失败，请检测网络，谢谢。"
                }
            })
        }
    }
});
