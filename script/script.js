let total = 0;
let isAdmin = false;

// ADMIN LOGIN
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";

// DEFAULT PRODUCTS
let products = [
  {
    name: "Rice",
    price: 80,
    discount: 70,
    image:
      "https://i.ibb.co/jk2jVvP/rice.jpg"
  },
  {
    name: "Oil",
    price: 200,
    discount: 180,
    image:
      "https://i.ibb.co/Q9L3M0Q/oil.jpg"
  },
  {
    name: "Sugar",
    price: 120,
    discount: 100,
    image:
      "https://i.ibb.co/F3xLKnJ/sugar.jpg"
  }
];

// SHOW REGISTER
function showRegister() {
  document.getElementById(
    "loginSection"
  ).classList.add("hidden");

  document.getElementById(
    "registerSection"
  ).classList.remove("hidden");
}

// SHOW LOGIN
function showLogin() {
  document.getElementById(
    "registerSection"
  ).classList.add("hidden");

  document.getElementById(
    "loginSection"
  ).classList.remove("hidden");
}

// REGISTER
window.registerUser = async function () {

  let name =
    document.getElementById(
      "regName"
    ).value;

  let phone =
    document.getElementById(
      "regPhone"
    ).value;

  let email =
    document.getElementById(
      "regEmail"
    ).value;

  let password =
    document.getElementById(
      "regPassword"
    ).value;

  let confirmPassword =
    document.getElementById(
      "regConfirmPassword"
    ).value;

  if (
    !name ||
    !phone ||
    !email ||
    !password
  ) {
    alert("সব তথ্য দিন");
    return;
  }

  if (
    password !== confirmPassword
  ) {
    alert(
      "Password match হয়নি"
    );
    return;
  }

  try {
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert(
      "Registration Successful"
    );

    showLogin();

  } catch (error) {
    alert(error.message);
  }
};

// LOGIN
window.loginUser = async function () {

  let email =
    document.getElementById(
      "loginEmail"
    ).value;

  let password =
    document.getElementById(
      "loginPassword"
    ).value;

  // ADMIN LOGIN
  if (
    email === ADMIN_EMAIL &&
    password ===
      ADMIN_PASSWORD
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

  document.getElementById(
    "loginSection"
  ).classList.add("hidden");

  document.getElementById(
    "registerSection"
  ).classList.add("hidden");

  document.getElementById(
    "dashboard"
  ).classList.remove("hidden");

  document.getElementById(
    "logoutBtn"
  ).classList.remove("hidden");

  if (isAdmin) {
    document.getElementById(
      "adminSection"
    ).classList.remove(
      "hidden"
    );
  }

  renderProducts();
}

// LOGOUT
window.logoutUser =
  async function () {

    try {
      await signOut(auth);
    } catch {}

    location.reload();
  };

// PRODUCT CARD RENDER
function renderProducts() {

  let container =
    document.getElementById(
      "productContainer"
    );

  container.innerHTML = "";

  products.forEach(
    (product) => {

      container.innerHTML += `
      
      <div class="card bg-base-100 shadow-xl">
      
      <figure>
      <img src="${product.image}"
      class="h-52 w-full object-cover"/>
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
      Discount:
      ${product.discount} BDT
      </p>

      <div class="flex items-center gap-3">

      <button
      onclick="decreaseQty(this)"
      class="btn btn-error btn-sm">
      -
      </button>

      <span class="qty">
      1
      </span>

      <button
      onclick="increaseQty(this)"
      class="btn btn-success btn-sm">
      +
      </button>

      </div>

      <button
      onclick="addToBill(
      '${product.name}',
      ${product.discount},
      this
      )"
      class="btn btn-primary mt-3">
      Add Product
      </button>

      </div>
      </div>
      `;
    }
  );
}

// QTY +
window.increaseQty =
  function (btn) {

    let qty =
      btn.parentElement.querySelector(
        ".qty"
      );

    qty.innerText =
      Number(
        qty.innerText
      ) + 1;
  };

// QTY -
window.decreaseQty =
  function (btn) {

    let qty =
      btn.parentElement.querySelector(
        ".qty"
      );

    if (
      Number(qty.innerText) >
      1
    ) {
      qty.innerText =
        Number(
          qty.innerText
        ) - 1;
    }
  };

// ADD BILL
window.addToBill =
  function (
    name,
    price,
    button
  ) {

    let qty =
      Number(
        button.parentElement.querySelector(
          ".qty"
        ).innerText
      );

    let itemTotal =
      qty * price;

    total += itemTotal;

    document.getElementById(
      "list"
    ).innerHTML += `
    
    <tr>
    <td>${name}</td>
    <td>${qty}</td>
    <td>${price}</td>
    <td>${itemTotal}</td>

    <td>
    <button
    class="btn btn-error btn-sm"
    onclick="deleteItem(
    this,
    ${itemTotal}
    )">
    Delete
    </button>
    </td>

    </tr>
    `;

    document.getElementById(
      "grandTotal"
    ).innerText =
      total;
  };

// DELETE ITEM
window.deleteItem =
  function (
    btn,
    amount
  ) {

    btn.parentElement
      .parentElement.remove();

    total -= amount;

    document.getElementById(
      "grandTotal"
    ).innerText =
      total;
  };

// ADMIN ADD PRODUCT
window.addAdminProduct =
  function () {

    let name =
      document.getElementById(
        "adminProductName"
      ).value;

    let price =
      document.getElementById(
        "adminPrice"
      ).value;

    let discount =
      document.getElementById(
        "adminDiscount"
      ).value;

    let image =
      document.getElementById(
        "adminImage"
      ).value;

    if (
      !name ||
      !price ||
      !discount ||
      !image
    ) {
      alert(
        "সব তথ্য দিন"
      );
      return;
    }

    products.push({
      name,
      price,
      discount,
      image
    });

    renderProducts();

    alert(
      "Product Added"
    );
  };