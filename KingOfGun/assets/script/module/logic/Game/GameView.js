const BaseView = require('BaseView')
const Singleton = require('Singleton')
const Log = require('Log')
const Random = require('Random')

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

        isBulletNoLimit : false,
        isTimeNoLimit : false,
        leftBulletNum : 0,
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
        this._loadStage(20);
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
       this.itemUpContainer.active = false;
       this.itemDownContainer.active = false;
    },

    //初始化监听
    _initListener: function() {
         //注册鼠标点击事件
        var self = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            self.bulletNode.active  = true;
            setTimeout(function() {
                self.bulletNode.active = false;
            }.bind(self),1);
            if (self.isBulletNoLimit==false && self.leftBulletNum>0) {
                self.leftBulletNum = self.leftBulletNum - 1;
                self.bulletLeftNumTxt.string = "子弹：" + self.leftBulletNum;
            }
        })
    },

    //再来一局
    _restart: function() {

    },

    //加载关卡
    _loadStage: function(stageNum) {
        //获取关卡配置
        var stageConfig = Singleton.Config.stage;
        var curStageCfg = stageConfig.stage[stageNum];
        
        //设置剩余子弹数量
        if (curStageCfg.leftBullet === 0) {
            this.isBulletNoLimit = true;
            this.bulletLeftNumTxt.string = "子弹：∞";
        }
        else {
            this.leftBulletNum = curStageCfg.leftBullet;
            this.bulletLeftNumTxt.string = "子弹：" + this.leftBulletNum;
        }

        //设置履带及道具的挂载container
        curStageCfg.lvdai.forEach(element => {
            this._showLvdai(element.lvdaiId, element.speed);
            this._setItemContainer(element.lvdaiId, element.speed,curStageCfg.items);
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
        posY = index==1 ? -257 : -514;
        
        itemContainer.parent = speed>0 ? this.leftTopNode : this.rightTopNode;

        itemContainer.x = 0;
        itemContainer.y = posY;

        var containerComponent = itemContainer.getComponent("ItemContainer");
        var itemList = this._getItemArr(dataArr)
        containerComponent.setSpeedAndData(speed,itemList);
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
});
