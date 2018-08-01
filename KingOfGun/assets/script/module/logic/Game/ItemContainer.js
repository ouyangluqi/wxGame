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
        
    },

    update (dt) {
        this.node.x += this.speed;   
        if (this.node.x>=this.node.width || this.node.x<=-1*this.node.width) {
            this.node.x = 0;
        }
    },

    setSpeedAndData: function(speed, dataArr) {
        var windowSize=cc.view.getVisibleSize();
        this.speed = speed;
        this.node.width = 0;

        var dir = speed > 0 ? -1 : 1; 
        var self = this;
        var itemWidthCfg = Singleton.Config.stage.itemInfo;
        var startPos = 0;
        var itemWidth;
        var padWidth;
        var prefabNode;
        dataArr.forEach(element => {
            padWidth = Random.getRandom(20,60);
            itemWidth = itemWidthCfg[element].width;

            var prefab = Singleton.PrefabLoader.getRes(Res.PREFAB_TARGET_ITEM_PATH);
            prefabNode = cc.instantiate(prefab);
            var targetItemComponent = prefabNode.getComponent("TargetItem");
            targetItemComponent.setItem(element);
            self.node.addChild(prefabNode);
            prefabNode.y = 0;
            prefabNode.x = startPos + (padWidth + itemWidth/2)*dir;
            startPos += (padWidth + itemWidth)*dir;
            this.node.width = Math.abs(startPos);
        });
        this.node.width += windowSize.width;
    }
});
