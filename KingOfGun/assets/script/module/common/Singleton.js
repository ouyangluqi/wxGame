const BaseLoader = require('BaseLoader')
const RawAssetLoader = require('RawAssetLoader')
const PrefabLoader = require('PrefabLoader')
const SpriteAtlasLoader = require('SpriteAtlasLoader')
const Config = require('Config')
const Random = require('Random')
const PrefabPool = require('PrefabPool');
const HttpUtils = require('HttpUtils')

var Singleton = cc.Class({
    ctor: function () {
    },

    statics: {
        Config: null,
        BaseLoader: null,
        RawAssetLoader: null,
        PrefabLoader: null,
        PrefabPool: null,
        SpriteAtlasLoader: null,
        HttpUtils: null,

        init: function () {
            Singleton.Config = new Config();
            Singleton.BaseLoader = new BaseLoader();
            Singleton.RawAssetLoader = new RawAssetLoader();
            Singleton.PrefabLoader = new PrefabLoader();
            Singleton.PrefabPool = new PrefabPool();
            Singleton.SpriteAtlasLoader = new SpriteAtlasLoader();
            Singleton.HttpUtils = new HttpUtils();
        }
    }
})