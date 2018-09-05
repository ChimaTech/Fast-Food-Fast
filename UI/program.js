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


// `User` Subclass extends `ShoppingCart` main Class

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

const user = new User; // Creates a new instance of User Object called `user`


const comment = document.querySelector("p.comment");
const total = document.querySelector("p.total");
let totalCost = 0;




/**
 * @description Check-Button Function -- Captures and registers `click` events on the `checkbox button`; as well as `submit` event on the `form`.
 * @param {event} event The click event on `checkboxes`.
 * @returns {undefined} Sets the `user.total` to the `totalCost`; Activates | deactivates the `Send Order` button; Lists Selected food items.
 */
function checkFunc(event) {

  const foodName = event.target.parentNode.parentNode.querySelector(`label`).textContent; // Capture event target, trace and obtain the text content of it's label
  const foodPriceString = event.target.parentNode.parentNode.querySelector(`figcaption`).getAttribute(`class`); // Capture event target, trace and obtain the `class` of it's `figcaption` (i.e the food item's price)
  const foodPrice = Number( foodPriceString ); // Converts the price string to a number.
  const button = document.querySelector('aside button'); // The `Send Order` button -- will be deactivated or activated

  const list = document.querySelectorAll("ol#ordered-items li"); // `NodeList` of list items in the Ordered Food List
  const input = event.target; // The Event Target

  total.innerHTML = ``; // Clears Total Cost entry once a checkbox is clicked


  // What to do when the `input` is `checked` (i.e user had checked the item but wants to uncheck it now) and length of `NodeList` (i.e more than one food items had been selected)
  if ( input.hasAttribute(`checked`) && list.length > 1 ) {

    comment.innerHTML = `<span class="green">Here is your order list:</span>`; // Displays message that Ordered Food Items is listed

    input.removeAttribute(`checked`); // Unchecks the input
    user.removeItem(foodName, 1, foodPrice); // Removes the unchecked food from the Order

    let orderID = `#${foodName}`; // Captures ID attribute of the unchecked food
    let removeOrder = document.querySelector( orderID ); // Captures the unchecked item in the Nodelist
    removeOrder.remove(); // Removes unchecked food from NodeList

    totalCost = user.total; // Assign updated value of `user.total` to `totalCost` variable


  }
  else if ( list.length === 1 && input.hasAttribute("checked") ) { // NodeList length is 1 and input is already checked because, the input is the only checked item, (and user wants to uncheck it)

    button.setAttribute('class','inactive'); // Deactivate `Send order` button

    comment.innerHTML = `<span>Ordered items will be listed here.</span>`; // Message display that Ordered list would be listed

    input.removeAttribute("checked");
    user.removeItem(foodName, 1, foodPrice);

    let orderID = `#${foodName}`;
    let removeOrder = document.querySelector( orderID );
    removeOrder.remove();

    totalCost = user.total;
  }
  else { // This is the first click event on any of the checkboxes since the page loaded
    comment.innerHTML = `<span class="green">Here is your order list:</span>`; // Displays message that Ordered Food Items is listed

    button.setAttribute('class','active'); // Activates `Send Order` button
    input.setAttribute("checked", "checked"); // Checks the selected food item
    user.addItem(foodName, 1, foodPrice); // Adds the food item to the List of ordered food

    const orderList = document.querySelector("ol"); // Obtains the ordered list
    const newOrder = document.createElement('li'); // Creates a new list item element
    newOrder.setAttribute('id',foodName); // Sets a unique ID attribute of `foodName` to the list item element
    newOrder.innerHTML = `<strong>${foodName}</strong>: <span class="pricetag">$${foodPrice}.</span>`; // Sets the unique list item's innerHTML: The foodName and pricetag
    orderList.appendChild(newOrder); // Appends this unique list item to the ordered list
    totalCost = user.total;

  }

}


/**
 * @description Submit Function -- Captures and registers `click` events on the `button`; as well as `submit` event on the `form`.
 * @param {null} null Does not take any parameter
 * @returns {undefined} Calls the `user.total` property when food item is selected already and displays the total cost of order; or displays a notice that no food item had been selected
 */
function submitFunc() {

  event.preventDefault(); // Prevents the 'Form' from attempting to submit inputs to a server

  if ( totalCost === 0 ) {
    comment.innerHTML = `<span class="red"> Your have not selected any food item yet.</span>`;
    total.innerHTML = ``;
  }
  else if ( totalCost > 0 ) {
    total.innerHTML = `<span class="green">Total Cost is </span><strong class="pricetag">$${totalCost}</strong>.`;

  }

}
