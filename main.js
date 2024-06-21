let addBtns = document.querySelectorAll(".add");
let counterSpan = document.querySelector(".counter");

let counter = localStorage.getItem("counter") ? parseInt(localStorage.getItem("counter")) : 0;

if(counterSpan) {
    counterSpan.textContent = counter;
}else {
    console.log("not found")
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function product(img, name, price) {
    this.productImg = img;
    this.productName = name;
    this.productPrice = price;
}

addBtns.forEach(btn => {
    btn.addEventListener("click", (e)=> {
        counter++;
        localStorage.setItem("counter", counter);
        counterSpan.textContent = localStorage.getItem("counter");

        let box = btn.closest('.box');
        
        cart.push( new product(box.querySelector(".image img").src, box.querySelector("h3").textContent, box.querySelector(".price").textContent));        
        console.log(cart);

        localStorage.setItem("cart", JSON.stringify(cart));
    })
});

// let getCart = JSON.parse(localStorage.getItem("cart")) || [];
cart.forEach(product => {
    let img = document.createElement('img');
    img.src = product.productImg;
    document.body.appendChild(img);

    let name = document.createElement('h2');
    name.textContent = product.productName;
    document.body.appendChild(name);

    let price = document.createElement('p');
    price.textContent = product.productPrice;
    document.body.appendChild(price);
});