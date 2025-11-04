export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ChatApp</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body style="font-family: 'Inter', sans-serif; background: #f4f6fb; margin: 0; padding: 40px 0; text-align: center;">

    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #fff; border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.05); overflow: hidden;">
      
      <!-- Header -->
      <tr>
        <td style="background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%); padding: 50px 20px;">
          <h1 style="color: #fff; font-size: 28px; margin: 0 0 8px;">Welcome to ChatApp 👋</h1>
          <p style="color: rgba(255,255,255,0.9); font-size: 15px; margin: 0;">Hi ${name}, great to have you with us!</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding: 40px 30px;">
          <p style="color: #374151; font-size: 16px; margin: 0 0 24px; line-height: 1.6;">
            ChatApp lets you connect, share, and chat effortlessly with the people who matter most.
          </p>

          <!-- Steps -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background: #F9FAFB; border-radius: 12px; padding: 16px;">
            <tr><td style="color: #1F2937; font-weight: 500; font-size: 15px; padding: 8px 0;">✅ Complete your profile</td></tr>
            <tr><td style="color: #1F2937; font-weight: 500; font-size: 15px; padding: 8px 0;">✅ Add your contacts</td></tr>
            <tr><td style="color: #1F2937; font-weight: 500; font-size: 15px; padding: 8px 0;">✅ Start chatting instantly</td></tr>
          </table>

          <!-- CTA -->
          <div style="margin: 35px 0 20px;">
            <a href="${clientURL}"
               style="background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
                      color: #fff; 
                      text-decoration: none; 
                      padding: 14px 36px; 
                      border-radius: 10px; 
                      font-weight: 600; 
                      font-size: 16px; 
                      display: inline-block;
                      box-shadow: 0 6px 18px rgba(99,102,241,0.25);">
              Open ChatApp
            </a>
          </div>

          <p style="color: #6B7280; font-size: 14px; margin: 0;">
            Cheers,<br><strong>The ChatApp Team</strong>
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background: #F9FAFB; padding: 18px; font-size: 12px; color: #9CA3AF;">
          © 2025 ChatApp • <a href="#" style="color: #6366F1; text-decoration: none;">Privacy</a> • <a href="#" style="color: #6366F1; text-decoration: none;">Help</a>
        </td>
      </tr>

    </table>
  </body>
  </html>
  `;
}
