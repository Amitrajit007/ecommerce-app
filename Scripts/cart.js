export let cart = JSON.parse(localStorage.getItem("cart")) || [];
// variables
export function addtoCart(btn) {
  const productId = btn.dataset.productId;
  const productContainer = btn.closest(".product-container");
  const selected = productContainer.querySelector("select");
  const selectedQuantity = Number(selected.value);
  let inList;
  cart.forEach((value) => {
    if (value.productId === productId) {
      inList = value;
    }
  });
  if (inList) {
    inList.quantity += selectedQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: selectedQuantity,
    });
  }
}

export function updateCart(btn) {
  const displaycartCount = document.querySelector(".cart-quantity");
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  displaycartCount.innerHTML = cartQuantity;
  const displayAdded = btn
    .closest(".product-container")
    .querySelectorAll(".added-to-cart");
  displayAdded.forEach((added) => {
    added.classList.add("visableaddeddtoCart");
    setTimeout(() => {
      added.classList.remove("visableaddeddtoCart");
    }, 2 * 1000);
  });
  localStorage.setItem("cartQ", JSON.stringify(cartQuantity));
  // plz dont delete it again ;-)
  localStorage.setItem("cart", JSON.stringify(cart));
}

// deleting that specific item from the cart.

export function deleteItem(ID) {
  let index = cart.findIndex((CartItem) => CartItem.productId === ID);
  let selectedQuantity = cart[index].quantity;
  if (selectedQuantity === 1) {
    cart.splice(index, 1);
    console.log(cart);
  } else if (selectedQuantity > 1) {
    cart[index].quantity--;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}
