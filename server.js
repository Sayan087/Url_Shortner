const express = require('express');
const mongoose=require('mongoose');
const ShortUrl=require("./models/shortUrl");
const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost/urlShortner',{
    
})
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
app.get('/',async(req,res)=>{
   const shortUrls=await ShortUrl.find();
    res.render('index',{shortUrls:shortUrls});
})
app.post('/shortUrls',async(req,res)=>{
    await ShortUrl.create({full: req.body.fullUrl});
    res.redirect('/');

})

app.get('/:shortUrl',async(req,res) =>{
    const shortUrl=await ShortUrl.findOne({short:req.params.shortUrl})
    if(shortUrl==null) return res.sendStatus(404)

    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.full)
})
app.listen(PORT, function(err){
	if (err) console.log("Error in server setup")
	console.log("Server listening on Port", PORT);
})
