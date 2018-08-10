const Common = require('Common')
const ParamConst = require('ParamConst')
cc.Class({
    extends: cc.Component,

    properties: {
        itemImage: {
            default: null,
            type: cc.Node
        },
        selectBg: {
            default: null,
            type: cc.Node
        },
        itemNameTxt: {
            default: null,
            type: cc.Label
        },
        itemDescTxt: {
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
    },

    onLoad () {
        this._itemFrameCom = this.itemImage.getComponent("FrameAnimation");
        this.operaBtn.on('click', this._onOperaBtnClick, this);
        this.node.on("changeSkin",this._changeSkin, this);
    },

    start () {

    },

    /*
        operaType:
        1、更换
        2、购买
    */
    _onOperaBtnClick:function(event) {
        switch (this.operaType) {
            case 1:
                var eventParam = new cc.Event.EventCustom("changeSkin",true);
                var eventData = {};
                eventData["skin"] = this.data.cfg.framePre;
                eventParam.setUserData(eventData);
                this.node.dispatchEvent(eventParam);
                break;
            case 2:
                var eventParam = new cc.Event.EventCustom("buyItem",true);
                var eventData = {};
                eventData["cfg"] = this.data.cfg;
                eventParam.setUserData(eventData);

                this.node.dispatchEvent(eventParam);
            default:
                break;
        }
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
        this.selectBg.active = false;
        this.operaType = 0;
        var cfg = data.cfg;
        this._itemFrameCom.framePre = cfg.framePre;
        this.itemDescTxt.string = cfg.desc;
        this.itemEffTxt.string = cfg.effect;

        var countNum = Common.getDataCount(cfg.key);

        if(data.type == "role") {
            if(countNum>0) {
                this.operaType = 1;
                this.coinNode.active = false;
                this.operaTxt.string = "更换";
                var skin = Common.getDataCountStr(ParamConst.countKeyRoleSkin);
                if(skin == data.cfg.framePre) {
                    this.selectBg.active = true;
                }
            } else {
                this.operaType = 2;
                this.coinTxt.string = cfg.price;
                this.coinNode.active = true;
                this.operaTxt.string = "购买";
            }
        }
    }

    // update (dt) {},
});
