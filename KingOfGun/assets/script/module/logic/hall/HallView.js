const BaseView = require('BaseView')
const Scene = require('Scene')
const Log = require('Log')
const RankView = require('RankView')
const Res = require('Res')
const Common = require('Common')
const Singleton = require('Singleton')
const Random = require('Random')

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
        this.historyScoreTxt.string = "最高分数："+Common.getHistoryScore()

        this.audio = this.node.getChildByName("voiceNode").getComponent(cc.AudioSource)
        this.audio.volume = 0.1;

        this.shareBtn = this.node.getChildByName("shareBtn").getComponent(cc.Button)
        this.shareBtn.node.on(cc.Node.EventType.TOUCH_END, this._shareClickHandler.bind(this))

        this.rankView = null

        this.share = Singleton.Config.share;
    },

    start() {
        if(CC_WECHATGAME) {
            Log.logD("--show wx btn")
            this.wxButton = wx.createGameClubButton({
                icon: 'green',
                style: {
                    left: 604,
                    top: 1185,
                    width: 40,
                    height: 40
                }
            })
        }
    },

    _startClickHandler: function() {
        Log.logD("click start")
        if(CC_WECHATGAME) {
            this.wxButton.hide();
        }
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

    _shareClickHandler: function() {
        this._shareToFriend();
    },

    _shareToFriend:function(defaultIndex) {
        if (CC_WECHATGAME) {
            var cfg = this.share.wxshare;
            var indexValue = defaultIndex!=null ? defaultIndex : Random.getRandom(0,cfg.length-1);

            wx.shareAppMessage({
                title: cfg[indexValue].title,
                imageUrl: cfg[indexValue].imageUrl,
            })
        }
    },

    _checkBgmAudio:function() {
        Common.canPlayAudioTag ? this.audio.play() : this.audio.pause();
    }
})