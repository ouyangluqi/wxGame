const Singleton = require('Singleton')
const Res = require('Res')
cc.Class({
    extends: cc.Component,

    properties: {
        isLoop: false,
        framePre: "",
        frameCount: 1,
        speed: 10,

        cSprite: {
            default: null,
            type: cc.Sprite
        },

        _frameIndex: 0,
        _dtCount : 0
    },

    onLoad () {
        this._frameIndex = 0;
        this._diCount = 0;
    },

    start () {

    },

    update (dt) {
        if (this._dtCount%this.speed==0) {
            var self = this;
            this._frameIndex = this._frameIndex + 1;
            if(this._frameIndex > this.frameCount) {
                if(this.isLoop==true) {
                    this._frameIndex = 1;
                } else {
                    this.node.parent = null;
                    return;
                }
            }
            var atlas = Singleton.SpriteAtlasLoader.getRes(Res.ATLAS_EFF_PATH);
            self.cSprite.spriteFrame = atlas.getSpriteFrame(this.framePre+"_"+this._frameIndex);
        }
        this._dtCount = this._dtCount + 1;
    },
});
