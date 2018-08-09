cc.Class({
    extends: cc.Component,

    properties: {
        titleNode: {
            default: null,
            type: cc.Node
        },
        curNode: {
            default: null,
            type: cc.Node
        },
        doneNode: {
            default: null,
            type: cc.Node
        },
        titleTxt: {
            default: null,
            type: cc.Label
        },
        processBg: {
            default: null,
            type: cc.Node
        },
        rewardTxt: {
            default: null,
            type: cc.Label
        },
        curNoteTxt: {
            default: null,
            type: cc.Label
        },
        doneNoteTxt: {
            default: null,
            type: cc.Label
        },
    },

    onLoad () {},

    start () {

    },

    /*
    type 1 标题

    type 2 未完成

    type 3 已完成
    
    data：{
        type: 1,
        cfg: cfg,
        process:"",
    }
    */
    setData(data) {
        switch (data.type) {
            case 1:
                this.titleNode.active = true;
                this.curNode.active = false;
                this.doneNode.active = false;
                this.titleTxt.string = data.cfg;
                break;

            case 2:
                this.titleNode.active = false;
                this.curNode.active = true;
                this.doneNode.active = false;
                var noteStr = data.cfg.note;
                if(data.process>0) {
                    noteStr = noteStr + "("+data.process+"/"+data.cfg.value+")"
                }
                this.curNoteTxt.string = noteStr;
                this.rewardTxt.string = "+" + data.cfg.reward;
                this.processBg.width = 652*(data.process/data.cfg.value);
            break;

            case 3:
                this.titleNode.active = false;
                this.curNode.active = false;
                this.doneNode.active = true;
                this.doneNoteTxt.string = data.cfg.note;
            break;
        
            default:
                break;
        }
    }
});
