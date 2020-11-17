const appHook = document.getElementById("app");
const cartItem = 1;
let guitarId = 1000;
let totalPrice = 0;

// Guitar class definition 
class Guitar {
    constructor(category, color, description, price, image) {
        this.category = category;
        this.color = color;
        this.description = description;
        this.price = price;
        this.image = image;
        this.id = guitarId++;
    }

}

// Guitar element definition
class GuitarElement {
    constructor(guitar) {
        this.guitar = guitar;
    }
    addGuitarToCart(){
        App.addGuitarToCart(this.guitar);

    }

    renderGuitarElement() {
        const guitarCard = document.createElement("div");
        guitarCard.className = "col-lg-3 col-md-6  my-3 guitar-card ";
        guitarCard.innerHTML = `
        <div class="card" id="${this.guitar.id}">
        <div class="img-wrapper mb-5">
        <img class="card-img-top img-fluid" src="${this.guitar.image}" alt="${this.guitar.description}">
      </div>
        <div class="card-body">
          <h6 class="card-title text-center">${this.guitar.description}</h6>
          <hr class="mb-3">
          <p>Color: ${this.guitar.color}</p>
          <p><span class="price">${this.guitar.price} $ </span><del>${(this.guitar.price * 1.3).toFixed(2)} $</del></p>
          <hr class="mb-3">
          <a href="#" class="btn btn-success  btn-block btn-cart ">ADD TO CART</a>
        </div>
      </div>
        `;
        const addToCartBtn = guitarCard.querySelector(".btn-cart");
        addToCartBtn.addEventListener("click",this.addGuitarToCart.bind(this));

        return guitarCard;
    }


}

// Guitar Store Definition
class GuitarList {
    guitars = [
        new Guitar("Electric", "Black", "MODERN STRATOCASTER", 1399, "images/Electric/el-black.jpg"),
        new Guitar("Electric", "Sky Blue", "AMERICAN PROFESSIONAL II", 1499, "images/Electric/el-Sky-blue.jpg"),
        new Guitar("Electric", "Brown", "Kurt Cobain Jaguar", 2599, "images/Electric/Brown-Kurt-Cobain.jpg"),
        new Guitar("Electric", "Gold", "Player Mustang", 1799, "images/Electric/el-player-gold.jpg"),
        new Guitar("Electric", "Purple", "Player Lead III", 1999, "images/Electric/el-lead-purple.jpg"),
        new Guitar("Electric", "Black & Gold", "Parallel Universe Volume II", 2399, "images/Electric/el-parallel-black-and-gold.jpg"),

        new Guitar("Bass", "Black & Blue", "American Professional II ", 1599, "images/Bass/bass-black-and-blue.jpg"),
        new Guitar("Bass", "Brown", "American Professional II Jazz", 1899, "images/Bass/bass-brown.jpg"),
        new Guitar("Bass", "Black & Brown", "American Ultra Jazz Bass®", 1299, "images/Bass/bass-black-brown.jpg"),
        new Guitar("Bass", "Coral", "Vintera '60s Mustang Bass", 1399, "images/Bass/bass-coral.jpg"),
        new Guitar("Bass", "Bordeaux", "AMERICAN PERFORMER MUSTANG", 1499, "images/Bass/bass-bordeaux.jpg"),
        new Guitar("Bass", "Blue", "American Original '60s Precision", 1399, "images/Bass/bass-blue.jpg"),

        new Guitar("Acoustic", "Blue", "Redondo Player", 899, "images/Acoustic/ac-blue.jpg"),
        new Guitar("Acoustic", "Sky Blue", "Newporter Player", 399, "images/Acoustic/ac-sky-blue.jpg"),
        new Guitar("Acoustic", "Black", "Malibu Special", 999, "images/Acoustic/ac-black1.jpg"),
        new Guitar("Acoustic", "Black", "Villager™ 12-String", 1199, "images/Acoustic/ac-black2.jpg"),
        new Guitar("Acoustic", "Brown", "CC-60S Concert", 799, "images/Acoustic/ac-brown.jpg"),
        new Guitar("Acoustic", "Red", "American Acoustasonic Stratocaster", 1399, "images/Acoustic/ac-red.jpg")
    ];

    // Class Methods
   sellGuitar(guitar){
       return this.guitars.pop(guitar);
   }

    addGuitar(guitar) {
        return this.guitars.push(guitar);

    }



}

// Guitar List Elemement Class
class GuitarListElement{
    constructor(guitarList){
        this.guitarList = guitarList;
    }
    renderGuitarList() {
        const storeElement = document.createElement("div");
        storeElement.className = "row cards-container d-flex align-items-stretch"

        for (const guitar of this.guitarList.guitars) {
            const element = new GuitarElement(guitar);
            storeElement.append(element.renderGuitarElement());
        }

        return storeElement;
    }
}
// Shopping Cart class
class ShoppingCart {
    cart = [];

