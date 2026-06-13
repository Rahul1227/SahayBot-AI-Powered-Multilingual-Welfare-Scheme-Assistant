'use strict';

require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken  = process.env.TWILIO_AUTH_TOKEN;
const from       = process.env.TWILIO_WHATSAPP_NUMBER; // whatsapp:+14155238886
const to         = 'whatsapp:+918869938463';           // recipient must have joined sandbox first

if (!accountSid || !authToken || !from) {
  console.error('Missing TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, or TWILIO_WHATSAPP_NUMBER in .env');
  process.exit(1);
}

const client = require('twilio')(accountSid, authToken);

async function main() {
  try {
    console.log(`Sending test message from ${from} to ${to} ...`);
    const message = await client.messages.create({
      from,
      to,
      body: 'Hello from SahayBot! Reply with any message to start the welfare scheme eligibility check.'
    });
    console.log('Message sent successfully. SID:', message.sid);
    console.log('Status:', message.status);
  } catch (err) {
    console.error('Failed to send message:');
    console.error('  Code:', err.code);
    console.error('  Message:', err.message);
    if (err.code === 63016) {
      console.error('\n  Fix: The recipient (+918869938463) must first join the Twilio Sandbox.');
      console.error('  Ask them to send "join <your-sandbox-keyword>" to +14155238886 on WhatsApp.');
    }
    if (err.code === 20003) {
      console.error('\n  Fix: Authentication failed — check TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in .env');
    }
  }
}

main();
