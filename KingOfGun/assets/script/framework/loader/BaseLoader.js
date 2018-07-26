const Log = require('Log')

var BaseLoader = cc.Class({
    ctor: function () {
        this._pathList = [],
        this._progressFunc = null,
        this._completeFunc = null,
        this._isLoading = false,
        this._resDic = null
    },

    _getResType: function () {
        return false
    },

    _progressCallBack: function (completedCount, totalCount, item) {
        if (this._progressFunc) {
            this._progressFunc(completedCount, totalCount)
        }
    },

    _completeCallBack: function (error, assets) {
        this._isLoading = false
        let callback = this._completeFunc
        this._progressFunc = null
        this._completeFunc = null
        if (error == null) {
            if (this._pathList.length == assets.length) {
                for (let i = 0, len = assets.length; i < len; i++) {
                    this._resDic[this._pathList[i]] = assets[i]
                }
            } else {
                Log.logE("assetLength not match")
            }
        }
        this._pathList.splice(0, this._pathList.length)
        if (callback) {
            callback(error)
        }
    },

    addRes: function (path) {
        if (!path) {
            Log.logE("path error")
        }
        if (this._isLoading) {
            Log.logE("isLoading")
        } else {
            this._pathList.push(path)
        }
    },

    startLoad: function (progressCallBack, completeCallBack) {
        if (this._isLoading) {
            Log.logE("isLoading")
        } else {
            this._resDic = {}
            this._isLoading = true
            this._progressFunc = progressCallBack
            this._completeFunc = completeCallBack
            cc.loader.loadResArray(this._pathList, this._getResType(), this._progressCallBack.bind(this), this.completeCallBack.bind(this))
        }
    },

    getRes: function (path) {
        let res = this._resDic[path]
        if (res) {
            return res
        } else {
            Log.logE("has no res in loader")
            return null
        }
    }
})