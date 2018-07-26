const Singleton = require('Singleton')

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    // start () {},
    // update (dt) {},

    start () {
        Singleton.init();
    },
});
