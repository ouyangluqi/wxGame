// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        cSprit: {
            default: null,
            type: cc.Sprite
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    start () {

    },

    // update (dt) {},

    setItem: function (itemId) {
        var self = this;
        var boxC = this.node.getComponent("BoxCollider");
        cc.loader.load("texture/item/item_"+itemId, function (err, texture) {
            self.cSprit.spriteFrame = new cc.SpriteFrame(texture);
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
