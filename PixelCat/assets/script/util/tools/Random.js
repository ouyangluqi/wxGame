var Random = cc.Class({
    ctor: function () {

    },

    statics: {
        //获取start到end之间的随机数 包含start end
        getRandom:function(start, end) {
            var startNum = Number(start);
            var endNum = Number(end);
            return Math.round(cc.random0To1()*(endNum-startNum)+startNum);
        }
    }
})