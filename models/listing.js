const mongoose=require("mongoose");
const schema=mongoose.Schema;

const listingSchema=new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description:String,
    image:{
        type:String,
        default:"https://unsplash.com/photos/green-plants-on-brown-concrete-building-KLOW1bD616Y",
        set:(userLink)=> userLink==="" ? "https://unsplash.com/photos/green-plants-on-brown-concrete-building-KLOW1bD616Y":userLink
    },
    price:Number,
    location:String,
    country:String
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;