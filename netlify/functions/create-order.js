// Netlify function for creating Razorpay orders
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
    if (!data.amount) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Amount is required' })
      };
    }

    // Initialize Razorpay instance with API keys from environment variables
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    // Log the request (but mask sensitive data)
    console.log('Creating Razorpay order with amount:', data.amount);

    // Create order options
    const options = {
      amount: data.amount, // amount in paise (already converted by client)
      currency: data.currency || 'INR',
      receipt: data.receipt || `receipt_${Date.now()}`,
      notes: data.notes || {}
    };

    // Create the order
    const order = await razorpay.orders.create(options);
    
    // Log success (without sensitive data)
    console.log('Order created successfully with ID:', order.id);

    // Return the order details
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(order)
    };
  } catch (error) {
    // Log the error
    console.error('Error creating order:', error);

    // Return error response
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Error creating order',
        message: error.message
      })
    };
  }
};
