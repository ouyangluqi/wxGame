const BaseLoader = require('BaseLoader')
const RawAssetLoader = require('RawAssetLoader')
const PrefabLoader = require('PrefabLoader')
const SpriteAtlasLoader = require('SpriteAtlasLoader')
const Config = require('Config')
const Random = require('Random')
const PrefabPool = require('PrefabPool');

var Singleton = cc.Class({
    ctor: function () {
    },

    statics: {
        init: function () {
            Singleton.Config = new Config();
            Singleton.BaseLoader = new BaseLoader();
            Singleton.RawAssetLoader = new RawAssetLoader();
            Singleton.PrefabLoader = new PrefabLoader();
            Singleton.PrefabPool = new PrefabPool();
            Singleton.SpriteAtlasLoader = new SpriteAtlasLoader();
        }
    }
})