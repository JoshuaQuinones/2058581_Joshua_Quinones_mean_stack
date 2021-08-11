//Check if itemsInCart exists and if not, create and set equal to 0 
if (sessionStorage.getItem("itemsInCart") == null)
{
    let itemsInCart:any = 0;
    itemsInCart = JSON.stringify(itemsInCart);
    sessionStorage.setItem("itemsInCart", itemsInCart);
}

//Initialize array of each item. Items available are hardcoded.
//interface item classes will implement
interface itemForSale {
    name:string;
    price:number;
    inStock:number; //max quantity
}

//classes for each item for sale
//start refering to items with 'item0' to reflect their position in the array of items for sale
class item0 implements itemForSale 
{
    name:string = "Air Fryer"; 
    price:number = 99; 
    inStock:number = 3;
};

class item1 implements itemForSale 
{
    name:string = "Tire"; 
    price:number = 220; 
    inStock:number = 6;
};

class item2 implements itemForSale 
{
    name:string = "Playstation 5"; 
    price:number = 499; 
    inStock:number = 1;
};

class item3 implements itemForSale 
{
    name:string = "Automatically Opening Trash Can"; 
    price:number = 79; 
    inStock:number = 10;
};

class item4 implements itemForSale 
{
    name:string = "Boat GPS"; 
    price:number = 399; 
    inStock:number = 5;
};

//Check if both arrays used exist and if not, create with one of each class
if (sessionStorage.getItem("items") == null)
{
    let items:itemForSale[] = [new item0, new item1, new item2, new item3, new item4];
    let stringVer:string = JSON.stringify(items);
    sessionStorage.setItem("items", stringVer);
}
if (sessionStorage.getItem("inCart") == null)
{
    //initialize array representing how many of each item we have in our cart. Items are identified by array index
    let inCart:number[] = [0,0,0,0,0]
    let stringVer:string = JSON.stringify(inCart);
    sessionStorage.setItem("inCart", stringVer);
}



//function "Add To Cart" button will call to attempt to add item to cart
function addToCart(index:number):void 
{
    //check that all required objects exist in local storage and create local variables with their values
    let itemsInCart:number;
    let items:itemForSale[];
    let inCart:number[];
    if (sessionStorage.getItem("itemsInCart") == null)
    {
        //exit function if itemsInCart doesn't exist
        alert("add: itemsInCart does not exist");
        return;
    }
    else
    {
        itemsInCart = JSON.parse(sessionStorage.getItem("itemsInCart")!)
    }
    if (sessionStorage.getItem("items") == null)
    {
        alert("add: items does not exist");
        return;
    }
    else
    {
        items = JSON.parse(sessionStorage.getItem("items")!)
    }
    if (sessionStorage.getItem("inCart") == null)
    {
        alert("add: inCart does not exist");
        return;
    }
    else
    {
        inCart = JSON.parse(sessionStorage.getItem("inCart")!)
    }

    //compare current quantity to max quantity. If already have max number in cart, do not add
    if (inCart[index] == items[index].inStock)
    {
        alert("Could not add " + items[index].name + " to cart. Max quantity in cart");
    }
    else
    {
        itemsInCart++;
        inCart[index]++;
        //update display in page of cart size
        document.getElementById("cartsize")!.innerHTML = itemsInCart.toString();
        //update display of quantity of this item in art
        let id = "incart" + index.toString()
        document.getElementById(id)!.innerHTML = "Amount in cart: " + inCart[index].toString();
        //update session storage
        let itemsInCartString = JSON.stringify(itemsInCart);
        sessionStorage.setItem("itemsInCart", itemsInCartString);
        let inCartString = JSON.stringify(inCart);
        sessionStorage.setItem("inCart", inCartString);
    }
}

