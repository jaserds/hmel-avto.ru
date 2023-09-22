import nodemailer from 'nodemailer';


class MailService {
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: 'smtp.yandex.ru', 
            port: 465, 
            secure: true, 
            auth:{
                user: 'sysadmin@truckdrive.ru',
                pass: 'wZWZ2O6j'
            }
        })
    }

    async sendActivationMail(to, link){
        await this.transporter.sendMail(
            {
                from: 'hmel-avto@mail.ru',
                to,
                subject: 'Активация аккаунта на ',
                text: '',
                html:
                `
                <div>
                    <h1>Для активации</h1>
                    <a href="${link}">${link}</a>
                </div>
                `
            }
        )
    }
}

export default new MailService();