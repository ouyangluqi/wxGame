cc.Class({
    extends: cc.Component,

    properties: {
        bgSprite: cc.Sprite,
        rankLabel: cc.Label,
        avatarImgSprite: cc.Sprite,
        nickLabel: cc.Label,
        topScoreLabel: cc.Label
    },

    start () {},

    init: function (rank, data) {
        let avatarUrl = data.avatarUrl
        let nick = data.nickname
        let grade = data.KVDataList.length != 0 ? data.KVDataList[0].value : 0

        var self = this
        if ((rank + 1) % 2 == 0 ) {
            cc.loader.loadRes("atlas/rank", cc.SpriteAtlas, function(err, spriteAtlas) {
                if (self.bgSprite) {
                    self.bgSprite.spriteFrame = spriteAtlas.getSpriteFrame("rank_02")
                }
            })
        } else {
            cc.loader.loadRes("atlas/rank", cc.SpriteAtlas, function(err, spriteAtlas) {
                if (self.bgSprite) {
                    self.bgSprite.spriteFrame = spriteAtlas.getSpriteFrame("rank_01")
                }
            })
        }

        this.rankLabel.string = (rank + 1).toString()
        this.createImage(avatarUrl)
        this.nickLabel.string = nick
        this.topScoreLabel.string = grade.toString()
    },

    createImage: function(avatarUrl) {
        if (CC_WECHATGAME) {
            try {
                let image = wx.createImage()
                image.onload = () => {
                    let texture = new cc.Texture2D()
                    texture.initWithElement(image)
                    texture.handleLoadedTexture()
                    this.avatarImgSprite.spriteFrame = new cc.SpriteFrame(texture)
                }
                image.src = avatarUrl
            } catch (e) {
                cc.log(e)
                this.avatarImgSprite.node.active = false
            }
        } else {
            cc.loader.load({
                url: avatarUrl, type: 'jpg'
            }, (err, texture) => {
                this.avatarImgSprite.spriteFrame = new cc.SpriteFrame(texture)
            })
        }
    }
});