//function "Remove From Cart" button will call to attempt to remove an item from cart
function removeFromCart(index:number):void
{
    //check that all required objects exist in local storage and create local variables with their values
    let itemsInCart:number;
    let items:itemForSale[];
    let inCart:number[];
    if (sessionStorage.getItem("itemsInCart") == null)
    {
        //exit function if itemsInCart doesn't exist
        alert("add: itemsInCart does not exist");
        return;
    }
    else
    {
        itemsInCart = JSON.parse(sessionStorage.getItem("itemsInCart")!)
    }
    if (sessionStorage.getItem("items") == null)
    {
        alert("add: items does not exist");
        return;
    }
    else
    {
        items = JSON.parse(sessionStorage.getItem("items")!)
    }
    if (sessionStorage.getItem("inCart") == null)
    {
        alert("add: inCart does not exist");
        return;
    }
    else
    {
        inCart = JSON.parse(sessionStorage.getItem("inCart")!)
    }

    //See if currently have any of this item in cart
    if (inCart[index] == 0)
    {
        alert("None in cart")
    }
    else
    {
        itemsInCart--;
        inCart[index]--;
        //update display in page of cart size
        document.getElementById("cartsize")!.innerHTML = itemsInCart.toString();
        //update display of quantity of this item in art
        let id = "incart" + index.toString()
        document.getElementById(id)!.innerHTML = "Amount in cart: " + inCart[index].toString();
        //update session storage
        let itemsInCartString = JSON.stringify(itemsInCart);
        sessionStorage.setItem("itemsInCart", itemsInCartString);
        let inCartString = JSON.stringify(inCart);
        sessionStorage.setItem("inCart", inCartString);    
    }
}


//function to display the total items in cart when loading storePage.html
function showCartNum():void {
    //check that all required objects exist in local storage and create local variables with their values
    let itemsInCart:number;
    let inCart:number[];
    if (sessionStorage.getItem("itemsInCart") == null)
    {
        //exit function if itemsInCart doesn't exist
        alert("add: itemsInCart does not exist");
        return;
    }
    else
    {
        itemsInCart = JSON.parse(sessionStorage.getItem("itemsInCart")!)
    }
    if (sessionStorage.getItem("inCart") == null)
    {
        alert("add: inCart does not exist");
        return;
    }
    else
    {
        inCart = JSON.parse(sessionStorage.getItem("inCart")!)
    }
    //update html
    document.getElementById("cartsize")!.innerHTML = itemsInCart.toString();
    //update html for each item in the store
    for (let i = 0; i < inCart.length; i++)
    {
        let id:string = "incart" + i;
        document.getElementById(id)!.innerHTML = "Amount in cart: " + inCart[i].toString();
    }
}


//function to display the table of items in shopping cart when loading checkout.html
function displayTable():void {
    //check that all required objects exist in local storage and create local variables with their values
    let items:itemForSale[];
    let inCart:number[];
    if (sessionStorage.getItem("items") == null)
    {
        alert("add: items does not exist");
        return;
    }
    else
    {
        items = JSON.parse(sessionStorage.getItem("items")!)
    }
    if (sessionStorage.getItem("inCart") == null)
    {
        alert("add: inCart does not exist");
        return;
    }
    else
    {
        inCart = JSON.parse(sessionStorage.getItem("inCart")!)
    }
    let innerHTML:string = "";
    let totalPrice:number = 0;
    //iterate through items array and add any items that are in cart to the table
    for (let i = 0; i < inCart.length; i++)
    {
        //check that there are any items in cart
        if (inCart[i] > 0)
        {
            //determine total price for this item and write table code
            let total:number = items[i].price * inCart[i];
            innerHTML += `<tr><td>${items[i].name}</td><td>$${items[i].price}</td>
            <td>${inCart[i]}</td><td>$${total}</td></tr>`;
            totalPrice += total;
        }
    }
    //update html code
    document.getElementById("insideTable")!.innerHTML = innerHTML;
    document.getElementById("totalPrice")!.innerHTML = "Total price: $" + totalPrice.toString();
}