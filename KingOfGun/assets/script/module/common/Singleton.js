const BaseLoader = require('BaseLoader')
const RawAssetLoader = require('RawAssetLoader')
const Config = require('Config')

var Singleton = cc.Class({
    ctor: function () {
        
    },

    statics: {
        init: function () {
            Singleton.Config = new Config();
            Singleton.BaseLoader = new BaseLoader();
            Singleton.RawAssetLoader = new RawAssetLoader();
        }
    }
})