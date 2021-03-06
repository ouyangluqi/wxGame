const Singleton = require("Singleton");
cc.Class({
    extends: cc.Component,

    properties: {
        lifeNum:0,
        itemId:0,
        boxC:false,
        cSprite:false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.boxC = this.node.getComponent(cc.BoxCollider);
        this.cSprite = this.node.getComponent(cc.Sprite);
    },

    start () {
        
    },

    // update (dt) {},

    setItem: function (itemId) {
        this.itemId = itemId;
        this.lifeNum = Singleton.Config.stage.itemInfo[itemId].lifeNum;
        this.node.scale = Singleton.Config.stage.itemInfo[itemId].scale;
        this._setLifeNum(this.lifeNum);
    },

    _setLifeNum: function (lifeNum) {
        var self = this;
        cc.loader.loadRes("atlas/gameRes/gameRes", cc.SpriteAtlas, function(err, atlas) {
            if(self.cSprite){
                self.cSprite.spriteFrame = atlas.getSpriteFrame("item"+self.itemId+"_"+lifeNum);
                self.boxC.size.width = self.node.width;
            }
        });
    },

    onCollisionEnter: function (other) {
        this.lifeNum = this.lifeNum - 1;

        if (this.itemId == 8) {
            var eventParam = new cc.Event.EventCustom("hitBoom",true);
            this.node.dispatchEvent(eventParam);
            this.node.destroy();
        }
        if (this.lifeNum == 0) {
            var eventParam = new cc.Event.EventCustom("hitTarget",true);
            var userData = {};
            userData["lifeNum"] = this.lifeNum;
            userData["itemId"] = this.itemId;
            userData["parentIndex"] = this._getParentIndex();
            eventParam.setUserData(userData);
            this.node.dispatchEvent(eventParam);
            this.node.destroy();
        } else {
            this._setLifeNum(this.lifeNum);
            var eventParam = new cc.Event.EventCustom("hitTarget",true);
            var userData = {};
            userData["lifeNum"] = this.lifeNum;
            userData["itemId"] = this.itemId;
            userData["parentIndex"] = this._getParentIndex();
            eventParam.setUserData(userData);
            this.node.dispatchEvent(eventParam);
        }
    },

    _getParentIndex:function() {
        return this.node.parent.y>-300 ? 1 : 2;
    },

    onCollisionStay: function (other) {

    },

    onCollisionExit: function () {
        
    }
});
