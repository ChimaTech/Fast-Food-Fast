class ShoppingCart { /* `ShoppingCart` Class beginning */

  constructor() {
    this.total = 0;
    this.items = {};
  }

  addItem(itemName, quantity, price) { /* addItem method beginning */

    if (this.items.hasOwnProperty(itemName)) { // check if item already exists in the `items` object

      let updateQuant = this.items[itemName] + quantity;
      this.items[itemName] = updateQuant; // Update item's quantity as key-value pairs into `items` object
      this.total = this.total + quantity*price; // add cost of new items to `total`
    }
    else {
      this.total = this.total + quantity*price; // add cost of new items to `total`
      this.items[itemName] = quantity; // enter new item name and quantity as key-value pairs into `items` object
    }

  } /* addItem method ending */


  removeItem( itemName, quantity, price) { /* removeItem method beginning*/

    // check if the item exists in the cart already
    if ( this.items.hasOwnProperty(itemName) ) {   // If `true` delete things

        // Check if initial quantity of the item is less than or equal to quantity to be removed
        if ( this.items[itemName] <= quantity ) { // If `true` delete all entries of the said item

            this.total = this.total - this.items[itemName]*price;
            delete this.items[itemName];
        }
        else { // Remove the said quantity and update `total` value and `items` object
            let remQuant = this.items[itemName] - quantity;

            this.total = this.total - quantity*price;
            this.items[itemName] = remQuant;
        }

    }

  } /* removeItem method ending*/


  checkout( cashPaid = 0 ) { /* checkout method beginning */

      if ( cashPaid !== undefined || cashPaid !== null || cashPaid !== "" ) { // Ensure that cashPaid is not `undefined` , `null` or an empty string

          if ( cashPaid < this.total ) {
              // Report this when cash paid is not enough
              return "Cash paid not enough"
          }
          else {
              let balance = cashPaid - this.total;
              return balance;
          }

      }

  } /* checkout method ending */

} /* `ShoppingCart` Class ending */


// `Shop` Subclass extends `ShoppingCart` main Class
class Shop extends ShoppingCart {

    constructor( total, items, quantity ) {
        super(total, items);


        this.quantity = 100;
    }

    removeItem() {
        this.quantity = this.quantity - 1;
        return this.quantity;
    }
}
//END MAIN CLASS

class User extends ShoppingCart {

  constructor( total, items, quantity ) {
    super(total, items, quantity);
  }

  addItem(itemName, quantity, price) {
    super.addItem(itemName, quantity, price);
  }

  removeItem( itemName, quantity, price) {
    super.removeItem( itemName, quantity, price);
  }

  checkout( cashPaid = 0 ) {
    super.checkout( cashPaid );
  }

}

const user = new User;
let list = document.querySelectorAll("ol#ordered-items li");
let comment = document.querySelector("p.comment");
let total = document.querySelector("p.total");
let totalCost = user.total;


/**
 * @description Submit Function -- Captures and registers `click` events on the `button`; as well as `submit` event on the `form`.
 * @param {null} null Does not take any parameter
 * @returns {undefined} Calls the `user.total` property when food item is selected already and displays the total cost of order; or displays a notice that no food item had been selected
 */
function submitFunc() {

  event.preventDefault(); // Prevents the 'Form' from attempting to submit inputs to a server

  if ( totalCost === 0 ) {
    comment.innerHTML = '<span class="red"> Your have not selected any food item yet</span>';
    total.innerHTML = ``;
  }
  else if ( totalCost > 0 ) {
    total.innerHTML = `Total Cost is <strong>$${user.total}</strong>.`;
  }

}

function checkFunc(event) {
  let foodName = event.target.parentNode.parentNode.querySelector('label').textContent;
  let foodPriceString = event.target.parentNode.parentNode.querySelector('figcaption').getAttribute('class');
  let foodPrice = Number( foodPriceString );

  comment.innerHTML = '<span class="green"> Your have not selected any food item yet</span>';



  let input = event.target;

  if ( input.hasAttribute("checked") ) {
    input.removeAttribute("checked");
    user.removeItem(foodName, 1, foodPrice);
    totalCost = user.total;
    return totalCost;

    // console.log( user.total );
    // console.log( foodName );

  }
  else {
    input.setAttribute("checked", "checked");

    user.addItem(foodName, 1, foodPrice);

    const newOrder = document.createElement('li');
    const orderList = document.querySelector("ol");
    newOrder.setAttribute('id',foodName);
    newOrder.innerHTML = `<strong>${foodName}</strong>: <span class="pricetag">$${user.total}</span>`;
    orderList.appendChild(newOrder);
    totalCost = user.total;
    return totalCost;



    // console.log( user.total );



  }

}
