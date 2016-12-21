const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_id:Number,      //user_id 用户id
    username:String,     //登陆名称
    password:String,     //登陆密码
    group:{              //用户组 1.管理员,2.会员
        type:Number,
        default:1
    },
    login_ip:String,     //最后登陆ip
    last_login:{         //最后登陆时间
        type:Date,
        default:Date.now()
    },
    create_time:{        //账号创建时间
        type:Date,
        default:Date.now()
    },
    nickname:String,     //用户昵称
    telepone:Number,     //电话号码
    qq:Number,           //qq号码
    wechat:String,       //微信号码
    email:String,        //邮箱
    gender:{             //性别 1.男  2.女
        type:Number,
        default:1
    },
    face:String,         //用户头像
});

mongoose.model('Users',UserSchema);

