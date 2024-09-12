document.addEventListener("DOMContentLoaded", () => {
  const addToCartForm = document.getElementById("add-to-cart-form");
  const itemsSummary = document.getElementById("items-summary");
  const subtotalDisplay = document.getElementById("subtotal-display");
  const shippingFeeDisplay = document.getElementById("shipping-fee-display");
  const totalDisplay = document.getElementById("total-display");

  let cartItems = [];

  // Shipping fee lookup
  const shippingFees = {
    Anda: 350,
    Carmen: 150,
    Sagbayan: 110,
  };

  // Function to render cart items
  function renderCartItems() {
    itemsSummary.innerHTML = ""; // Clear the items summary
    cartItems.forEach((item, index) => {
      const itemRow = document.createElement("div");
      itemRow.classList.add("cart-item");

      // Checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("item-checkbox");
      checkbox.checked = item.checked;
      checkbox.addEventListener("change", () => {
        item.checked = checkbox.checked;
        calculateTotals();
      });

      // Item details
      const itemDetails = document.createElement("span");
      itemDetails.textContent = `${item.name} - ₱${item.price} x ${item.quantity}`;

      // Shipping info
      const shippingDetails = document.createElement("span");
      shippingDetails.textContent = `Shipping to: ${item.shippingDestination}`;

      // Edit and Delete buttons
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.classList.add("edit-btn");
      editButton.addEventListener("click", () => {
        editCartItem(index);
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-btn");
      deleteButton.addEventListener("click", () => {
        deleteCartItem(index);
      });

      // Append elements to itemRow
      itemRow.appendChild(checkbox);
      itemRow.appendChild(itemDetails);
      itemRow.appendChild(shippingDetails);
      itemRow.appendChild(editButton);
      itemRow.appendChild(deleteButton);

      // Add itemRow to items summary
      itemsSummary.appendChild(itemRow);
    });
  }

  // Function to add items to the cart
  addToCartForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const itemName = document.getElementById("item-name").value;
    const itemPrice = parseFloat(document.getElementById("item-price").value);
    const quantity = parseInt(document.getElementById("quantity").value);
    const shippingDestination =
      document.getElementById("shipping-options").value;

    const newItem = {
      name: itemName,
      price: itemPrice,
      quantity: quantity,
      shippingDestination: shippingDestination,
      shippingFee: shippingFees[shippingDestination],
      checked: false,
    };

    cartItems.push(newItem);
    renderCartItems();
    calculateTotals();
    addToCartForm.reset(); // Reset the form after adding
  });

  // Function to delete a cart item
  function deleteCartItem(index) {
    cartItems.splice(index, 1); // Remove the item from the cart
    renderCartItems();
    calculateTotals();
  }

  // Function to edit a cart item (simplified for now)
  function editCartItem(index) {
    const item = cartItems[index];
    document.getElementById("item-name").value = item.name;
    document.getElementById("item-price").value = item.price;
    document.getElementById("quantity").value = item.quantity;
    document.getElementById("shipping-options").value =
      item.shippingDestination;

    // Remove the item so it can be re-added after editing
    deleteCartItem(index);
  }

  // Function to calculate subtotal, shipping fee, and total
  function calculateTotals() {
    let subtotal = 0;
    let shippingFee = 0;

    cartItems.forEach((item) => {
      if (item.checked) {
        subtotal += item.price * item.quantity;
        shippingFee += item.shippingFee;
      }
    });

    const total = subtotal + shippingFee;

    subtotalDisplay.textContent = `Subtotal: ₱${subtotal}`;
    shippingFeeDisplay.textContent = `Shipping Fee: ₱${shippingFee}`;
    totalDisplay.textContent = `Total: ₱${total}`;
  }
});
