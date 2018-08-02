const Log = require('Log')
const Singleton = require('Singleton')

var BaseView = cc.Class({
    extends: cc.Component,

    init: function(prefabPath, parentNode) {
        var prefabAsset = Singleton.PrefabLoader.getRes(prefabPath)
        if (prefabAsset) {
            var go = cc.instantiate(prefabAsset)
            go.parent = parentNode
            this._onInit(go)
        }
    },

    _onInit: function (rootNode) {

    }
})