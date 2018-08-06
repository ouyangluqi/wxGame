var Random = cc.Class({
    ctor: function () {

    },

    statics: {
        //获取start到end之间的随机数 包含start end
        getRandom:function(start, end) {
            return Math.round(cc.random0To1()*(end-start)+start);
        }
    }
})