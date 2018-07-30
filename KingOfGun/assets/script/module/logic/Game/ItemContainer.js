const Singleton = require("Singleton");
cc.Class({
    extends: cc.Component,

    properties: {
        speed: 1
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var windowSize=cc.view.getVisibleSize();
        this.node.width += windowSize/2;
    },

    update (dt) {
        this.node.x += this.speed;   
        if (this.node.x>=this.node.width || this.node.x<=this.node.width) {
            this.node.x = 0;
        }
    },

    setSpeedAndData: function(speed, dataArr) {
        this.speed = speed;

        var itemWidthCfg = Singleton.Config.stage.itemWidth;
        var startPos = 0;
        dataArr.forEach(element => {
            var itemWidth = itemWidthCfg[element]
        });
    }
});
