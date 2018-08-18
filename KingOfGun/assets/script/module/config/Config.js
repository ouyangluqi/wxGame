var Config = cc.Class({
    ctor: function () {
       this.stage = null
       this.share = null
    },

    initStage: function (cfg) {
        this.stage = cfg
    },

    initShare:function(cfg) {
        this.share = cfg
    },

    statics: {

    }

})