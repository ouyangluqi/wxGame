const Common = require('Common')
const ParamConst = require('ParamConst')
cc.Class({
    extends: cc.Component,

    properties: {
        itemImage: {
            default: null,
            type: cc.Node
        },
        itemNameTxt: {
            default: null,
            type: cc.Label
        },
        itemEffTxt: {
            default: null,
            type: cc.Label
        },
        operaBtn: {
            default: null,
            type: cc.Node
        },
        operaTxt: {
            default: null,
            type: cc.Label
        },
        coinTxt: {
            default: null,
            type: cc.Label
        },
        coinNode: {
            default: null,
            type: cc.Node
        },
        hasNumTxt: {
            default: null,
            type: cc.Label
        },
        itemImage: {
            default: null,
            type: cc.Sprite
        }
    },

    onLoad () {
        this.operaBtn.on('click', this._onOperaBtnClick, this);
    },

    start () {

    },

    _onOperaBtnClick:function(event) {
        var eventParam = new cc.Event.EventCustom("buyItem",true);
        var eventData = {};
        eventData["cfg"] = this.data.cfg;
        eventParam.setUserData(eventData);

        this.node.dispatchEvent(eventParam);
    },

    /*
    "key":"cat_pix",
    "name":"像素猫",
    "framePre":"cat",
    "desc":"一看就是标准主角样子",
    "effect":"特殊效果：无",
    "price":0
    */
    setData:function(data) {
        this.data = data;
        var cfg = data.cfg;
        var self = this;
        cc.loader.loadRes("atlas/gameRes/gameRes", cc.SpriteAtlas, function(err, atlas) {
            self.itemImage.spriteFrame = atlas.getSpriteFrame(cfg.framePre);
        });
        this.itemEffTxt.string = cfg.effect;
        this.itemNameTxt.string = cfg.name;

        var countNum = Common.getDataCount(cfg.key);
        this.hasNumTxt.string = "拥有:"+countNum;
    }

    // update (dt) {},
});
