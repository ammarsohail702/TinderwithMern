import express, { response } from "express"
import mongoose from "mongoose"
import Cards from "./dbCards.js"
import Cors from "cors";

// App Config
const app= express();
const port= process.env.port || 8001;
const uri= "mongodb://admin:MxVfKKEMaqWvgXk4@cluster0-shard-00-00.082ox.mongodb.net:27017,cluster0-shard-00-01.082ox.mongodb.net:27017,cluster0-shard-00-02.082ox.mongodb.net:27017/tindertable?ssl=true&replicaSet=atlas-ne49i9-shard-0&authSource=admin&retryWrites=true&w=majority";

// Middleware Config
app.use(express.json());
app.use(Cors());


// DB config
mongoose.connect(uri,{
useNewUrlParser: true
});

mongoose.connection.once('open', () => {
    console.log('connection established');

}).on('error',err  => {

    console.log('error is:', err);
});


// Api Endpoints

app.get("/", (req, res)=> res.status(200).send("Hay, its Ammar"));

app.post('/tinder/cards',(req, res)=>{
    const dbCards=req.body;
    
    Cards.create(dbCards, (err, data)=> {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }

    });
} );

app.get('/tinder/cards',(req, res)=>{

    
    Cards.find( (err, data) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }

    });
} );

app.put('/tinder/cards/edit/:id',  (req,res) => {

const user= req.body;
const edituser = new Cards(user);
const update= Cards.updateOne({_id: req.params.id }, edituser);
       
        if(update){
            response.json(edituser);
        }else{
            response.json({message: 'sorry unable to update'})
        }

});

// Listeners
app.listen(port, () => {

    console.log('Listening on localhost:', port);

});