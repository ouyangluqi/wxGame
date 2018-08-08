cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        this.anim = this.node.getComponent(cc.Animation);
        this.boxC = this.node.getComponent(cc.BoxCollider);
        this.boxC.enabled = false;
    },

    start () {

    },

    reset:function() {
        this.node.opacity = 255;
        this.node.scaleX = 1;
        this.anim.play();
        this.boxC.enabled = true;
    },

    // update (dt) {},
    onCollisionEnter: function (other) {
        if(other.name.indexOf("cat")!=-1) {
            this.boxC.enabled = false;
            this.anim.stop();
            this.node.scaleX = 1;

            var act1 = cc.fadeOut(0.3);
            var act2 = cc.moveBy(0.3, 0,50);
            var act = cc.spawn(act1, act2);
            this.node.runAction(act);
        }
    },

    onCollisionStay: function (other) {

    },

    onCollisionExit: function () {
        
    },

});
