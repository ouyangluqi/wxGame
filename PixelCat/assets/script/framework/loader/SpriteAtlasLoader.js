const BaseLoader = require('BaseLoader')

var SpriteAtlasLoader = cc.Class({
    extends: BaseLoader,
    ctor: function () {

    },

    //重载资源类型
    _getResType: function () {
        return cc.SpriteAtlas
    },
})