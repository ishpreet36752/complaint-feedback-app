import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Send email function
export async function sendEmail(to: string, subject: string, text: string, html?: string) {
  try {
    const info = await transporter.sendMail({
      from: `"Complaint System" <${process.env.EMAIL_USER}>`, // Sender
      to, // Recipient
      subject, // Subject line
      text, // Plain text body
      html, // HTML body (optional)
    });

    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email sending failed");
  }
}

export async function sendNewComplaintEmail(complaint: any) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.error("ADMIN_EMAIL not configured");
    return;
  }

  const subject = "New Complaint Submitted";
  const text = `New complaint submitted:
Title: ${complaint.title}
Category: ${complaint.category}
Priority: ${complaint.priority}
Description: ${complaint.description}
Date Submitted: ${complaint.dateSubmitted}`;

  const html = `
    <h2>New Complaint Submitted</h2>
    <p><strong>Title:</strong> ${complaint.title}</p>
    <p><strong>Category:</strong> ${complaint.category}</p>
    <p><strong>Priority:</strong> ${complaint.priority}</p>
    <p><strong>Description:</strong> ${complaint.description}</p>
    <p><strong>Date Submitted:</strong> ${complaint.dateSubmitted}</p>
  `;

  return sendEmail(adminEmail, subject, text, html);
}

export async function sendStatusUpdateEmail(complaint: any, oldStatus: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.error("ADMIN_EMAIL not configured");
    return;
  }

  const subject = "Complaint Status Updated";
  const text = `Complaint status updated:
Title: ${complaint.title}
Old Status: ${oldStatus}
New Status: ${complaint.status}
Date Updated: ${new Date().toLocaleString()}`;

  const html = `
    <h2>Complaint Status Updated</h2>
    <p><strong>Title:</strong> ${complaint.title}</p>
    <p><strong>Old Status:</strong> ${oldStatus}</p>
    <p><strong>New Status:</strong> ${complaint.status}</p>
    <p><strong>Date Updated:</strong> ${new Date().toLocaleString()}</p>
  `;

  return sendEmail(adminEmail, subject, text, html);
}
