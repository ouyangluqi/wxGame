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
        goldNode: {
            default: null,
            type: cc.Node
        },
        nodeIndex: 1,
        canMoveTag: false
    },

    onLoad () {
        this.cfg = Singleton.Config.stage;
        this.hasSendMsg = false;
    },

    start () {
        this.topStoneCom = this.topStone.getComponent("Stone");
        this.bottomStoneCom = this.bottomStone.getComponent("Stone");
        this.goldCom = this.goldNode.getComponent("Gold");
    },

    update (dt) {
        if(!this.canMoveTag) {
            return;
        }
        this.node.x -= this.cfg.containerSpeed.value;
        if(this.node.x<(-1*this.cfg.stonePadSize.value) && !this.hasSendMsg){
            var eventParam = new cc.Event.EventCustom("stoneOut",true);
            var eventData = {};
            eventData["nodeIndex"] = this.nodeIndex;
            eventParam.setUserData(eventData);

            this.node.dispatchEvent(eventParam);

            this.hasSendMsg = true;
        }
        if(this.node.x<-810){
            this.reset();
        }
    },

    addStoneWithHole:function(holeNum) {
        var stoneNum = 24 - holeNum;
        var topStoneNum = Random.getRandom(this.cfg.stoneMinHeight.value,stoneNum-this.cfg.stoneMinHeight.value);
        var bommtonStoneNum = stoneNum - topStoneNum;

        this.topStoneCom.setHeight(topStoneNum,-1);
        this.bottomStoneCom.setHeight(bommtonStoneNum,1);

        this.canMoveTag = true;

        this.goldCom.reset();
        this.goldNode.y = -667 + (bommtonStoneNum+holeNum/2)*57;
    },

    stopMove:function() {
        this.canMoveTag = false;
    },

    reset:function() {
        this.canMoveTag = false;
        this.hasSendMsg = false;
        this.node.x = 57;
    },

    restartSet:function() {
        this.reset();
        this.node.x = this.cfg.stoneStartPosX.value;
    }
});
