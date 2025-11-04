import {resendClient,sender  } from "module";
import { createWelcomeEmailTemplate } from "../emails/emailTemplate.js";

export const sendWelcomeEmail = async (toEmail, name, clientURL) => { 
    const {data,error}= await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: [toEmail],
        subject: 'Welcome to ChatApp! 🎉',
        html: createWelcomeEmailTemplate(name, clientURL)
    });

    if(error){
        console.error('Error sending welcome email:', error);
    }
    console.log('Welcome email sent:', data);
}
