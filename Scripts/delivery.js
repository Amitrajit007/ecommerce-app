export const delivery = [
  {
    value: "1",
    shipping: 0,
  },
  {
    value: "2",
    shipping: 4.99,
  },
  {
    value: "3",
    shipping: 9.99,
  },
];
// selected array for adding the preference of Delivry amount along with their ids.
let selected = [];
// change the delivery date using function
export function updatedeliveryDate(date, radio, value) {
  // date is not formated raw today's date.
  const container = radio.closest(".cart-item-container");
  switch (value) {
    case "1":
      let deliveryDate1 = date.add(7, "day");
      let deleverydateFinal1 = deliveryDate1.format("dddd, MMMM D ");
      container.querySelector(
        ".deliveryDisplay"
      ).innerHTML = `${deleverydateFinal1}`;
      break;
    case "2":
      let deliveryDate2 = date.add(3, "day");
      let deleverydateFinal2 = deliveryDate2.format("dddd, MMMM D ");
      container.querySelector(
        ".deliveryDisplay"
      ).innerHTML = `${deleverydateFinal2}`;
      break;
    case "3":
      let deliveryDate3 = date.add(1, "day");
      let deleverydateFinal3 = deliveryDate3.format("dddd, MMMM D ");
      container.querySelector(
        ".deliveryDisplay"
      ).innerHTML = `${deleverydateFinal3}`;
      break;
  }
}
// change the shipping value using function
export function updateshippingPrice(id, value, date, handlingCharge) {
  let total = 0;
  let matchingSelection;
  delivery.forEach((d) => {
    if (d.value === value) {
      matchingSelection = d;
    }
  });
  // console.log(matchingSelection);
  let totalCharge = parseFloat(matchingSelection.shipping);
  let flag = selected.find((item) => item.id === id);
  if (flag) {
    flag.price = totalCharge;
  } else {
    selected.push({
      id: id,
      price: totalCharge,
    });
  }
  console.log(selected);
  selected.forEach((select) => {
    // console.log("selected value:", select.price);
    total += parseFloat(select.price);
    handlingCharge = total;
  });

  return handlingCharge;
}
