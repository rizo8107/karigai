// Netlify function for capturing Razorpay payments
const Razorpay = require('razorpay');

exports.handler = async function(event, context) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body);
    
    // Validate required fields
    if (!data.payment_id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Payment ID is required' })
      };
    }

    // Initialize Razorpay instance with API keys from environment variables
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    // Log the request (but mask sensitive data)
    console.log('Capturing payment with ID:', data.payment_id);

    // Prepare capture options
    const options = {};
    if (data.amount) {
      options.amount = data.amount;
      options.currency = data.currency || 'INR';
    }

    // Capture the payment
    const payment = await razorpay.payments.capture(data.payment_id, data.amount, options);
    
    // Log success
    console.log('Payment captured successfully:', payment.id);

    // Return the payment details
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        status: payment.status,
        payment: {
          id: payment.id,
          amount: payment.amount,
          currency: payment.currency,
          status: payment.status
        }
      })
    };
  } catch (error) {
    // Log the error
    console.error('Error capturing payment:', error);

    // Return error response
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false,
        error: 'Error capturing payment',
        message: error.message
      })
    };
  }
};
