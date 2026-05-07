
let total = 0;

/* ADD PRODUCT */
function addProduct() {

  let product = document.getElementById("product").value;
  let qty = parseInt(document.getElementById("qty").value);
  let price = parseInt(document.getElementById("price").value);

  if (!product || !qty || !price) {
    alert("সব তথ্য পূরণ করুন");
    return;
  }

  let itemTotal = qty * price;
  total += itemTotal;

  let row = `
    <tr class="border-t">
      <td class="p-2">${product}</td>
      <td class="p-2">${qty}</td>
      <td class="p-2">${price}</td>
      <td class="p-2">${itemTotal}</td>
      <td class="p-2 no-print">
        <button onclick="this.parentElement.parentElement.remove(); updateTotal(-${itemTotal})"
          class="bg-red-500 text-white px-2 py-1 rounded">
          Delete
        </button>
      </td>
    </tr>
  `;

  document.getElementById("list").innerHTML += row;
  document.getElementById("grandTotal").innerText = total;

  // clear input
  document.getElementById("product").value = "";
  document.getElementById("qty").value = "";
  document.getElementById("price").value = "";
}

/* UPDATE TOTAL */
function updateTotal(change) {
  total += change;
  document.getElementById("grandTotal").innerText = total;
}

/* PRINT */
function printBill() {
  window.print();
}

/* ENTER FLOW */
document.getElementById("product").addEventListener("keydown", function(e) {
  if (e.key === "Enter") document.getElementById("qty").focus();
});

document.getElementById("qty").addEventListener("keydown", function(e) {
  if (e.key === "Enter") document.getElementById("price").focus();
});

document.getElementById("price").addEventListener("keydown", function(e) {
  if (e.key === "Enter") addProduct();
});

