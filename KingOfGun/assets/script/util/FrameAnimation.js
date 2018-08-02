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
            cc.loader.loadRes("texture/animalFrame/"+this.framePre+"_"+this._frameIndex, cc.SpriteFrame, function (err, spriteFrame) {
                if(self.cSprite){
                    self.cSprite.spriteFrame = spriteFrame;
                }
            });
        }
        this._dtCount = this._dtCount + 1;
    },
});
