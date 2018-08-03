const BaseView = require('BaseView')
const Singleton = require('Singleton')
const Log = require('Log')
const Random = require('Random')
const Res = require('Res')
const Common = require('Common')

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
        stagePassTxt: {
            name: "关卡动画",
            default: null,
            type: cc.Label
        },
        commobNumTxt: {
            name: "连击动画",
            default: null,
            type: cc.Label
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
        audioSource: {
            type: cc.AudioSource,
            default: null
        },

        isBulletNoLimit : false,
        isTimeNoLimit : false,
        leftBulletNum : 0,
        curStage : 1,
        commobNum : 0,
        commobTag : 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self = this;
        this._initScene();
        this._initListener();
        var windowSize=cc.view.getVisibleSize();
        Log.logD("ScreenWidth:"+windowSize.width+"  ScreenHeight:"+windowSize.height);;
    },

    start () {
        this._loadStage(this.curStage);
    },

    onDestroy () {

    },

    update (dt) {

    },

    // up 生命周期函数
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // down 游戏逻辑

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
       this.commobTag = 0
    },

    //初始化监听
    _initListener: function() {
         //注册鼠标点击事件
        var self = this;
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.bulletNode.scale = 1
            setTimeout(function() {
                self.bulletNode.scale = 0;
            }.bind(self),17);
            if (self.isBulletNoLimit==false && self.leftBulletNum>0) {
                self.leftBulletNum = self.leftBulletNum - 1;
                self.bulletLeftNumTxt.string = self.leftBulletNum;
                if(self.leftBulletNum==0) {
                    self._showSumView();
                }
            }

            self._showGunEff();
            self.audioSource.play();
            self.commobTag += 1;
        });

        //注册目标被击中事件监听
        this.node.on("hitTarget",function(event){
            var lifeNum = event.getUserData();

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

            if (self.commobTag == 0) {
                self.commobNum += 1;            
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
    },

    //显示连击数量
    _showCommobEff:function(commobNum) {
        this.commobNumTxt.node.y = 318;
        this.commobNumTxt.node.opacity = 0;
        this.commobNumTxt.node.active = true;
        var preStr = commobNum==1 ? "+" : "连击+";
        this.commobNumTxt.string = preStr + commobNum;

        cc.spawn(cc.moveBy(0.5,0,200),cc.fadeIn(0.5));

        var seq = cc.sequence(cc.spawn(cc.moveBy(0.5,0,+100),cc.fadeIn(0.5)),cc.delayTime(1),cc.fadeOut(0.5));
        this.commobNumTxt.node.runAction(seq);
    },

    //再来一局
    _restart: function() {

    },

    _loadStage: function(stageNum) {
        var self = this;
        this._showStagePass(stageNum);
        setTimeout(function() {
            self._realLoadStage(stageNum);
        }.bind(self),2000);
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
        this.stagePassTxt.node.opacity = 0;
        this.stagePassTxt.node.x = 300;
        this.stagePassTxt.node.active = true;
        this.stagePassTxt.string = "第 " + stageNum + " 关";
        var seq = cc.sequence(cc.spawn(cc.moveBy(0.5, -300, 0), cc.fadeIn(0.5)),cc.delayTime(1),cc.spawn(cc.moveBy(0.5, -300, 0), cc.fadeOut(0.5)),);
        this.stagePassTxt.node.runAction(seq);
    },

    //展示结算界面
    _showSumView: function () {
        this._pauseView();
        this.sumView.y = 404;
        this.sumScoreTxt.string = this.curScoreTxt.string;
        Common.checkScoreAndSave(this.curScoreTxt.string);
        this.sumViewBg.active = true;
        var action = cc.moveBy(0.2, 0, -781);
        this.sumView.runAction(action);
    },

    //点击再来一局
    _onRestartBtnClick: function (event) {
        this.sumViewBg.active = false;
        this._initScene();
        this._loadStage(1);
    },

    //点击挑战好友
    _onChanngleBtnClick: function (event) {

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
});
