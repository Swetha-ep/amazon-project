import {addToCart,cart,loadFromStorage} from '../../data/cart.js';

// unit test - testing only a piece of code
// test coverage - testing each and every if cases and maximizing the test coverage
// flaky test -  a test that sometimes fails and sometimes passes even if we didnt change the code
// mocks - lets us replace a method with a fake version

describe('test suite: addToCart', ()=>{
    // works if i have added the quantity along with it
    it('adds an existing product to the cart',()=>{
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId : '43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity : 1,
                deliveryOptionId : '1'
            }]);
        });
        loadFromStorage();

        addToCart('43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
    });

    it('adds a new product to the cart',()=>{
        spyOn(localStorage,'setItem');

        // spyon(obj we want to mock, method we want to mock)
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        loadFromStorage();
        
        // works if i have added the quantity along with it
        addToCart('43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
});