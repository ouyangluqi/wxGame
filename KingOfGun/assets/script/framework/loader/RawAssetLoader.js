const BaseLoader = require('BaseLoader')

var RawAssetLoader = cc.Class({
    extends: BaseLoader,
    ctor: function () {

    },

    //重载资源类型
    _getResType: function () {
        return cc.RawAsset
    },
})