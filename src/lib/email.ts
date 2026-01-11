import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL = process.env.FROM_EMAIL || "TysonsTechSolutions <notifications@tysonstechsolutions.com>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "tyson@tysonstechsolutions.com";

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail(options: EmailOptions) {
  if (!resend) {
    console.log("Email service not configured. Would send:", options);
    return { success: false, error: "Email service not configured" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    });

    if (error) {
      console.error("Email send error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Email exception:", err);
    return { success: false, error: "Failed to send email" };
  }
}

// Email Templates
export const emailTemplates = {
  // New inquiry notification to admin
  newInquiryAdmin: (inquiry: {
    name: string;
    email: string;
    phone?: string;
    companyName?: string;
    serviceName: string;
    budget?: string;
    timeline?: string;
    description?: string;
  }) => ({
    to: ADMIN_EMAIL,
    subject: `New ${inquiry.serviceName} Inquiry from ${inquiry.name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #64748b; font-size: 12px; text-transform: uppercase; }
            .value { margin-top: 5px; font-size: 16px; }
            .cta { display: inline-block; background: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .description { background: white; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">New Service Inquiry</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">${inquiry.serviceName}</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Contact Name</div>
                <div class="value">${inquiry.name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${inquiry.email}">${inquiry.email}</a></div>
              </div>
              ${inquiry.phone ? `
              <div class="field">
                <div class="label">Phone</div>
                <div class="value"><a href="tel:${inquiry.phone}">${inquiry.phone}</a></div>
              </div>
              ` : ""}
              ${inquiry.companyName ? `
              <div class="field">
                <div class="label">Company</div>
                <div class="value">${inquiry.companyName}</div>
              </div>
              ` : ""}
              ${inquiry.budget ? `
              <div class="field">
                <div class="label">Budget</div>
                <div class="value">${inquiry.budget}</div>
              </div>
              ` : ""}
              ${inquiry.timeline ? `
              <div class="field">
                <div class="label">Timeline</div>
                <div class="value">${inquiry.timeline}</div>
              </div>
              ` : ""}
              ${inquiry.description ? `
              <div class="field">
                <div class="label">Project Description</div>
                <div class="description">${inquiry.description}</div>
              </div>
              ` : ""}
              <a href="mailto:${inquiry.email}?subject=Re: Your ${inquiry.serviceName} Inquiry" class="cta">
                Reply to ${inquiry.name}
              </a>
            </div>
          </div>
        </body>
      </html>
    `,
    replyTo: inquiry.email,
  }),

  // Confirmation email to customer
  inquiryConfirmation: (customer: {
    name: string;
    email: string;
    serviceName: string;
  }) => ({
    to: customer.email,
    subject: `We received your ${customer.serviceName} inquiry - TysonsTechSolutions`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; }
            .highlight { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #f97316; margin: 20px 0; }
            .cta { display: inline-block; background: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Thanks for reaching out!</h1>
            </div>
            <div class="content">
              <p>Hi ${customer.name},</p>
              <p>We've received your inquiry about our <strong>${customer.serviceName}</strong> services. Our team will review your request and get back to you within 24 hours.</p>

              <div class="highlight">
                <strong>What happens next?</strong>
                <ol style="margin: 10px 0 0 0; padding-left: 20px;">
                  <li>Our team reviews your project requirements</li>
                  <li>We'll reach out to schedule a discovery call</li>
                  <li>You'll receive a detailed proposal and timeline</li>
                </ol>
              </div>

              <p>In the meantime, feel free to check out our <a href="https://tysonstechsolutions.com/services">other services</a> or <a href="https://tysonstechsolutions.com/blog">blog</a> for tips and insights.</p>

              <p>Have questions? Just reply to this email!</p>

              <p>Best regards,<br><strong>The TysonsTechSolutions Team</strong></p>
            </div>
            <div class="footer">
              <p>TysonsTechSolutions | Building technology that grows your business</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // Contact form notification
  newContactAdmin: (contact: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }) => ({
    to: ADMIN_EMAIL,
    subject: `New Contact Form: ${contact.subject || "General Inquiry"} from ${contact.name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1e293b; color: white; padding: 30px; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #64748b; font-size: 12px; text-transform: uppercase; }
            .value { margin-top: 5px; font-size: 16px; }
            .message { background: white; padding: 20px; border-radius: 6px; border: 1px solid #e2e8f0; margin-top: 10px; white-space: pre-wrap; }
            .cta { display: inline-block; background: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">From</div>
                <div class="value">${contact.name} (<a href="mailto:${contact.email}">${contact.email}</a>)</div>
              </div>
              ${contact.subject ? `
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${contact.subject}</div>
              </div>
              ` : ""}
              <div class="field">
                <div class="label">Message</div>
                <div class="message">${contact.message}</div>
              </div>
              <a href="mailto:${contact.email}?subject=Re: ${contact.subject || "Your message"}" class="cta">
                Reply to ${contact.name}
              </a>
            </div>
          </div>
        </body>
      </html>
    `,
    replyTo: contact.email,
  }),

  // Contact form confirmation
  contactConfirmation: (customer: {
    name: string;
    email: string;
  }) => ({
    to: customer.email,
    subject: "We received your message - TysonsTechSolutions",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; }
            .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Message Received!</h1>
            </div>
            <div class="content">
              <p>Hi ${customer.name},</p>
              <p>Thanks for reaching out! We've received your message and will get back to you within 24 hours.</p>
              <p>Best regards,<br><strong>The TysonsTechSolutions Team</strong></p>
            </div>
            <div class="footer">
              <p>TysonsTechSolutions | Building technology that grows your business</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),
};
