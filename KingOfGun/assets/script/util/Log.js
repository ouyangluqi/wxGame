var Log = cc.Class({
    ctor: function () {

    },

    statics: {
        logD: function (message) {
            if(!CC_DEBUG) {
                console.log("[INFO]"+message)
            }
            cc.info(message)
        },

        logE: function (message) {
            if(!CC_DEBUG) {
                console.log("[ERROR]"+message)
            }
            cc.error(message)
        }
    }
})