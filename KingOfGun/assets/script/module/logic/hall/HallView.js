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

        var self = this
        this.node.on("closeRank", function(event) {
            Log.logD("closeRank is call")
            self._showAdBanner()
            self.wxButton.show()
        })

        this.rankView = null

        this.share = Singleton.Config.share;
    },

    start() {
        if(CC_WECHATGAME) {
            Log.logD("--show wx btn")
            this.wxButton = wx.createGameClubButton({
                icon: 'green',
                style: {
                    left: 0,
                    top: 50,
                    width: 40,
                    height: 40
                }
            });
            this._showAdBanner();
        }
    },

    _startClickHandler: function() {
        Log.logD("click start")
        if(CC_WECHATGAME) {
            this.wxButton.hide();
            this._destroyAdBanner();
        }

        cc.director.loadScene(Scene.GAME)
    },

    _rankClickHandler: function() {
        Log.logD("click rank")
        if (this.rankView == null) {
            this.rankView = new RankView()
            this.rankView.init(Res.PREFAB_RANK_VIEW_PATH, this.node)
            this.wxButton.hide()
            this._destroyAdBanner()
        } else {
            if (this.rankView.isActive) {
                this.rankView.isActive = false
            } else {
                this.rankView.isActive = true
                this.wxButton.hide()
                this._destroyAdBanner()
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

            // Log.logD("-----screen width" + w + "----screen height" + h);
            this.bannerAd = wx.createBannerAd({
                adUnitId: 'adunit-9b5f37fef8619f53',
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

    _hideAdBanner: function() {
        if(CC_WECHATGAME) {
            Log.logD("hide banner ---")
            if (this.bannerAd) {
                this.bannerAd.hide()                
            }
        }
    },

    _destroyAdBanner:function() {
        //if(1) return;
        if(CC_WECHATGAME) {
            Log.logD("destroy banner ---")
            if (this.bannerAd) {
                this.bannerAd.destroy()
                this.bannerAd = null                
            }
        }
    },

})