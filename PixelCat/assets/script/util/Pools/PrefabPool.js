const Res = require("Res")
const Singleton = require("Singleton")

var PrefabPool = cc.Class({
    properties : {
        poolDic : false
    },

    ctor: function () {
        this.poolDic = {};
    },

    getNodeFromPool : function (poolName) {
        this._initPoolType(poolName);
        var curPool = this.poolDic[poolName];
        var poolLength = curPool.length;
        cc.log("poolLength " +poolLength )
        if (poolLength>0) {
            var oldNode = curPool[poolLength-1];
            curPool[poolLength-1] = false;
            return oldNode;
        } else {
            var prefabAsset = Singleton.PrefabLoader.getRes(Res.PREFAB_GAME_GUN_EFF_PATH);
            if (prefabAsset) {
                var newNode = cc.instantiate(prefabAsset)
                return newNode;
            }
        }

        return false;
    },

    addToPool: function (poolName, prefabNode) {
        this._initPoolType(poolName);
        var curPool = this.poolDic[poolName];
        var poolLength = curPool.length;
        curPool[poolLength] = prefabNode;
    },

    clearPool: function () {
        this.poolDic = false;
    },

    _initPoolType : function (poolName) {
        if (this.poolDic[poolName]==false) {
            this.poolDic[poolName] = [];
        }
    }
})