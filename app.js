const express=require("express");
const mongoose=require("mongoose");
const app=express();
const port=8080;
app.listen(port);

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
main().catch(err => console.log(err));
