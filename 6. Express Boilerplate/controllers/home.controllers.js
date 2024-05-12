/**
 * @desc This controller sends a simple success response
 * @Url http://localhost:5000/
 * @method GET
 * @return returns a success json response 
*/
const home = (req, res) =>{
    res.json({
        code: 200,
        remark:"success"
    })

}

export {home}