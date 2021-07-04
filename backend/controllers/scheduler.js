
const services = require("../services/mail");

let controller = {};


controller.monitor = async(req,res,next) => {
  try{
    const {url, frequency, email} = req.body;
    let data = await services.check(url,frequency,email)
    console.log(data)
    res.json({
      success : true,
      res:data
    })
  }catch(e){
    console.log(e)
  }
}


module.exports = controller;
