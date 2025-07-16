import { cart, deleteItem } from "./cart.js";
import { products } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  delivery,
  updateshippingPrice,
  updatedeliveryDate,
} from "./delivery.js";
const CheckoutitemsCount = document.querySelector(".return-to-home-link");
// Doms
const Summery = document.querySelector(".payment-summary");
const cards = document.querySelector(".order-summary");
// global scope
let handlingCharge = JSON.parse(localStorage.getItem("shippingPrice")) || 0;
let itemCounter = 0;
let totalPrice = 0;
let TotalBeforetax = 0;
let taxAmount = 0;
let orderTotal = 0;
// functions
function displaySummery(
  itemCounter,
  totalPrice,
  handlingCharge,
  TotalBeforetax,
  taxAmount,
  orderTotal
) {
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
}

function calculateSummary(cart, handlingCharge) {
  let itemCounter = 0;
  let itemPrice = 0;

  cart.forEach((itemCart) => {
    itemCounter += itemCart.quantity;
    let matchingProduct = products.find((p) => p.id === itemCart.productId);
    if (matchingProduct) {
      itemPrice += matchingProduct.priceCents * itemCart.quantity;
    }
  });

  let totalPrice = parseFloat((itemPrice / 100).toFixed(2));
  let TotalBeforetax = parseFloat((handlingCharge + totalPrice).toFixed(2));
  let taxAmount = parseFloat((TotalBeforetax / 10).toFixed(2));
  let orderTotal = parseFloat((TotalBeforetax + taxAmount).toFixed(2));

  return {
    itemCounter,
    totalPrice,
    handlingCharge,
    TotalBeforetax,
    taxAmount,
    orderTotal,
  };
}

// delivery date
const date = dayjs();
let today = date.format("dddd, MMMM D ");
let deliveryDate1 = date.add(7, "day");
let deleverydateFinal1 = deliveryDate1.format("dddd, MMMM D ");
let deliveryDate2 = date.add(3, "day");
let deleverydateFinal2 = deliveryDate2.format("dddd, MMMM D ");
let deliveryDate3 = date.add(1, "day");
let deleverydateFinal3 = deliveryDate3.format("dddd, MMMM D ");

//updateing the shipping value using the delivery array (module)

function displayContent() {
  let itemPrice = 0;

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
    <div class="delivery-date">Delivery date: <span class="deliveryDisplay">${deleverydateFinal1}</span></div>

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
            name="${matchingProduct.id}"
            value="1"
          />
          <div>
            <div class="delivery-option-date">${deleverydateFinal1}</div>
            <div class="delivery-option-price">FREE Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <input
            type="radio"
            class="delivery-option-input"
            name="${matchingProduct.id}"
            value="2"
          />
          <div>
            <div class="delivery-option-date">${deleverydateFinal2}</div>
            <div class="delivery-option-price">$4.99 - Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <input
            type="radio"
            class="delivery-option-input"
            name="${matchingProduct.id}"
            value="3"
          />
          <div>
            <div class="delivery-option-date">${deleverydateFinal3}</div>
            <div class="delivery-option-price">$9.99 - Shipping</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  `;
  });
  // caluculating the summery
  const summary = calculateSummary(cart, handlingCharge);
  displaySummery(
    summary.itemCounter,
    summary.totalPrice,
    summary.handlingCharge,
    summary.TotalBeforetax,
    summary.taxAmount,
    summary.orderTotal
  );
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
const deliveryOption = document.querySelectorAll(".delivery-option-input");
deliveryOption.forEach((radio) => {
  radio.addEventListener("change", () => {
    let itemtargetId = radio.name;
    let itemtargetValue = radio.value;

    handlingCharge = updateshippingPrice(
      itemtargetId,
      itemtargetValue,
      date,
      handlingCharge
    );
    const summary = calculateSummary(cart, handlingCharge);
    displaySummery(
      summary.itemCounter,
      summary.totalPrice,
      summary.handlingCharge,
      summary.TotalBeforetax,
      summary.taxAmount,
      summary.orderTotal
    );
    localStorage.setItem(
      "shippingPrice",
      JSON.stringify(summary.handlingCharge)
    );
    updatedeliveryDate(date, radio, itemtargetValue);
  });
});
