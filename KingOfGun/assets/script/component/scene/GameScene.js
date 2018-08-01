const GameView = require('GameView');
const Log = require('Log');
const Singleton = require('Singleton');
const Res = require('Res');

var GameScene = cc.Class({
    extends: cc.Component,

    onLoad () {
    },

    start () {
        this._startGameView()
    },

    // startgameview 
    _startGameView: function () {
        var gameView = new GameView();
        gameView.init(Res.PREFAB_GAME_VIEW_PATH, this.node);
    }
});
