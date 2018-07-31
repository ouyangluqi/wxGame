const Singleton = require("Singleton");
const Random = require("Random");
const Res = require('Res');
cc.Class({
    extends: cc.Component,

    properties: {
        speed: 1
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var windowSize=cc.view.getVisibleSize();
        this.node.width += windowSize.width;
    },

    update (dt) {
        this.node.x += this.speed;   
      //  cc.log("this.node.x " + this.node.x + "  " + "this.node.width "+ this.node.width)
        if (this.node.x>=this.node.width || this.node.x<=-1*this.node.width) {
            this.node.x = 0;
        }
    },

    setSpeedAndData: function(speed, dataArr) {
        this.speed = speed;

        var dir = speed > 0 ? -1 : 1; 
        var self = this;
        var itemWidthCfg = Singleton.Config.stage.itemWidth;
        var startPos = 0;
        var itemWidth;
        var padWidth;
        var prefabNode;
        dataArr.forEach(element => {
            padWidth = Random.getRandom(10,20);
            itemWidth = itemWidthCfg[element];

            var prefab = Singleton.RawAssetLoader.getRes(Res.PREFAB_TARGET_ITEM_PATH);
            prefabNode = cc.instantiate(prefab);
            var targetItemComponent = prefabNode.getComponent("TargetItem");
            targetItemComponent.setItem(element);
            self.node.addChild(prefabNode);
            prefabNode.y = 0;
            prefabNode.x = startPos + (padWidth + itemWidth/2)*dir;
            cc.log("prefabNode.x "+ prefabNode.x)
            startPos += (padWidth + itemWidth)*dir;
            this.node.width = Math.abs(startPos);
        });
    }
});
