require('dotenv').config();
const nodemail = require('nodemailer');

class MailService {
  #transport;

  constructor() {
    try {
      let config = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        
        auth: {
          user: process.env.SMTP_USER, 
          pass: process.env.SMTP_PWD
        }
      }
      if(process.env.SMTP_PROVIDER === 'gmail') {
        config['service'] = 'gmail'

      }
      this.#transport = nodemail.createTransport(config)
    } catch(exception) {
      console.log("Error connecting to SMTP server")
      console.log(exception);
      throw exception
    }
  }

  async sendEmail({to, subject, body, attachements= []}) {
    try {
      return await this.#transport.sendMail({
        subject: subject,
        from: process.env.FROM_ADDRESS,
        to: to,
        attachments: attachements, 
        html: body
      })
    } catch(exception) {
      console.log(exception)
      throw exception
    }
  }

}

const mailSvc = new MailService()
module.exports = mailSvc;