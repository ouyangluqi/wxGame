const Singleton = require('Singleton')
const Scene = require('Scene')
const Log = require('Log')
const Res = require('Res')

var BootScene = cc.Class({
    extends: cc.Component,

    onLoad: function() {
        Log.logD("The bootScene is start")
        this._isRawAssetComplete = false
        this._isAnimationComplete = true
    },

    //init
    start () {
        Singleton.init()
        this._loadRawAsset()
        // this.scheduleOnce(this._animationCompleteHandler.bind(this), 1)
    },

    _loadRawAsset: function () {
        Log.logD("_loadRawAsset")
        Singleton.RawAssetLoader.addRes(Res.CONFIG_STAGE_PATH)
        Singleton.RawAssetLoader.addRes(Res.CONFIG_SHARE_PATH)
        Singleton.RawAssetLoader.startLoad(false, this._rawAssetCompleteHandler.bind(this))
    },

    _rawAssetCompleteHandler: function (error) {
        Log.logD("_rawAssetCompleteHandler")
        Singleton.Config.initStage(Singleton.RawAssetLoader.getRes(Res.CONFIG_STAGE_PATH))
        Singleton.Config.initShare(Singleton.RawAssetLoader.getRes(Res.CONFIG_SHARE_PATH));
        this._isRawAssetComplete = true
        this._checkAllComplete()
    },

    _animationCompleteHandler: function (dt) {
        Log.logD("_animationCompleteHandler")
        this._isAnimationComplete = true
        this._checkAllComplete()
    },

    _checkAllComplete: function () {
        if (this._isAnimationComplete && this._isRawAssetComplete) {
            Log.logD("go to hall")
            cc.director.loadScene(Scene.HALL)
        }
    }
});