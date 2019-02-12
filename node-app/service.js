const express = require('express');
// 引入mongoose来连接数据库
const mongoose = require('mongoose');
// 引入body-parser来解析请求体
const bodyParser = require('body-parser');
const passport = require('passport');
require('./models/User');

const app = express();

// 引入users.js
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');

// 使用body-parser中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extend:false}));


// DB config
const db = require('./config/keys').mongoURI;
// Connect to mongodb
mongoose.connect(db)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))


// passport初始化
app.use(passport.initialize());
require('./config/passport')(passport)



// app.get('/',(req,res)=>{
//     res.send("hello world!")
// })

// 使用routes
app.use('/api/users',users)
app.use('/api/profiles',profiles)


const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})