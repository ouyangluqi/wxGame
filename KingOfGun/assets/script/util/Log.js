var Log = cc.Class({
    ctor: function () {

    },

    statics: {
        logD: function (message) {
            console.log("[INFO]"+message)
            cc.log("[INFO]"+message)
        },

        logE: function (message) {
            console.log("[ERROR]"+message)
            cc.log("[ERROR]"+message)
        }
    }
})