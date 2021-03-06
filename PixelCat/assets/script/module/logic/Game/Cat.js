const Singleton = require('Singleton')

cc.Class({
    extends: cc.Component,

    properties: {
        startTag: false
    },

    onLoad () {
        this.cfg = Singleton.Config.stage;
        this.gv = this.cfg.catGravity.value;
        this.dt = 0;
        cc.director.getCollisionManager().enabled = true;
        this.catDie = false;
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
        if(Math.abs(this.node.y)>=780) {
            if(!this.catDie) {
                var eventParam = new cc.Event.EventCustom("catDie",true);
                this.node.dispatchEvent(eventParam);
                this.showDieAnimation();
            }
            this.catDie = true;
        }
    },

    onCollisionEnter: function (other) {
        if(other.name.indexOf("gold")!=-1) {
            
        } else {
            if(Global.itemShieldTag) {
                Global.itemShieldTag = false;
                var eventParam = new cc.Event.EventCustom("useShield",true);
                this.node.dispatchEvent(eventParam);
                return;
            }
            if(!this.catDie) {
                var eventParam = new cc.Event.EventCustom("catDie",true);
                this.node.dispatchEvent(eventParam);
                this.showDieAnimation();
            }
            this.catDie = true;
        }
    },

    onCollisionStay: function (other) {

    },

    onCollisionExit: function () {
        
    },

    showDieAnimation:function() {
        this.startTag = false;

        var self = this;
        var act1 = cc.blink(0.5,4);
        this.node.runAction(act1);

        setTimeout(function() {
            self.startTag = true;
        }.bind(this),500);
    },

    reset:function() {
        this.node.x = 0;
        this.node.y = 0;
        this.dt = 0;
        this.catDie = false;
        this.node.rotation = 0;
    }
});
