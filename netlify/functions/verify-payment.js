// Netlify function for verifying Razorpay payments
const crypto = require('crypto');

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
    if (!data.razorpay_payment_id || !data.razorpay_order_id || !data.razorpay_signature) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required fields',
          verified: false
        })
      };
    }

    // Get the secret key from environment variables
    const secret = process.env.RAZORPAY_KEY_SECRET;
    
    // Log verification attempt (without sensitive data)
    console.log('Verifying payment for order ID:', data.razorpay_order_id);

    // Create the payload string for verification
    // Format: orderId + "|" + paymentId
    const payload = `${data.razorpay_order_id}|${data.razorpay_payment_id}`;
    
    // Create a HMAC SHA256 hash using the secret key
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    
    // Verify the signature
    const isSignatureValid = expectedSignature === data.razorpay_signature;

    if (isSignatureValid) {
      console.log('Payment verification successful for order:', data.razorpay_order_id);
      
      // Return success response
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          verified: true,
          status: 'authorized',
          payment: {
            id: data.razorpay_payment_id,
            order_id: data.razorpay_order_id
          }
        })
      };
    } else {
      console.warn('Payment verification failed: Invalid signature');
      
      // Return failure response
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          verified: false,
          error: 'Invalid signature'
        })
      };
    }
  } catch (error) {
    // Log the error
    console.error('Error verifying payment:', error);

    // Return error response
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        verified: false,
        error: 'Error verifying payment',
        message: error.message
      })
    };
  }
};
