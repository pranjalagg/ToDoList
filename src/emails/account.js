const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'pranjalaggarwal1999@gmail.com',
		subject: 'Thanks for joining in!',
		text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
	})
}

const sendCancelationEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'pranjalaggarwal1999@gmail.com',
		subject: 'Sorry to see you go!',
		text: `Goodbye, ${name}. I hope to see you back sometime soon.`
	})
}

module.exports = {
	sendWelcomeEmail,
	sendCancelationEmail
}