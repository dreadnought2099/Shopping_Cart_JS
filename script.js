document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".add-to-cart-container");
  const itemsSummary = document.getElementById("items-summary");
  const editBtn = document.getElementById("edit-btn");
  const deleteBtn = document.getElementById("delete-btn");
  const checkoutBtn = document.getElementById("checkout-btn");
  let cart = [];

  function updateCartSummary() {
    if (cart.length === 0) {
      itemsSummary.innerHTML = "<p>No items in cart.</p>";
      editBtn.disabled = true;
      deleteBtn.disabled = true;
      checkoutBtn.disabled = true;
      return;
    }

    itemsSummary.innerHTML = cart
      .map((item, index) => {
        return `
          <div>
            <input type="checkbox" id="item-${index}" data-index="${index}" />
            <label for="item-${index}">${item.name} - $${item.price.toFixed(
          2
        )} x ${item.quantity}</label>
          </div>
        `;
      })
      .join("");

    editBtn.disabled = false;
    deleteBtn.disabled = false;
    checkoutBtn.disabled = false;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const itemName = document.getElementById("item-name").value.trim();
    const itemPrice = parseFloat(document.getElementById("item-price").value);
    const itemQuantity = parseInt(document.getElementById("quantity").value);

    if (itemName && !isNaN(itemPrice) && !isNaN(itemQuantity)) {
      cart.push({ name: itemName, price: itemPrice, quantity: itemQuantity });
      form.reset();
      updateCartSummary();
    } else {
      alert("Please enter valid item details.");
    }
  });

  // editBtn.addEventListener("click", () => {
  //   alert("Edit functionality is not implemented yet.");
  // });

  deleteBtn.addEventListener("click", () => {
    if (cart.length > 0) {
      cart = cart.filter(
        (_, index) => !document.getElementById(`item-${index}`).checked
      );
      updateCartSummary();
    }
  });

  checkoutBtn.addEventListener("click", () => {
    const selectedItems = Array.from(
      document.querySelectorAll('#items-summary input[type="checkbox"]:checked')
    );

    if (selectedItems.length > 0) {
      alert(
        "Checked out items:\n" +
          selectedItems
            .map((checkbox) => {
              const index = checkbox.dataset.index;
              return `${cart[index].name} - $${cart[index].price.toFixed(
                2
              )} x ${cart[index].quantity}`;
            })
            .join("\n")
      );

      cart = cart.filter(
        (_, index) =>
          !selectedItems.some(
            (checkbox) => checkbox.dataset.index === index.toString()
          )
      );
      updateCartSummary();
    } else {
      alert("No items selected for checkout.");
    }
  });
});
