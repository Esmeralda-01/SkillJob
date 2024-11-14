import { transporter } from "../config/nodemailer"

interface IEmail {
    email: string
    name: string
}

export class ContacEmail {
    static sendDataOffer = async (user: IEmail & { oferenteEmail: string, oferentePhone: string }) => {
        const info = await transporter.sendMail({
            from: 'SkillJob <admin@skilljob.com>',
            to: user.email,
            subject: 'SkillJob - Datos de contacto del oferente',
            text: 'SkillJob - Datos de contacto del oferente',
            html: `<p>Hola: ${user.name}, has solicitado un servicio</p>
                <p>Te proporcionamos sus datos de contacto para que te comuniques</p>
                <p><b>Email del oferente:</b> ${user.oferenteEmail}</p>
            <p><b>Teléfono del oferente:</b> ${user.oferentePhone}</p>
            `
        })
        console.log('Mensaje enviado', info.messageId)
    }
}