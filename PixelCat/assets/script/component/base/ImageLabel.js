cc.Class({
    extends: cc.Component,

    properties: {
        framePreStr:"",
        tranStr:""
    },

    start () {
        this.richText = this.node.getComponent(cc.RichText);
        this.richText.string = this.tranStr;
    },

    setString:function(str) {
        var strLen = str.length;
        this.tranStr = "";
        for (let index = 0; index < strLen; index++) {
            var charStr = str.charAt(index);
            if(charStr == ' ') {
                this.tranStr += " ";
            } else {
                this.tranStr += "<img src='"+this.framePreStr+charStr+"'/>";
            }
        }
        if(this.richText){
            this.richText.string = this.tranStr;
        }
    }
});
