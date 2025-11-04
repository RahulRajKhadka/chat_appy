export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ChatApp</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 0; padding: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
    
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; margin: 40px auto;">
      <tr>
        <td align="center">

          <!-- Main Card -->
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
            style="background: #ffffff; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.1); overflow: hidden; backdrop-filter: blur(10px);">

            <!-- Header with Gradient -->
            <tr>
              <td style="background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #D946EF 100%); text-align: center; padding: 50px 40px 40px;">
                <div style="background: rgba(255,255,255,0.2); border-radius: 20px; padding: 16px; display: inline-block; margin-bottom: 20px; backdrop-filter: blur(10px);">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.418 16.97 20 12 20C10.46 20 9.01 19.656 7.74 19.051L3 20L4.418 16.086C3.334 14.948 2.5 13.536 2.5 12C2.5 7.582 6.53 4 12 4C17.47 4 21.5 7.582 21.5 12H21Z" 
                          stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <h1 style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0 0 8px; letter-spacing: -0.5px;">Welcome to ChatApp</h1>
                <p style="color: rgba(255,255,255,0.9); font-size: 16px; font-weight: 400; margin: 0; opacity: 0.9;">Ready to start connecting?</p>
              </td>
            </tr>

            <!-- Body Content -->
            <tr>
              <td style="padding: 48px 40px 40px;">
                
                <!-- Welcome Message -->
                <div style="margin-bottom: 32px;">
                  <h2 style="color: #1F2937; font-size: 20px; font-weight: 600; margin: 0 0 16px;">
                    Hello <span style="color: #6366F1;">${name}</span>! 👋
                  </h2>
                  <p style="color: #6B7280; font-size: 16px; line-height: 1.6; margin: 0;">
                    Welcome to ChatApp - where meaningful conversations happen. We're excited to have you join our community of connected users.
                  </p>
                </div>

                <!-- Feature Highlights -->
                <div style="background: #F8FAFC; border-radius: 16px; padding: 24px; margin: 32px 0;">
                  <h3 style="color: #1F2937; font-size: 18px; font-weight: 600; margin: 0 0 20px;">Get Started in Minutes</h3>
                  
                  <div style="display: grid; gap: 16px;">
                    <!-- Feature 1 -->
                    <div style="display: flex; align-items: flex-start; gap: 12px;">
                      <div style="background: #6366F1; border-radius: 8px; padding: 8px; display: flex; align-items: center; justify-content: center;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                      </div>
                      <div>
                        <p style="color: #1F2937; font-weight: 500; margin: 0 0 4px;">Complete Your Profile</p>
                        <p style="color: #6B7280; font-size: 14px; margin: 0;">Add a photo and tell others about yourself</p>
                      </div>
                    </div>

                    <!-- Feature 2 -->
                    <div style="display: flex; align-items: flex-start; gap: 12px;">
                      <div style="background: #6366F1; border-radius: 8px; padding: 8px; display: flex; align-items: center; justify-content: center;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                      </div>
                      <div>
                        <p style="color: #1F2937; font-weight: 500; margin: 0 0 4px;">Connect with Friends</p>
                        <p style="color: #6B7280; font-size: 14px; margin: 0;">Find and connect with your contacts</p>
                      </div>
                    </div>

                    <!-- Feature 3 -->
                    <div style="display: flex; align-items: flex-start; gap: 12px;">
                      <div style="background: #6366F1; border-radius: 8px; padding: 8px; display: flex; align-items: center; justify-content: center;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                      </div>
                      <div>
                        <p style="color: #1F2937; font-weight: 500; margin: 0 0 4px;">Start Chatting</p>
                        <p style="color: #6B7280; font-size: 14px; margin: 0;">Send messages, files, and create groups</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- CTA Button -->
                <div style="text-align: center; margin: 40px 0 32px;">
                  <a href="${clientURL}"
                     style="background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%); 
                            color: #ffffff; 
                            text-decoration: none; 
                            padding: 16px 40px; 
                            border-radius: 12px; 
                            font-weight: 600; 
                            font-size: 16px; 
                            display: inline-block; 
                            box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
                            transition: all 0.3s ease;
                            border: none;
                            cursor: pointer;">
                    Launch ChatApp
                  </a>
                </div>

                <!-- Support Section -->
                <div style="border-top: 1px solid #E5E7EB; padding-top: 32px; text-align: center;">
                  <p style="color: #6B7280; font-size: 14px; line-height: 1.6; margin: 0 0 16px;">
                    Need help getting started? Our support team is here for you.
                  </p>
                  <p style="color: #1F2937; font-size: 15px; font-weight: 500; margin: 0;">
                    Best regards,<br>
                    <span style="color: #6366F1;">The ChatApp Team</span>
                  </p>
                </div>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background: #F8FAFC; padding: 24px 40px; text-align: center;">
                <p style="color: #9CA3AF; font-size: 12px; margin: 0 0 12px;">
                  © 2024 ChatApp. All rights reserved.
                </p>
                <div style="display: flex; justify-content: center; gap: 24px;">
                  <a href="#" style="color: #6B7280; text-decoration: none; font-size: 12px; transition: color 0.3s ease;">Privacy Policy</a>
                  <a href="#" style="color: #6B7280; text-decoration: none; font-size: 12px; transition: color 0.3s ease;">Terms of Service</a>
                  <a href="#" style="color: #6B7280; text-decoration: none; font-size: 12px; transition: color 0.3s ease;">Contact</a>
                </div>
                <p style="color: #9CA3AF; font-size: 11px; margin: 16px 0 0;">
                  Made with ❤️ for better conversations
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