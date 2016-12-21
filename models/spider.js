const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpiderSchema = new Schema({
    spider_id:Number,
    charset:String,
    page:String,
    start:{
        type:Number,
        default:1
    },
    end:{
        type:Number,
        default:2
    },
    page_selector:String,
    detail_selector:String,
    is_page_detail:{
        type:Number,
        default:0
    },
    detail_page_selector:String,
    save_path:String,
    is_html:{
        type:Number,
        default:0
    }
});

// SpiderSchema.pre('save',function (next) {
//
//     next();
// })
SpiderSchema.statics = {
    findOne:function (data,cb) {
        this.findOne({'_id' : data},function(err,doc){
            if(err){
                //res.end(err)
            }
            if(key === 'add'){
                doc.commentNum = doc.commentNum + 1;
            }else if(key === 'del'){
                doc.commentNum = doc.commentNum - 1;
            }
            doc.save(function(err){
                if(err) throw err;
                callBack();
            })
        })
        //console.log(data);
        //this.save(data);
        //exec(cb(data));
    },
    fetch:function(callback){
        return this.find({}).sort()
        exec(callback);
    }
}

mongoose.model('Spider',SpiderSchema);

