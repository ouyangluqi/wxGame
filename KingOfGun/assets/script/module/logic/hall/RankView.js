const BaseView = require('BaseView')

var RankView = cc.Class({
    extends: BaseView,

    properties: {
        isActive: {
            get: function() {
                if (this.go == null) {
                    return false
                }
                return this.go.active
            },
            set: function(value) {
                this.go.active = value
            }
        },
    },

    _onInit: function(rootNode) {
        this.go = rootNode
        this.tex = new cc.Texture2D()
        this.backBtn = this.go.getChildByName("backBtn").getComponent(cc.Button)
        this.backBtn.node.on(cc.Node.EventType.TOUCH_END, this._backClickHandler.bind(this))

        this.display = this.go.getChildByName("rankScrollViewSprite").getComponent(cc.Sprite)

        if (CC_WECHATGAME) {
            window.wx.postMessage({// 发消息给子域
                messageType: 1,
                mainMenuNum: "xw_miniGame_x1"
            });
        } else {
            cc.log("获取横向展示排行榜数据。x1");
        }
    },

    _backClickHandler: function() {
        cc.log('back click call')
        this.go.active = false
    },

    _updateSubDomainCanvas () {
        if (!this.tex) {
            return
        }
        if (CC_WECHATGAME) {
            var openDataContext = wx.getOpenDataContext()
            var sharedCanvas = openDataContext.canvas
            this.tex.initWithElement(sharedCanvas)
            this.tex.handleLoadedTexture()
            this.display.spriteFrame = new cc.SpriteFrame(this.tex)
        }
    },

    update () {
        this._updateSubDomainCanvas();
    }
})