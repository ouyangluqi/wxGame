const Random = require('Random')
const Singleton = require('Singleton')
const Res = require('Res')

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
        },
        topStone: {
            default: null,
            type: cc.Node
        },
        bottomStone: {
            default: null,
            type: cc.Node
        },
        nodeIndex: 1,
        canMoveTag: false
    },

    onLoad () {
        this.hasSendMsg = false;
    },

    start () {
        this.topStoneCom = this.topStone.getComponent("Stone");
        this.bottomStoneCom = this.bottomStone.getComponent("Stone");
    },

    update (dt) {
        if(!this.canMoveTag) {
            return;
        }
        this.node.x -= 5;
        if(this.node.x<-600 && !this.hasSendMsg){
            var eventParam = new cc.Event.EventCustom("stoneOut",true);
            var eventData = {};
            eventData["nodeIndex"] = this.nodeIndex;
            eventParam.setUserData(eventData);

            this.node.dispatchEvent(eventParam);

            this.hasSendMsg = true;
        }
        if(this.node.x<-950){
            this.reset();
        }
    },

    addStoneWithHole:function(holeNum) {
        var stoneNum = 24 - holeNum;
        var topStoneNum = Random.getRandom(1,stoneNum-1);
        var bommtonStoneNum = stoneNum - topStoneNum;

        this.topStoneCom.setHeight(topStoneNum,-1);
        this.bottomStoneCom.setHeight(bommtonStoneNum,1);

        this.canMoveTag = true;
    },

    stopMove:function() {
        this.canMoveTag = false;
    },

    reset:function() {
        this.canMoveTag = false;
        this.hasSendMsg = false;
        this.node.x = 200;
    }
});
