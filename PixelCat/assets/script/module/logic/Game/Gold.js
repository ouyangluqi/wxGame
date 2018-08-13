cc.Class({
    extends: cc.Component,

    properties: {
        catNode: {
            default: null,
            type: cc.Node,
        }
    },

    onLoad () {
        this.anim = this.node.getComponent(cc.Animation);
        this.boxC = this.node.getComponent(cc.BoxCollider);
        this.boxC.enabled = false;
        this.magnetTag = false;
        this.collectTag = false;
    },

    start () {

    },

    reset:function() {
        this.node.opacity = 255;
        this.boxC.enabled = true;
        this.magnetTag = false;
        this.collectTag = false;
    },

    update (dt) {
        if(this.magnetTag && !this.collectTag) {
            var act = cc.moveTo(0.1,675,this.catNode.y);
            this.node.runAction(act);
        }
    },
    onCollisionEnter: function (other) {
        if(other.name.indexOf("cat")!=-1) {
            this.boxC.enabled = false;
            this.magnetTag = false;
            this.collectTag = true;
            this.node.stopAllActions();
            var act1 = cc.fadeOut(0.3);
            var act2 = cc.moveBy(0.3, 0,50);
            var act = cc.spawn(act1, act2);
            this.node.runAction(act);

            var eventParam = new cc.Event.EventCustom("eatGold",true);
            this.node.dispatchEvent(eventParam);
        }
    },

    onCollisionStay: function (other) {

    },

    onCollisionExit: function () {
        
    },

});
