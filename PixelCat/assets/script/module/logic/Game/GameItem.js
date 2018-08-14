const Common = require('Common')
const ParamConst = require('ParamConst')
cc.Class({
    extends: cc.Component,

    properties: {
        itemImage: {
            default: null,
            type: cc.Sprite
        },
        hasNumTxt: {
            default: null,
            type: cc.Label
        },
        selectImg: {
            default: null,
            type: cc.Node
        }
    },

    onLoad () {
        this.selectImg.active = false;
        this.chooseTag = false;
        this.node.on(cc.Node.EventType.TOUCH_END, this._onMainNodeClick, this);
    },

    start () {

    },

    setData:function(cfg) {
        this.cfg = cfg;
        var self = this;
        cc.loader.loadRes("atlas/gameRes/gameRes", cc.SpriteAtlas, function(err, atlas) {
            self.itemImage.spriteFrame = atlas.getSpriteFrame(cfg.framePre);
        });
        this.countNum = Common.getDataCount(cfg.key);
        this.hasNumTxt.string = "拥有:"+this.countNum;
    },

    _onMainNodeClick:function(event) {
        event.stopPropagation();

        if(this.chooseTag==false) {
            if(this.countNum>0) {
                this.chooseTag = !this.chooseTag;
                this.countNum = this.countNum-1;
                this.hasNumTxt.string = "拥有:"+this.countNum;
                Common.setDataCount(this.cfg.key, this.countNum);

                var eventParam = new cc.Event.EventCustom("addBuff",true);
                var eventData = {};
                eventData["buffType"] = this.cfg.key;
                eventParam.setUserData(eventData);
                this.node.dispatchEvent(eventParam);
            } else {
                var eventParam = new cc.Event.EventCustom("showItemShopByGameItem",true);
                this.node.dispatchEvent(eventParam);
            }
        } else {
            this.chooseTag = !this.chooseTag;
            this.countNum = this.countNum+1;
            this.hasNumTxt.string = "拥有:"+this.countNum;
            Common.setDataCount(this.cfg.key, this.countNum);

            var eventParam = new cc.Event.EventCustom("removeBuff",true);
            var eventData = {};
            eventData["buffType"] = this.cfg.key;
            eventParam.setUserData(eventData);
            this.node.dispatchEvent(eventParam);
        }
        this.selectImg.active = this.chooseTag==true ? true : false;
    }
});
