cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    start () {

    },

    // update (dt) {},

    setItem: function (itemId) {
        var self = this;
        var boxC = this.node.getComponent(cc.BoxCollider);
        var cSprite = this.node.getComponent(cc.Sprite);
        cc.loader.loadRes("texture/item/item_"+itemId, cc.SpriteFrame, function (err, spriteFrame) {
            cSprite.spriteFrame = spriteFrame;
            boxC.size.width = self.node.width;
        });        
    },

    onCollisionEnter: function (other) {
        var eventParam = new cc.Event.EventCustom("hitTarget",true);
        //eventParam.setUserData(this.touchingNumber);
        this.node.dispatchEvent(eventParam);
        this.node.destroy();
    },

    onCollisionStay: function (other) {

    },

    onCollisionExit: function () {
        
    }
});
