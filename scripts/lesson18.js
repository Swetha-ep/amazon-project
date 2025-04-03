// using XMLHttpRequest
const xhr = new XMLHttpRequest();

xhr.addEventListener('load',()=>{
    console.log('xmlhttprequest response');
    console.log(xhr.response);
});

xhr.open('GET','https://supersimplebackend.dev/greeting');
xhr.send();


// using fetch
fetch(
    'https://supersimplebackend.dev/greeting'
).then((response)=>{
    return response.text();
}).then((text)=>{
    console.log('fetch response')
    console.log(text);
});


// using fetch and async await
async function getMessage(){
    const response =  await fetch('https://supersimplebackend.dev/greeting');
    const text = await response.text();
    console.log('async and fetch response')
    console.log(text); 
}
getMessage();

// post request using async and fetch
async function postGreeting(){
    const response = await fetch('https://supersimplebackend.dev/greeting',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            name : 'Swetha'
        })
    });
    const text = await response.text();
    console.log('post request response');
    console.log(text);
}
postGreeting();

// cors error due to the url muy code is running on is different than amazon
// async function getAmazon(){
//     try{
//         const response = await fetch('https://amazon.com');
//         const text = await response.text();
//         console.log(text);
//     } catch (error){
//         console.log('CORS error. Your request was blocked by backend.')
//     }
// }
// getAmazon();

async function postGreetings(){
    try{
        const response = fetch('https://supersimplebackend.dev/greeting', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        // fetch doesnt throw an error for 400 errors(only network errors)
        if (response.status >= 400){
            throw response;
        }

        const text = await response.text();
        console.log(text);

    } catch (error){
        if (error.status === 400){
            const errorMessage = await error.json();
            console.log(errorMessage);
        } else {
            console.log('Network error. Please try again!');
        }
    }
}
postGreetings();