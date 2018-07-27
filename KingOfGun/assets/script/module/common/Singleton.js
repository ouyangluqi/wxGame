const BaseLoader = require('BaseLoader')

var Singleton = cc.Class({
    ctor: function () {
        
    },

    statics: {
        init: function () {
            Singleton.BaseLoader = new BaseLoader();
        }
    }
})