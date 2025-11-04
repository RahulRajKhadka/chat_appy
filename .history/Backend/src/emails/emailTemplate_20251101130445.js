export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to chatAPP</title>
  </head>
  <body style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 40px 0;">
    
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" role="presentation"
            style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.05); overflow: hidden;">

            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(135deg, #4f46e5, #3b82f6); text-align: center; padding: 48px 20px;">
                <img src="https://img.freepik.com/free-vector/hand-drawn-message-element-vector-cute-sticker_53876-118344.jpg"
                     alt="chatAPP Logo" width="88" height="88"
                     style="border-radius: 50%; background-color: #ffffff; padding: 12px; margin-bottom: 18px;">
                <h1 style="color: #ffffff; font-size: 30px; font-weight: 600; margin: 0;">Welcome to chatAPP 🎉</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 40px 48px;">
                <p style="font-size: 18px; color: #111827; margin: 0 0 18px;">
                  <strong>Hello ${name},</strong>
                </p>

                <p style="font-size: 16px; color: #374151; line-height: 1.6; margin: 0 0 28px;">
                  We’re thrilled to have you join <strong>chatAPP</strong> — the place where conversations come alive.
                  Connect seamlessly with your friends, family, and team in real time.
                </p>

                <!-- Steps Section -->
                <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 24px; margin-bottom: 32px;">
                  <p style="font-size: 16px; color: #111827; margin: 0 0 12px; font-weight: 600;">Here’s how to get started:</p>
                  <ul style="margin: 0; padding-left: 20px; font-size: 15px; color: #4b5563; line-height: 1.7;">
                    <li>Upload a profile picture</li>
                    <li>Add your friends or teammates</li>
                    <li>Start your first chat</li>
                    <li>Share messages, images, and moments</li>
                  </ul>
                </div>

                <!-- CTA Button -->
                <div style="text-align: center; margin: 35px 0;">
                  <a href="${clientURL}"
                     style="background: linear-gradient(135deg, #4f46e5, #3b82f6); 
                            color: #ffffff; 
                            text-decoration: none; 
                            padding: 14px 36px; 
                            border-radius: 50px; 
                            font-weight: 600; 
                            font-size: 16px; 
                            display: inline-block; 
                            box-shadow: 0 4px 12px rgba(59,130,246,0.3);
                            transition: all 0.2s ease;">
                    Open chatAPP
                  </a>
                </div>

                <p style="font-size: 15px; color: #6b7280; line-height: 1.6; margin: 0;">
                  Need any help? Our team is always here for you — just reply to this email.
                </p>

                <p style="margin-top: 32px; font-size: 16px; color: #111827;">
                  Cheers,<br>
                  <strong>The chatAPP Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #f9fafb; text-align: center; padding: 22px;">
                <p style="font-size: 13px; color: #9ca3af; margin: 0 0 8px;">© 2025 chatAPP. All rights reserved.</p>
                <p style="margin: 0; font-size: 13px;">
                  <a href="#" style="color: #3b82f6; text-decoration: none; margin: 0 8px;">Privacy Policy</a> •
                  <a href="#" style="color: #3b82f6; text-decoration: none; margin: 0 8px;">Terms of Service</a> •
                  <a href="#" style="color: #3b82f6; text-decoration: none; margin: 0 8px;">Contact Us</a>
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
