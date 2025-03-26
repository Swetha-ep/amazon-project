import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import { loadProducts,loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backend-practice.js';

// promise is a built-in class 
// and when we create a promise, we need to create a function
// so when we create a function, it will run the inner function immediately
// resolve is a function similar to jasmine's done
// that lets us control when to go to next step

/*
new Promise((resolve)=>{
    console.log('start promise');
    loadProducts(()=>{
        console.log('finished loading');
        resolve();
    });
}).then(()=>{
    console.log('next step');
})
*/

// we can give array of promises to promise.all()
// promise.all() waits for all of the promises to finish before going to next step
Promise.all([
    loadProductsFetch(),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })

]).then((values)=>{
    console.log(values);
    // values gives us array of value for each promise
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});

// promises avoid too much nesting
// thats why its recommended to use promises instead of callbacks
/*
new Promise((resolve)=>{
    loadProducts(()=>{
        resolve('value 1');
        // whatever we give to resolve is saved in thens parameter
    });

}).then((value)=>{
    console.log(value);
    // value 1 will be saved in this value
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    });

}).then(()=>{
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});
*/

// multiple callbacks cause a lot of nesting
/*
loadProducts(()=>{
    loadCart(()=>{
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    });
});
*/
// callbacks may have lot of intends while using lots of function inside eachj function
// promises let us flatten our code