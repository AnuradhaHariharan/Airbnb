const express=require("express");
const mongoose=require("mongoose");
const app=express();
const port=8080;
const path=require("path");
const ejsMate=require("ejs-mate");
app.listen(port);
app.use(express.urlencoded({extended:true}))
const Listing=require("./models/listing.js");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname, "public")));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
main().catch(err => console.log(err));


app.get("/listings",async(req,res)=>{

   const allListing= await Listing.find({});
   res.render("listings/index", { allListing });
})
