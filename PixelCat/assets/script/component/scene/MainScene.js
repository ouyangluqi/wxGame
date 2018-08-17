const Singleton = require('Singleton')
const Log = require('Log')
const Res = require('Res')
const GameView = require('GameView')
const Common = require('Common')

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // // 适配解决方案
        // let _canvas = cc.Canvas.instance;
        // // 设计分辨率比
        // let _rateR = _canvas.designResolution.height / _canvas.designResolution.width;
        // // 显示分辨率比
        // let _rateV = cc.director.getVisibleSize().height / cc.director.getVisibleSize().width;
        // console.log("winSize: rateR: " + _rateR + " rateV: " + _rateV);
        // if (_rateV > _rateR) 
        // {
        //     _canvas.fitHeight = false;
        //     _canvas.fitWidth = true;
        //     console.log("winSize: fitWidth");
        // }
        // else
        // {
        //     _canvas.fitHeight = true;
        //     _canvas.fitWidth = false;
        //     console.log("winSize: fitHeight");
        // }

        let _canvas = cc.Canvas.instance;
        var windowSize = cc.director.getVisibleSize();
        var dafaultPer = _canvas.designResolution.height / _canvas.designResolution.width
        var sizePer = windowSize.height / windowSize.width
        cc.log("dafaultPer" + dafaultPer + "windowSize.height" + windowSize.height + "windowSize.width" + windowSize.width)
        if(sizePer > dafaultPer) {
            _canvas.fitWidth = true
            _canvas.fitHeight = false
            cc.Canvas.height = windowSize.width * dafaultPer;
        } else {
            _canvas.fitWidth = false
            _canvas.fitHeight = true
        }

        Log.logD("The HallScene is start")
        this._isPrefabComplete = false
        this._isSpriteAtlasComplete = false
        this._isRawAssetsComplete = true
        this._gameView = null
    },

    start () {
        Singleton.init()
        if (CC_WECHATGAME) {
            this._wxAuthorizeHandler()
        } else {
            this._startLoadResHandler()
        }
    },

    _wxAuthorizeHandler: function () {
        var self = this
        wx.getSetting({
            success: function (res) {
                var authSetting = res.authSetting
                if (authSetting['scope.userInfo'] === true) {
                    self._startLoadResHandler()
                } else if (authSetting['scope.userInfo'] === false) {
                    wx.showModal({
                        title: '用户未授权',
                        content: '如需正常进入游戏，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入游戏即可。',
                        showCancel: false,
                        success: function (res) {
                            if (res.confirm) {
                                wx.openSetting({
                                    success: function (res) {
                                        console.log('调用openSetting方法success:', res)
                                    },
                                    fail: function (res) {
                                        console.log('调用openSetting方法fail:', res)
                                    },
                                    complete: function (res) {
                                        console.log('调用openSetting方法complete:', res)
                                    }
                                });
                            }
                        }
                    })
                } else {
                    window.wx.authorize({
                        scope: 'scope.userInfo',
                        success: function () {
                            self._startLoadResHandler()
                        },
                        fail: function (res) {
                            // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
                            if (res.errMsg.indexOf('auth deny') > -1 || res.errMsg.indexOf('auth denied') > -1) {
                                window.wx.exitMiniProgram()
                            }
                        },
                        
                    })
                }
            }
        })
        
    },

    _startLoadResHandler: function () {
        this._startLoadPrefabHandler()
        this._startLoadSpriteAtlasHandler()
        this._startLoadRawAssetHandler()
    },

    _startLoadPrefabHandler: function () {
        Singleton.PrefabLoader.addRes(Res.PREFAB_GAME_VIEW_PATH)
        Singleton.PrefabLoader.addRes(Res.PREFAB_ACH_ITEM_PATH);
        Singleton.PrefabLoader.addRes(Res.PREFAB_SHOP_ITEM_PATH);
        Singleton.PrefabLoader.addRes(Res.PREFAB_GOODS_ITEM_PATH);
        Singleton.PrefabLoader.addRes(Res.PREFAB_GAME_ITEM_PATH);
        Singleton.PrefabLoader.startLoad(false, this._completeLoadPrefabHandler.bind(this))
    },

    _startLoadSpriteAtlasHandler: function () {
        Singleton.SpriteAtlasLoader.addRes(Res.ATLAS_GAME_RES_PATH)
        Singleton.SpriteAtlasLoader.startLoad(false, this._completeLoadSpriteAtlasHandler.bind(this))
    },

    _startLoadRawAssetHandler: function () {
        Singleton.RawAssetLoader.addRes(Res.CONFIG_STAGE_PATH)
        Singleton.RawAssetLoader.addRes(Res.COFING_ACH_PATH)
        Singleton.RawAssetLoader.addRes(Res.COFING_SHOP_PATH)
        Singleton.RawAssetLoader.addRes(Res.COFING_SHARE_PATH)
        Singleton.RawAssetLoader.startLoad(false, this._completeLoadRawAssetHandler.bind(this))
    },

    _completeLoadPrefabHandler: function () {
        Log.logD("complete load prefab")
        this._isPrefabComplete = true;
        this._checkAllLoadComplete();
    },

    _completeLoadSpriteAtlasHandler: function () {
        Log.logD("complete load SpriteAtlas")
        this._isSpriteAtlasComplete = true;
        this._checkAllLoadComplete();
    },

    _completeLoadRawAssetHandler: function (error) {
        Log.logD("_rawAssetCompleteHandler")
        this._isRawAssetComplete = true

        Singleton.Config.initStage(Singleton.RawAssetLoader.getRes(Res.CONFIG_STAGE_PATH))
        Singleton.Config.initAch(Singleton.RawAssetLoader.getRes(Res.COFING_ACH_PATH))
        Singleton.Config.initShop(Singleton.RawAssetLoader.getRes(Res.COFING_SHOP_PATH))
        Singleton.Config.initShare(Singleton.RawAssetLoader.getRes(Res.COFING_SHARE_PATH));

        this._checkAllLoadComplete()
    },

    _checkAllLoadComplete:function () {
        // Common.clearAllData();
        // Common.getHistoryScore();
        // Common.initDataCount();
        // Common.initAchIndex();
        if (this._isPrefabComplete && this._isSpriteAtlasComplete && this._isRawAssetComplete) {
            if (this._gameView == null) {
                //Common.clearAllData();
                Common.getHistoryScore();
                Common.initDataCount();
                Common.initAchIndex();
                this._gameView = new GameView()
                this._gameView.init(Res.PREFAB_GAME_VIEW_PATH, this.node)
            }
        }
    },
});
