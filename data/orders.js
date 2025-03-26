export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    // unshift adds infront of the array instead of back
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    // localstorage only support strings
    localStorage.setItem('orders', JSON.stringify(orders));
}