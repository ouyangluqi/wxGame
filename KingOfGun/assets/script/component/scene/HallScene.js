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
            
        }
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
