import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from '../../data/cart.js'
import { products } from '../../data/products.js';
import { priceConvert } from '../utils/price.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, calculateDeliveryDate } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderOrderSummary(){


    let checkoutHtml = ''

    cart.forEach((cartItem)=>{

        let matchingItem;

        products.forEach((item)=>{
            if (item.id === cartItem.productId){
                matchingItem = item;
            }
        });

        const deliveryOptionId = cartItem.deliveryOptionId;

        let deliveryOption;

        deliveryOptions.forEach((option)=>{
            if(option.id === deliveryOptionId){
                deliveryOption = option;
            }
        });

        const dateString = calculateDeliveryDate(deliveryOption);

        checkoutHtml += `
            <div class="cart-item-container
            js-cart-item-container
             js-cart-item-container-${matchingItem.id}">
                <div class="delivery-date">
                Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matchingItem.image}">

                <div class="cart-item-details">
                    <div class="product-name
                    js-product-name-${matchingItem.id}">
                    ${matchingItem.name}
                    </div>
                    <div class="product-price
                    js-product-price-${matchingItem.id}">
                    ${priceConvert(matchingItem.priceCents)}
                    </div>
                    <div class="product-quantity
                    js-product-quantity-${matchingItem.id}">
                    <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link"
                    data-product-id="${matchingItem.id}">
                        Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingItem.id}">
                    <span class="save-quantity-link 
                    link-primary js-save-link" data-product-id="${matchingItem.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link
                    js-delete-link-${matchingItem.id}"
                    data-product-id="${matchingItem.id}">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHtml(matchingItem,cartItem)}
                </div>
                </div>
            </div>
        `;
    });


    function deliveryOptionsHtml(matchingItem,cartItem){
        let html = '';
        deliveryOptions.forEach((deliveryOption)=>{

            const dateString = calculateDeliveryDate(deliveryOption);
            
            const priceString = deliveryOption.priceCents === 0 ?
            'FREE' : `$${priceConvert(deliveryOption.priceCents)} -`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html += `<div class="delivery-option js-delivery-option
            js-delivery-option-${matchingItem.id}-${deliveryOption.id}"
            data-product-id="${matchingItem.id}"
            data-delivery-option-id="${deliveryOption.id}">
                        <input type="radio"
                            ${isChecked ? 'checked' : ''}
                            class="delivery-option-input
                            js-delivery-option-input-${matchingItem.id}-${deliveryOption.id}"
                            name="delivery-option-${matchingItem.id}">
                        <div>
                            <div class="delivery-option-date">
                            ${dateString}
                            </div>
                            <div class="delivery-option-price">
                            ${priceString} - Shipping
                            </div>
                        </div>
                    </div>`
        });
        return html;
    }

    document.querySelector('.js-cart-item')
        .innerHTML = checkoutHtml;

    document.querySelectorAll('.js-delete-link')
        .forEach((link)=>{
            link.addEventListener('click',()=>{
                const productId = link.dataset.productId;
                removeFromCart(productId);

                renderCheckoutHeader();
                renderOrderSummary();
                renderPaymentSummary();
                // updateCartQuantity();
            });
        });


    function updateCartQuantity(){

        const cartQuantity = calculateCartQuantity();

        document.querySelector('.js-return-to-home-link')
            .innerHTML = `${cartQuantity} items`;
    }

    // updateCartQuantity();


    document.querySelectorAll('.js-update-link')
        .forEach((link)=>{
            link.addEventListener('click',()=>{
                const productId = link.dataset.productId;
                console.log(productId);

                const container = document.querySelector(`
                    .js-cart-item-container-${productId}`);
                
                container.classList.add('is-editing-quantity');
                
            });
        });


    document.querySelectorAll('.js-save-link')
        .forEach((link)=>{
            link.addEventListener('click',()=>{
                const productId = link.dataset.productId;

                const quantityInput = document.querySelector(
                    `.js-quantity-input-${productId}`
                );

                const newQuantity = Number(quantityInput.value);

                if(newQuantity < 0 || newQuantity >= 1000){
                    alert('Quantity must be at least 0 and less than 1000');
                    return;
                }

                updateQuantity(productId,newQuantity);

                const container = document.querySelector(
                    `.js-cart-item-container-${productId}`);
                
                container.classList.remove('is-editing-quantity');

                const quantityLabel =document.querySelector(
                    `.js-quantity-label-${productId}`
                );
                quantityLabel.innerHTML = newQuantity;

                updateCartQuantity();

                renderOrderSummary();
                renderPaymentSummary();
        
            })
        });


    document.querySelectorAll('.js-delivery-option')
        .forEach((element)=>{
            element.addEventListener('click', ()=>{
                const {productId,deliveryOptionId} = element.dataset
                updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
                renderPaymentSummary();
            });
        });
}
