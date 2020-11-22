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
    addGuitarToCart() {
        App.addGuitarToCart(this.guitar);

    }

    renderGuitarElement() {
        const guitarCard = document.createElement("div");
        guitarCard.className = "col-lg-3 col-md-6  my-3 guitar-card ";
        guitarCard.innerHTML = `
        <div class="card" id="${this.guitar.id}">
        <div class="img-wrapper mb-5">
        <img class="card-img-top" src="${this.guitar.image}" alt="${this.guitar.description}">
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
        addToCartBtn.addEventListener("click", this.addGuitarToCart.bind(this));

        return guitarCard;
    }


}

// Guitar Store Definition
class GuitarList {
    guitars = [
        new Guitar("Electric", "Black", "MODERN STRATOCASTER", 1399, "images/Electric/el-black.jpg"),
        new Guitar("Electric", "Blue", "AMERICAN PROFESSIONAL II", 1499, "images/Electric/el-Sky-blue.jpg"),
        new Guitar("Electric", "Brown", "Kurt Cobain Jaguar", 2599, "images/Electric/Brown-Kurt-Cobain.jpg"),
        new Guitar("Electric", "Gold", "Player Mustang", 1799, "images/Electric/el-player-gold.jpg"),
        new Guitar("Electric", "Purple", "Player Lead III", 1999, "images/Electric/el-lead-purple.jpg"),
        new Guitar("Electric", "Black", "Parallel Universe Volume II", 2399, "images/Electric/el-parallel-black-and-gold.jpg"),

        new Guitar("Bass", "Black", "American Professional II ", 1599, "images/Bass/bass-black-and-blue.jpg"),
        new Guitar("Bass", "Brown", "American Professional II Jazz", 1899, "images/Bass/bass-brown.jpg"),
        new Guitar("Bass", "Black", "American Ultra Jazz Bass®", 1299, "images/Bass/bass-black-brown.jpg"),
        new Guitar("Bass", "Red", "Vintera '60s Mustang Bass", 1399, "images/Bass/bass-coral.jpg"),
        new Guitar("Bass", "Red", "AMERICAN PERFORMER MUSTANG", 1499, "images/Bass/bass-bordeaux.jpg"),
        new Guitar("Bass", "Blue", "American Original '60s Precision", 1399, "images/Bass/bass-blue.jpg"),

        new Guitar("Acoustic", "Blue", "Redondo Player", 899, "images/Acoustic/ac-blue.jpg"),
        new Guitar("Acoustic", "Blue", "Newporter Player", 399, "images/Acoustic/ac-sky-blue.jpg"),
        new Guitar("Acoustic", "Black", "Malibu Special", 999, "images/Acoustic/ac-black1.jpg"),
        new Guitar("Acoustic", "Black", "Villager™ 12-String", 1199, "images/Acoustic/ac-black2.jpg"),
        new Guitar("Acoustic", "Brown", "CC-60S Concert", 799, "images/Acoustic/ac-brown.jpg"),
        new Guitar("Acoustic", "Red", "American Acoustasonic Stratocaster", 1399, "images/Acoustic/ac-red.jpg")
    ];

    // Class Methods
    sellGuitar(guitar) {
        const index = this.guitars.indexOf(guitar);
        this.guitars.splice(index, 1);
    }




    addGuitar(guitar) {
        return this.guitars.push(guitar);

    }




}

// Guitar List Elemement Class
class GuitarListElement {
    constructor(guitarList, shoppingCart) {
        this.guitarList = guitarList;
        this.shoppingCart = shoppingCart;
    }

    addGuitar() {
        App.addGuitar(this.guitarList , this.shoppingCart);
    }
    search(){
        App.search(this.guitarList, this.shoppingCart);
    }

    renderGuitarList() {
        const storeElement = document.createElement("div");
        storeElement.className = "row cards-container d-flex align-items-stretch"

        for (const guitar of this.guitarList.guitars) {
            const element = new GuitarElement(guitar);
            storeElement.append(element.renderGuitarElement());
        }
        const addGuitar = document.getElementById("addGuitar-btn");
        addGuitar.addEventListener("click", this.addGuitar.bind(this));

        const btnSreach = document.getElementById("btn-search");
        btnSreach.addEventListener("click", this.search.bind(this));



        return storeElement;
    }

    renderGuitarSearchList() {
        const storeSearchElement = document.createElement("div");
        storeSearchElement.className = "row cards-container d-flex align-items-stretch"

        for (const guitar of this.guitarList) {
            const element = new GuitarElement(guitar);
            storeSearchElement.append(element.renderGuitarElement());
        }

        return storeSearchElement;
    }
}
// Shopping Cart class
class ShoppingCart {
    cart = [];

    addGuitarToTheCart(guitar) {
        this.cart.push(guitar);

    }
    get totalPrice() {
        const totalPrice = this.cart.reduce(
            (previousValue, currentValue) => {
                return previousValue + currentValue.price;
            }, 0
        );
        return totalPrice;
    }

}

//Shopping Cart Element
class ShoppingCartElement {
    constructor(shoppingCart, guitarList) {
        this.shoppingCart = shoppingCart;
        this.guitarList2 = guitarList;
    }
    sellGuitars() {
        App.sellGuitars(this.shoppingCart);
    }

    renderCart() {
        let itemNo = 1;
        const cartTable = document.createElement("table");
        cartTable.className = "table table-hover";
        cartTable.innerHTML += `
        <caption>Total items in the store: ${this.guitarList2.guitars.length}</caption>
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
        for (const item of this.shoppingCart.cart) {
            const itemElement = document.createElement("tr");
            itemElement.innerHTML = `
            <th>${itemNo++}</th>
            <td>${item.description}</td>
            <td>${item.price} $</td>
            `;
            tableBody.append(itemElement);

        }

        cartTable.innerHTML +=
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
        checkoutBtn.addEventListener("click", this.sellGuitars.bind(this));
        return cartTable;

    }
    renderSearchCart() {
        let itemNo = 1;
        const cartTable = document.createElement("table");
        cartTable.className = "table table-hover";
        cartTable.innerHTML += `
        <caption>Total items in the store: ${this.guitarList2.length}</caption>
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
        for (const item of this.shoppingCart.cart) {
            const itemElement = document.createElement("tr");
            itemElement.innerHTML = `
            <th>${itemNo++}</th>
            <td>${item.description}</td>
            <td>${item.price} $</td>
            `;
            tableBody.append(itemElement);

        }

        cartTable.innerHTML +=
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
        checkoutBtn.addEventListener("click", this.sellGuitars.bind(this));
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
        this.ShoppingCartElement = new ShoppingCartElement(this.shoppingCart, this.guitarList);
        this.GuitarListElement = new GuitarListElement(this.guitarList, this.shoppingCart);
        appHook.append(this.ShoppingCartElement.renderCart());
        appHook.append(this.GuitarListElement.renderGuitarList());

    }

    renderShop2(shoppingCart, guitarList) {
        const appHook = document.getElementById('app');
        this.shoppingCart =shoppingCart;
        this.guitarList = guitarList;
        this.ShoppingCartElement = new ShoppingCartElement(this.shoppingCart, this.guitarList);
        this.GuitarListElement = new GuitarListElement(this.guitarList, this.shoppingCart);
        const table = document.querySelector("table")
        const row = document.querySelector(".row")
        table.remove();
        row.remove();
        appHook.append(this.ShoppingCartElement.renderCart());
        appHook.append(this.GuitarListElement.renderGuitarList());

    }
    renderSearchShop(shoppingCart, guitarList) {
        const appHook = document.getElementById('app');
        this.shoppingCart =shoppingCart;
        this.guitarList = guitarList;
        this.ShoppingCartElement = new ShoppingCartElement(shoppingCart, guitarList);
        this.GuitarListElement = new GuitarListElement(guitarList, shoppingCart);
        const table = document.querySelector("table")
        const row = document.querySelector(".row")
        table.remove();
        row.remove();
        appHook.append(this.ShoppingCartElement.renderSearchCart());
        appHook.append(this.GuitarListElement.renderGuitarSearchList());

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

    static search(guitarList, shoppingCart){
       const searchType = document.getElementById("guitarType-search");
       const searchColor = document.getElementById("guitarColor-search");
       const formSearch = document.getElementById("search");
       if(searchType.value == '-' && searchColor.value == '-'){
        const searchShopAll = new GuitarShop();    
        searchShopAll.renderSearchShop(this.shoppingCart, this.guitarList.guitars);

       }
       else if(searchType.value == '-' && searchColor.value != '-'){
        const filterdColor = guitarList.guitars.filter(guitar => guitar.color == searchColor.value );
        const searchShop = new GuitarShop();
        searchShop.renderSearchShop(shoppingCart, filterdColor);
        formSearch.reset();
       }else if(searchType.value != '-' && searchColor.value == '-'){
        const filterdCategory = guitarList.guitars.filter(guitar => guitar.category == searchType.value );
        const searchShop = new GuitarShop();
        searchShop.renderSearchShop(shoppingCart, filterdCategory);
        formSearch.reset();
       }else{
        const filterd = guitarList.guitars.filter(guitar => guitar.category == searchType.value );
        const filterdAll = filterd.filter(guitar => guitar.color == searchColor.value);
        const searchShop = new GuitarShop();
        console.log(filterdAll);
        searchShop.renderSearchShop(shoppingCart, filterdAll);
        formSearch.reset();

       }
       
      
       
    }

    static addGuitar(guitarList, shoppingCart) {
        
        const form = document.getElementById("add-guitar-form");
        const type = document.getElementById("guitarType");
        const color = document.getElementById("guitarColor");
        const name = document.getElementById("guitarName");
        const price = document.getElementById("guitarPrice");
        const image = document.getElementById("guitarImage");     
        if (typeof image.files[0] === 'undefined') {
            alert("Please enter an image");
            
        } else {
            const guitar = new Guitar(type.value, color.value, name.value, price.value, "images/" + `${type.value}/` + image.files[0].name);
            guitarList.guitars.push(guitar);
            const newShop = new GuitarShop();
            newShop.renderShop2(shoppingCart, guitarList);
            


        }

        form.reset();



    }


    static addGuitarToCart(guitar) {
        if (document.querySelector("table") != null) {

            this.shoppingCart.addGuitarToTheCart(guitar);
            const shoppingCartElement = new ShoppingCartElement(this.shoppingCart, this.guitarList);
            const table = document.querySelector("table");
            table.remove();
            appHook.insertBefore(shoppingCartElement.renderCart(), appHook.childNodes[0]);
        } else {
            this.shoppingCart.addGuitarToTheCart(guitar);

            const shoppingCartElement = new ShoppingCartElement(this.shoppingCart, this.guitarList);
            appHook.insertBefore(shoppingCartElement.renderCart(), appHook.childNodes[0]);

        }

    }
    static sellGuitars(shoppingCart) {
        if (this.guitarList.guitars.length - shoppingCart.cart.length < 5) {
            alert("Cannot sell, store out of stock!");
            this.shoppingCart.cart = [];
            const table = document.querySelector("table");
            table.remove();

            const shoppingCartElement = new ShoppingCartElement(this.shoppingCart, this.guitarList);
            appHook.insertBefore(shoppingCartElement.renderCart(), appHook.childNodes[0]);
            const guitarsElement = new GuitarListElement(this.guitarList);
            const row = document.querySelector(".row");
            row.remove();
            appHook.append(guitarsElement.renderGuitarList());
        } else if (shoppingCart.cart.length > 0) {
            for (const guitar of shoppingCart.cart) {
                this.guitarList.sellGuitar(guitar);
            }

            this.shoppingCart.cart = [];
            alert("Thank you for shopping in this store, Yours guitar will be arrived soon :)");
            const table = document.querySelector("table");
            table.remove();
            const shoppingCartElement = new ShoppingCartElement(this.shoppingCart, this.guitarList);
            appHook.insertBefore(shoppingCartElement.renderCart(), appHook.childNodes[0]);
            const guitarsElement = new GuitarListElement(this.guitarList);
            const row = document.querySelector(".row");
            row.remove();
            appHook.append(guitarsElement.renderGuitarList());

        } else {
            alert("Please add an item to the cart!");

        }
    }


}

App.init();