let total = 0;
let isAdmin = false;

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";

let products = [];

/* UI */
function showRegister() {
    loginSection.classList.add("hidden");
    registerSection.classList.remove("hidden");
}

function showLogin() {
    registerSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
}

/* REGISTER */
window.registerUser = async function () {
    if (regPassword.value !== regConfirmPassword.value)
        return alert("Password mismatch");

    await createUserWithEmailAndPassword(auth, regEmail.value, regPassword.value);
    alert("Registered");
    showLogin();
};

/* LOGIN */
window.loginUser = async function () {
    if (loginEmail.value === ADMIN_EMAIL && loginPassword.value === ADMIN_PASSWORD) {
        isAdmin = true;
        return loginSuccess();
    }

    await signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value);
    isAdmin = false;
    loginSuccess();
};

/* LOGIN SUCCESS */
function loginSuccess() {
    loginSection.classList.add("hidden");
    registerSection.classList.add("hidden");
    dashboard.classList.remove("hidden");
    logoutBtn.classList.remove("hidden");

    if (isAdmin) {
        adminSection.classList.remove("hidden");
        adminDashboard.classList.remove("hidden");
        loadOrders();
    }

    renderProducts();
}

/* LOGOUT */
window.logoutUser = async function () {
    await signOut(auth);
    location.reload();
};

/* ADMIN ADD PRODUCT */
window.addAdminProduct = function () {
    products.push({
        name: adminProductName.value,
        price: adminPrice.value,
        discount: adminDiscount.value,
        image: adminImage.value
    });

    renderProducts();
};

/* RENDER PRODUCTS */
function renderProducts() {
    productContainer.innerHTML = "";

    products.forEach(p => {
        productContainer.innerHTML += `
      <div class="card bg-white shadow p-3">
        <img src="${p.image}" class="h-40 w-full object-cover"/>
        <h2 class="font-bold">${p.name}</h2>
        <p>${p.discount} BDT</p>

        <div>
          <button onclick="decreaseQty(this)">-</button>
          <span class="qty">1</span>
          <button onclick="increaseQty(this)">+</button>
        </div>

        <button onclick="addToBill('${p.name}',${p.discount},this)" class="btn btn-success btn-sm mt-2">
          Add
        </button>
      </div>
    `;
    });
}

/* QTY */
window.increaseQty = btn =>
    btn.parentElement.querySelector(".qty").innerText++;

window.decreaseQty = btn => {
    let q = btn.parentElement.querySelector(".qty");
    if (q.innerText > 1) q.innerText--;
};

/* BILL + FIRESTORE */
window.addToBill = async function (name, price, btn) {
    let qty = Number(btn.parentElement.querySelector(".qty").innerText);
    let itemTotal = qty * price;

    total += itemTotal;

    list.innerHTML += `
    <tr>
      <td>${name}</td>
      <td>${qty}</td>
      <td>${price}</td>
      <td>${itemTotal}</td>
    </tr>
  `;

    grandTotal.innerText = total;

    await addDoc(collection(db, "orders"), {
        name,
        qty,
        price,
        itemTotal,
        time: new Date()
    });
};

/* ADMIN DASHBOARD LOAD */
async function loadOrders() {
    let snap = await getDocs(collection(db, "orders"));

    adminOrders.innerHTML = "";

    snap.forEach(doc => {
        let d = doc.data();

        adminOrders.innerHTML += `
      <tr>
        <td>${d.name}</td>
        <td>${d.qty}</td>
        <td>${d.price}</td>
        <td>${d.itemTotal}</td>
        <td>${d.time}</td>
      </tr>
    `;
    });
}