import { transporter, sender } from "../lib/nodemailer.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";

export const sendWelcomeEmail = async (toEmail, name, clientURL) => {
    console.log('📧 Attempting to send email to:', toEmail);
    
    try {
        const mailOptions = {
            from: `${sender.name} <${sender.email}>`,
            to: toEmail,
            subject: 'Welcome to ChatApp! 🎉',
            html: createWelcomeEmailTemplate(name, clientURL)
        };

        const info = await transporter.sendMail(mailOptions);
        
        console.log('✅ Email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Error sending welcome email:', error);
        throw error;
    }
};