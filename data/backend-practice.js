const xhr = new XMLHttpRequest();

xhr.addEventListener('load',()=>{
    console.log(xhr.response);
});
// response will take time so at first it would be undefined. thats why we add a eventlistner.
// This will show the response when ,loaded from the internet and this is described above the action.

xhr.open('GET','https://supersimplebackend.dev');
xhr.send();
// the response will be seen in the network tab in inspect

const xhr1 = new XMLHttpRequest();

xhr1.addEventListener('load',()=>{
    console.log(xhr1.response);
});
xhr1.open('GET','https://supersimplebackend.dev/hello');
xhr1.send();
// url path - anything after the url or domain name is a url path like- 'https://supersimplebackend.dev/hello'

// type of datas backend can respond with - text, json, html, image