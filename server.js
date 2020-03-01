const express = require('express')
const app = express();

const authRoute = require('./routes/userroute')
const admin = require('./routes/adminroutes')
const product =  require('./routes/productr')
const cart = require('./routes/cartroute')
var unless = require('express-unless');
var mongoose = require('mongoose');
var bodyparser = require('body-parser')
const cors = require('cors')

var path = require('path')
const verify = require('./verifytoken')
const dontenv = require('dotenv');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json())


app.use('/uploads', express.static('uploads'));



mongoose.connect(process.env.dbconnect, {useNewUrlParser: true,useUnifiedTopology: true});

var urlencodedParser = bodyparser.urlencoded({ extended: false })


mongoose.connection.on('connected',()=>{
    console.log('connected to databaseat at this port')
})
mongoose.connection.on('error',(err)=>{
    if(err)
    {
        console.log('error in database connection')
    } 
})


// app.use(verify.unless({
//     path: [
//       '/api/admin',
//       { url: '/', methods: ['GET', 'PUT','POST']  }
//     ]
//   }))

app.use('/api/user',authRoute,product,cart)
app.use('/api/admin',admin)


// app.use((req, res, next) => {
//     const error = new Error();
//     error.message = 'Not Found';
//     error.status = 404;
//     next(error);
// });


// app.use((error, req, res, next) => {
//     res.status(error.status || 500).json({
//         error: error
//     });
// });

app.use(paginate.middleware(5, 5));

app.listen(3000,() => console.log('server is running on 3000'));

module.exports = app