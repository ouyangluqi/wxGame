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
        this.backBtn = this.go.getChildByName("backBtn").getComponent(cc.Button)
        this.backBtn.node.on(cc.Node.EventType.TOUCH_END, this._backClickHandler.bind(this))
    },

    _backClickHandler: function() {
        cc.log('back click call')
        this.go.active = false
    },
})