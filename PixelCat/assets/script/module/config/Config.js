var Config = cc.Class({
    ctor: function () {
       this.stage = null
       this.ach = null
    },

    initStage: function (cfg) {
        this.stage = cfg
    },

    initAch:function (cfg) {
        this.ach = cfg
    },

    statics: {

    }

})