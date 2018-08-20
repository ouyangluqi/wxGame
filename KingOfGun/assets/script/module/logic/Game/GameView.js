const BaseView = require('BaseView')
const Singleton = require('Singleton')
const Log = require('Log')
const Random = require('Random')
const Res = require('Res')
const Common = require('Common')
const Scene = require('Scene')

var GameView = cc.Class({
    extends: BaseView,

    properties: {
        background: {
            name: "游戏背景",
            default: null,
            type: cc.Sprite
        },
        curScoreTxt: {
            name: "当前分数",
            default: null,
            type: cc.Label
        },
        historyScoreTxt: {
            name: "历史最高分数",
            default: null,
            type: cc.Label
        },
        adBtn: {
            name: "广告按钮",
            default: null,
            type: cc.Button
        },
        bulletLeftNumTxt: {
            name: "子弹剩余数量",
            default: null,
            type: cc.Label
        },
        adContainer: {
            name: "广告载体",
            default: null,
            type: cc.Node
        },
        bottleNumTxt: {
            name: "瓶子剩余数量",
            default: null,
            type: cc.Label
        },
        stagePassNode: {
            name: "关卡动画",
            default: null,
            type: cc.Node
        },
        stagePassContainer: {
            name: "关卡载体",
            default: null,
            type: cc.Node
        },
        commobNumNode: {
            name: "连击动画",
            default: null,
            type: cc.Node
        },
        sumViewBg: {
            name: "结算界面背景",
            default: null,
            type: cc.Node
        },
        sumView: {
            name: "结算界面",
            default: null,
            type: cc.Node
        },
        restartBtn: {
            name: "再来一次按钮",
            default: null,
            type: cc.Button
        },
        challgeBtn: {
            name: "挑战好友按钮",
            default: null,
            type: cc.Button
        },
        homeBtn: {
            name: "返回主界面按钮",
            default: null,
            type: cc.Button
        },
        sumScoreTxt: {
            name: "结算界面分数",
            default: null,
            type: cc.Label
        },
        gunNode: {
            default: null,
            type: cc.Node
        },
        bulletNode: {
            default: null,
            type: cc.Node
        },
        leftTopNode: {
            default: null,
            type: cc.Node  
        },
        rightTopNode: {
            default: null,
            type: cc.Node
        },
        centerTopNode: {
            default:null,
            type: cc.Node
        },
        lvdaiUpNode: {
            default:null,
            type: cc.Node
        },
        lvdaiDownNode: {
            default:null,
            type: cc.Node
        },
        itemUpContainer: {
            default:null,
            type: cc.Node
        },
        itemDownContainer: {
            default:null,
            type: cc.Node
        },
        gunAudio: {
            type: cc.AudioSource,
            default: null
        },
        bgmAudio: {
            type: cc.AudioSource,
            default: null
        },
        brokeAudio: {
            type: cc.AudioSource,
            default: null
        },
        rankSprite: {
            default: null,
            type: cc.Sprite
        },
        guideNode: {
            default:null,
            type: cc.Node
        },
        bulletLineNode: {
            default:null,
            type: cc.Node
        },
        brokeContainerUp: {
            default:null,
            type: cc.Node
        },
        brokeContainerDown: {
            default:null,
            type: cc.Node
        },
        bulletTagSprite: {
            default:null,
            type: cc.Node
        },
        tipNode:{
            default:null,
            type: cc.Node
        },
        tipStr:{
            default:null,
            type: cc.Label
        },
        adView:{
            default:null,
            type:cc.Node
        },
        adVideoBtn:{
            default:null,
            type:cc.Node
        },
        adShareBtn:{
            default:null,
            type:cc.Node
        },
        adCloseBtn:{
            default:null,
            type:cc.Node
        },
        adVideoLeftTimeTxt: {
            default:null,
            type:cc.Label
        },
        adShareLeftTimeTxt: {
            default:null,
            type:cc.Label
        },
        adMsgTxt:{
            default:null,
            type:cc.Label
        },
        newRecordView:{
            default:null,
            type:cc.Node
        },
        reCancleBtn:{
            default:null,
            type:cc.Node
        },
        reShareBtn:{
            default:null,
            type:cc.Node
        },

        isBulletNoLimit : false,
        isTimeNoLimit : false,
        leftBulletNum : 0,
        curStage : 1,
        commobNum : 0,
        commobTag : 0,
        rankTex : false,
        summingTag : false,
        commobNumTxt: false,
        stagePassTxt: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self = this;
        this._getComponent();
        this._initScene();
        this._initListener();
        var windowSize=cc.view.getVisibleSize();
        Log.logD("ScreenWidth:"+windowSize.width+"  ScreenHeight:"+windowSize.height);
    },

    start () {
        this.bgmAudio.volume = 0.1;
        this._checkBgmAudio();
        if(Common.hasShowGuideTag==false) {
            this.summingTag = true;
            this.guideNode.active = true;
        } else {
            this._loadStage(this.curStage);
        }
        Common.hasShowGuideTag=true;


        if(CC_WECHATGAME) {
            wx.showShareMenu();
            wx.onShareAppMessage(function () {
                // 用户点击了“转发”按钮
                return {
                  title: '我的分数超过了本群99%的人，快来挑战我吧'
                }
            })
        }
    },

    onDestroy () {

    },

    update (dt) {
        if(this.summingTag) {
            this._updateSubDomainCanvas();
        } 
    },

    // up 生命周期函数
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // down 游戏逻辑

    _getComponent:function() {
        this.commobNumTxt = this.commobNumNode.getComponent("ImageLabel");
        this.stagePassTxt = this.stagePassNode.getComponent("ImageLabel");
    },

    //初始化函数
    _initScene: function() {
        /*
        1、读取关卡配置
        2、初始化数据  子弹数目  分数统计  对象池初始化
        3、loadStage()  {1、清空画布、变量   2、绘制关卡}
        4、结束画面
        5、restart()
        */
       this.lvdaiUpNode.active = false;
       this.lvdaiDownNode.active = false;
       this.itemUpContainer.removeAllChildren();
       this.itemDownContainer.removeAllChildren();
       this.itemUpContainer.active = false;
       this.itemDownContainer.active = false;

       this.historyScoreTxt.string = Common.getHistoryScore();
       this.curScoreTxt.string = 0;
       this.leftBulletNum = 0;
       this.commobNum = 0;

       this.isBulletNoLimit = false,
       this.isTimeNoLimit = false,
       this.leftBulletNum = 0,
       this.curStage = 1,
       this.commobNum = 0,
       this.commobTag = 0,

       this.videoAd = null,
       this.share = Singleton.Config.share;
    },

    //初始化监听
    _initListener: function() {
         //注册鼠标点击事件
        var self = this;
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            if(self.summingTag){
                return;
            }
            self.bulletNode.scale = 1
            setTimeout(function() {
                self.bulletNode.scale = 0;
            }.bind(self),20);
            if (self.isBulletNoLimit==false && self.leftBulletNum>0) {
                self.leftBulletNum = self.leftBulletNum - 1;
                self.bulletLeftNumTxt.string = self.leftBulletNum;
                if(self.leftBulletNum<=5) {
                    var act1 = cc.fadeOut(0.1);
                    var act2 = cc.fadeIn(0.1);
                    var act3 = cc.sequence(act1,act2);
                    self.bulletTagSprite.runAction(cc.repeatForever(act3));
                }
                if(self.leftBulletNum<=0) {
                    self.bulletTagSprite.stopAllActions();
                    self.bulletTagSprite.opacity = 255;
                    if(self.adLeftTime>0 || self.shareLeftTime>0) {
                        self._showAdView("还有复活次数没用完，是否使用？",true);
                    } else {
                        self._showSumView();
                    }
                }
            }

            self._showGunEff();
            self._showGunAction();
            if(Common.canPlayAudioTag){
                self.gunAudio.play();
            }
            self.commobTag += 1;
        });

        //注册目标被击中事件监听
        this.node.on("hitTarget",function(event){
            self.brokeAudio.play();
            var lifeNum = event.getUserData()["lifeNum"];
            var itemId = event.getUserData()["itemId"];
            var parentIndex = event.getUserData()["parentIndex"];

            var brokerContainer = parentIndex == 1 ? self.brokeContainerUp : self.brokeContainerDown;
            var prefabAsset = Singleton.PrefabLoader.getRes("prefab/effect/eff_broke"+itemId+"_"+lifeNum);
            if (prefabAsset) {
                var go = cc.instantiate(prefabAsset)
                go.parent = brokerContainer;
            }

            if (lifeNum == 0) {
                var leftNum = self.bottleNumTxt.string;
                self.bottleNumTxt.string = leftNum - 1;
                if (leftNum<=1) {
                    self.bottleNumTxt.string = leftNum - 1;
                    self.curStage += 1;
                    self.curStage = self.curStage>20 ? 20 : self.curStage;
                    self._loadStage(self.curStage);
                }
            }

            self.commobTag -= 1;

            if (self.commobTag <= 0) {
                self.commobNum += 1;    
                self.commobTag = 0;        
            } else {
                self.commobNum = 1;
                self.commobTag = 0;
            }

            self._showCommobEff(self.commobNum);

            self.curScoreTxt.string = self.curScoreTxt.string + self.commobNum;
        });

        //注册打中炸弹事件监听
        this.node.on("hitBoom",function(event){
            self._showSumView();
        })

        //注册按钮监听事件
        this.restartBtn.node.on('click', this._onRestartBtnClick, this);
        this.challgeBtn.node.on('click', this._onChanngleBtnClick, this);
        this.homeBtn.node.on('click', this._onHomeBtnClick, this);
        this.adBtn.node.on('click', this._adBtnClick, this);
        this.adVideoBtn.on('click', this._adVideoBtnClick, this);
        this.adShareBtn.on('click', this._adShareBtnClick, this);
        this.adCloseBtn.on('click', this._adCloseBtnClick, this);
        this.reCancleBtn.on('click',this._reCancleBtnClick, this);
        this.reShareBtn.on('click',this._reShareBtnClick, this);

        //注册引导页点击事件
        this.guideNode.on(cc.Node.EventType.TOUCH_END, this._onGuideNodeClick, this);
    },

    _reCancleBtnClick:function(event) {
        this.newRecordView.active = false;
    },

    _reShareBtnClick:function(event) {
        this._shareToFriend(9);
        this.newRecordView.active = false;
    },

    _adCloseBtnClick:function(event) {
        this.adView.active = false;
        if(this.adCloseOpenSumTag) {
            this._showSumView();
        }
    },

    _adVideoBtnClick:function(event) {
        //////////////////////////
        // this._showTip("暂未开放");
        // return;
        //////////////////////////
        if(this.adLeftTime>0) {
            if(CC_WECHATGAME) {
                var self = this;
                if(this.videoAd==null) {
                    this.videoAd = wx.createRewardedVideoAd({
                        adUnitId: 'adunit-e25ae0ff433ac212'
                    });
                    this.videoAd.onClose(res=>{
                        if(res && res.isEnded || res === undefined) {
                            self.adLeftTime = self.adLeftTime - 1;
                            self.leftBulletNum = self.leftBulletNum + 10;
                            this.bulletLeftNumTxt.string = this.leftBulletNum;
                            self._showTip("成功获得10颗子弹")
                            self.adView.active = false;
                        }
                    });
                    this.videoAd.onError((e)=>{
                        self._showTip("视频观看失败")
                        Log.logE("code:" + e.errCode + " msg:" + e.errMsg);
                    });
                }

                this.videoAd.load().then(() => {
                    self.videoAd.show();
                }).catch(err => {
                    Log.logD(err.errMsg);
                })
            } else {
                this.adLeftTime = this.adLeftTime - 1;
                this.leftBulletNum = this.leftBulletNum + 10;
                this.bulletLeftNumTxt.string = this.leftBulletNum;
                this._showTip("成功获得10颗子弹")
                if(this.adView.active == true) {
                    this.adView.active = false;
                }
            }
        } else {
            this._showTip("本局次数已用完");
        }
    },

    _adShareBtnClick:function(event) {
        if(this.shareLeftTime>0) {
            this.shareLeftTime = this.shareLeftTime - 1;
            this.adView.active = false;
            this.leftBulletNum = this.leftBulletNum+10;
            this.bulletLeftNumTxt.string = this.leftBulletNum;
            this._showTip("成功获得10颗子弹")
            this._shareToFriend(8);
        } else {
            this._showTip("本局次数已用完")
        }
    },

    _adBtnClick:function(event) {
        if(this.curStage<3) {
            this._showTip("第三关开始可以获得额外子弹");
            return;
        }
        if(this.adLeftTime>0 || this.shareLeftTime>0) {
            this._showAdView("获得额外子弹",false);
        } else {
            this._showTip("本局次数已用完");
        }
    },

    _showTip:function(str) {
        this.tipNode.stopAllActions();
        this.tipNode.opacity = 255;
        this.tipNode.active = true;
        this.tipStr.string = str;
        this.tipNode.runAction(cc.sequence(cc.delayTime(0.8), cc.fadeOut(0.5)));
    },

    //点击引导页
    _onGuideNodeClick:function() {
        this.guideNode.active = false;
        this._loadStage(this.curStage);
    },

    //显示连击数量
    _showCommobEff:function(commobNum) {
        this.commobNumNode.y = 318;
        this.commobNumNode.opacity = 0;
        this.commobNumNode.active = true;
        
        var preStr = commobNum == 1 ? "+" : "# +";
        this.commobNumTxt.setString(preStr + commobNum);

        cc.spawn(cc.moveBy(0.5,0,200),cc.fadeIn(0.5));

        var seq = cc.sequence(cc.spawn(cc.moveBy(0.5,0,+100),cc.fadeIn(0.5)),cc.delayTime(1),cc.fadeOut(0.5));
        this.commobNumNode.runAction(seq);
    },

    //再来一局
    _restart: function() {

    },

    _showAdBanner:function() {
        //if(1) return;
        if(CC_WECHATGAME) {
            Log.logD("show banner ---")
            // var windowSize=cc.view.getVisibleSize();
            // var tarLeft = (windowSize.width-600)/2;

            var phone = wx.getSystemInfoSync()
            var w = phone.screenWidth / 2
            var h = phone.screenHeight
            var isIPX = phone.model.search('iPhone X') != -1
            this.bannerAd = wx.createBannerAd({
                adUnitId: 'adunit-3ecb1589dbe25455',
                style: {
                    left: 0,
                    top: 0,
                    width: phone.screenWidth - 60
                }
            })
            var self = this
            this.bannerAd.onResize(function() {
                self.bannerAd.style.left = w - self.bannerAd.style.realWidth / 2 + 0.1
                if (isIPX) {
                    self.bannerAd.style.top = h - self.bannerAd.style.realHeight - 0.1
                } else {
                    self.bannerAd.style.top = h - self.bannerAd.style.realHeight + 0.1
                }
            })
            this.bannerAd.show();
        }
    },

    _destroyAdBanner:function() {
        //if(1) return;
        if(CC_WECHATGAME) {
            Log.logD("destroy banner ---")
            this.bannerAd.destroy();
        }
    },

    _loadStage: function(stageNum) {
        if(stageNum == 1) {
            this.adLeftTime = 1;
            this.shareLeftTime = 1;
        }
        var self = this;
        self.summingTag = true;
        this.bulletLineNode.active = false;
        this._showStagePass(stageNum);
        setTimeout(function() {
            self.summingTag = false;
            this.bulletLineNode.active = stageNum<=2 ? true : false;
            self._realLoadStage(stageNum);
        }.bind(self),2000);
    },

    _showAdView:function(msg,adCloseOpenSum) {
        this.adView.active = true;
        this.adMsgTxt.string = msg;
        this.adCloseOpenSumTag = adCloseOpenSum;

        this.adVideoLeftTimeTxt.string = "剩余次数:" + this.adLeftTime + "/1";
        this.adShareLeftTimeTxt.string = "剩余次数:" + this.shareLeftTime + "/1";
    },

    //加载关卡
    _realLoadStage: function(stageNum) {
        //初始化
        if (stageNum == 0) {
            this.leftBulletNum = 0;
        }
        //获取关卡配置
        var stageConfig = Singleton.Config.stage;
        var curStageCfg = stageConfig.stage[stageNum];
        
        cc.log("curStageCfg.initBullet " + curStageCfg.initBullet)
        //设置剩余子弹数量
        if (curStageCfg.initBullet == 0) {
            this.isBulletNoLimit = true;
            this.bulletLeftNumTxt.string = "无限";
        }
        else {
            this.isBulletNoLimit = false;
            this.leftBulletNum += curStageCfg.initBullet;
            this.bulletLeftNumTxt.string = this.leftBulletNum;
        }

        //设置履带及道具的挂载container
        this.lvdaiUpNode.active = false;
        this.lvdaiDownNode.active = false;
        this.itemUpContainer.active = false;
        this.itemDownContainer.active = false;

        var itemList = this._getItemArr(curStageCfg.items);

        var tarBottleNum = 0;

        itemList.forEach(element => {
            if(element!="8") {
                tarBottleNum = tarBottleNum + 1;
            }
        });

        this.bottleNumTxt.string = tarBottleNum;

        //如果有两天履带则需要分割数据
        var disItem = {};
        disItem["1"] = [];
        disItem["2"] = [];

        var splitNum = itemList.length;
        if (curStageCfg.lvdai.length>1) {
            splitNum = Math.round(splitNum*0.7);
        } else if (curStageCfg.lvdai[0]["lvdaiId"]==2) {
            splitNum = 0;
        }

        for (let index = 0; index < itemList.length; index++) {
            if (index<splitNum) {
                disItem["1"][disItem["1"].length] = itemList[index];
            }
            else {
                disItem["2"][disItem["2"].length] = itemList[index];
            }   
        }

        curStageCfg.lvdai.forEach(element => {
            this._showLvdai(element.lvdaiId, element.speed);
            this._setItemContainer(element.lvdaiId, element.speed,disItem[element.lvdaiId]);
        });
    },

    //初始化信息界面
    _initInfoView: function() {

    },

    //显示结束界面
    _showEndView: function() {

    },

    //展示履带
    _showLvdai: function(index,speed) {
        if (index==1) {
            var lvdaiComponent = this.lvdaiUpNode.getComponent("LvDai");
            lvdaiComponent.setDirAndSpeed(speed);
            this.lvdaiUpNode.active = true;
        }
        else if (index==2) {
            var lvdaiComponent = this.lvdaiDownNode.getComponent("LvDai");
            lvdaiComponent.setDirAndSpeed(speed);
            this.lvdaiDownNode.active = true;
        }
    },

    //设置道具挂载点 从左往右挂到左上 从右往左挂到右上
    _setItemContainer: function(index,speed,dataArr) {
        var itemContainer;
        var posY;
        itemContainer = index==1 ? this.itemUpContainer : this.itemDownContainer;
        posY = index==1 ? -218 : -486;
        
        itemContainer.removeAllChildren();
        itemContainer.parent = speed>0 ? this.leftTopNode : this.rightTopNode;

        itemContainer.x = 0;
        itemContainer.y = posY;

        var containerComponent = itemContainer.getComponent("ItemContainer");
        
        containerComponent.setSpeedAndData(speed,dataArr);
        itemContainer.active = true;
    },

    //根据配置生成道具序列
    _getItemArr:function(dataArr) {
        var itemCount = 0;
        var itemDic = {};
        var itemLen = dataArr.length;
        var newArr = [];
        dataArr.forEach(element => {
            itemCount += element.itemNum;
            itemDic[element.itemName] = 0;
        });

        this._buildItemArr(dataArr, itemDic, itemCount, itemLen, newArr);

        var outStr = "";
        newArr.forEach(element => {
            outStr = outStr + element + ",";
        });
        cc.log("outStr " + outStr + "  len:"+newArr.length);

        return newArr;
    },

    _buildItemArr: function (dataArr, itemDic, itemCount, itemLen, newArr) {
        var randomValue = Random.getRandom(0,itemLen-1);
        var randomKey = dataArr[randomValue].itemName;
        var itemLimit = dataArr[randomValue].itemNum;
        if(itemDic[randomKey]<itemLimit) {
            newArr[newArr.length] = randomKey;
            itemDic[randomKey]++;
        }
        if(newArr.length<itemCount) {
            this._buildItemArr(dataArr,itemDic, itemCount, itemLen, newArr)
        } else {
            return newArr;
        }
    },

    //暂停界面
    _pauseView: function () {
        this.lvdaiUpNode.active = false;
        this.lvdaiDownNode.active = false;
        this.itemUpContainer.active = false;
        this.itemDownContainer.active = false;
    },

    //展示过关动画
    _showStagePass: function (stageNum) {
        this._pauseView();
        this.stagePassContainer.opacity = 0;
        this.stagePassContainer.x = 300;
        this.stagePassContainer.active = true;
        var stageStr = stageNum+"";
        var tranStr = stageStr;
        if(stageStr.length>1) {
            tranStr = stageStr.charAt(0) + " " + stageStr.charAt(1);
        }
        this.stagePassTxt.setString(tranStr);

        var seq = cc.sequence(cc.spawn(cc.moveBy(0.5, -300, 0), cc.fadeIn(0.5)),cc.delayTime(1),cc.spawn(cc.moveBy(0.5, -300, 0), cc.fadeOut(0.5)),);
        this.stagePassContainer.runAction(seq);
    },

    //展示结算界面
    _showSumView: function () {
        this.summingTag = true;
        this._pauseView();
        this.sumView.y = 404;
        let maxScore = Number(Common.getHistoryScore());
        this.sumScoreTxt.string = this.curScoreTxt.string;
        Common.checkScoreAndSave(this.curScoreTxt.string);
        this.sumViewBg.active = true;
        var action = cc.moveBy(0.8, 0, -781);
        action.easing(cc.easeBackInOut(0.8));
        this.sumView.runAction(action);

        if (CC_WECHATGAME) {
            window.wx.postMessage({// 发消息给子域
                messageType: 2,
                mainMenuNum: "xw_miniGame_x1"
            });
        } else {
            cc.log("获取结算展示排行榜数据。xw_miniGame_x1");
        }

        this._showAdBanner();

        var self = this;
        if(Number(this.curScoreTxt.string)>maxScore){
            setTimeout(() => {
                this.newRecordView.active = true;
            }, 800);        
        }
    },

    //点击再来一局
    _onRestartBtnClick: function (event) {
        this._destroyAdBanner();
        this.summingTag = false;
        this.sumViewBg.active = false;
        this._initScene();
        this._loadStage(1);
    },

    //点击挑战好友
    _onChanngleBtnClick: function (event) {
        this._shareToFriend(9);
    },  

    _shareToFriend:function(defaultIndex) {
        if (CC_WECHATGAME) {
            var cfg = this.share.wxshare;
            var indexValue = defaultIndex!=null ? defaultIndex : Random.getRandom(0,cfg.length-1);

            wx.shareAppMessage({
                title: cfg[indexValue].title,
                imageUrl: cfg[indexValue].imageUrl,
            })
        } else {
            var cfg = this.share.wxshare;
            var indexValue = defaultIndex!=null ? defaultIndex : Random.getRandom(0,cfg.length-1);
        }
    },

    //点击返回主界面
    _onHomeBtnClick: function (event) {
        this._destroyAdBanner();
        cc.director.loadScene(Scene.HALL);
    },

    //播放枪口特效
    _showGunEff: function() {
        //var effNode = Singleton.PrefabPool.getNodeFromPool(Res.PREFAB_GAME_GUN_EFF_PATH);
        var prefabAsset = Singleton.PrefabLoader.getRes(Res.PREFAB_GAME_GUN_EFF_PATH);
        if (prefabAsset) {
            var gunEffNode = cc.instantiate(prefabAsset)
            gunEffNode.parent = this.gunNode;
            gunEffNode.x = 5;
            gunEffNode.y = 410;
        }
        prefabAsset = Singleton.PrefabLoader.getRes(Res.PREFAB_GAME_HIT_EFF_PATH);
        if (prefabAsset) {
            var hitEffNode = cc.instantiate(prefabAsset)
            hitEffNode.parent = this.centerTopNode;
            hitEffNode.x = 0;
            hitEffNode.y = 0;
        }
    },

    //播放后座动画
    _showGunAction: function() {
        var act1 = cc.moveBy(0.08, 0, -20);
        act1.easing(cc.easeIn(0.08));
        var act2 = cc.moveBy(0.08, 0, 20);
        act2.easing(cc.easeOut(0.08));
        var seq = cc.sequence(act1, act2);
        this.gunNode.runAction(seq);
    },

    _updateSubDomainCanvas: function () {
        if (this.rankTex==false) {
            this.rankTex = new cc.Texture2D();
        }
        if (CC_WECHATGAME) {
            var openDataContext = window.wx.getOpenDataContext()
            var sharedCanvas = openDataContext.canvas
            this.rankTex.initWithElement(sharedCanvas)
            this.rankTex.handleLoadedTexture()
            this.rankSprite.spriteFrame = new cc.SpriteFrame(this.rankTex)
        }
    },

    _checkBgmAudio:function() {
        Common.canPlayAudioTag ? this.bgmAudio.play() : this.bgmAudio.pause();
    }
});
