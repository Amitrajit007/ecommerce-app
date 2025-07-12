import { cart, deleteItem } from "./cart.js";
import { products } from "../data/products.js";
// display area have to be separated
const CheckoutitemsCount = document.querySelector(".return-to-home-link");
// Doms
const Summery = document.querySelector(".payment-summary");
const cards = document.querySelector(".order-summary");

// order Summery part.

function displayContent() {
  let itemCounter = 0;
  let itemPrice = 0;
  let handlingCharge = 4.99;
  cards.innerHTML = "";
  if (cart.length === 0) {
    CheckoutitemsCount.innerText = `0 items`;
    Summery.innerHTML = `
      <div class="payment-summary-title">Order Summary</div>
      <div class="payment-summary-row total-row">
        <div>Oops, nothing in the cart.</div>
      </div>
      <a href="amazon.html">
        <button class="place-order-button button-primary">Go shopping</button>
      </a>
    `;
    return;
  }
  cart.forEach((itemCart) => {
    itemCounter += itemCart.quantity;
    let matchingProduct = products.find((p) => p.id === itemCart.productId);
    //matching product fetching is done .
    if (matchingProduct) {
      let thisitemTotal = matchingProduct.priceCents * itemCart.quantity;
      itemPrice += thisitemTotal;
    }

    CheckoutitemsCount.innerText = `${itemCounter} items`;
    const price = matchingProduct.priceCents;
    cards.innerHTML += `

  <div class="cart-item-container">
    <div class="delivery-date">Delivery date: Tuesday, June 21</div>

    <div class="cart-item-details-grid">
      <img
        class="product-image"
        src="${matchingProduct.image}"
      />

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">$${(price / 100).toFixed(2)}</div>
        <div class="product-quantity">
          <span> Quantity: <span class="quantity-label">${
            itemCart.quantity
          }</span> </span>
          <span class="update-quantity-link link-primary "> Update </span>
          <span class="delete-quantity-link link-primary deleteLink" data-product-id ="${
            matchingProduct.id
          }"> Delete </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">Choose a delivery option:</div>
        <div class="delivery-option">
          <input
            type="radio"
            checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
          />
          <div>
            <div class="delivery-option-date">Tuesday, June 21</div>
            <div class="delivery-option-price">FREE Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <input
            type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
          />
          <div>
            <div class="delivery-option-date">Wednesday, June 15</div>
            <div class="delivery-option-price">$4.99 - Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <input
            type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
          />
          <div>
            <div class="delivery-option-date">Monday, June 13</div>
            <div class="delivery-option-price">$9.99 - Shipping</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  `;
  });
  // caluculating the summery
  let Price = (itemPrice / 100).toFixed(2);
  let totalPrice = parseFloat(Price);
  let TotalBeforetax = parseFloat((handlingCharge + totalPrice).toFixed(2));
  let taxAmount = parseFloat((TotalBeforetax / 10).toFixed(2));
  let orderTotal = parseFloat((TotalBeforetax + taxAmount).toFixed(2));
  Summery.innerHTML = `
        
  <div class="payment-summary-title">Order Summary</div>

  <div class="payment-summary-row">
    <div>Items (${itemCounter || 0}):</div>
    <div class="payment-summary-money">$${totalPrice}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${handlingCharge}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${TotalBeforetax}</div>
  </div>
  
  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${taxAmount}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${orderTotal}</div>
  </div>

  <button class="place-order-button button-primary">Place your order</button>

`;
  deleteButton();
}

displayContent();
// divide the summery and the conationer in their respective contaeiner putting them insde the main html file ---> done.
function deleteButton() {
  document.querySelectorAll(".deleteLink").forEach((link) => {
    link.addEventListener("click", () => {
      const orderId = link.dataset.productId;
      deleteItem(orderId);
      displayContent();
    });
  });
}
