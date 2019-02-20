const nodemailer = require("nodemailer");
const mongoose = require('mongoose');
const User = require('../models/users');

//const connUri = process.env.MONGO_LOCAL_CONN_URL;
const connUri = 'mongodb://127.0.0.1:27017/onlineclass'


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "creatrclasses@gmail.com",
    pass: "creatrclasses123"
  }
});


// transporter.sendMail(mailOptions, function(err, info) {
//   if (err) console.log(err);
//   else console.log(info);
// });

module.exports = {
  sendMessage: async ({to, sub, txt}) => {
      try {
        const res = await transporter.sendMail({

          from: "Creatr Classes <creatrclasses@gmail.com>", 
          bcc: to,
          subject: sub,
          text: `${txt}`
        })
        //console.log(res.data.item)
        return res;
        // {vid:item.id, stream:item.contentDetails.boundStreamId, livechat:item.snippet.liveChatId}
      } catch (err) {
        throw Error(err);
      }
  },
  getEmailsByRole: async (roles) => {
    try {
      await mongoose.connect(connUri);
      let users = await User.find({role:{$in:roles}});
      let emails = users.map(i=>i.email)
      return emails
    } catch (error) {
      // res.status(status).send(result);
      console.log(error);
      //return next(error);
    }
  },
  getEmailsBySection: async (sections) => {
    try {
      await mongoose.connect(connUri);
      let users = await User.find({section:{$in:sections}});
      let emails = users.map(i=>i.email)
      return emails
    } catch (error) {
      // res.status(status).send(result);
      console.log(error);
      //return next(error);
    }
  },
};

module.exports.getEmailsBySection('Class B')
.then(res => console.log(res))
.catch(err => console.log(err))