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
        cc.log("texture/item/item_"+itemId);
        cc.loader.loadRes("texture/item/item_"+itemId, cc.SpriteFrame, function (err, spriteFrame) {
            cSprite.spriteFrame = spriteFrame;
            boxC.size.width = self.node.width;
        });        
    },

    onCollisionEnter: function (other) {
        this.node.destroy();
    },

    onCollisionStay: function (other) {

    },

    onCollisionExit: function () {
        
    }
});
