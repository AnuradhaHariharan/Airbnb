const mongoose=require("mongoose");
const data=require("./data");
const Listing=require("../models/listing.js");


  main().then(()=>console.log("Successfull")).catch(err => console.log(err));

  const initDb=async ()=>{
   await Listing.deleteMany({});
   await Listing.insertMany(data.data);
   console.log("data initialised");
  }
initDb();
  