cc.Class({
    extends: cc.Component,

    properties: {
        speed: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var windowSize=cc.view.getVisibleSize();
        this.resetPosY = 72*7;
        if (this.speed>0) {
            this.dir = 1;
        } 
        else {
            this.dir = -1;
        }
    },

    update (dt) {
        this.node.x = this.node.x + this.speed;
        if(this.node.x>=this.resetPosY || this.node.x<=this.resetPosY*(-1)) {
            this.node.x = 0;
        }
    },

    setDirAndSpeed (speed) {
        this.speed = speed;
    }
});
