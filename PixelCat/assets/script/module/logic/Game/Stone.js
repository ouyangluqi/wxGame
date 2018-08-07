cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    onLoad () {
        this.boxC = this.node.getComponent(cc.BoxCollider);
    },

    start () {

    },

    //update (dt) {},

    setHeight:function(stoneNum, dir) {
        var stoneHeight = stoneNum*57;
        this.node.height = stoneHeight;
        this.boxC.size.height = stoneHeight;
        this.node.y = stoneHeight/2*dir;
    }
});
