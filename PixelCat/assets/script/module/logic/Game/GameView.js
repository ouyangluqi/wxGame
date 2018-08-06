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
        stoneNode: {
            default: null,
            type: cc.Node
        }
    },

    onLoad () {
        this._initThings();
    },

    start () {
        this._initScene();
        this._initListener();  
    },

    update (dt) {
        
    },

    ///////////////////////////////////////////////////////////
    _initThings:function() {
        this.startTag = false;
        this.catComponent = this.catNode.getComponent("Cat");
        this.stoneComponent = this.stoneNode.getComponent("StoneNode");
    },

    _initScene:function() {

    },

    _initListener:function() {
        this.node.on(cc.Node.EventType.TOUCH_END, this._onMainNodeClick, this);
        this.startBtn.on('click', this._onStartBtnClick, this);
        this.rankBtn.on('click', this._onRankBtnClick, this);
        this.shareBtn.on('click', this._onShareBtnClick, this);
        this.node.on("stoneOut",this._onStoneOut, this);
    },

    _onMainNodeClick:function(event) {
        if(this.startView.active==true) {
            return;
        }
        if(this.startTag==false) {
            this.startTag = true;
            this.catComponent.startTag = true;
        } else {
            this.tapAudio.play();
        }
        this.catComponent.dt = 0;
        var act1 = cc.moveBy(0.1,0,150);
        var act2 = cc.rotateTo(0.1,-20);
        var act = cc.spawn(act1,act2,act2,act2);
        this.catNode.runAction(act);
    },

    _onStartBtnClick:function(event) {
        var self = this;

        this.selectAudio.play();
        var act = cc.blink(0.8, 4);
        this.startBtn.runAction(act);
        setTimeout(function() {
            self.startView.active = false;
            self._onMainNodeClick();
        }.bind(this),1100);
    },

    _onRankBtnClick:function(event) {

    },

    _onShareBtnClick:function(event) {

    },

    _onStoneOut:function(event) {
        this.stoneComponent.addStoneWithHole(Random.getRandom(4,8));
    },
});
