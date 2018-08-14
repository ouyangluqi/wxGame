const BaseView = require('BaseView')
const Random = require('Random')
const Common = require('Common')
const Singleton = require('Singleton')
const ParamConst = require('ParamConst')
const Res = require('Res');

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
        xingBiTxt: {
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
        sumHomeBtn: {
            default: null,
            type: cc.Node
        },
        rankViewNode: {
            default: null,
            type: cc.Node
        },
        shopBtn: {
            default: null,
            type: cc.Node
        },
        achBtn: {
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
        },
        achNode: {
            default: null,
            type: cc.Node
        },
        achNoteTxt: {
            default: null,
            type: cc.Label
        },
        achRewardTxt: {
            default: null,
            type: cc.Label
        },
        shopView: {
            default: null,
            type: cc.Node
        },
        coinNumTxt: {
            default: null,
            type: cc.Label
        },
        shopBackBtn: {
            default: null,
            type: cc.Node
        },
        achView: {
            default: null,
            type: cc.Node
        },
        achBackBtn: {
            default: null,
            type: cc.Node
        },
        achList: {
            default: null,
            type: cc.Node
        },
        shopList: {
            default: null,
            type: cc.Node
        },
        alertView: {
            default: null,
            type: cc.Node
        },
        alertConfirmBtn: {
            default: null,
            type: cc.Node
        },
        alertCancelBtn: {
            default: null,
            type: cc.Node
        },
        alertTxt: {
            default: null,
            type: cc.Label
        },
        roleShopBtn: {
            default: null,
            type: cc.Node
        },
        itemShopBtn: {
            default: null,
            type: cc.Node
        },
        gameItemContainer: {
            default: null,
            type: cc.Node
        },
        magentEff: {
            default: null,
            type: cc.Node
        },
        shieldEff: {
            default: null,
            type: cc.Node
        },
        adAlert: {
            default: null,
            type: cc.Node
        },
        adCancelBtn: {
            default: null,
            type: cc.Node
        },
        adGotoBtn: {
            default: null,
            type: cc.Node
        },
        adLeftTimeBtn: {
            default: null,
            type: cc.Node
        },
        tipNode: {
            default: null,
            type: cc.Node
        },
        tipStr: {
            default: null,
            type: cc.Label
        }
    },

    onLoad () {
        window.Global = {
            itemMagnetTag: false,
            itemShieldTag: false,
            skinMagnetTag: false,
        };
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
        this.adLeftTimeCom = this.adLeftTimeBtn.getComponent("ImageLabel");
        this.xingBiCom = this.xingBiTxt.getComponent("ImageLabel");
        this.rankViewCom = this.rankViewNode.getComponent("RankView");
        this.commboTxt = this.commboTxtNode.getComponent("ImageLabel");
        this.catCom = this.catNode.getComponent("FrameAnimation");
        this.roleShopSprite = this.roleShopBtn.getComponent(cc.Sprite);
        this.itemShopSprite = this.itemShopBtn.getComponent(cc.Sprite);

        this.cfg = Singleton.Config.stage;
        this.ach = Singleton.Config.ach;
        this.shop = Singleton.Config.shop;
        this.share = Singleton.Config.share;

        this.isCatDie = false;
        this.startTag = false;
        this.scoreNum = 0;
        this.commboNum = 0;
        this.commboTag = 0;
        this.commboTxtNode.opacity = 0;
        this.stoneNode1.x = this.cfg.stoneStartPosX.value;
        var catSkin = Common.getDataCountStr(ParamConst.countKeyRoleSkin);
        var skinSpeed = 0;
        this.shop.role.forEach(element => {
            if(element.framePre == catSkin) {
                skinSpeed = element.frameSpeed;
            }
        });
        this.catCom.framePre = catSkin;
        this.catCom.speed = skinSpeed;
        this.buffList = [];
        this.magnetLoopKey = -1;
        this.skinLoopKey = -1;
        this.adLeftKey = -1;
    },

    _initScene:function() {
        var date = new Date();
        var curDate = date.getDate();
        var lastLoginDate = Common.getDataCount(ParamConst.countKeyLoginDate);
        if(curDate!=lastLoginDate) {
            this._countDataAndCheckAch(ParamConst.countKeyLogin, 1);
            Common.setDataCount(ParamConst.countKeyLoginDate,curDate);
            //登录第二天送白猫
            if(Common.getDataCount(ParamConst.countKeyLogin)==2) {
                Common.setDataCount(ParamConst.countKeyRoleWhite,1);
            }
        }
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
        this.achBtn.on('click',this._onAchBtnClick, this);
        this.shopBackBtn.on('click',this._onShopBackBtnClick, this);
        this.shopBtn.on('click',this._onShopBtnClick, this);
        this.achBackBtn.on('click',this._onAchBackBtnClick, this);
        this.sumHomeBtn.on('click',this._onSumHomeBtnClick, this);
        this.alertConfirmBtn.on('click',this._onAlertComfirmBtnClick, this);
        this.alertCancelBtn.on('click',this._onAlertCancelBtnClick, this);
        this.roleShopBtn.on('click',this._onRoleShopBtnClick, this);
        this.itemShopBtn.on('click',this._onItemShopBtnClick, this);
        this.adCancelBtn.on('click',this._onAdCancelBtnClick, this);
        this.adGotoBtn.on('click',this._onAdGotoBtnClick, this);


        this.node.on("stoneOut",this._onStoneOut, this);
        this.node.on("catDie",this._onCatDie, this);
        this.node.on("eatGold",this._eatGold, this);
        this.node.on("buileGold",this._buildGold, this);
        this.node.on("changeSkin",this._changeSkin, this);
        this.node.on("buyItem",this._buyItem, this);
        this.node.on("addBuff",this._addBuffCallBack, this);
        this.node.on("removeBuff",this._removeBuffCallBack, this);
        this.node.on("useShield",this._useShield,this);
        this.node.on("showItemShopByGameItem",this._showItemShopByGameItem,this)
    },

    _onAdCancelBtnClick:function() {
        if(this.adLeftKey!=-1) {
            clearInterval(this.adLeftKey);
            this.adLeftKey = -1;
            this.adAlert.active = false;
        }
    },

    _onAdGotoBtnClick:function() {

    },

    _showItemShopByGameItem:function() {
        this.shopView.active = true;
        this._onItemShopBtnClick();
    },

    _useShield:function() {
        Global.itemShieldTag = false;
        this.shieldEff.active = false;
    },

    _addBuffCallBack:function(event) {
        var buffType = event.getUserData()["buffType"];
        this._addBuff(buffType);
        if(buffType == ParamConst.buffItemMagnet) {
            this.magentEff.active = true;
        } else if (buffType == ParamConst.buffItemShield) {
            this.shieldEff.active = true;
        }
    },

    _removeBuffCallBack:function(event) {
        var buffType = event.getUserData()["buffType"];
        this._removeBuff(buffType);
        if(buffType == ParamConst.buffItemMagnet) {
            this.magentEff.active = false;
        } else if (buffType == ParamConst.buffItemShield) {
            this.shieldEff.active = false;
        }
    },

    _onRoleShopBtnClick:function() {
        var self = this;
        cc.loader.loadRes("atlas/gameRes/gameRes", cc.SpriteAtlas, function(err, atlas) {
            self.roleShopSprite.spriteFrame = atlas.getSpriteFrame("shopItem_selected");
            self.itemShopSprite.spriteFrame = atlas.getSpriteFrame("shopItem"); 
        });
        this._showRoleShop();
        this.curShopType = "Role";
    },

    _onItemShopBtnClick:function() {
        var self = this;
        cc.loader.loadRes("atlas/gameRes/gameRes", cc.SpriteAtlas, function(err, atlas) {
            self.roleShopSprite.spriteFrame = atlas.getSpriteFrame("shopItem");
            self.itemShopSprite.spriteFrame = atlas.getSpriteFrame("shopItem_selected"); 
        });
        this._showItemShop();
        this.curShopType = "Item";
    },

    _buyItem:function(event) {
        var cfg = event.getUserData()["cfg"];
        this.buyCfg = cfg;
        this.alertView.active = true;
        this.alertTxt.string = "确认花费"+cfg.price+"星币购买"+cfg.name+"吗?";
    },

    _onAlertComfirmBtnClick:function(event) {
        this.alertView.active = false;
        var coinNum = Common.getDataCount(ParamConst.countKeyXGold);
        var price = this.buyCfg.price;
        if(coinNum>=price) {
            var storeNum = Common.getDataCount(this.buyCfg.key);
            storeNum = storeNum + 1;
            Common.setDataCount(this.buyCfg.key,storeNum);
            Common.setDataCount(ParamConst.countKeyXGold, (coinNum-price));

            if(this.curShopType=="Role") {
                this.catCom.framePre = this.buyCfg.framePre;
                this.catCom.speed = this.buyCfg.frameSpeed;
                Common.setDataCount(ParamConst.countKeyRoleSkin, this.buyCfg.framePre);
                this._showRoleShop();
            } else if (this.curShopType=="Item") {
                this._showItemShop();
            }
        } else {
            this._showTip("货币不足");
        }
    },  

    _onAlertCancelBtnClick:function(event) {
        this.alertView.active = false;
        this.buyCfg = null;
    },

    _onSumHomeBtnClick:function(event) {
        this.sumView.active = false;
        this._reset();
        this.startView.active = true;
    },

    _changeSkin:function(event) {
        var skin = event.getUserData()["skin"];
        var speed = event.getUserData()["speed"];
        this.catCom.framePre = skin;
        this.catCom.speed = speed;
        Common.setDataCount(ParamConst.countKeyRoleSkin, skin);
        this._showRoleShop();
    },  

    _onAchBtnClick:function(event) {
        this.achView.active = true;
        this._drawAchView();
    },

    _onAchBackBtnClick:function(event) {
        this.achView.active = false;
    },

    _onShopBtnClick:function(event) {
        this.shopView.active = true;
        this._onRoleShopBtnClick()
    },

    _onShopBackBtnClick:function(event) {
        this.shopView.active = false;
        if(this.guideView.active==true) {
            this._showGameItem();
        }
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
        this._countDataAndCheckAch(ParamConst.countKeyTotalScore, getScore);
        this._countDataAndCheckAch(ParamConst.countKeyMaxScore, this.scoreNum);
        this.coinAudio.play();
        this._showGetScoreEff(getScore);
        this._countDataAndCheckAch(ParamConst.countKeyTotalCoin, 1);
        this._countDataAndCheckAch(ParamConst.countKeyCommboNum, this.commboNum);
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
        this._showGameItem();
    },

    _startGame:function() {
        this._checkBuff();
        this.gameScoreCom.setString("0");
        this.scoreTxt.active = true;
        this._onMainNodeClick();
        this.stoneNodeCom1.restartSet();
        this.stoneNodeCom1.addStoneWithHole(Random.getRandom(this.cfg.holeMinSize.value,this.cfg.holeMaxSize.value));
    },

    
    _checkBuff:function() {
        this.buffList.forEach(element => {
            if(element==ParamConst.buffItemMagnet) {
                this.magentEff.active = true;
                Global.itemMagnetTag = true;
                var self = this;
                this.magnetLoopKey = setTimeout(function() {
                    self.magnetLoopKey = -1;
                    Global.itemMagnetTag = false;
                    this.magentEff.active = false;
                }.bind(this),30000);
            } else if (element==ParamConst.buffItemShield) {
                this.shieldEff.active = true;
                Global.itemShieldTag = true;
            }
        });
        var skin = Common.getDataCountStr(ParamConst.countKeyRoleSkin);
        if(skin=="cat_fish") {
            this.magentEff.active = true;
            Global.itemMagnetTag = true;
            var self = this;
            this.magnetLoopKey = setTimeout(function() {
                self.magnetLoopKey = -1;
                Global.itemMagnetTag = false;
                this.magentEff.active = false;
            }.bind(this),30000);
            this.skinLoopKey = setInterval(function() {
                self.magentEff.active = true;
                Global.itemMagnetTag = true;
                self.magnetLoopKey = setTimeout(function() {
                    self.magnetLoopKey = -1;
                    Global.itemMagnetTag = false;
                    self.magentEff.active = false;
                }.bind(self),30000);
            }.bind(this),60000);
        }
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
        this._countDataAndCheckAch(ParamConst.countKeyTotalScore, 1);
        this._countDataAndCheckAch(ParamConst.countKeyMaxScore, this.scoreNum);

        var act1 = cc.scaleTo(0.1,1.2);
        var act2 = cc.scaleTo(0.05,1);
        var act  = cc.sequence(act1, act2);
        this.scoreTxt.runAction(act);
    },

    _restart:function() {
        this._reset();
        this._showGuideView();
    },

    _reset:function() {
        this.buffList = [];
        Global.itemMagnetTag = false;
        Global.itemShieldTag = false;
        Global.skinMagnetTag = false;
        this.magentEff.active = false;
        this.shieldEff.active = false;
        this.isCatDie = false;
        this.startTag = false;
        this.scoreNum = 0;
        this.commboNum = 0;
        this.commboTag = 0;
        this.commboTxtNode.opacity = 0;
        this.gameScoreCom.setString("");
        this.catComponent.reset();
        this.stoneNodeCom1.restartSet();
        this.stoneNodeCom2.reset();
        this.catComponent.startTag = false;
        if(this.magnetLoopKey!=-1) {
            clearTimeout(this.magnetLoopKey);
            this.magnetLoopKey = -1;
            this.magentEff.active = false;
        }
        if(this.skinLoopKey!=-1) {
            clearInterval(this.skinLoopKey);
            this.skinLoopKey = -1;
        }
    },

    _showSumView:function() {
        this.newRecordSp.stopAllActions();
        this.newRecordSp.active = false;
        this.sumShareBtn.stopAllActions();
        this.sumView.active = true;
        this.curScoreCom.setString(this.scoreNum + "");

        var historyScore = Number(Common.getHistoryScore());
        this.bestScoreCom.setString(this.scoreNum>historyScore ? this.scoreNum+"" : historyScore+"");

        var act1 = cc.scaleTo(0.4,1.05);
        var act2 = cc.scaleTo(0.4,0.95);
        this.sumShareBtn.runAction(cc.repeatForever(cc.sequence(act1,act2)));
        
        Common.checkScoreAndSave(this.scoreNum);

        if(this.scoreNum>historyScore) {
            this.newRecordSp.active = true;
             var act1 = cc.blink(1,3);
             var act = cc.repeatForever(act1);
             this.newRecordSp.runAction(act);
        }

        if(this.scoreNum>=50) {
            var getGold = 1;
            var storeGold = Common.getDataCount(ParamConst.countKeyXGold);
            getGold = getGold + Math.round(this.scoreNum/100);
            this.xingBiCom.setString(getGold+"");
            getGold = getGold + storeGold;

            Common.setDataCount(ParamConst.countKeyXGold, getGold);
        } else {
            this.xingBiCom.setString("0");
        }

        //this._showAdAlert();
    },

    _showRankView:function() {
        this.rankViewNode.active = true;
        this.rankViewCom.showRank();
    },

    _shareToFriend:function() {
        if (CC_WECHATGAME) {
            var cfg = this.share.wxshare;
            var indexValue = Random.getRandom(1,cfg.length);

            wx.shareAppMessage({
                title: cfg[indexValue].title,
                imageUrl: cfg[indexValue].imageUrl,
            })
        }
        this._countDataAndCheckAch(ParamConst.countKeyShare, 1);
    },

    /*
    countKeyLogin: "login",
    countKeyMaxScore: "maxScore",  value
    countKeyCommboNum: "commboNum", value
    countKeyTotalScore: "totalScore", 1
    countKeyTotalCoin: "totalCoin", 1
    countKeyShare: "share",*/
    _countDataAndCheckAch:function(countKey,countValue) {
        switch (countKey) {
            //登录
            case ParamConst.countKeyLogin:
                this._doCheckLogicAddCompare(countKey,countValue);
            break;

            //最高分数
            case ParamConst.countKeyMaxScore:
                this._doCheckLogicCompare(countKey,countValue);
            break;

            //连击总数
            case ParamConst.countKeyCommboNum:
                this._doCheckLogicCompare(countKey,countValue);
            break;

            //总分数
            case ParamConst.countKeyTotalScore:
                this._doCheckLogicAddCompare(countKey,countValue);
            break;

            //总金币数
            case ParamConst.countKeyTotalCoin:
                this._doCheckLogicAddCompare(countKey,countValue);
            break;

            //分享次数
            case ParamConst.countKeyShare:
                this._doCheckLogicAddCompare(countKey,countValue);
            break;

            default:
                break;
        }
    },

    _doCheckLogicCompare:function(countKey,countValue) {
        var nextAchData = this.getNextAchData(countKey);
        if(nextAchData==null) {
            return;   
        }

        if(countValue>=nextAchData.value) {
            this._reachNewAch(countKey, nextAchData.index);
        }
    },

    _doCheckLogicAddCompare:function(countKey,countValue) {
        var nextAchData = this.getNextAchData(countKey);
        if(nextAchData==null) {
            return;   
        }

        var storeValue = Common.getDataCount(countKey);
        var newValue = storeValue+Number(countValue);
        Common.setDataCount(countKey, newValue);
        if(newValue>=nextAchData.value) {
            this._reachNewAch(countKey, nextAchData.index)
        }
    },

    getNextAchData:function(achKey) {
        var achData = {
            "index":0,
            "value":0
        };
        var curAchIndex = Common.getAchIndex(achKey);
        var nextAchIndex = 0;
        
        if(curAchIndex==-1) {
            nextAchIndex = 0;
        } else {
            var achLen = this.ach[achKey].detail.length;
            if(curAchIndex<achLen-1) {
                nextAchIndex = curAchIndex+1;
            } else {
                nextAchIndex = -1;
            }
        }

        if(nextAchIndex==-1) {
            achData = null;
        } else {
            achData.index = nextAchIndex;
            achData.value = this.ach[achKey].detail[nextAchIndex].value;
        }

        return achData;
    },

    //达成新成就
    _reachNewAch:function(achKey,achIndex) {
        Common.setAchIndex(achKey,achIndex);

        var achData = this.ach[achKey].detail[achIndex];
        this.achNoteTxt.string = achData.note;
        this.achRewardTxt.string = "+"+achData.reward;

        var gold = Common.getDataCount(ParamConst.countKeyXGold);
        gold = gold + Number(achData.reward);
        Common.setDataCount(ParamConst.countKeyXGold, gold);

        this.achNode.stopAllActions();
        this.achNode.opacity = 255;
        this.achNode.x = -400;

        var act1 = cc.moveBy(0.5,400,0);
        var act2 = cc.delayTime(2);
        var act3 = cc.moveBy(0.5,-400,0);
        var act = cc.sequence(act1,act2,act3);
        this.achNode.runAction(act);
    },

    _drawAchView:function() {
        this.achList.removeAllChildren();

        var achIndexLogin = Common.getAchIndex(ParamConst.countKeyLogin);
        var achIndexMaxScore = Common.getAchIndex(ParamConst.countKeyMaxScore);
        var achIndexCommboNum = Common.getAchIndex(ParamConst.countKeyCommboNum);
        var achIndexTotalScore = Common.getAchIndex(ParamConst.countKeyTotalScore);
        var achIndexTotalCoin = Common.getAchIndex(ParamConst.countKeyTotalCoin);
        var achIndexShare = Common.getAchIndex(ParamConst.countKeyShare);

        var countKeyLogin = Common.getDataCount(ParamConst.countKeyLogin);
        var countKeyMaxScore = Common.getDataCount(ParamConst.countKeyMaxScore);
        var countKeyCommboNum = Common.getDataCount(ParamConst.countKeyCommboNum);
        var countKeyTotalScore = Common.getDataCount(ParamConst.countKeyTotalScore);
        var countKeyTotalCoin = Common.getDataCount(ParamConst.countKeyTotalCoin);
        var countKeyShare = Common.getDataCount(ParamConst.countKeyShare);

        var loginCfg = this.ach.login.detail;
        var maxScoreCfg = this.ach.maxScore.detail;
        var commboNumCfg = this.ach.commboNum.detail;
        var totalScoreCfg = this.ach.totalScore.detail;
        var totalCoinCfg = this.ach.totalCoin.detail;
        var shareCfg = this.ach.share.detail;

        var dataArr = [];
        var curArr = [];
        var doneArr = [];
        //创建未完成标题
        var curTitleData = {};
        curTitleData.type = 1;
        curTitleData.cfg = "未完成";
        dataArr[0] = curTitleData;

        //创建成就数据
        this._getAchData(curArr,doneArr,loginCfg,achIndexLogin,countKeyLogin);
        this._getAchData(curArr,doneArr,maxScoreCfg,achIndexMaxScore,countKeyMaxScore);
        this._getAchData(curArr,doneArr,commboNumCfg,achIndexCommboNum,countKeyCommboNum);
        this._getAchData(curArr,doneArr,totalScoreCfg,achIndexTotalScore,countKeyTotalScore);
        this._getAchData(curArr,doneArr,totalCoinCfg,achIndexTotalCoin,countKeyTotalCoin);
        this._getAchData(curArr,doneArr,shareCfg,achIndexShare,countKeyShare);

        //添加未完成成就
        dataArr = dataArr.concat(curArr);

        //创建已完成标题
        var doneTitleData = {};
        doneTitleData.type = 1;
        doneTitleData.cfg = "已完成";
        dataArr[dataArr.length] = doneTitleData;

        //添加已完成成就
        dataArr = dataArr.concat(doneArr);

        var dataArrLen = dataArr.length;
        var achItemPrefab = Singleton.PrefabLoader.getRes(Res.PREFAB_ACH_ITEM_PATH);
        for (let index = 0; index < dataArrLen; index++) {
            var prefabNode = cc.instantiate(achItemPrefab);
            var prefabCom = prefabNode.getComponent("AchItem");
            this.achList.addChild(prefabNode);
            prefabCom.setData(dataArr[index]);
        }
    },

    _getAchData:function(outCurArr, outDoneArr, cfgData, curIndex, curCount) {
        var cfgLen = cfgData.length;
        for (let index = 0; index < cfgLen; index++) {
            if(index==curIndex+1) {
                var curData = {};
                curData.type = 2;
                curData.cfg = cfgData[index];
                curData.process = curCount;
                outCurArr[outCurArr.length] = curData;
            }
            if(index<=curIndex) {
                var doneData = {};
                doneData.type = 3;
                doneData.cfg = cfgData[index];
                outDoneArr[outDoneArr.length] = doneData;
            }
        }
    },

    _showRoleShop:function() {
        this.shopList.removeAllChildren();

        var dataArr = [];
        this.shop.role.forEach(element => {
            var data = {};
            data.type = "role",
            data.cfg = element;
            dataArr[dataArr.length] = data;
        });

        var dataArrLen = dataArr.length;

        var shopItemPrefab = Singleton.PrefabLoader.getRes(Res.PREFAB_SHOP_ITEM_PATH);
        for (let index = 0; index < dataArrLen; index++) {
            var prefabNode = cc.instantiate(shopItemPrefab);
            var prefabCom = prefabNode.getComponent("ShopItem");
            this.shopList.addChild(prefabNode);
            prefabCom.setData(dataArr[index]);
        }

        var curGold = Common.getDataCount(ParamConst.countKeyXGold);
        this.coinNumTxt.string = curGold;
    },

    _showItemShop:function() {
        this.shopList.removeAllChildren();

        var dataArr = [];
        this.shop.item.forEach(element => {
            var data = {};
            data.type = "item",
            data.cfg = element;
            dataArr[dataArr.length] = data;
        });

        var dataArrLen = dataArr.length;

        var goodsItemPrefab = Singleton.PrefabLoader.getRes(Res.PREFAB_GOODS_ITEM_PATH);
        for (let index = 0; index < dataArrLen; index++) {
            var prefabNode = cc.instantiate(goodsItemPrefab);
            var prefabCom = prefabNode.getComponent("GoodsItem");
            this.shopList.addChild(prefabNode);
            prefabCom.setData(dataArr[index]);
        }

        var curGold = Common.getDataCount(ParamConst.countKeyXGold);
        this.coinNumTxt.string = curGold;
    },

    _addBuff:function(buffType) {
        this.buffList[this.buffList.length] = buffType;
    },

    _removeBuff:function(buffType) {
        var newBuffArr = [];
        this.buffList.forEach(element => {
            if(element!=buffType) {
                var leftBuff = element;
                newBuffArr[newBuffArr.length] = leftBuff;
            }
        });
        this.buffList = newBuffArr;
    },

    _checkHasBuff:function(buffType) {
        this.buffList.forEach(element => {
            if(element==buffType) {
                return true;
            }
        });
        return false;
    },

    _showGameItem:function() {
        this.gameItemContainer.removeAllChildren();
        var gameItemPrefab = Singleton.PrefabLoader.getRes(Res.PREFAB_GAME_ITEM_PATH);
        this.shop.item.forEach(element => {
            var prefabNode = cc.instantiate(gameItemPrefab);
            var prefabCom = prefabNode.getComponent("GameItem");
            prefabCom.setData(element);
            this.gameItemContainer.addChild(prefabNode);
        });
    },

    _showAdAlert:function() {
        this.adAlert.active = true;
        var leftTime = 10;
        var self = this;
        this.adLeftTimeCom.setString(leftTime+"");
        this.adLeftKey = setInterval(function() {
            leftTime = leftTime - 1;
            if(leftTime>=0) {
                this.adLeftTimeCom.setString(leftTime+"");            
            } else {
                clearInterval(this.adLeftKey);
                this.adLeftKey = -1;
                this.adAlert.active = false;
            }
        }.bind(this),1000);
    },

    _showTip:function(str) {
        this.tipNode.stopAllActions();
        this.tipNode.opacity = 255;
        this.tipNode.active = true;
        this.tipStr.string = str;
        this.tipNode.runAction(cc.sequence(cc.delayTime(0.8), cc.fadeOut(0.5)));
    }
});
