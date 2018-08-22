const ParamConst = require('ParamConst');
var RankView = cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.tex = new cc.Texture2D()
        this.backBtn = this.node.getChildByName("backBtn").getComponent(cc.Button)
        this.backBtn.node.on(cc.Node.EventType.TOUCH_END, this._backClickHandler.bind(this))

        this.display = this.node.getChildByName("rankScrollViewSprite").getComponent(cc.Sprite)
        // this.display.node.setContentSize(cc.director.getVisibleSize())
    },

    update(dt) {
        this._updateSubDomainCanvas()
    },
    
    _backClickHandler: function() {
        this.node.active = false
        var eventParam = new cc.Event.EventCustom("closeRankView",true);
        this.node.dispatchEvent(eventParam);
    },

    _updateSubDomainCanvas: function () {
        if (!this.tex) {
            return
        }
        if (CC_WECHATGAME) {
            var openDataContext = window.wx.getOpenDataContext()
            var sharedCanvas = openDataContext.canvas
            this.tex.initWithElement(sharedCanvas)
            this.tex.handleLoadedTexture()
            this.display.spriteFrame = new cc.SpriteFrame(this.tex)
            this.display.node.setContentSize(cc.director.getVisibleSize())
        }
    },

    showRank:function() {
        if (CC_WECHATGAME) {
            window.wx.postMessage({// 发消息给子域
                messageType: 1,
                mainMenuNum: ParamConst.wxKey
            });
        } else {
            cc.log("获取竖向展示排行榜数据。xw_miniGame_x2");
        }
    }
});
