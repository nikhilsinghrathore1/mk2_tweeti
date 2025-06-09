// utils/verifySignature.js
import crypto from "crypto"

function verifyGitHubSignature(payload, signature, secret) {
               if (!secret) {
                              console.warn('⚠️  No webhook secret provided - skipping signature verification');
                              return true;
               }

               if (!signature) {
                              console.error('❌ No signature provided in webhook headers');
                              return false;
               }

               const expectedSignature = crypto
                              .createHmac('sha256', secret)
                              .update(payload)
                              .digest('hex');

               const receivedSignature = signature.replace('sha256=', '');

               const isValid = crypto.timingSafeEqual(
                              Buffer.from(expectedSignature),
                              Buffer.from(receivedSignature)
               );

               if (!isValid) {
                              console.error('❌ Webhook signature verification failed');
               }

               return isValid;
}

module.exports = { verifyGitHubSignature };