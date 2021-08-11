//Check if itemsInCart exists and if not, create and set equal to 0 
if (sessionStorage.getItem("itemsInCart") == null) {
    var itemsInCart = 0;
    itemsInCart = JSON.stringify(itemsInCart);
    sessionStorage.setItem("itemsInCart", itemsInCart);
}
//classes for each item for sale
//start refering to items with 'item0' to reflect their position in the array of items for sale
var item0 = /** @class */ (function () {
    function item0() {
        this.name = "Air Fryer";
        this.price = 99;
        this.inStock = 3;
    }
    return item0;
}());
;
var item1 = /** @class */ (function () {
    function item1() {
        this.name = "Tire";
        this.price = 220;
        this.inStock = 6;
    }
    return item1;
}());
;
var item2 = /** @class */ (function () {
    function item2() {
        this.name = "Playstation 5";
        this.price = 499;
        this.inStock = 1;
    }
    return item2;
}());
;
var item3 = /** @class */ (function () {
    function item3() {
        this.name = "Automatically Opening Trash Can";
        this.price = 79;
        this.inStock = 10;
    }
    return item3;
}());
;
var item4 = /** @class */ (function () {
    function item4() {
        this.name = "Boat GPS";
        this.price = 399;
        this.inStock = 5;
    }
    return item4;
}());
;
//Check if both arrays used exist and if not, create with one of each class
if (sessionStorage.getItem("items") == null) {
    var items = [new item0, new item1, new item2, new item3, new item4];
    var stringVer = JSON.stringify(items);
    sessionStorage.setItem("items", stringVer);
}
if (sessionStorage.getItem("inCart") == null) {
    //initialize array representing how many of each item we have in our cart. Items are identified by array index
    var inCart = [0, 0, 0, 0, 0];
    var stringVer = JSON.stringify(inCart);
    sessionStorage.setItem("inCart", stringVer);
}
//function "Add To Cart" button will call to attempt to add item to cart
function addToCart(index) {
    //check that all required objects exist in local storage and create local variables with their values
    var itemsInCart;
    var items;
    var inCart;
    if (sessionStorage.getItem("itemsInCart") == null) {
        //exit function if itemsInCart doesn't exist
        alert("add: itemsInCart does not exist");
        return;
    }
    else {
        itemsInCart = JSON.parse(sessionStorage.getItem("itemsInCart"));
    }
    if (sessionStorage.getItem("items") == null) {
        alert("add: items does not exist");
        return;
    }
    else {
        items = JSON.parse(sessionStorage.getItem("items"));
    }
    if (sessionStorage.getItem("inCart") == null) {
        alert("add: inCart does not exist");
        return;
    }
    else {
        inCart = JSON.parse(sessionStorage.getItem("inCart"));
    }
    //compare current quantity to max quantity. If already have max number in cart, do not add
    if (inCart[index] == items[index].inStock) {
        alert("Could not add " + items[index].name + " to cart. Max quantity in cart");
    }
    else {
        itemsInCart++;
        inCart[index]++;
        //update display in page of cart size
        document.getElementById("cartsize").innerHTML = itemsInCart.toString();
        //update display of quantity of this item in art
        var id = "incart" + index.toString();
        document.getElementById(id).innerHTML = "Amount in cart: " + inCart[index].toString();
        //update session storage
        var itemsInCartString = JSON.stringify(itemsInCart);
        sessionStorage.setItem("itemsInCart", itemsInCartString);
        var inCartString = JSON.stringify(inCart);
        sessionStorage.setItem("inCart", inCartString);
    }
}
//function "Remove From Cart" button will call to attempt to remove an item from cart
function removeFromCart(index) {
    //check that all required objects exist in local storage and create local variables with their values
    var itemsInCart;
    var items;
    var inCart;
    if (sessionStorage.getItem("itemsInCart") == null) {
        //exit function if itemsInCart doesn't exist
        alert("add: itemsInCart does not exist");
        return;
    }
    else {
        itemsInCart = JSON.parse(sessionStorage.getItem("itemsInCart"));
    }
    if (sessionStorage.getItem("items") == null) {
        alert("add: items does not exist");
        return;
    }
    else {
        items = JSON.parse(sessionStorage.getItem("items"));
    }
    if (sessionStorage.getItem("inCart") == null) {
        alert("add: inCart does not exist");
        return;
    }
    else {
        inCart = JSON.parse(sessionStorage.getItem("inCart"));
    }
    //See if currently have any of this item in cart
    if (inCart[index] == 0) {
        alert("None in cart");
    }
    else {
        itemsInCart--;
        inCart[index]--;
        //update display in page of cart size
        document.getElementById("cartsize").innerHTML = itemsInCart.toString();
        //update display of quantity of this item in art
        var id = "incart" + index.toString();
        document.getElementById(id).innerHTML = "Amount in cart: " + inCart[index].toString();
        //update session storage
        var itemsInCartString = JSON.stringify(itemsInCart);
        sessionStorage.setItem("itemsInCart", itemsInCartString);
        var inCartString = JSON.stringify(inCart);
        sessionStorage.setItem("inCart", inCartString);
    }
}
//function to display the total items in cart when loading storePage.html
function showCartNum() {
    //check that all required objects exist in local storage and create local variables with their values
    var itemsInCart;
    var inCart;
    if (sessionStorage.getItem("itemsInCart") == null) {
        //exit function if itemsInCart doesn't exist
        alert("add: itemsInCart does not exist");
        return;
    }
    else {
        itemsInCart = JSON.parse(sessionStorage.getItem("itemsInCart"));
    }
    if (sessionStorage.getItem("inCart") == null) {
        alert("add: inCart does not exist");
        return;
    }
    else {
        inCart = JSON.parse(sessionStorage.getItem("inCart"));
    }
    //update html
    document.getElementById("cartsize").innerHTML = itemsInCart.toString();
    //update html for each item in the store
    for (var i = 0; i < inCart.length; i++) {
        var id = "incart" + i;
        document.getElementById(id).innerHTML = "Amount in cart: " + inCart[i].toString();
    }
}
//function to display the table of items in shopping cart when loading checkout.html
function displayTable() {
    //check that all required objects exist in local storage and create local variables with their values
    var items;
    var inCart;
    if (sessionStorage.getItem("items") == null) {
        alert("add: items does not exist");
        return;
    }
    else {
        items = JSON.parse(sessionStorage.getItem("items"));
    }
    if (sessionStorage.getItem("inCart") == null) {
        alert("add: inCart does not exist");
        return;
    }
    else {
        inCart = JSON.parse(sessionStorage.getItem("inCart"));
    }
    var innerHTML = "";
    var totalPrice = 0;
    //iterate through items array and add any items that are in cart to the table
    for (var i = 0; i < inCart.length; i++) {
        //check that there are any items in cart
        if (inCart[i] > 0) {
            //determine total price for this item and write table code
            var total = items[i].price * inCart[i];
            innerHTML += "<tr><td>" + items[i].name + "</td><td>$" + items[i].price + "</td>\n            <td>" + inCart[i] + "</td><td>$" + total + "</td></tr>";
            totalPrice += total;
        }
    }
    //update html code
    document.getElementById("insideTable").innerHTML = innerHTML;
    document.getElementById("totalPrice").innerHTML = "Total price: $" + totalPrice.toString();
}
