cc.Class({
    extends: cc.Component,

    properties: {
        speed: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var windowSize=cc.view.getVisibleSize();
        this.resetPosY = windowSize.width/2;
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
            this.node.x = 75*this.dir;
        }
    },

    setDirAndSpeed (speed) {
        this.speed = speed;
    }
});
