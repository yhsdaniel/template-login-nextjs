import nodemailer from 'nodemailer'
import { prisma } from "@/lib/prisma"

function sendEmail(message) {
    return new Promise((res, rej) => {
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: process.env.NODEMAILER_EMAIL,
        //         pass: process.env.NODEMAILER_PW
        //     },
        // });

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "59c2c42fb23c3e",
                pass: "e783f9902cbc29"
            }
        });

        transporter.sendMail(message, function (err, info) {
            if (err) {
                rej(err)
            } else {
                res(info)
            }
        })
    })
}

export const sendConfirmationEmail = ({ toUser, hash }) => {
    const message = {
        from: process.env.NODEMAILER_EMAIL,
        to: process.env.NODEMAILER_EMAIL,
        subject: "Tokopaedi - Activation Account",
        html:
        `
            <h3>Hello ${toUser.name}</h3>
            <p>To activate your account please follow this link: <a href="${process.env.NODEMAILER_DOMAIN}/${hash}">${process.env.NODEMAILER_DOMAIN}/${hash}</a></p>
        `
    };

    return sendEmail(message)
}