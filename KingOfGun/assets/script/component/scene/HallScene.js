const Log = require('Log')
const Singleton = require('Singleton')
const HallView = require('HallView')
const Res = require('Res')

var HallScene = cc.Class({
    extends: cc.Component,

    onLoad: function() {
        Log.logD("The HallScene is start")
        this._isPrefabComplete = false
        this._isSpriteAtlasComplete = false
        this._hallView = null
    },

    start () {
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
    },

    _startLoadPrefabHandler: function () {
        Log.logD("hallScene load asset start")
        Singleton.PrefabLoader.addRes(Res.PREFAB_HALL_VIEW_PATH)
        Singleton.PrefabLoader.addRes(Res.PREFAB_GAME_VIEW_PATH)
        Singleton.PrefabLoader.addRes(Res.PREFAB_TARGET_ITEM_PATH)
        Singleton.PrefabLoader.addRes(Res.PREFAB_GAME_GUN_EFF_PATH)
        Singleton.PrefabLoader.addRes(Res.PREFAB_GAME_HIT_EFF_PATH)
        Singleton.PrefabLoader.addRes(Res.PREFAB_RANK_VIEW_PATH)
        Singleton.PrefabLoader.startLoad(false, this._completeLoadPrefabHandler.bind(this))
    },

    _completeLoadPrefabHandler: function () {
        Log.logD("complete load prefab")
        this._isPrefabComplete = true;
        this._checkAllLoadComplete();
    },

    _startLoadSpriteAtlasHandler: function () {
        Singleton.SpriteAtlasLoader.addRes(Res.ATLAS_EFF_PATH)
        Singleton.SpriteAtlasLoader.startLoad(false, this._completeLoadSpriteAtlasHandler.bind(this))
    },

    _completeLoadSpriteAtlasHandler: function () {
        Log.logD("complete load SpriteAtlas")
        this._isSpriteAtlasComplete = true;
        this._checkAllLoadComplete();
    },

    _checkAllLoadComplete:function () {
        if (this._isSpriteAtlasComplete && this._isPrefabComplete) {
            if (this._hallView == null) {
                this._hallView = new HallView()
                this._hallView.init(Res.PREFAB_HALL_VIEW_PATH, this.node)
            }
        }
    },

    onDestroy: function () {
        this._hallView = null
    }
});
