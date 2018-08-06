cc.Class({
    extends: cc.Component,

    properties: {
        startTag: false
    },

    onLoad () {
        this.gv = 0.5;
        this.dt = 0;
    },

    start () {
        var self = this;
        setInterval(function() {
            self.dt  = self.dt  +1;
        }.bind(this),20);
    },

    update (dt) {
        if(this.startTag==false) {
            return;
        }
        this.node.y -= this.gv*this.dt;
        if(this.node.rotation<70) {
            this.node.rotation += 7;
        }        
    },
});
