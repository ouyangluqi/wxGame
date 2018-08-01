const Log = require('Log')
const Singleton = require('Singleton')

var BaseView = cc.Class({
    extends: cc.Component,

    init: function(prefabPath, parentNode) {
        var prefabAsset = Singleton.PrefabLoader.getRes(prefabPath)
        if (prefabAsset) {
            var newNode = cc.instantiate(prefabAsset)
            newNode.parent = parentNode
            this._onInit()
        }
    },

    _onInit: function () {

    }
})