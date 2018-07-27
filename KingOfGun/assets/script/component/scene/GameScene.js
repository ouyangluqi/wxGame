const GameView = require('GameView');
const Log = require('Log');
const Singleton = require('Singleton');
const Res = require('Res');

var GameScene = cc.Class({

    extends: cc.Component,

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._isRawAssetComplete = false;
    },

    start () {
        //正式需要去掉
        Singleton.init();

        this._loadRawAsset();
    },

    // onDestroy () {

    // },

    // update (dt) {

    // },

    //加载json
    _loadRawAsset: function () {
        Log.logD("gamescene load config start")
        Log.logD(Res.CONFIG_STAGE_PATH)
        Singleton.RawAssetLoader.addRes(Res.CONFIG_STAGE_PATH);
        Singleton.RawAssetLoader.startLoad(false, this._rawAssetCompleteHandler.bind(this))
    },

    //json加载完毕
    _rawAssetCompleteHandler: function (error) {
        Log.logD("gamescene load config complete")
        Singleton.Config.initStage(Singleton.RawAssetLoader.getRes(Res.CONFIG_STAGE_PATH))
        this._isRawAssetComplete = true
        this._startGameView()
    },

    //startgameview 
    _startGameView: function () {
        var gameView = new GameView();
        gameView.init("gameView", this.node);
    }
});
