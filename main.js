let counterSpan = document.querySelector(".counter");

let counter = localStorage.getItem("counter") ? parseInt(localStorage.getItem("counter")) : 0;
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totals = JSON.parse(localStorage.getItem('totals'));


if(counterSpan) {
    counterSpan.textContent = counter;
}else {
    console.log("not found")
}


function product(img, name, price, qty=1) {
    this.productImg = img;
    this.productName = name;
    this.productPrice = price;
    this.quantity = qty;
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
        removeEle.href = "#";
        removeEle.textContent = "Remove";
        
        quantity.appendChild(qty);
        quantity.appendChild(removeEle);
        productDiv.appendChild(quantity);
        
        let eleTotal = document.createElement('span');
        eleTotal.innerHTML = `$ <span class="total">${product.productPrice}</span>`;
        productDiv.appendChild(eleTotal);

        let line = document.createElement('hr');
        productDiv.appendChild(line);
        
        cartContainer.appendChild(productDiv);
    });
}


////////////////////////////////////////////////////////////////

calcTotal();

let plus = document.querySelectorAll(".fa-plus");
plus.forEach((click, index1)=> {
    click.previousElementSibling.textContent = parseInt(JSON.parse(localStorage.getItem('cart'))[index1].quantity);
    
    let total = click.closest('.product').querySelector('.total').textContent ;
    click.closest('.product').querySelector('.total').textContent = `${parseInt(total) * click.previousElementSibling.textContent}.00`;
    
    click.addEventListener(("click"), (e)=> {
        if (click.previousElementSibling.textContent == 10) {
            click.style.cursor = 'not-allowed';
            return
        }
        
        let index = findIndex(cart, click);
        
        click.previousElementSibling.textContent = parseInt(JSON.parse(localStorage.getItem('cart'))[index].quantity) + 1;
        cart[index].quantity = click.previousElementSibling.textContent;
        localStorage.setItem('cart', JSON.stringify(cart));
        
        click.closest('.product').querySelector('.total').textContent = `${JSON.parse(localStorage.getItem('cart'))[index].productPrice * click.previousElementSibling.textContent}.00`;
    
        calcTotal();
    
        click.previousElementSibling.previousElementSibling.style.cursor = 'pointer';
    })
});

let minus = document.querySelectorAll(".fa-minus");
minus.forEach((click, index1)=> {
    click.nextElementSibling.textContent = parseInt(JSON.parse(localStorage.getItem('cart'))[index1].quantity);
    
    let total = click.closest('.product').querySelector('.total').textContent ;
    
    click.addEventListener(("click"), (e)=> {
        if (click.nextElementSibling.textContent == 1) {
            click.style.cursor = 'not-allowed';
            return
        }
        
        let index = findIndex(cart, click);
        
        click.nextElementSibling.textContent = parseInt(JSON.parse(localStorage.getItem('cart'))[index].quantity) - 1;
        cart[index].quantity = click.nextElementSibling.textContent;
        localStorage.setItem('cart', JSON.stringify(cart));

        click.closest('.product').querySelector('.total').textContent = `${JSON.parse(localStorage.getItem('cart'))[index].productPrice * click.nextElementSibling.textContent}.00`;

        calcTotal();
    
        click.nextElementSibling.nextElementSibling.style.cursor = 'pointer';
    })
});


////////////////////////////////////////////////////////////////
if(document.querySelector('.order')) {
    document.querySelector('.order').onclick = ()=> {
        localStorage.clear();
    }
}else {
    console.log("not found");
}


document.querySelectorAll('.remove').forEach((remove)=> {
    remove.addEventListener("click", (e)=> {
        cart = cart.filter(item => item.productImg !== remove.closest('.product').querySelector('img').src);
        counter--;
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('counter', counter);
        remove.closest('.product').remove();
        calcTotal();
    })
}) 


function calcTotal() {
    totals = 0;
    document.querySelectorAll('.total').forEach ((total, index)=> {
        totals += JSON.parse(localStorage.getItem('cart'))[index].quantity * JSON.parse(localStorage.getItem('cart'))[index].productPrice;
        localStorage.setItem('totals', JSON.stringify(totals));
        document.querySelector('.totals').textContent = `$${JSON.parse(localStorage.getItem('totals'))}`;
    })
}

function findIndex(sArray, sClick) {
    return sArray.findIndex(obj => obj.productImg == sClick.closest('.product').querySelector('img').src);
}