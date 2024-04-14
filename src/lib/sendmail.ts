import nodemailer from 'nodemailer';

async function sendEmail(userEmail:string, subscription:any) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT as string, 10),
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'Your App Name <noreply@yourapp.com>', // Replace with your sender email
    to: userEmail,
    subject: 'Your Subscription is About to Expire',
    text: `Your ${subscription.type} subscription for ${subscription.name} (ID: ${subscription.id}) is ending on ${subscription.endDate.toLocaleDateString()}. Please renew to continue using the service.`,
    // Or use HTML content if desired
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${userEmail}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}