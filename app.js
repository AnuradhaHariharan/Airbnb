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

//home page
app.get("/listings",async(req,res)=>{

   const allListing= await Listing.find({});
   res.render("listings/index", { allListing });
})

app.get("/listing/new",(req,res)=>{
    console.log("Reached new listing route");
    res.render("listings/newListing");
})
app.post("/listings", async (req, res) => {
    try {
        // Destructure listing data from req.body
        const { title, description, image, price, location, country } = req.body;

        // Create a new Listing document
        const newListing = new Listing({
            title,
            description,
            image,
            price,
            location,
            country
        });

        // Save the new listing to the database
        await newListing.save();
        console.log(newListing);

        // Redirect to a success page or back to the listing page
        res.redirect("/listings");
    } catch (error) {
        // Handle any errors that occur during listing creation
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//show individual listing
app.get("/individualListing/:id", async (req, res) => {
    try {
        const id  = req.params.id;
        const listing = await Listing.findById(id); // Fetch listing data from the database based on the provided id
        if (!listing) {
            // Handle case where listing is not found
            return res.status(404).send("Listing not found");
        }
        console.log(id);
        //console.log(listing);
        res.render("listings/individualListing", { listing }); // Pass listing data to the template
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

