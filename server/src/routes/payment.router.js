import express from 'express';
import paymentController from '../controllers/payment.controller.js';
const router = express.Router();

//begin api thanh toán PayOS
router.post('/create-payment-link', paymentController.createLinkPayOs);
router.post('/receive-hook', paymentController.receiveHookPayOs);
router.get('/get-payment-infomations/:idorder', paymentController.getPaymentInfomationsPayOs);
router.post('/cancel-payment-link/:idorder', paymentController.canceledPaymentLinkPayOs);
router.post('/confirm-webhook-payos', paymentController.confirmWebhookPayOs);
// end api thanhf toán PayOS

//begin api thanh toán ZaloPay
app.post('/payment-zalopay', paymentController.createPaymentZaloPay);
app.post('/callback-zalo', paymentController.callbackZaloPay);
app.post('/order-status-zalopay/:apptransid', paymentController.orderStatusZaloPay);
app.post('/transaction-refund', paymentController.transactionRefund);
app.post('/transaction-refund-status', paymentController.transactionRefundStatus);
//end api thanh toán ZaloPay
export default router;
