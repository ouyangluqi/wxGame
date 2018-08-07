const BaseView = require('BaseView')
const Random = require('Random')
cc.Class({
    extends: BaseView,

    properties: {
     
        catNode: {
            default: null,
            type: cc.Node
        },
        startView: {
            default: null,
            type: cc.Node
        },
        bgmAudio: {
            default: null,
            type: cc.AudioSource
        },
        selectAudio: {
            default: null,
            type: cc.AudioSource
        },
        tapAudio: {
            default: null,
            type: cc.AudioSource
        },
        lostAudio: {
            default: null,
            type: cc.AudioSource
        },
        startBtn: {
            default: null,
            type: cc.Node
        },
        rankBtn: {
            default: null,
            type: cc.Node
        },
        shareBtn: {
            default: null,
            type: cc.Node
        },
        stoneNode1: {
            default: null,
            type: cc.Node
        },
        stoneNode2: {
            default: null,
            type: cc.Node
        },
        scoreTxt: {
            default: null,
            type: cc.Node
        }
    },

    onLoad () {
        this.isCatDie = false;
    },

    start () {
        this._initThings();
        this._initScene();
        this._initListener();  
    },

    update (dt) {
        
    },

    ///////////////////////////////////////////////////////////
    _initThings:function() {
        this.startTag = false;
        this.catComponent = this.catNode.getComponent("Cat");
        this.stoneNodeCom1 = this.stoneNode1.getComponent("StoneNode");
        this.stoneNodeCom2 = this.stoneNode2.getComponent("StoneNode");
        this.scoreCom = this.scoreTxt.getComponent("ImageLabel");
        this.scoreNum = 0;
    },

    _initScene:function() {

    },

    _initListener:function() {
        this.node.on(cc.Node.EventType.TOUCH_END, this._onMainNodeClick, this);
        this.startBtn.on('click', this._onStartBtnClick, this);
        this.rankBtn.on('click', this._onRankBtnClick, this);
        this.shareBtn.on('click', this._onShareBtnClick, this);
        this.node.on("stoneOut",this._onStoneOut, this);
        this.node.on("catDie",this._onCatDie, this);
    },

    _onCatDie:function(event) {
        this.isCatDie = true;
        this.lostAudio.play();
        this.stoneNodeCom1.stopMove();
        this.stoneNodeCom2.stopMove();
        var self = this;
        setTimeout(function() {
            self._showSumView();
        }.bind(this),1000);
    },

    _onMainNodeClick:function(event) {
        if(this.startView.active==true || this.isCatDie==true) {
            return;
        }
        if(this.startTag==false) {
            this.startTag = true;
            this.catComponent.startTag = true;
        } else {
            this.tapAudio.play();
        }
        this.catComponent.dt = 0;
        var act1 = cc.moveBy(0.1,0,100);
        this.catNode.runAction(act1);
    },

    _onStartBtnClick:function(event) {
        var self = this;

        this.selectAudio.play();
        var act = cc.blink(0.8, 4);
        this.startBtn.runAction(act);
        setTimeout(function() {
            self.startView.active = false;
            self.scoreCom.setString("0");
            self.scoreTxt.active = true;
            self._onMainNodeClick();
            self.stoneNodeCom1.addStoneWithHole(Random.getRandom(5,9));
        }.bind(this),1100);
    },

    _onRankBtnClick:function(event) {

    },

    _onShareBtnClick:function(event) {

    },

    _onStoneOut:function(event) {
        var nodeIndex = event.getUserData()["nodeIndex"];
        var nextNodeCom = nodeIndex==1 ? this.stoneNodeCom2 : this.stoneNodeCom1;

        nextNodeCom.addStoneWithHole(Random.getRandom(5,9));

        this.scoreNum = this.scoreNum + 1;
        this.scoreCom.setString(this.scoreNum+"");

        var act1 = cc.scaleTo(0.1,1.2);
        var act2 = cc.scaleTo(0.05,1);
        var act  = cc.sequence(act1, act2);
        this.scoreTxt.runAction(act);
    },

    _restart:function() {
        this.isCatDie = false;
        this.startTag = false;
        this.scoreNum = 0;
        this.scoreCom.setString("0");
        this.catComponent.reset();
        this.stoneNodeCom1.reset();
        this.stoneNodeCom2.reset();
        this._onMainNodeClick();
        this.stoneNodeCom1.addStoneWithHole(Random.getRandom(5,9));
    },

    _showSumView:function() {
        this._restart();
    }
});
