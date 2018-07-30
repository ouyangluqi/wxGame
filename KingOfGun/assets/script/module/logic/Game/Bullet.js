cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
    },

    start () {
       this.node.active = false;
    },

    //update (dt) {},

    /////////////////////////////////////////////////////////////////////////////////////

    onCollisionEnter: function (other) {
        
    },

    onCollisionStay: function (other) {

    },

    onCollisionExit: function () {
        
    }
});
