const jwt = require("jsonwebtoken")

module.exports= function (req,res,next){


const toke =req.header("admin-token");
    if (!toke)  return res.status(400).send("accesssss denied");

    try{
        const verifie = jwt.verify(toke,process.env.Token_secre)
        req.admin= verifie;
        next();

    }catch (err){
        //res.send(err)
        res.status(400).send('invaliddddd token')
    }
}


