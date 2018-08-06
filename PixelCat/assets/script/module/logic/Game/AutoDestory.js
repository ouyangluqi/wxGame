
cc.Class({
    extends: cc.Component,

    properties: {
        liveTime:0.25
    },

    start () {
        var self = this;
        setTimeout(function() {
            self.node.destroy();
        }.bind(this),this.liveTime*1000);
    },
});
