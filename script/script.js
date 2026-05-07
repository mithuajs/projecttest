let total = 0;

function add() {
  let p = document.getElementById("product").value;
  let q = document.getElementById("qty").value;
  let pr = document.getElementById("price").value;

  let t = q * pr;
  total += t;

  document.getElementById("list").innerHTML += `
    <tr>
      <td>${p}</td>
      <td>${t}</td>
    </tr>
  `;

  document.getElementById("total").innerText = total;
}

function pay() {
  let method = document.getElementById("method").value;

  fetch("http://localhost:5000/create-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: total,
      method: method
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);

    if (data.payment_url) {
      window.location.href = data.payment_url;
    } else {
      alert("Payment failed");
    }
  });
}