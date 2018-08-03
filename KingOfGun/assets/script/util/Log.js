var Log = cc.Class({
    ctor: function () {

    },

    statics: {
        logD: function (message) {
            console.log("[INFO]"+message)
            cc.info(message)
        },

        logE: function (message) {
            console.log("[ERROR]"+message)
            cc.error(message)
        }
    }
})