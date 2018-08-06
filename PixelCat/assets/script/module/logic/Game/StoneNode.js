const Random = require('Random')
cc.Class({
    extends: cc.Component,

    properties: {
        topNode: {
            default: null,
            type: cc.Node
        },
        bottomNode: {
            default: null,
            type: cc.Node
        }
    },

    onLoad () {},

    start () {

    },

    update (dt) {
        this.node.x -= 3;
        if(this.node.x<-760){
            var eventParam = new cc.Event.EventCustom("stoneOut",true);
            this.node.dispatchEvent(eventParam);
            this.node.x = 0;
        }
    },

    addStoneWithHole:function(holeNum) {
        var stoneNum = 24 - holeNum;
        var topStoneNum = Random.getRandom(1,stoneNum);
        var bommtonStoneNum = stoneNum - topStoneNum;
    }
});
