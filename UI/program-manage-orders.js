// Accept Orders Function
function acceptFunc(event) {

  // Get event targets Title Span
  let listItem = event.target.parentNode;
  let listItemTitle = event.target.parentNode.querySelector( `span` ).innerHTML;

  // Get the entry point of the Accepted Orders List
  let listEntryPoint = document.querySelector(`div.list-manager.accepted-orders ol`);

  // Create a newListItem
  let newListItem = document.createElement(`li`);
  newListItem.innerHTML = `<span>${listItemTitle}</span><button type="button" name="complete" onclick="completeFunc(event)">Complete</button>`; // Set HTML content of the newListItem

  // Appen newListItem at the listEntryPoint of Accepted orders
  listEntryPoint.append(newListItem);

  // Remove listItem from Incoming Orders
  listItem.remove();

}


// Decline Orders Function
function declineFunc(event) {
  let listItem = event.target.parentNode; // Get event targets Title Span
  listItem.remove(); // Remove listItem from Incoming Orders
}


// Complete Order Function
function completeFunc(event) {

  // Get event targets Title Span
  let listItem = event.target.parentNode;
  let listItemTitle = event.target.parentNode.querySelector( `span` ).innerHTML;


let listEntryPoint = document.querySelector(`div.list-manager.completed-orders ol`);
let ListFirstChild = listEntryPoint.firstElementChild;

// Create a newListItem
let newListItem = document.createElement(`li`);
newListItem.innerHTML = `<span>${listItemTitle}</span>`; // Set HTML content of the newListItem

// Appen newListItem at the listEntryPoint of Accepted orders
listEntryPoint.insertBefore(newListItem,ListFirstChild );

// Remove listItem from Incoming Orders
listItem.remove();

}
