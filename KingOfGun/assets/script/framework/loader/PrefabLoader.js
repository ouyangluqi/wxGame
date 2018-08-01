const BaseLoader = require('BaseLoader')

var PrefabLoader = cc.Class({
    extends: BaseLoader,
    ctor: function () {

    },

    //重载资源类型
    _getResType: function () {
        return cc.Prefab
    },
})