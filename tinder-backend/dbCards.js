import mongoose from "mongoose"

const cardschema= mongoose.Schema({
    name:String,
    imgUrl: String,

});

export default mongoose.model("Cards", cardschema)