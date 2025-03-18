import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {loadFromStorage,cart} from '../../data/cart.js';

// integrated tests - tests many units/pieces of code working together
// hooks - share code between 2 tests

describe('test suite : renderOrderSummary',()=>{
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    //types of hooks - beforeEach(),afterEach(),beforeAll(),afterAll()
    beforeEach(()=>{
        spyOn(localStorage,'setItem');

        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-cart-item"></div>
        `;
        
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId : productId1,
                quantity : 2,
                deliveryOptionId : '1'
            },
            {
                productId : productId2,
                quantity : 1,
                deliveryOptionId : '2'
            }]);
        });
        loadFromStorage();

        renderOrderSummary();
    });


    // first test - how the page looks
    it('displays the cart',()=>{
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');

        document.querySelector('.js-test-container').innerHTML = ``;
    });

    // how the page behaves
    it('removes a product',()=>{
        // works only if we add the payment summary and header html also
        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);
        expect(
            document.querySelector(`.js-cart-item-conatiner-${productId1}`)
        ).toEqual(null);
        expect(
            document.querySelector(`.js-cart-item-conatiner-${productId2}`)
        ).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);

        document.querySelector('.js-test-container').innerHTML = ``;
    });
});