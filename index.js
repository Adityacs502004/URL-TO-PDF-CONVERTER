import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";


dotenv.config();

const port = 3000;
const app = express()

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/" , (req , res)=>{
    res.render("index.ejs")
});

app.post("/submit" , async (req , res) =>{
    let url = await req.body.url;
    console.log(url);
    try {
        const options = {
	"method": "POST",
	"url": "https://api.pdfendpoint.com/v1/convert",
	"headers": {
		"Content-Type": "application/json",
		"Authorization": `${process.env.PDF_API_KEY}`
	},
	"data": JSON.stringify({
		"url": `${url}`,
		"sandbox": false,
		"orientation": "vertical",
		"page_size": "A4",
		"margin_top": "2cm",
		"margin_bottom": "2cm",
		"margin_left": "2cm",
		"margin_right": "2cm"
    })
    };
        let pdf = await axios.request(options)
        console.log(pdf.data);
        res.redirect(pdf.data.data.url);

    } catch (error) {
        console.log(error);

    }
})

app.listen(port , ()=>{
    console.log("Server is live on port 3000");
})