var Log = cc.Class({
    ctor: function () {

    },

    statics: {
        logD: function (message) {
            console.log(message)
            cc.log(message)
        },

        logE: function (message) {
            console.log(message)
            cc.log(message)
        }
    }
})