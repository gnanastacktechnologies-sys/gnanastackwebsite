import nodemailer from 'nodemailer';

// Create Nodemailer Transporter using Gmail SMTP
const getTransporter = () => {
  const user = process.env.EMAIL_USER || 'gnanastacktechnologies@gmail.com';
  const pass = process.env.EMAIL_PASS;

  if (!pass || pass.includes('your_16_digit_app_password')) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: true, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });
};

/**
 * Send real-time Gmail notification to Admin when a new enquiry is submitted
 */
export const sendAdminEnquiryAlert = async (enquiry) => {
  try {
    const transporter = getTransporter();
    if (!transporter) {
      console.warn('⚠️ Gmail alert skipped: EMAIL_PASS is not configured in backend/.env');
      return { success: false, reason: 'unconfigured' };
    }

    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'gnanastacktechnologies@gmail.com';
    const emailUser = process.env.EMAIL_USER || 'gnanastacktechnologies@gmail.com';

    const mailOptions = {
      from: `"GnanaStack Web Alerts" <${emailUser}>`,
      to: adminEmail,
      replyTo: enquiry.email,
      subject: `🚨 NEW CLIENT LEAD: ${enquiry.name} (${enquiry.projectType})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #05070A; color: #E2E8F0; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #0A0F14; border: 1px solid #0066FF33; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 102, 255, 0.15); }
            .header { background: linear-gradient(135deg, #0066FF, #00C8FF); padding: 24px; text-align: center; }
            .header h1 { color: #FFFFFF; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
            .header p { color: #E0F2FE; margin: 6px 0 0 0; font-size: 13px; }
            .content { padding: 28px; }
            .badge { display: inline-block; background-color: rgba(0, 200, 255, 0.15); color: #00C8FF; border: 1px solid rgba(0, 200, 255, 0.3); padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-bottom: 20px; }
            .field-group { margin-bottom: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); padding-bottom: 12px; }
            .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94A3B8; font-weight: 600; }
            .field-value { font-size: 15px; color: #F8FAFC; margin-top: 4px; font-weight: 500; }
            .message-box { background-color: #05070A; border-left: 3px solid #00C8FF; padding: 14px 18px; border-radius: 6px; margin-top: 20px; font-size: 14px; line-height: 1.6; color: #CBD5E1; }
            .actions { margin-top: 28px; text-align: center; }
            .btn { display: inline-block; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin: 0 6px; }
            .btn-primary { background: linear-gradient(135deg, #0066FF, #00C8FF); color: #FFFFFF; }
            .btn-secondary { background-color: rgba(255, 255, 255, 0.08); color: #00C8FF; border: 1px solid rgba(0, 200, 255, 0.3); }
            .footer { background-color: #05070A; padding: 16px; text-align: center; font-size: 12px; color: #64748B; border-top: 1px solid rgba(255, 255, 255, 0.05); }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⚡ GnanaStack Technologies</h1>
              <p>New Client Project Enquiry Received</p>
            </div>
            <div class="content">
              <span class="badge">🔥 New Lead Alert</span>
              
              <div class="field-group">
                <div class="field-label">Client Name</div>
                <div class="field-value">${enquiry.name} ${enquiry.company ? `(${enquiry.company})` : ''}</div>
              </div>
              
              <div class="field-group">
                <div class="field-label">Contact Email</div>
                <div class="field-value"><a href="mailto:${enquiry.email}" style="color: #00C8FF; text-decoration: none;">${enquiry.email}</a></div>
              </div>

              <div class="field-group">
                <div class="field-label">Phone Number</div>
                <div class="field-value">${enquiry.phone || 'Not provided'}</div>
              </div>

              <div class="field-group">
                <div class="field-label">Project Type</div>
                <div class="field-value" style="color: #39E75F;">${enquiry.projectType}</div>
              </div>

              <div class="field-group">
                <div class="field-label">Estimated Budget</div>
                <div class="field-value">${enquiry.budget || 'Flexible / Undisclosed'}</div>
              </div>

              <div class="field-group">
                <div class="field-label">Submission Time</div>
                <div class="field-value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>
              </div>

              <div class="field-label">Project Requirements / Message</div>
              <div class="message-box">
                ${enquiry.message.replace(/\n/g, '<br/>')}
              </div>

              <div class="actions">
                <a href="mailto:${enquiry.email}?subject=Re:%20${encodeURIComponent(enquiry.projectType)}%20Enquiry%20-%20GnanaStack%20Technologies" class="btn btn-primary">✉️ Reply to Client</a>
                ${enquiry.phone ? `<a href="tel:${enquiry.phone}" class="btn btn-secondary">📞 Call ${enquiry.phone}</a>` : ''}
              </div>
            </div>
            <div class="footer">
              GnanaStack Technologies Website CMS System &bull; Salem, Tamil Nadu, India
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Admin Gmail alert dispatched successfully: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Failed to send Admin Gmail alert:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Send auto-acknowledgement email to the client
 */
export const sendClientConfirmation = async (enquiry) => {
  try {
    const transporter = getTransporter();
    if (!transporter) return { success: false, reason: 'unconfigured' };

    const emailUser = process.env.EMAIL_USER || 'gnanastacktechnologies@gmail.com';

    const mailOptions = {
      from: `"GnanaStack Technologies" <${emailUser}>`,
      to: enquiry.email,
      subject: `Thank you for contacting GnanaStack Technologies!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #05070A; color: #E2E8F0; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #0A0F14; border: 1px solid #0066FF33; border-radius: 12px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #0066FF, #00C8FF); padding: 24px; text-align: center; }
            .header h1 { color: #FFFFFF; margin: 0; font-size: 22px; font-weight: 700; }
            .content { padding: 28px; line-height: 1.6; }
            .summary { background-color: #05070A; padding: 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); margin: 20px 0; }
            .footer { background-color: #05070A; padding: 16px; text-align: center; font-size: 12px; color: #64748B; border-top: 1px solid rgba(255,255,255,0.05); }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>GnanaStack Technologies</h1>
              <p style="color:#E0F2FE; margin:4px 0 0 0;">From Village Vision to Digital Innovation</p>
            </div>
            <div class="content">
              <p>Hi <strong>${enquiry.name}</strong>,</p>
              <p>Thank you for reaching out to <strong>GnanaStack Technologies</strong>! We have received your project enquiry for <strong>${enquiry.projectType}</strong>.</p>
              
              <div class="summary">
                <div style="font-size:12px; color:#94A3B8; text-transform:uppercase;">Enquiry Summary</div>
                <div style="margin-top:8px;"><strong>Service:</strong> ${enquiry.projectType}</div>
                <div><strong>Budget:</strong> ${enquiry.budget}</div>
              </div>

              <p>Our engineering team is currently reviewing your project details. We will get back to you within 24 hours to schedule a detailed discovery discussion.</p>

              <p style="margin-top:24px;">Best regards,<br/><strong>The GnanaStack Engineering Team</strong><br/>
              📧 gnanastacktechnologies@gmail.com | 📞 +91 6379250367</p>
            </div>
            <div class="footer">
              Salem, Tamil Nadu, India - 636117
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Client acknowledgement email sent to: ${enquiry.email}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send client acknowledgement email:', error.message);
    return { success: false, error: error.message };
  }
};
