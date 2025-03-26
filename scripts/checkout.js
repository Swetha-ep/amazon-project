import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import { loadProducts,loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backend-practice.js';

// async await
// async makes a function return a promise - basically wraps a code in promise
// async await can only be used with promises and nothing to do with callback
async function loadPage(){
// we can use try catch in normal functions also
// used to handle unexpected errors
    try {
        // we can give errors manually using throw
        // throw 'error 1';
        // so this will make the code skip and go staright to catch and the error parameter contains error 1

        // can only use await when inside an async function
        await loadProductsFetch();
        // await lets us write asynchronus code like normal code
        // usually we use then to wait for the response and do next step. now we can use await

        const value = await new Promise((resolve, reject)=>{
            // we can manually create errors in promises by 2 ways
            // can use eg :throw 'error2' and it goes to catch not .catch beacuse await make code as a synch/normal code

            loadCart(()=>{
                // this is a func which works in future. throw cannot work in future
                // so use second parameter given by promise -reject
                // reject('error 3');
                resolve('value 3');
                // while using await we dont need thens parameter to access this value
                // instead it gets returned and can be saved.
            });
        });

    } catch (error) {
        console.log('unexpected errror. Please try again later');
    }
 
    // the closest function near await should be async not a normal one
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();

    // this gets converted into resolve('value 2')  
}
loadPage();


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
/*
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
*/

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