    addGuitarToTheCart(guitar) {
        this.cart.push(guitar);
        
    }
    get totalPrice(){
        const totalPrice = this.cart.reduce(
            (previousValue, currentValue) =>{
                return previousValue + currentValue.price;
            },0
        );
        return totalPrice;
    }
  
}

//Shopping Cart Element
class ShoppingCartElement{
    constructor(shoppingCart, guitarList){
        this.shoppingCart = shoppingCart;
        this.guitarList = guitarList;
    }
    sellGuitars(){
        App.sellGuitars(this.shoppingCart);
    }

    renderCart() {
        let itemNo = 1;
        const cartTable = document.createElement("table");
        cartTable.className = "table table-hover";
        cartTable.innerHTML += `
        <caption>Total items in the store: ${this.guitarList.guitars.length}</caption>
        <thead>
            <tr>
             <th scope="col">#</th>
             <th scope="col">Item</th>
             <th scope="col">Price</th>
          </tr>
        </thead>
        `;
        const tableBody = document.createElement("tbody");
        cartTable.append(tableBody);
        for(const item of this.shoppingCart.cart){
            const itemElement = document.createElement("tr");
            itemElement.innerHTML = `
            <th>${itemNo++}</th>
            <td>${item.description}</td>
            <td>${item.price} $</td>
            `;
            tableBody.append(itemElement);
            
        }
        
        cartTable.innerHTML+=   
        `
        
        <tfoot>
            <tr>
                 <th>Subtotal</th>
                 <td>Items(${this.shoppingCart.cart.length})</td>
                 <td>${this.shoppingCart.totalPrice}$</td>
             </tr>
             <tr>
                <th>Checkout</th>
                <td><button type="button" class="btn btn-warning btn-block checkout-btn">CHECKOUT</button></td>
             </tr>
        </tfoot>    
        `;
        const checkoutBtn = cartTable.querySelector(".checkout-btn");
        checkoutBtn.addEventListener("click",this.sellGuitars.bind(this));
        return cartTable;

    }
}


// Guitar shop class
class GuitarShop {
    //Render store
    renderShop() {
        const appHook = document.getElementById('app');
        this.shoppingCart = new ShoppingCart();
        this.guitarList = new GuitarList();
        this.ShoppingCartElement = new ShoppingCartElement(this.shoppingCart, this.guitarList );
        this.GuitarListElement = new GuitarListElement(this.guitarList);
        appHook.append(this.ShoppingCartElement.renderCart());
        appHook.append(this.GuitarListElement.renderGuitarList());

    }

}

//App Class

class App {
    static init() {
        const shop = new GuitarShop();
        shop.renderShop();
        this.shoppingCart = shop.shoppingCart;
        this.guitarList = shop.guitarList;
    }
    
   
    static addGuitarToCart(guitar){
        if(document.querySelector("table") != null){
        this.shoppingCart.addGuitarToTheCart(guitar);
        const shoppingCartElement = new ShoppingCartElement(this.shoppingCart, this.guitarList  );
        const table = document.querySelector("table");
        table.remove();
        appHook.insertBefore(shoppingCartElement.renderCart(),appHook.childNodes[0]);
        }else{
        this.shoppingCart.addGuitarToTheCart(guitar);
        const shoppingCartElement = new ShoppingCartElement(this.shoppingCart ,this.guitarList );
        appHook.insertBefore(shoppingCartElement.renderCart(),appHook.childNodes[0]);

        }
        
    }
    static sellGuitars(shoppingCart){
        if(this.guitarList.guitars.length -  shoppingCart.cart.length < 5){
            alert("Cannot sell, store out of stock!")
        }else if(shoppingCart.cart.length > 0){
            for(const guitar of shoppingCart.cart){
                this.guitarList.sellGuitar(guitar);   
            }
            console.log(this.guitarList.guitars);
            this.shoppingCart.cart = [];
            alert("Thank you for shopping in this store, Yours guitar will be arrived soon :)");
            const table = document.querySelector("table");
            table.remove();
            const shoppingCartElement = new ShoppingCartElement(this.shoppingCart ,this.guitarList );
            appHook.insertBefore(shoppingCartElement.renderCart(),appHook.childNodes[0]);
            
        }else{
            alert("Please add an item to the cart!");
        }
    }
    static addGuitar(){
        
        const form = document.getElementById("add-guitar-form");
        const type = document.getElementById("guitarType");
        const color = document.getElementById("guitarColor");
        const name = document.getElementById("guitarName");
        const price = document.getElementById("guitarPrice");
        const image = document.getElementById("guitarImage");
        const guitar = new Guitar(type.value, color.value, name.value,price.value,"images/" +image.files[0].name);
        form.reset();
        

    }

}

App.init();
const addGuitar = document.getElementById("addGuitar-btn");
addGuitar.addEventListener("click",App.addGuitar);

