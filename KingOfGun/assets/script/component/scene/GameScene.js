var GameView = require('GameView');

var GameScene = cc.Class({

    extends: cc.Component,

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var gameView = new GameView();
        gameView.init("gameView", this.node);
    },

    start () {
        
    },

    // onDestroy () {

    // },

    // update (dt) {

    // },
});
