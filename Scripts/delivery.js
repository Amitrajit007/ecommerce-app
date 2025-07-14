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

// change the shipping value using function

// change the delivery date using function
export function changedeliveryDate(id, value, date) {
  let matchingSelection;
  delivery.forEach((d) => {
    if (d.value === value) {
      matchingSelection = d;
    }
  });
  console.log(matchingSelection);
}
