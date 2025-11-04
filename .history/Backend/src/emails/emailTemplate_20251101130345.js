export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to chatAPP</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            
            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(to right, #36D1DC, #5B86E5); text-align: center; padding: 40px;">
                <img src="https://img.freepik.com/free-vector/hand-drawn-message-element-vector-cute-sticker_53876-118344.jpg?t=st=1741295028~exp=1741298628~hmac=0d076f885d7095f0b5bc8d34136cd6d64749455f8cb5f29a924281bafc11b96c&w=1480" 
                     alt="Messenger Logo" 
                     width="80" 
                     height="80" 
                     style="border-radius: 50%; background-color: #ffffff; padding: 10px; margin-bottom: 20px;">
                <h1 style="color: #ffffff; font-size: 28px; font-weight: 600; margin: 0;">Welcome to Messenger!</h1>
              </td>
            </tr>
            
            <!-- Body -->
            <tr>
              <td style="padding: 35px;">
                <p style="font-size: 18px; color: #5B86E5; margin: 0 0 15px;"><strong>Hello ${name},</strong></p>
                <p style="font-size: 16px; color: #333; margin: 0 0 20px;">
                  We're excited to have you join our messaging platform! Connect with friends, family, and colleagues in real-time, anywhere.
                </p>

                <!-- Steps Box -->
                <div style="background-color: #f8f9fa; padding: 25px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #36D1DC;">
                  <p style="font-size: 16px; margin: 0 0 10px;"><strong>Get started in a few steps:</strong></p>
                  <ul style="padding-left: 20px; margin: 0; font-size: 15px; color: #555;">
                    <li style="margin-bottom: 8px;">Set up your profile picture</li>
                    <li style="margin-bottom: 8px;">Find and add your contacts</li>
                    <li style="margin-bottom: 8px;">Start a conversation</li>
                    <li>Share photos, videos, and more</li>
                  </ul>
                </div>

                <!-- CTA Button -->
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${clientURL}" 
                     style="background: linear-gradient(to right, #36D1DC, #5B86E5); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-weight: 600; display: inline-block; font-size: 16px;">
                    Open Messenger
                  </a>
                </div>

                <p style="font-size: 16px; color: #333; margin: 0 0 10px;">If you need any help or have questions, we're always here to assist you.</p>
                <p style="font-size: 16px; color: #333; margin: 0;">Happy messaging!</p>

                <p style="margin-top: 25px; font-size: 16px; color: #333;">Best regards,<br>The Messenger Team</p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #f5f5f5; text-align: center; padding: 20px; font-size: 12px; color: #999;">
                <p style="margin: 5px 0;">© 2025 Messenger. All rights reserved.</p>
                <p style="margin: 5px 0;">
                  <a href="#" style="color: #5B86E5; text-decoration: none; margin: 0 8px;">Privacy Policy</a>|
                  <a href="#" style="color: #5B86E5; text-decoration: none; margin: 0 8px;">Terms of Service</a>|
                  <a href="#" style="color: #5B86E5; text-decoration: none; margin: 0 8px;">Contact Us</a>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}
