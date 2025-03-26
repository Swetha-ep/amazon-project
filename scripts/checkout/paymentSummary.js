import {cart} from '../../data/cart.js';
import { getproductId } from "../../data/products.js";
import{getDeliveryOption} from '../../data/deliveryOptions.js';
import {priceConvert} from '../utils/price.js';
import { addOrder } from '../../data/orders.js';

export function renderPaymentSummary(){

    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem)=>{

        const product = getproductId(cartItem.productId);    
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });


    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    let cartQuantity = 0;
      cart.forEach((cartItem)=>{
        cartQuantity += cartItem.quantity;
      });

    const paymentSummaryHtml = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money
            js-payment-summary-shipping">
            $${priceConvert(productPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
            $${priceConvert(shippingPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
            $${priceConvert(totalBeforeTaxCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
            $${priceConvert(taxCents)}
            </div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money
            js-payment-summary-total">
            $${priceConvert(totalCents)}
            </div>
          </div>

          <button class="place-order-button button-primary
          js-place-order">
            Place your order
          </button>
    `;

    document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHtml;

    document.querySelector('.js-place-order')
    .addEventListener('click',async ()=>{
      try {
        const response = await fetch('https://supersimplebackend.dev/orders',{
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          // we cant send an object direclty so we need to convert into json string
          body : JSON.stringify({
            cart : cart
          })
        });
  
        const order = await response.json();
        addOrder(order);

      } catch (error) {
        console.log('Unexpected error ! Try again later.');
      }
      //  this will replace the url path everything after localhost
      window.location.href = 'orders.html';

    });
}