const BaseView = require('BaseView')
const Scene = require('Scene')
const Log = require('Log')
const RankView = require('RankView')

var HallView = cc.Class({
    extends: BaseView,

    onLoad: function() {
        cc.log("onInit is call" + this.node)
        
        this.startBtn = this.node.getChildByName("startGame").getComponent(cc.Button)
        this.startBtn.node.on(cc.Node.EventType.TOUCH_END, this._startClickHandler.bind(this))

        this.rankBtn = this.node.getChildByName("rankBtn").getComponent(cc.Button)
        this.rankBtn.Node.onabort(cc.Node.EventType.TOUCH_END, this._rankClickHandler.bind(this))
    },

    onStart: function() {
    },

    _startClickHandler: function() {
        Log.logD("click start")
        cc.director.loadScene(Scene.GAME)
    },

    _rankClickHandler: function() {
        Log.logD("click rank")
    }
})