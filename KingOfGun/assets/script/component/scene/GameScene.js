var GameScene = cc.Class({
    extends: cc.Component,

    properties: {
        rootNode: {
            name: "锚点为左下角的根节点",
            default: null,
            type: cc.Node
        },
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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self = this;
        this._initScene();
    },

    start () {
        var self = this;
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
    },

    //再来一局
    _restart: function() {

    },

    //加载关卡
    _loadStage: function(stageNum) {

    },

    //初始化信息界面
    _initInfoView: function() {

    },

    //显示结束界面
    _showEndView: function() {

    }
});
