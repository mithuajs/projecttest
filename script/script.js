let total = 0;
let isAdmin = false;
let products = [];

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "mithuajs721";

// SHOW REGISTER
window.showRegister = function () {
  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("registerSection").classList.remove("hidden");
};

// SHOW LOGIN
window.showLogin = function () {
  document.getElementById("registerSection").classList.add("hidden");
  document.getElementById("loginSection").classList.remove("hidden");
};

// REGISTER
window.registerUser = async function () {

  const name = document.getElementById("regName").value.trim();
  const phone = document.getElementById("regPhone").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;
  const confirmPassword =
    document.getElementById("regConfirmPassword").value;

  if (!name || !phone || !email || !password) {
    alert("সব তথ্য দিন");
    return;
  }

  if (password !== confirmPassword) {
    alert("Password match হয়নি");
    return;
  }

  try {
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Registration Successful");
    showLogin();

  } catch (error) {
    alert(error.message);
  }
};

// LOGIN
window.loginUser = async function () {

  const email =
    document.getElementById("loginEmail").value.trim();

  const password =
    document.getElementById("loginPassword").value;

  if (
    email === ADMIN_EMAIL &&
    password === ADMIN_PASSWORD
  ) {
    isAdmin = true;
    loginSuccess();
    return;
  }

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    isAdmin = false;
    loginSuccess();

  } catch (error) {
    alert(error.message);
  }
};

// LOGIN SUCCESS
function loginSuccess() {

  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("registerSection").classList.add("hidden");

  document.getElementById("dashboard").classList.remove("hidden");

  document.getElementById("logoutBtn").classList.remove("hidden");

  if (isAdmin) {
    document.getElementById("adminSection").classList.remove("hidden");
  }

  loadProducts();
}

// LOGOUT
window.logoutUser = async function () {

  try {
    await signOut(auth);
  } catch (e) {}

  location.reload();
};

// LOAD PRODUCTS REAL TIME
function loadProducts() {

  const productRef = collection(db, "products");

  onSnapshot(productRef, (snapshot) => {

    products = [];

    snapshot.forEach((doc) => {
      products.push(doc.data());
    });

    renderProducts();
  });
}

// PRODUCT RENDER
function renderProducts() {

  const container =
    document.getElementById("productContainer");

  container.innerHTML = "";

  products.forEach((product) => {

    container.innerHTML += 
      <div class="card bg-base-100 shadow-xl product-card animate-fade">

        <figure class="overflow-hidden">
          <img
            src="${product.image}"
            class="h-52 w-full object-cover"
          />
        </figure>

        <div class="card-body">

          <h2 class="card-title">
            ${product.name}
          </h2>

          <p>
            Price:
            <del>${product.price}</del>
          </p>

          <p class="font-bold text-green-600">
            Discount: ${product.discount} BDT
          </p>

          <div class="flex items-center gap-3">

            <button
              onclick="decreaseQty(this)"
              class="btn btn-error btn-sm">
              -
            </button>

            <span class="qty">1</span>

            <button
              onclick="increaseQty(this)"
              class="btn btn-success btn-sm">
              +
            </button>

          </div>

          <button
            onclick="addToBill('${product.name}', ${product.discount}, this)"
            class="btn btn-primary mt-3">
            Add Product
          </button>

        </div>

      </div>
    ;
  });
}

// QTY +
window.increaseQty = function (btn) {

  const qty =
    btn.parentElement.querySelector(".qty");

  qty.innerText = Number(qty.innerText) + 1;
};

// QTY -
window.decreaseQty = function (btn) {

  const qty =
    btn.parentElement.querySelector(".qty");

  if (Number(qty.innerText) > 1) {
    qty.innerText = Number(qty.innerText) - 1;
  }
};

// ADD BILL
window.addToBill = function (
  name,
  price,
  button
) {

  const qty = Number(
    button.parentElement.querySelector(".qty")
      .innerText
  );

  const itemTotal = qty * price;

  total += itemTotal;

  document.getElementById("list").innerHTML += 
    <tr>
      <td>${name}</td>
      <td>${qty}</td>
      <td>${price}</td>
      <td>${itemTotal}</td>
      <td class="no-print">
        <button
          class="btn btn-error btn-sm"
          onclick="deleteItem(this, ${itemTotal})">
          Delete
        </button>
      </td>
    </tr>;

  document.getElementById("grandTotal").innerText = total;
};

// DELETE ITEM
window.deleteItem = function (
  btn,
  amount
) {

  btn.closest("tr").remove();

  total -= amount;

  document.getElementById("grandTotal").innerText = total;
};

// ADMIN ADD PRODUCT
window.addAdminProduct = async function () {

  const name =
    document.getElementById("adminProductName").value.trim();

  const price =
    document.getElementById("adminPrice").value;

  const discount =
    document.getElementById("adminDiscount").value;

  const image =
    document.getElementById("adminImage").value.trim();

  if (!name || !price || !discount || !image) {
    alert("সব তথ্য দিন");
    return;
  }

  try {

    await addDoc(
      collection(db, "products"),
      {
        name,
        price: Number(price),
        discount: Number(discount),
        image
      }
    );

    document.getElementById("adminProductName").value = "";
    document.getElementById("adminPrice").value = "";
    document.getElementById("adminDiscount").value = "";
    document.getElementById("adminImage").value = "";

    alert("Product Added");

  } catch (error) {
    alert(error.message);
  }
};
