import {addToCart, cart, calculateCartQuantity} from '../data/cart.js'
import { products } from '../data/products.js';
import {priceConvert} from './utils/price.js'

let productsHtml = '';

products.forEach((product)=>{
    //accumulator pattern - (adding on...)
    productsHtml += `    
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>
            
          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
});
// The reason we use an object is because each product
// will have its own timeoutId. So an object lets us
// save multiple timeout ids for different products.
const addedMessageTimeouts = {};

updateCartQuantity();

document.querySelector('.js-products-grid').innerHTML = productsHtml;
// adding a data attribute to the add button; data attribute should start with data- in kebab case eg:(data-product-id)
//while accessing use camel case eg:(productId)

document.querySelectorAll('.js-add-to-cart')
.forEach((button)=>{
    button.addEventListener('click',()=>{
        // const productId = button.dataset.productId;
        const {productId} = button.dataset; //destructuring

        addToCart(productId);

        updateCartQuantity();

        const addedMessage = document.querySelector(
          `.js-added-to-cart-${productId}`
        );
        addedMessage.classList.add('added-to-cart-visible');
        
        const previousTimeoutId = addedMessageTimeouts[productId];
        if(previousTimeoutId){
          clearTimeout(previousTimeoutId);
        }

        const timeoutId = setTimeout(()=>{
          addedMessage.classList.remove('added-to-cart-visible');
        },2000);

        addedMessageTimeouts[productId] = timeoutId;
        
    });
});


function updateCartQuantity(){
    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity || '';
    console.log(cart);
};

