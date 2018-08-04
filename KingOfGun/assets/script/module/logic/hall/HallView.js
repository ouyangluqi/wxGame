const BaseView = require('BaseView')
const Scene = require('Scene')
const Log = require('Log')
const RankView = require('RankView')
const Res = require('Res')
const Common = require('Common')

var HallView = cc.Class({
    extends: BaseView,

    onLoad: function() {
        cc.log("HallView.onInit is call" + this.node)
        
        this.startBtn = this.node.getChildByName("startGame").getComponent(cc.Button)
        this.startBtn.node.on(cc.Node.EventType.TOUCH_END, this._startClickHandler.bind(this))

        this.rankBtn = this.node.getChildByName("rankBtn").getComponent(cc.Button)
        this.rankBtn.node.on(cc.Node.EventType.TOUCH_END, this._rankClickHandler.bind(this))

        this.voiceBtn = this.node.getChildByName("voiceBtn").getComponent(cc.Button)
        this.voiceBtn.node.on(cc.Node.EventType.TOUCH_END, this._voiceClickHandler.bind(this))

        this.voiceSprie = this.node.getChildByName("voiceBtn").getComponent(cc.Sprite)

        this.historyScoreTxt = this.node.getChildByName("scoreLabel").getComponent(cc.Label)
        this.historyScoreTxt.string = "最高分数："+Common.getHistoryScore();

        this.audio = this.node.getChildByName("voiceNode").getComponent(cc.AudioSource);
        this.audio.volume = 0.1;

        this.rankView = null
    },

    onStart: function() {
    },

    _startClickHandler: function() {
        Log.logD("click start")
        cc.director.loadScene(Scene.GAME)
    },

    _rankClickHandler: function() {
        Log.logD("click rank")
        if (this.rankView == null) {
            this.rankView = new RankView()
            this.rankView.init(Res.PREFAB_RANK_VIEW_PATH, this.node)
        } else {
            if (this.rankView.isActive) {
                this.rankView.isActive = false
            } else {
                this.rankView.isActive = true
            }
        }
    },

    _voiceClickHandler: function() {
        Common.canPlayAudioTag = !Common.canPlayAudioTag;
        this._checkBgmAudio();

        var self = this;
        cc.loader.loadRes("atlas/hall/hall", cc.SpriteAtlas, function(err, atlas) {
            self.voiceSprie.spriteFrame = atlas.getSpriteFrame(Common.canPlayAudioTag==true ? "hall_voice" : "hall_voice_stop");
        });
    },

    _checkBgmAudio:function() {
        Common.canPlayAudioTag ? this.audio.play() : this.audio.pause();
    }
})