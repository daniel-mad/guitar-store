const appHook = document.getElementById("app");
const cart = [];
const cartItem = 1;
let guitarId= 0;

// Guitar class definition 
class Guitar {
    category;
    color;
    description;
    price;
    image
    constructor(category, color, description, price, image) {
        this.category = category;
        this.color = color;
        this.description = description;
        this.price = price;
        this.image = image;
        this.id = guitarId++ ;
    }

}

// Guitar element definition
class GuitarElement {
    constructor(guitar) {
        this.guitar = guitar;
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
          <a href="#" class="btn btn-success  btn-block btn-cart " onclick="addToCart(${this.guitar.id})">ADD TO CART</a>
        </div>
      </div>
        `
        return guitarCard;
    }

}

// Guitar Store Definition
class GuitarStore{
    guitars = [
        new Guitar("Electric", "Black", "MODERN STRATOCASTER",1399,"images/Electric/el-black.jpg"),
        new Guitar("Electric", "Sky Blue", "AMERICAN PROFESSIONAL II",1499,"images/Electric/el-Sky-blue.jpg"),
        new Guitar("Electric", "Brown", "Kurt Cobain Jaguar",2599,"images/Electric/Brown-Kurt-Cobain.jpg"),
        new Guitar("Electric", "Gold", "Player Mustang",1799,"images/Electric/el-player-gold.jpg"),
        new Guitar("Electric", "Purple", "Player Lead III",1999,"images/Electric/el-lead-purple.jpg"),
        new Guitar("Electric", "Black & Gold", "Parallel Universe Volume II",2399,"images/Electric/el-parallel-black-and-gold.jpg"),

        new Guitar("Bass", "Black & Blue", "American Professional II ",1599,"images/Bass/bass-black-and-blue.jpg"),
        new Guitar("Bass", "Brown", "American Professional II Jazz",1899,"images/Bass/bass-brown.jpg"),
        new Guitar("Bass", "Black & Brown", "American Ultra Jazz Bass®",1299,"images/Bass/bass-black-brown.jpg"),
        new Guitar("Bass", "Coral", "Vintera '60s Mustang Bass",1399,"images/Bass/bass-coral.jpg"),
        new Guitar("Bass", "Bordeaux", "AMERICAN PERFORMER MUSTANG",1499,"images/Bass/bass-bordeaux.jpg"),
        new Guitar("Bass", "Blue", "American Original '60s Precision",1399,"images/Bass/bass-blue.jpg"),

        new Guitar("Acoustic", "Blue", "Redondo Player",899,"images/Acoustic/ac-blue.jpg"),
        new Guitar("Acoustic", "Sky Blue", "Newporter Player",399,"images/Acoustic/ac-sky-blue.jpg"),
        new Guitar("Acoustic", "Black", "Malibu Special",999,"images/Acoustic/ac-black1.jpg"),
        new Guitar("Acoustic", "Black", "Villager™ 12-String",1199,"images/Acoustic/ac-black2.jpg"),
        new Guitar("Acoustic", "Brown", "CC-60S Concert",799,"images/Acoustic/ac-brown.jpg"),
        new Guitar("Acoustic", "Red", "American Acoustasonic Stratocaster",1399,"images/Acoustic/ac-red.jpg")
    ];

    // Class Methods

    addGuitar(guitar){
        this.guitars.push(guitar);

        }   
        
    
        
    
}

class GuitarStoreElement{
    constructor(store){
        this.store = store;
    }

    //Render store
    renderStore(){
        const storeElement = document.createElement("div");
        storeElement.className = "row cards-container d-flex align-items-stretch"

        for(const guitar of  store.guitars){
            const element = new GuitarElement(guitar);
            storeElement.append(element.renderGuitarElement());
        }

        appHook.append(storeElement);
    }
}



const store = new GuitarStore();
const storeElement = new GuitarStoreElement(store);
storeElement.renderStore();

// Function
//Add an item to the cart
function addToCart(id) {
    if(store.guitars.length > 15){
        const item = store.guitars.pop(id);
        cart.push(item);
        document.getElementById("cart-item").style.visibility='visible';
        document.getElementById("cart-item").innerHTML = cart.length;
    }else{
        alert("We're out of stock!");

    }
    
}
