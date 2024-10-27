const nodemailer=require('nodemailer');

// const mailSender=async (email,title,body)=>{
//     try {
//         console.log("hi");
//        let transporter =nodemailer.createTransport({
//         host:process.env.MAIL_HOST,
//         auth:{
//             user: process.env.MAIL_USER,
//             pass:process.env.MAIL_PASS,
//         }
//        })
//        console.log("hi");
//        let info=transporter.sendMail({
//         from:'HARGUN SINGH',
//         to:`${email}`,
//         subject:`${title}`,
//         html:`${body}`
//        })
//        console.log("hi");
//        console.log(info);
//        console.log("hi");
//        return info;

//     } catch (error) {
//         console.log("error in mailer",error);
//     }
// }
const mailSender = async (email, title, body) => {
    try {
      let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
        secure: false,
      })
  
      let info = await transporter.sendMail({
        from: `"Studynotion | CodeHelp" <${process.env.MAIL_USER}>`, // sender address
        to: `${email}`, // list of receivers
        subject: `${title}`, // Subject line
        html: `${body}`, // html body
      })
      console.log(info.response)
      return info
    } catch (error) {
      console.log(error.message)
      return error.message
    }
  }

module.exports=mailSender;