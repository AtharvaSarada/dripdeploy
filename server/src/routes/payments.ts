import express from 'express';
import Stripe from 'stripe';
import Order from '../models/Order';
import { protect } from '../middleware/auth';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

// @desc    Create payment intent
// @route   POST /api/payments/create-payment-intent
// @access  Private
router.post('/create-payment-intent', protect, async (req: any, res) => {
  try {
    const { amount, orderId } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid amount'
      });
    }

    // Verify order exists and belongs to user
    if (orderId) {
      const order = await Order.findById(orderId);
      if (!order || order.user.toString() !== req.user._id.toString()) {
        return res.status(404).json({
          success: false,
          error: 'Order not found'
        });
      }
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        userId: req.user._id.toString(),
        orderId: orderId || ''
      }
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret
    });

  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(500).json({
      success: false,
      error: 'Payment intent creation failed'
    });
  }
});

// @desc    Confirm payment
// @route   POST /api/payments/confirm
// @access  Private
router.post('/confirm', protect, async (req: any, res) => {
  try {
    const { paymentIntentId, orderId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({
        success: false,
        error: 'Payment intent ID is required'
      });
    }

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        success: false,
        error: 'Payment not completed'
      });
    }

    // Update order if orderId is provided
    if (orderId) {
      const order = await Order.findById(orderId);
      
      if (!order || order.user.toString() !== req.user._id.toString()) {
        return res.status(404).json({
          success: false,
          error: 'Order not found'
        });
      }

      // Update order payment status
      order.paymentMethod.status = 'completed';
      order.paymentResult = {
        id: paymentIntent.id,
        status: paymentIntent.status,
        update_time: new Date().toISOString()
      };
      order.isPaid = true;
      order.paidAt = new Date();

      await order.save();
    }

    res.json({
      success: true,
      message: 'Payment confirmed successfully',
      paymentIntent
    });

  } catch (error) {
    console.error('Payment confirmation error:', error);
    res.status(500).json({
      success: false,
      error: 'Payment confirmation failed'
    });
  }
});

// @desc    Get payment methods
// @route   GET /api/payments/methods
// @access  Private
router.get('/methods', protect, async (req: any, res) => {
  try {
    // In a real application, you might store payment methods for users
    // For now, we'll return a simple response
    res.json({
      success: true,
      data: {
        methods: ['card', 'paypal']
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get payment methods'
    });
  }
});

// @desc    Create refund
// @route   POST /api/payments/refund
// @access  Private
router.post('/refund', protect, async (req: any, res) => {
  try {
    const { paymentIntentId, amount, reason } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({
        success: false,
        error: 'Payment intent ID is required'
      });
    }

    // Create refund
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined,
      reason: reason || 'requested_by_customer'
    });

    res.json({
      success: true,
      data: refund
    });

  } catch (error) {
    console.error('Refund error:', error);
    res.status(500).json({
      success: false,
      error: 'Refund failed'
    });
  }
});

// @desc    Webhook handler for Stripe events
// @route   POST /api/payments/webhook
// @access  Public
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment succeeded:', paymentIntent.id);
      
      // Update order status if orderId is in metadata
      if (paymentIntent.metadata.orderId) {
        try {
          const order = await Order.findById(paymentIntent.metadata.orderId);
          if (order) {
            order.paymentMethod.status = 'completed';
            order.paymentResult = {
              id: paymentIntent.id,
              status: paymentIntent.status,
              update_time: new Date().toISOString()
            };
            order.isPaid = true;
            order.paidAt = new Date();
            await order.save();
          }
        } catch (error) {
          console.error('Error updating order:', error);
        }
      }
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.log('Payment failed:', failedPayment.id);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

export default router;
