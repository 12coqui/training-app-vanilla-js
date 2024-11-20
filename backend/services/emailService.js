// emailService.js
const { MailerSend, EmailParams, Sender, Recipient } = require('mailersend');

async function sendSignupEmail(to, subject, text) {
	const mailerSend = new MailerSend({
		apiKey: process.env.SENDGRID_API_KEY,
	});

	const sentFrom = new Sender(
		`
	${process.env.EMAIL_USER}`,
		'Leandro Serra'
	);

	const recipients = [new Recipient(to, '')];

	const emailParams = new EmailParams()
		.setFrom(sentFrom)
		.setTo(recipients)
		.setReplyTo(sentFrom)
		.setSubject(subject)
		.setHtml(`<strong>${text}</strong>`)
		.setText('text content');

	await mailerSend.email.send(emailParams);
}

module.exports = { sendSignupEmail };
