import express from "express";
import colors from "colors";
import qrcode from "qrcode";

const app = express();

app.get("/", (req, res)=>{
    res.json({
        code: 200,
        remark:"Hello from server updated!"
    })
})

app.get("/generateQR",async  (req, res)=>{
    try {
        
        const url = req.query.url || "http://www.example.com";

        const newQR = await qrcode.toDataURL(url);

        console.log(newQR);

        res.send(`<img src=${newQR} alt='myqr'></img>`)


    } catch (error) {
        res.status(500)
        res.json({
            code: 500,
            remark:"Internal server error"
        })
    }
})

const PORT = 8000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`.yellow.underline);
})
