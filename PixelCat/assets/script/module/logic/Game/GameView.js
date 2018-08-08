const BaseView = require('BaseView')
const Random = require('Random')
const Common = require('Common')
const Singleton = require('Singleton')

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
        coinAudio: {
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
        },
        sumView: {
            default: null,
            type: cc.Node
        },
        curScoreTxt: {
            default: null,
            type: cc.Node
        },
        bestScoreTxt: {
            default: null,
            type: cc.Node
        },
        sumRankBtn: {
            default: null,
            type: cc.Node
        },
        sumRestartBtn: {
            default: null,
            type: cc.Node
        },
        sumShareBtn: {
            default: null,
            type: cc.Node
        },
        rankViewNode: {
            default: null,
            type: cc.Node
        },
        commboTxtNode: {
            default: null,
            type: cc.Node
        },
        newRecordSp: {
            default: null,
            type: cc.Node
        },
        guideView: {
            default: null,
            type: cc.Node
        },
        guideBtn: {
            default: null,
            type: cc.Node
        },
        guideBlinNode: {
            default: null,
            type: cc.Node
        }
    },

    onLoad () {

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
        this.catComponent = this.catNode.getComponent("Cat");
        this.stoneNodeCom1 = this.stoneNode1.getComponent("StoneNode");
        this.stoneNodeCom2 = this.stoneNode2.getComponent("StoneNode");
        this.gameScoreCom = this.scoreTxt.getComponent("ImageLabel");
        this.curScoreCom = this.curScoreTxt.getComponent("ImageLabel");
        this.bestScoreCom = this.bestScoreTxt.getComponent("ImageLabel");
        this.rankViewCom = this.rankViewNode.getComponent("RankView");
        this.commboTxt = this.commboTxtNode.getComponent("ImageLabel");

        this.cfg = Singleton.Config.stage;

        this.isCatDie = false;
        this.startTag = false;
        this.scoreNum = 0;
        this.commboNum = 0;
        this.commboTag = 0;
        this.commboTxtNode.opacity = 0;
        this.stoneNode1.x = this.cfg.stoneStartPosX.value;
    },

    _initScene:function() {

    },

    _initListener:function() {
        this.node.on(cc.Node.EventType.TOUCH_END, this._onMainNodeClick, this);
        this.startBtn.on('click', this._onStartBtnClick, this);
        this.rankBtn.on('click', this._onRankBtnClick, this);
        this.shareBtn.on('click', this._onShareBtnClick, this);
        this.sumRankBtn.on('click', this._onSumRankBtnClick, this);
        this.sumRestartBtn.on('click', this._onSumRestartBtnClick, this);
        this.sumShareBtn.on('click', this._onSumShareBtnClick, this);
        this.guideBtn.on('click',this._onGuideBtnClick, this);
        this.node.on("stoneOut",this._onStoneOut, this);
        this.node.on("catDie",this._onCatDie, this);
        this.node.on("eatGold",this._eatGold, this);
        this.node.on("buileGold",this._buildGold, this);
    },

    _buildGold:function(event) {
        this.commboTag = this.commboTag + 1;
    },

    _eatGold:function(event) {
        this.commboTag = this.commboTag - 1;
        if(this.commboTag==0) {
            this.commboNum = this.commboNum + 1;
        } else {
            this.commboTag = 0;
            this.commboNum = 1;
        }
        var getScore = this.commboNum * 2;
        this.scoreNum = this.scoreNum + getScore;
        this.gameScoreCom.setString(this.scoreNum+"");
        this.coinAudio.play();
        this._showGetScoreEff(getScore);
    },

    _showGetScoreEff:function(score) {
        var extraStr = "";
        if(score==2) {
            extraStr = "a";
        }
        if(score==4) {
            extraStr = "b";
        }
        if(score==6) {
            extraStr = "c";
        }
        if(score==8) {
            extraStr = "d";
        }
        if(score==10) {
            extraStr = "e";
        }
        if(score>=12) {
            extraStr = "f";
        }
        this.commboTxtNode.stopAllActions();
        this.commboTxtNode.opacity = 255;
        this.commboTxtNode.y = this.catNode.y + 87;
        this.commboTxt.setString("+"+score+(extraStr!="" ? " " + extraStr : ""));

        var act1 = cc.moveBy(0.2,0,70);
        var act2 = cc.delayTime(0.5);
        var act3 = cc.spawn(cc.moveBy(0.2,0,30),cc.fadeOut(0.2));
        var act = cc.sequence(act1,act2,act3);
        this.commboTxtNode.runAction(act);
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
        var act1 = cc.moveBy(Number(this.cfg.catjumpTime.value),0,Number(this.cfg.catjumpPix.value));
        this.catNode.runAction(act1);
    },

    _onStartBtnClick:function(event) {
        var self = this;

        this.selectAudio.play();
        var act = cc.blink(0.8, 4);
        this.startBtn.runAction(act);
        setTimeout(function() {
            self.startView.active = false;
            self._showGuideView();
        }.bind(this),1100);
    },

    _onGuideBtnClick:function(event) {
        this.guideView.active = false;
        this._startGame();
    },

    _showGuideView:function() {
        this.guideView.active = true;
        var act = cc.repeatForever(cc.blink(1,2));
        this.guideBlinNode.runAction(act);
    },

    _startGame:function() {
        this.gameScoreCom.setString("0");
        this.scoreTxt.active = true;
        this._onMainNodeClick();
        this.stoneNodeCom1.restartSet();
        this.stoneNodeCom1.addStoneWithHole(Random.getRandom(this.cfg.holeMinSize.value,this.cfg.holeMaxSize.value));
    },

    _onRankBtnClick:function(event) {
        this._showRankView();
    },

    _onShareBtnClick:function(event) {
        this._shareToFriend();
    },

    _onSumShareBtnClick:function(event) {
        this._shareToFriend();
    },

    _onSumRankBtnClick:function(event) {
        this._showRankView();
    },

    _onSumRestartBtnClick:function(event) {
        this.sumView.active = false;
        this._restart();
    },

    _onStoneOut:function(event) {
        var nodeIndex = event.getUserData()["nodeIndex"];
        var nextNodeCom = nodeIndex==1 ? this.stoneNodeCom2 : this.stoneNodeCom1;

        nextNodeCom.addStoneWithHole(Random.getRandom(this.cfg.holeMinSize.value,this.cfg.holeMaxSize.value));

        this.scoreNum = this.scoreNum + 1;
        this.gameScoreCom.setString(this.scoreNum+"");

        var act1 = cc.scaleTo(0.1,1.2);
        var act2 = cc.scaleTo(0.05,1);
        var act  = cc.sequence(act1, act2);
        this.scoreTxt.runAction(act);
    },

    _restart:function() {
        this.isCatDie = false;
        this.startTag = false;
        this.scoreNum = 0;
        this.commboNum = 0;
        this.commboTag = 0;
        this.commboTxtNode.opacity = 0;
        this.gameScoreCom.setString("0");
        this.catComponent.reset();
        this.stoneNodeCom1.restartSet();
        this.stoneNodeCom2.reset();
        this._onMainNodeClick();
        this.stoneNodeCom1.addStoneWithHole(Random.getRandom(this.cfg.holeMinSize.value,this.cfg.holeMaxSize.value));
    },

    _showSumView:function() {
       this.newRecordSp.stopAllActions();
        this.newRecordSp.active = false;
        this.sumView.active = true;
        this.curScoreCom.setString(this.scoreNum + "");

        var historyScore = Number(Common.getHistoryScore());
        this.bestScoreCom.setString(this.scoreNum>historyScore ? this.scoreNum+"" : historyScore+"");
        
        Common.checkScoreAndSave(this.scoreNum);

        if(this.scoreNum>historyScore) {
            this.newRecordSp.active = true;
             var act1 = cc.blink(1,3);
             var act = cc.repeatForever(act1);
             this.newRecordSp.runAction(act);
        }
    },

    _showRankView:function() {
        this.rankViewNode.active = true;
        this.rankViewCom.showRank();
    },

    _shareToFriend:function() {
        if (CC_WECHATGAME) {
            wx.shareAppMessage({
                title: "上上下下左右左右BABA！你还记得这串代码么？",
                imageUrl: "https://shxingwan-down.oss-cn-shenzhen.aliyuncs.com/wechatGame/cocosGameRes/PixelCat/share/miniGame_share_imge.jpg",
            })
        }
        cc.log("share");
    },

    _showCommboEff:function() {

    }
});
