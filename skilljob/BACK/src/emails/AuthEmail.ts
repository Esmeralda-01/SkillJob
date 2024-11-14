import { transporter } from "../config/nodemailer"

interface IEmail {
    email: string
    name: string
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async ( user : IEmail ) => {
        const info = await transporter.sendMail({
            from: 'SkillJob <admin@skilljob.com>',
            to: user.email,
            subject: 'SkillJob - Confirma tu cuenta',
            text: 'SkillJob - Confirma tu cuenta',
            html: `<p>Hola: ${user.name}, has creado tu cuenta en SkillJob, ya casi esta todo listo, solo debes confirmar tu cuenta</p>
                <p>Visita el siguiente enlace:</p>
                <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
                <p>E ingresa el código: <b>${user.token}</b></p>
                <p>Este token expira en 10 minutos</p>
            `
        })

        console.log('Mensaje enviado', info.messageId)
    }

    static sendPasswordResetToken = async ( user : IEmail ) => {
        const info = await transporter.sendMail({
            from: 'SkillJob <admin@skilljob.com>',
            to: user.email,
            subject: 'SkillJob - Reestablece tu password',
            text: 'SkillJob - Reestablece tu password',
            html: `<p>Hola: ${user.name}, has solicitado reestablecer tu password.</p>
                <p>Visita el siguiente enlace:</p>
                <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer Password</a>
                <p>E ingresa el código: <b>${user.token}</b></p>
                <p>Este token expira en 10 minutos</p>
            `
        })

        console.log('Mensaje enviado', info.messageId)
    }
    static sendDataOffer = async ( user : IEmail ) => {
        const info = await transporter.sendMail({
            from: 'SkillJob <admin@skilljob.com>',
            to: user.email,
            subject: 'SkillJob - Datos de contacto del oferente',
            text: 'SkillJob - Datos de contacto del oferente',
            html: `<p>Hola: ${user.name}, has solicitado un servicio</p>
                <p>Te proporcionamos sus datos de contacto para que te comuniques</p>
                <p>Este token expira en 10 minutos</p>
            `
        })
        console.log('Mensaje enviado', info.messageId)
    }
}