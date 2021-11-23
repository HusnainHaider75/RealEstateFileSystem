const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://userfiles:userfiles@cluster0.nfp70.mongodb.net/HousingSystemData?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true

    }).then(() => {
        console.log("Connected to Database!");
    }).catch(() => {
        console.log("Error to Database!");
    })