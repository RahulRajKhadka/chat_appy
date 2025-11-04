import {resendClient,sender  } from "module";
import 

export const sendWelcomeEmail = async (toEmail, name, clientURL) => { 
    const {data,error}= await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: [toEmail],
        subject: 'Welcome to ChatApp! 🎉',
        html: createWelcomeEmailTemplate(name, clientURL)
    });
}
