export let cart = [];
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

export function updateCart(cartQuantity, btn) {
  const displaycartCount = document.querySelector(".cart-quantity");
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
}
