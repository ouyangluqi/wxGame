const BaseView = require('BaseView')
const Scene = require('Scene')

var HallView = cc.Class({
    extends: BaseView,

    onLoad: function() {
        cc.log("onInit is call" + this.node);
        
        this.startBtn = this.node.getChildByName("startGame").getComponent(cc.Button)
        this.startBtn.node.on(cc.Node.EventType.TOUCH_END, this._startClickHandler.bind(this))
    },

    _startClickHandler: function() {
        cc.log('onStartClick')
        cc.director.loadScene(Scene.GAME)
    }
})