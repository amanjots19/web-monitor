
const nodemailer = require("nodemailer");
const Mailer = require("../Objects/mail");
const cron = require("node-cron");
const axios = require('axios')
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'amnsky19@gmail.com',
    pass: 'amanjot12@'
  }
});
let services = {};
services.sendMail = function (Obj) {
  return new Promise(async (resolve, reject) => {
    try {
      let mail = await transporter.sendMail(
        {
          to: Obj.to,
          from: Obj.from,
          subject: Obj.subject,
          text: Obj.text,
          html: Obj.html,
        },
        (err, info) => {
          if (err) {
            console.log(err);
            reject({ msg: err, code: "NOT SENT" });
          }
          resolve(info);
        }
      );
    } catch (e) {
      console.log(e);
      reject({ msg: e, code: "NOT SENT" });
    }
  });
};
services.mappingFreq = async (url,freq,email) => {
  try{
    var res;
    var fq = parseInt(freq);
    let x = 1;
    var a = setInterval(async ()=>{
      if(x > 10) {
        clearInterval(a);
        let resp = await services.scheduler(url,"Success",email,res)
      }
      x++;
      res = await services.apiCall(url);
      if(res !== 201 && res !== 200){
        await services.scheduler(url,"Failed",email,res);
        clearInterval(a);
      }
    }, fq) 
    
  }
  catch(e){
    console.log(e);
  }
}

services.scheduler = function(url, msg, email,status){
    return new Promise(async (resolve, reject)=>{
        try {
          console.log(email)
        let from = 'amnsky19@gmail.com';
            to = `${email}`
            subject = 'Result for your task';
            text = `Result for your task`;
            html = `<div><h4>Hi!
            Hope you're Doing well.
            This mail is a response of the web monitoring, that according to the response of your web page, ${url}, monitored for 10 times at the given frequency and the response is ${status} which is ${msg}</h4>.

            <p>You can also reschedule your task using this web app</p> </div>`;

        var Obj = new Mailer({to: to , from : from , subject : subject, text : text, html : html});
         await services.sendMail(Obj);
        } catch (error) {
            console.log(error);
            reject(error)
        }
    })
}
services.apiCall = function(url){
  return new Promise(async (resolve, reject)=>{
    try{ 
      axios.get(`${url}`).then((res) => {
        resolve(res.status)}).catch(err => console.log(err));    
    }catch(e){
      reject(e);
    }
})};

services.check = function(url,freq,email){
  return new Promise(async (resolve, reject) => {
    try{
      let data;
      if(freq === "10 seconds"){
        data = services.mappingFreq(url,"10000",email)
      }
      else if(freq === "1 minute"){
        data = services.mappingFreq(url,"100000",email)
      }
      else if(freq === "10 minutes"){
        data = services.mappingFreq(url,"1000000",email)
      }
      else if(freq === "15 minutes"){
        data = services.mappingFreq(url,"1500000",email)
      }
      else if(freq === "1 hour"){
        data =services.mappingFreq(url,"6000000",email)
      }
      else if(freq === "4 hours"){
        data = services.mappingFreq(url,"2400000",email)
      }
      else if(freq === "6 hours"){
        data = services.mappingFreq(url,"36000000",email)
      }
      resolve(data)
    }
    catch(e){
      console.log(e)
      reject(e);
    }
  })
}

module.exports = services;
