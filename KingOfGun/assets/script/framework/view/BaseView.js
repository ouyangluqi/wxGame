const Log = require('Log');

var BaseView = cc.Class({

    extends: cc.Component,

    init:function(prefabName, parentNode) {
        cc.loader.loadRes("prefab/game/"+prefabName, cc.Prefab, function(err, prefab) {
            Log.logD("init view " + prefabName);
            var gameObj = cc.instantiate(prefab);
            gameObj.parent = parentNode;
        });
    }

})