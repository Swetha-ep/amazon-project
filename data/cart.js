export const cart = [{
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity : 2
},
{
    productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity : 1
}];

export function addToCart(productId){

    const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productId}`);
    
    const quantity = Number(quantitySelector.value);
    
    let matchingItem;
    cart.forEach((item)=>{
        if(productId === item.productId){
            matchingItem = item;
        }
    });

    if(matchingItem){
        matchingItem.quantity += quantity;
    }
    else{
        cart.push({
            // productId : productId,
            // quantity : quantity
            productId,  //destructuring
            quantity
        });
    }
};
