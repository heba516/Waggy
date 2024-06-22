let counterSpan = document.querySelector(".counter");

let counter = localStorage.getItem("counter") ? parseInt(localStorage.getItem("counter")) : 0;
let cart = JSON.parse(localStorage.getItem("cart")) || [];



if(counterSpan) {
    counterSpan.textContent = counter;
}else {
    console.log("not found")
}


function product(img, name, price) {
    this.productImg = img;
    this.productName = name;
    this.productPrice = price;
}

function containsProduct(cart, product) {
    return cart.some(item => 
        item.productImg === product.productImg &&
        item.productName === product.productName &&
        item.productPrice === product.productPrice
    );
}

document.querySelectorAll(".add").forEach(btn => {
    btn.addEventListener("click", (e)=> {
        let box = btn.closest('.box');
        let newProduct = new product(
            box.querySelector(".image img").src,
            box.querySelector("h3").textContent,
            box.querySelector(".price span").textContent
        );
        if(containsProduct(cart, newProduct)) {
            console.log("added");
        }else {
            counter++;
            localStorage.setItem("counter", counter);
            counterSpan.textContent = localStorage.getItem("counter");

            cart.push(newProduct);        
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    })
});

////////////////////////////////////////////////////////////////
var cartContainer = document.querySelector(".cart-row");
if (cartContainer && counter == 0){
    document.querySelector(".title").style.display = "none";
    document.querySelector(".dtotals").classList.add('hide');
    document.querySelector(".order").classList.add('hide');
    empty = document.createElement('h2');
    empty.className = "empty text-center";
    empty.textContent = "Your cart is empty";
    cartContainer.appendChild(empty);
}else if (!cartContainer){
    console.log("not found")
}else {
    cart.forEach(product => {
        let productDiv = document.createElement("div");
        productDiv.className = "product d-md-flex align-items-center mb-2";

        let img = document.createElement('img');
        img.src = product.productImg;
        productDiv.appendChild(img);

        let info = document.createElement("div");
        info.className = "info";
        productDiv.appendChild(info);

        let name = document.createElement('h3');
        name.textContent = product.productName;
        name.className = "m-auto mt-3 mt-md-0"
        info.appendChild(name);

        let price = document.createElement('p');
        price.className = "mb-0";
        let priceSpan = document.createElement('span');
        priceSpan.textContent = product.productPrice;
        price.appendChild(priceSpan);
        info.appendChild(price);

        let quantity = document.createElement('div');
        quantity.className = "qty flex-grow-1";
        
        let qty = document.createElement('p');
        qty.className = "p-2 m-auto border";
        
        let minus = document.createElement('i');
        minus.className = "fa-solid fa-minus";
        qty.appendChild(minus);
        
        let qtySpan = document.createElement('span');
        qtySpan.textContent = 1 ;
        qtySpan.className = "counter mx-3";
        qty.appendChild(qtySpan);
        
        let plus = document.createElement('i');
        plus.className = "fa-regular fa-plus";
        qty.appendChild(plus);
        
        let removeEle = document.createElement('a');
        removeEle.className = "remove d-block text-center mt-2";
        removeEle.textContent = "Remove";
        
        quantity.appendChild(qty);
        quantity.appendChild(removeEle);
        productDiv.appendChild(quantity);
        
        let eleTotal = document.createElement('span');
        eleTotal.innerHTML = `$ <span class="total">${product.productPrice}</span>`;
        productDiv.appendChild(eleTotal);

        let line = document.createElement('hr');
        
        cartContainer.appendChild(productDiv);
        cartContainer.appendChild(line);
    });
}


////////////////////////////////////////////////////////////////
let totals = 0;
let plus = document.querySelectorAll(".fa-plus");
plus.forEach((click)=> {
    let total = click.closest('.product').querySelector('.total').textContent ;
    click.addEventListener(("click"), (e)=> {
        if (click.previousElementSibling.textContent == 10) {
            click.style.cursor = 'not-allowed';
            return
        }
        click.previousElementSibling.textContent++;
        click.closest('.product').querySelector('.total').textContent = `${total * click.previousElementSibling.textContent}.00`;
        click.previousElementSibling.previousElementSibling.style.cursor = 'pointer';
        totals += parseInt(total);
        document.querySelector('.totals').textContent = `$${totals}`;
    })
});

let minus = document.querySelectorAll(".fa-minus");
minus.forEach((click)=> {
    let total = click.closest('.product').querySelector('.total').textContent ;
    click.addEventListener(("click"), (e)=> {
        if (click.nextElementSibling.textContent == 1) {
            click.style.cursor = 'not-allowed';
            return
        }
        click.nextElementSibling.textContent--;
        click.closest('.product').querySelector('.total').textContent = `${total * click.nextElementSibling.textContent}.00`;
        click.nextElementSibling.nextElementSibling.style.cursor = 'pointer';
        totals += parseInt(total);
        document.querySelector('.totals').textContent = `$${totals}`;
    })
});

document.querySelectorAll('.total').forEach ((total)=> {
    totals += parseInt(total.textContent);
    document.querySelector('.totals').textContent = `$${totals}`;
})


////////////////////////////////////////////////////////////////
if(document.querySelector('.order')) {
    document.querySelector('.order').onclick = ()=> {
        localStorage.clear();
    }
}else {
    console.log("not found");
}
