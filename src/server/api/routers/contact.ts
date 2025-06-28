import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { contactFormSchema } from "@/lib/schemas";
import nodemailer from "nodemailer";

export const contactRouter = createTRPCRouter({
    sendEmail: publicProcedure
        .input(contactFormSchema)
        .mutation(async ({ input }) => {
            try {
                const transporter = nodemailer.createTransport({
                    host: process.env.SMTP_HOST || "smtp.gmail.com",
                    port: parseInt(process.env.SMTP_PORT || "587"),
                    secure: false,
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASS,
                    },
                });

                const mailOptions = {
                    from: process.env.SMTP_FROM || process.env.SMTP_USER,
                    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
                    subject: `New Contact Form Submission from ${input.name}`,
                    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
                <p><strong>Name:</strong> ${input.name}</p>
                <p><strong>Email:</strong> <a href="mailto:${input.email}">${input.email}</a></p>
                ${input.company ? `<p><strong>Company:</strong> ${input.company}</p>` : ''}
              </div>
              
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #374151; margin-top: 0;">Message</h3>
                <p style="white-space: pre-wrap; line-height: 1.6;">${input.message}</p>
              </div>
              
              <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #1e40af; font-size: 14px;">
                  <strong>Sent from:</strong> Lambda E2E Contact Form<br>
                  <strong>Date:</strong> ${new Date().toLocaleString()}
                </p>
              </div>
            </div>
          `,
                };

                // Send email
                await transporter.sendMail(mailOptions);

                return { success: true, message: "Email sent successfully" };
            } catch (error) {
                console.error("Email send error:", error);
                throw new Error("Failed to send email. Please try again later.");
            }
        }),
}); 