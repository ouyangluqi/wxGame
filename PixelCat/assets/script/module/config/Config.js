var Config = cc.Class({
    ctor: function () {
       this.stage = null
       this.ach = null
       this.shop = null
    },

    initStage: function (cfg) {
        this.stage = cfg
    },

    initAch:function (cfg) {
        this.ach = cfg
    },

    initShop:function (cfg) {
        this.shop = cfg
    },

    statics: {

    }

})