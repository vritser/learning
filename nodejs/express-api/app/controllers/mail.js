var nodemailer = require('nodemailer');
var smtpConfig = {
    host: 'smtp.163.com',
    port: 465,
    secure: true, // use SSL 
    auth: {
        user: 'vritser@163.com',
        pass: 'supperman'
    }
};
var transporter = nodemailer.createTransport(smtpConfig);

var mailOptions = {
    from:'<vritser@163.com>',
    to:'543195625@qq.com',
    subject:'sb',
    text:'hello world',
    html:'<b>加粗老白sb</b>'
};

transporter.sendMail(mailOptions,(err,info)=>{
    if(err) return console.log(err);
    console.log(info.response);
});