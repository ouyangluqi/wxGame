const Log = require('Log')
const Singleton = require('Singleton')
const HallView = require('HallView')
const Res = require('Res')

var HallScene = cc.Class({
    extends: cc.Component,

    onLoad: function() {
        Log.logD("The HallScene is start")
        this._isPrefabComplete = false
        this._hallView = null
    },

    start () {
        this._startLoadPrefabHandler()
    },

    _startLoadPrefabHandler: function () {
        Log.logD("hallScene load asset start")
        Singleton.PrefabLoader.addRes(Res.PREFAB_HALL_VIEW_PATH)
        Singleton.PrefabLoader.addRes(Res.PREFAB_GAME_VIEW_PATH)
        Singleton.PrefabLoader.addRes(Res.PREFAB_TARGET_ITEM_PATH)
        Singleton.PrefabLoader.startLoad(false, this._completeLoadPrefabHandler.bind(this))
    },

    _completeLoadPrefabHandler: function () {
        Log.logD("complete load prefab")
        if (this._hallView == null) {
            this._hallView = new HallView()
            this._hallView.init(Res.PREFAB_HALL_VIEW_PATH, this.node)
        }
    }
});
