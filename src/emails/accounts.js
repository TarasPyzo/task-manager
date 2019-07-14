const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmailTo = (email) => {
  const msg = {
    to: email,
    from: 'taraspyzo@gmail.com',
    subject: 'Sendgrid test email',
    text: 'Body of sendgrid test email',
    html: 'Body of <strong>sendgrid</strong> test email'
  };

  sgMail.send(msg);
};

const sendByeEmailTo = (email) => {
  const msg = {
    to: email,
    from: 'taraspyzo@gmail.com',
    subject: 'Bye friend!',
    text: 'You have deleted your account!',
    html: '<strong>You</strong> have deleted your account!'
  };

  sgMail.send(msg);
};

module.exports = {
  sendWelcomeEmailTo,
  sendByeEmailTo
};
