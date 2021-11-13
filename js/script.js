//Signup
function signup() {
    if (window.location.href.indexOf("customers-signup") > -1) {
        var firstName = document.getElementById('fNameId').value;
        var lastName = document.getElementById('lNameId').value;
        var email = document.getElementById('emailId').value;
        var phone = document.getElementById('phoneId').value;
        var pwd = document.getElementById('pwdId').value;
        var confirmPwd = document.getElementById('cPwdId').value;
        var id = JSON.parse(localStorage.getItem('idUserKey') || '1');
        var user = {
            id: id,
            fName: firstName,
            lName: lastName,
            email: email,
            phone: phone,
            pwd: pwd,
            confirmPwd: confirmPwd,
            role: 'user'
        };
        var checkEmailUniq = emailExists(email);
        displayErrorMsg("errorEmailMsgId", !checkEmailUniq, 'Email Exist');
        var isMailValid = verifyEmailFormat(email);
        displayErrorMsg("errorEmailFormatMsgId", isMailValid, 'Email format not valid');
        if (!checkEmailUniq && isMailValid) {
            var storeTab = JSON.parse(localStorage.getItem('users') || '[]');
            // Insert user object into users array
            storeTab.push(user);
            // set users array into LS
            localStorage.setItem('users', JSON.stringify(storeTab));
            localStorage.setItem('idUserKey', id + 1);
        }
    } else {
        var firstName = document.getElementById('storeFirstNameId').value;
        var lastName = document.getElementById('storeLastNameId').value;
        var email = document.getElementById('storeEmailId').value;
        var phone = document.getElementById('storePhoneId').value;
        var pwd = document.getElementById('storePwdId').value;
        var confirmPwd = document.getElementById('storeConfirmPwdId').value;
        var address = document.getElementById('storeAddressId').value;
        var patentNumber = document.getElementById('patentNumberId').value;
        var companyName = document.getElementById('companyNameId').value;
        var fax = document.getElementById('faxId').value;
        var id = JSON.parse(localStorage.getItem('idUserKey') || '1');
        var user = {
            id: id,
            fName: firstName,
            lName: lastName,
            email: email,
            phone: phone,
            pwd: pwd,
            confirmPwd: confirmPwd,
            address: address,
            patentNumber: patentNumber,
            companyName: companyName,
            fax: fax,
            role: 'admin'
        };
        var checkPatentNumber = patentExists(patentNumber);
        displayErrorMsg("errorShopPatentMsgId", !checkPatentNumber, 'Patent Number Exist');
        var checkEmailUniq = emailExists(email);
        displayErrorMsg("errorShopEmailMsgId", !checkEmailUniq, 'Email Exist <br>');
        var isMailValid = verifyEmailFormat(email);
        displayErrorMsg("errorShopEmailFormatMsgId", isMailValid, 'Rung Email format');
        if (!checkEmailUniq && !checkPatentNumber && isMailValid) {
            var storeTab = JSON.parse(localStorage.getItem('users') || '[]');
            // Insert user object into users array
            storeTab.push(user);
            // set users array into LS
            localStorage.setItem('users', JSON.stringify(storeTab));
            localStorage.setItem('idUserKey', id + 1);
        }
    }

}
/*//customerSignup() to create an account for customer

function customerSignup() {
    var firstName = document.getElementById('fNameId').value;
    var lastName = document.getElementById('lNameId').value;
    var email = document.getElementById('emailId').value;
    var phone = document.getElementById('phoneId').value;
    var pwd = document.getElementById('pwdId').value;
    var confirmPwd = document.getElementById('cPwdId').value;
    var idUser = JSON.parse(localStorage.getItem('idUserKey') || '1');
    var user = {
        id: idUser,
        fName: firstName,
        lName: lastName,
        email: email,
        phone: phone,
        pwd: pwd,
        confirmPwd: confirmPwd,
        role: 'user'
    };
    var usersTab = JSON.parse(localStorage.getItem('users') || '[]');
    // Insert user object into users array
    usersTab.push(user);
    // set users array into LS
    localStorage.setItem('users', JSON.stringify(usersTab));
    localStorage.setItem('idUserKey', idUser + 1);
}
function adminSignup() {
    var firstName = document.getElementById('storeFirstNameId').value;
    var lastName = document.getElementById('storeLastNameId').value;
    var email = document.getElementById('storeEmailId').value;
    var phone = document.getElementById('storePhoneId').value;
    var pwd = document.getElementById('storePwdId').value;
    var confirmPwd = document.getElementById('storeConfirmPwdId').value;
    var address = document.getElementById('storeAddressId').value;
    var patentNumber = document.getElementById('patentNumberId').value;
    var companyName = document.getElementById('companyNameId').value;
    var fax = document.getElementById('faxId').value;
    var idStore = JSON.parse(localStorage.getItem('idUserKey') || '1');
    var store = {
        id: idStore,
        fName: firstName,
        lName: lastName,
        email: email,
        phone: phone,
        pwd: pwd,
        confirmPwd: confirmPwd,
        address: address,
        patentNumber: patentNumber,
        companyName: companyName,
        fax: fax,
        role: 'admin'
    };
    var storeTab = JSON.parse(localStorage.getItem('users') || '[]');
    // Insert user object into users array
    storeTab.push(store);
    // set users array into LS
    localStorage.setItem('users', JSON.stringify(storeTab));
    localStorage.setItem('idUserKey', idStore + 1);
}
*/
function login() {
    var email = document.getElementById('loginEmailId').value;
    var pwd = document.getElementById('loginPwdId').value;
    var findUser = verifyLogin(email, pwd);
    if (findUser) {
        if (findUser.role == 'admin') {
            localStorage.setItem('connectedUserId', JSON.stringify(findUser.id));
            location.replace('index.html');
        } else {
            localStorage.setItem('connectedUserId', JSON.stringify(findUser.id));
            location.replace('shop.html');
        }

    } else {
        document.getElementById('loginMsgError').innerHTML = 'Please check Email/pwd';
        document.getElementById('loginMsgError').style.color = 'red';
    }
}
//Search user (verify login)
function verifyLogin(email, pwd) {
    var usersTab = JSON.parse(localStorage.getItem('users') || '[]');
    var findUser;
    for (var i = 0; i < usersTab.length; i++) {
        if (email == usersTab[i].email && pwd == usersTab[i].pwd) {
            findUser = usersTab[i]; break;
        }
    }
    return findUser;
}
//Add product object to LS
function addProducts() {
    var name = document.getElementById('productNameId').value;
    var price = document.getElementById('productPriceId').value;
    var stock = document.getElementById('stockId').value;
    var category = document.getElementById('categoryId').value;
    var userId = localStorage.getItem('connectedUserId');

    var checkNameLength = checkProductName(name, 2);
    displayErrorMsg("productNameErrorMsg", checkNameLength, "Product Name must have at least 3 characters");
    var checkPrice = checkProduct(price, 0);
    displayErrorMsg("priceErrorMsg", checkPrice, "Price must be > 0");
    var checkStock = checkProduct(stock, 10);
    displayErrorMsg("stockErrorMsg", checkStock, "Stock must be > 10");

    var idProduct = JSON.parse(localStorage.getItem('productIdKey') || '1');
    if (checkNameLength && checkPrice && checkStock) {
        var product = {
            id: idProduct,
            name: name,
            price: price,
            stock: stock,
            category: category,
            idUser: userId,
            status: false
        }
        var productTab = JSON.parse(localStorage.getItem('products') || '[]');
        // Insert user object into users array
        productTab.push(product);
        // set users array into LS
        localStorage.setItem('products', JSON.stringify(productTab));
        localStorage.setItem('productIdKey', idProduct + 1);
    }
}
//Add Category object to LS
function addCategory() {
    var categoriesTab = JSON.parse(localStorage.getItem('categories') || '[]');
    var nameCategory = document.getElementById('addCategoryId').value;
    var connectedUserId = localStorage.getItem('connectedUserId');

    var idCategory = JSON.parse(localStorage.getItem('categoryIdKey') || '1');
    var newCategory = {
        id: idCategory,
        name: nameCategory,
        userId: connectedUserId
    };
    categoriesTab.push(newCategory);
    localStorage.setItem('categoryIdKey', idCategory + 1);
    localStorage.setItem('categories', JSON.stringify(categoriesTab));
}
//Generate options for selection categories for admin using categories list
function generateOption(selectCategoryOptionId) {
    var categoriesTab = JSON.parse(localStorage.getItem('categories') || '[]');
    var connectedUserId = localStorage.getItem('connectedUserId');
    var connectedUser = searchUserById(connectedUserId);
    var categories = ` <option selected value="">Select Category</option>`;
    for (let i = 0; i < categoriesTab.length; i++) {
        if (connectedUserId != null && connectedUser.role == "admin") {
            if (connectedUserId == categoriesTab[i].userId) {
                categories = categories + `<option value="${categoriesTab[i].name}">${categoriesTab[i].name}</option>`;
            }
        } else {
            categories = categories + `<option value="${categoriesTab[i].name}">${categoriesTab[i].name}</option>`;
        }
    }
    document.getElementById(selectCategoryOptionId).innerHTML = categories;
}
//Get objects from LS
function getObjectsFromLS(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}
//Get Connected User from LS
function getConnectedUser() {
    return localStorage.getItem('connectedUserId');
}
//display connected user products
function displayUserProducts() {
    var products = getObjectsFromLS('products');
    var userId = getConnectedUser();
    var myProducts = getUserProducts(userId, products);
    var productsDiv = ``;
    for (let i = 0; i < myProducts.length; i++) {
        if (products[i].status == true) {
            productsDiv = productsDiv + `
                        <div class="col-lg-4 col-md-6">
                    <div class="single-product">
                        <img class="img-fluid" src="img/product/p1.jpg" alt="">
                        <div class="product-details">
                            <h6>${myProducts[i].name}</h6>
                            <div class="price">
                                <h6>$${myProducts[i].price}</h6>
                                <h6 class="l-through">$${myProducts[i].price}</h6>
                            </div>
                            <div class="prd-bottom">

                                <div class="social-info">
                                    <span class="ti-bag"></span>
                                    <button onclick="goToDisplay(${myProducts[i].id})" class="btn hover-text">Display</button>
                                </div>
                                <div class="social-info">
                                    <span class="ti-bag"></span>
                                    <button onclick="deleteObject(${getObjectPositionById(myProducts[i].id, products)},'products')" class="hover-text">Delete</button>
                                </div>
                     
                            </div>
                        </div>
                    </div>
                </div>
        `
        }
    }
    document.getElementById('productsDivId').innerHTML = productsDiv;
}
//Get user product by ID user
function getUserProducts(idUser, productTab) {
    var productUser = [];
    for (let i = 0; i < productTab.length; i++) {
        if (productTab[i].idUser == idUser && productTab[i].status == true) {
            productUser.push(productTab[i]);
        }
    }
    return productUser;
}
//save selected product id in LS and redirect to single-product.html
function goToDisplay(idProduct) {
    localStorage.setItem('selectedProduct', idProduct);
    location.replace('single-product.html');
}
//search selected product by Id (selectedProduct saved in LS)
function searchProductById(id) {
    var products = getObjectsFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            var selectedProduct = products[i]; break;
        }
    }
    return selectedProduct;
}
// Display information of selected product in single-product.html
function productInformation() {
    var selectedProduct = localStorage.getItem("selectedProduct");
    var fondedProduct = searchProductById(selectedProduct);
    document.getElementById("prName").innerHTML = "Product Name: " + fondedProduct.name;
    document.getElementById("prPrice").innerHTML = fondedProduct.price + "$";
    document.getElementById("prCategory").innerHTML = fondedProduct.category;
    document.getElementById("prStock").innerHTML = "Stock Quantity: " + fondedProduct.stock;
}
//go To Login page
function goToLogin() {
    location.replace('login.html');
}
//Display price and stock in edit form
function editProduct() {
    var selectedProduct = localStorage.getItem("selectedProduct");
    var fondedProduct = searchProductById(selectedProduct);
    var formEditProduct = `
            <div class="row">
                <div class="col-lg-12">
                    <div class="login_form_inner">
                        <h3>Edit product</h3>
                        <div class="row login_form" id="contactForm">
                            <div class="col-md-12 form-group">
                                <label for="">Price</label>
                                <input type="text" class="form-control" id="editPriceId" value=${fondedProduct.price}>
                            </div>
                            <div class="col-md-12 form-group">
                                <label for="">Stock</label>
                                <input type="text" class="form-control" id="editQuantityId" value=${fondedProduct.stock}>
                            </div>
                            <div class="col-md-12 form-group">
                                <button type="submit" value="submit" class="btn btn-danger" onclick="validateEdit()">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `;
    document.getElementById('formEditProductId').innerHTML = formEditProduct;
}
//Save changes Product price && quantity
function validateEdit() {
    var newPrice = document.getElementById('editPriceId').value;
    var newQuantity = document.getElementById('editQuantityId').value;
    var selectedProduct = localStorage.getItem("selectedProduct");
    var products = getObjectsFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == selectedProduct) {
            products[i].price = newPrice;
            products[i].stock = newQuantity;
            break;
        }

    }
    localStorage.setItem('products', JSON.stringify(products));
    location.replace('products.html');
}
//Delete product from products table
function deleteProduct(pos) {
    var products = getObjectsFromLS('products');
    products.splice(pos, 1); //tab.slice(x,i): delete x element from tab from position i 
    localStorage.setItem('products', JSON.stringify(products));
    location.reload();
}
//Delete Objects from LS
function deleteObject(pos, key) {
    var objects = getObjectsFromLS(key);
    objects.splice(pos, 1); //tab.slice(x,i): delete x element from tab from position i
    localStorage.setItem(key, JSON.stringify(objects));
    location.reload();
}
//Delete Objects from LS
function deleteOrderAndUpdateStock(pos, key, idProduct, qty) {
    var objects = getObjectsFromLS(key);
    objects.splice(pos, 1); //tab.slice(x,i): delete x element from tab from position i
    localStorage.setItem(key, JSON.stringify(objects));
    //Update product stock
    var products = getObjectsFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == idProduct) {
            products[i].stock += Number(qty);
            break;
        }
    }
    localStorage.setItem('products', JSON.stringify(products));
    //Reload page
    location.reload();
}
//Generate and display all products Table (from LS) in super-admin.html
function generateProductsTable() {
    var allProducts = getObjectsFromLS('products');
    var allProductsTable = `
        <table class="table table-bordered text-center">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Category</th>
                    <th scope="col">Action</th>
                </tr>`;
    for (let i = 0; i < allProducts.length; i++) {
        if (allProducts[i].status) {
            allProductsTable = allProductsTable + `
         <tr>
            <td>${allProducts[i].name}</td>
            <td>${allProducts[i].price}</td>
            <td>${allProducts[i].stock}</td>
            <td>${allProducts[i].category}</td>
            <td>
            <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
            </td>
        </tr>`;
        } else {
            allProductsTable = allProductsTable + `
         <tr>
            <td>${allProducts[i].name}</td>
            <td>${allProducts[i].price}</td>
            <td>${allProducts[i].stock}</td>
            <td>${allProducts[i].category}</td>
            <td>
            <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
            <button id="confirmBtnId" class="btn btn-success" onclick="statusProduct(${allProducts[i].id})">Confirm</button>
            </td>
        </tr>`;
        }

    }
    allProductsTable = allProductsTable + `</table>`;
    document.getElementById('allProductId').innerHTML = allProductsTable;
}
//change product status(confirmed or not by super admin)
function statusProduct(id) {
    var products = getObjectsFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            products[i].status = true;
            break;
        }
    }
    localStorage.setItem('products', JSON.stringify(products));
}
//Generate and display all users table (from LS) in super-admin.html
function generateUserTable() {
    var allUsers = getObjectsFromLS('users');
    var allUsersTable = `
        <table class="table table-bordered text-center">
                <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Patent Number</th>
                    <th scope="col">Company Name</th>
                    <th scope="col">Fax</th>
                    <th scope="col">Address</th>
                </tr>`;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].role == 'admin') {
            allUsersTable = allUsersTable + `
         <tr>
            <td>${allUsers[i].fName}</td>
            <td>${allUsers[i].lName}</td>
            <td>${allUsers[i].email}</td>
            <td>${allUsers[i].phone}</td>
            <td>${allUsers[i].patentNumber}</td>
            <td>${allUsers[i].companyName}</td>
            <td>${allUsers[i].fax}</td>
            <td>${allUsers[i].address}</td>
        </tr>`;
        } else {
            allUsersTable = allUsersTable + `
         <tr>
            <td>${allUsers[i].fName}</td>
            <td>${allUsers[i].lName}</td>
            <td>${allUsers[i].email}</td>
            <td>${allUsers[i].phone}</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
        </tr>`;
        }

    }
    allUsersTable = allUsersTable + `</table>`;
    document.getElementById('allUsersId').innerHTML = allUsersTable;
}
//Display all products in shop.html
function displayAllProducts() {
    var products = getObjectsFromLS('products');
    var productsConfirmed = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].status == true) {
            productsConfirmed.push(products[i])
        }
    }
    var productsDiv = ``;
    for (let i = 0; i < productsConfirmed.length; i++) {
        productsDiv = productsDiv + `
                        <div class="col-lg-4 col-md-6">
                    <div class="single-product">
                        <img class="img-fluid" src="img/product/p1.jpg" alt="">
                        <div class="product-details">
                            <h6>${productsConfirmed[i].name}</h6>
                            <div class="price">
                                <h6>$${productsConfirmed[i].price}</h6>
                                <h6 class="l-through">$${productsConfirmed[i].price}</h6>
                            </div>
									<div class="prd-bottom">
										<div class="social-info">
											<span class="ti-bag"></span>
											<button class="btn hover-text" onclick="goToDisplay(${productsConfirmed[i].id})" style="background-color:#fff">Display</button>
										</div>
										<div class="social-info">
											<span class="lnr lnr-heart"></span>
											<button class="btn hover-text" style="background-color:#fff"onclick="addToWishlist(${productsConfirmed[i].id})">Wishlist</button>
										</div>
										<div class="social-info">
											<span class="lnr lnr-move"></span>
											<button class="btn hover-text" style="background-color:#fff">view more</button>
										</div>
							</div>
                        </div>
                    </div>
                </div>
        `
    }
    document.getElementById('displayAllProductId').innerHTML = productsDiv;
}
//search selected user by Id (userProduct saved in LS)
function searchUserById(id) {
    var users = getObjectsFromLS('users');
    var selectedUser;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            selectedUser = users[i];
            break;
        }
    }
    return selectedUser;
}
//Display products in single-product.html by user role (admin (edit product) or simple user(buy product))
function displayProductInfoByUserRole() {
    var connectedUserId = getConnectedUser();
    var productInfoBloc = ``;
    if (connectedUserId) {
        var fondedUser = searchUserById(connectedUserId);
        if (fondedUser.role == "admin") {
            productInfoBloc = `
        			<div class="s_product_text">
						<h3 id="prName"></h3>
						<h2 id="prPrice"></h2>
						<h2 id="prStock"></h2>
						<ul class="list">
							<li><a class="active" href="#" id="prCategory"><span>Category</span></a></li>
							<li><a href="#"><span>Availability</span> : In Stock</a></li>
						</ul>
						<p>Mill Oil is an innovative oil filled radiator with the most modern technology. If you are
							looking for
							something that can make your interior look awesome, and at the same time give you the
							pleasant warm feeling
							during the winter.</p>
						<button class="btn btn-warning" onclick="editProduct()">Edit product</button>
						<span id="formEditProductId"></span>
					</div>
        `;
        } else {
            productInfoBloc = `
        			<div class="s_product_text">
						<h3 id="prName"></h3>
						<h2 id="prPrice"></h2>
						<h2 id="prStock"></h2>
						<ul class="list">
							<li><a class="active" href="#" id="prCategory"><span>Category</span></a></li>
							<li><a href="#"><span>Availability</span> : In Stock</a></li>
						</ul>
                        <input type="number" class="form-control" placeholder="Insert Quantity" id="reservedQtyId">
                        <span id="quantityErrorMsgId"></span>
                        <button class="mt-3 btn btn-warning" onclick="reserveProduct()">Reserve Quantity</button>
						<p>Mill Oil is an innovative oil filled radiator with the most modern technology. If you are
							looking for
							something that can make your interior look awesome, and at the same time give you the
							pleasant warm feeling
							during the winter.</p>
					</div>
        `;
        }
    } else {
        productInfoBloc = `
        			<div class="s_product_text">
						<h3 id="prName"></h3>
						<h2 id="prPrice"></h2>
						<h2 id="prStock"></h2>
						<ul class="list">
							<li><a class="active" href="#" id="prCategory"><span>Category</span></a></li>
							<li><a href="#"><span>Availability</span> : In Stock</a></li>
						</ul>
                        <input type="number" class="form-control" placeholder="Insert Quantity" id="reservedQtyId">
                        <span id="quantityErrorMsgId"></span>
                        <button class="mt-3 btn btn-warning" onclick="goToLogin()">Login</button>
						<p>Mill Oil is an innovative oil filled radiator with the most modern technology. If you are
							looking for
							something that can make your interior look awesome, and at the same time give you the
							pleasant warm feeling
							during the winter.</p>
					</div>
        `;
    }

    document.getElementById('productInfo').innerHTML = productInfoBloc;
}
//reserveProduct create orders object in LS and update product stock
function reserveProduct() {
    var qty = document.getElementById('reservedQtyId').value;
    var selectedProductId = localStorage.getItem("selectedProduct");
    var selectedProduct = searchProductById(selectedProductId);
    var id = JSON.parse(localStorage.getItem('idOrderKey') || '1');
    if (qty > selectedProduct.stock) {
        displayErrorMsg("quantityErrorMsgId", (qty > selectedProduct.stock), "Quantity must be less than stock");
    } else {
        var orderProduct = {
            id: id,
            idUser: getConnectedUser(),
            qty: qty,
            idProduct: selectedProductId,
            status: false
        };
        var orderTab = JSON.parse(localStorage.getItem('orderList') || '[]');
        // Insert order object into orders array
        orderTab.push(orderProduct);
        // set order array into LS
        localStorage.setItem('orderList', JSON.stringify(orderTab));
        localStorage.setItem('idOrderKey', id + 1);
    }
    //Update product Stock
    updateStock(selectedProductId, qty);
    location.reload();
}
//Update product Stock
function updateStock(productId, qty) {
    var products = getObjectsFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == productId) {
            products[i].stock = products[i].stock - qty;
            break
        }
    }
    localStorage.setItem('products', JSON.stringify(products));
}
//Get order position in orderList by id
function getObjectPositionById(id, tab) {
    var pos;
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].id == id) {
            pos = i; break;
        }
    }
    return pos;
}
//Function that display all user order in basket page
function basket() {
    var orders = getObjectsFromLS('orderList');
    var connectedUserId = getConnectedUser();
    var myOrders = [];
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].idUser == connectedUserId) {
            myOrders.push(orders[i]);
        }
    }
    var userBasket = ``;
    if (myOrders.length == 0) {
        userBasket = `<h2 class="text-center">No reserved Product</h2>`;
    } else {
        var totalPrice = 0;
        userBasket = `
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>`
        for (let i = 0; i < myOrders.length; i++) {
            var selectedProduct = searchProductById(myOrders[i].idProduct);
            userBasket = userBasket + `<tbody>
                            <tr>
                                <td>
                                    <div class="media">
                                        <div class="d-flex">
                                            <img src="img/cart.jpg" alt="">
                                        </div>
                                        <div class="media-body">
                                            <p>${selectedProduct.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h5>${selectedProduct.price}</h5>
                                </td>
                                <td>
                                    <h5>${myOrders[i].qty}</h5>
                                </td>
                                <td>
                                    <h5>${selectedProduct.price * myOrders[i].qty}</h5>
                                </td>`
            if (myOrders[i].status == true) {
                userBasket = userBasket + `<td>
                                        Your order is confirmed
                                        </td></tr >`
            } else {
                userBasket = userBasket + `<td>
                                        <button class="btn btn-danger" onclick="deleteOrderAndUpdateStock(${getObjectPositionById(myOrders[i].id, orders)}, 'orderList',${myOrders[i].idProduct},${myOrders[i].qty})">Delete</button>
                                        </td></tr >`
            }
            totalPrice = totalPrice + (selectedProduct.price * myOrders[i].qty);
        }

        userBasket = userBasket + ` <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <h5>Subtotal</h5>
                                </td>
                                <td>
                                    <h5>$ ${totalPrice}</h5>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <h5>Shipping</h5>
                                </td>
                                <td>
                                    ${shippingPrice(totalPrice)}
                                </td>
                            </tr><tr>
                                <td></td>
                                <td></td>
                                <td>
                                    <button class="btn primary-btn">Proceed to checkout</button>
                                </td>
                                <td></td>
                                <td></td>

                            </tr>
                        </tbody>
                    </table>`
    }
    document.getElementById('basketTable').innerHTML = userBasket;
}
//Delete order from basket page
function deleteOrder(pos, userOrder) {
    userOrder.splice(pos, 1); //tab.slice(x,i): delete x element from tab from position i
    localStorage.setItem('products', JSON.stringify(products));
    location.reload();
}
//shippingPrice function that return free if price>=300 else return 7$
function shippingPrice(price) {
    return (price >= 300) ? "Free" : "7$";
}
//Get and display Connected User Information from LS
function getUserInformation() {
    var connectedUserId = getConnectedUser();
    var fondedUser = searchUserById(connectedUserId);
    var displayUserInfo = `
                           <div class="row login_form" id="contactForm">
                            <div class="col-md-12 form-group">
                                <input type="text" class="form-control" disabled id="editFirstNameId" placeholder="First Name" value="${fondedUser.fName}">
                            </div>
                            <div class="col-md-12 form-group">
                                <input type="text" class="form-control" disabled id="editLastNameId" placeholder="Last Name" value="${fondedUser.lName}">
                            </div>
                            <div class="col-md-12 form-group">
                                <input type="text" class="form-control" id="editEmailId" placeholder="Email" value="${fondedUser.email}">
                            </div>
                            <div class="col-md-12 form-group">
                                <input type="text" class="form-control" id="editTelId" placeholder="Tel" value="${fondedUser.phone}">
                            </div>
                            <div class="col-md-12 form-group">
                                <button type="submit" value="submit" class="primary-btn" onclick="editProfile()">Save</button>
                            </div>
                        </div>
    `;
    document.getElementById('userInfo').innerHTML = displayUserInfo;
}
//Edit connected user profile
function editProfile() {
    var newEmail = document.getElementById('editEmailId').value;
    var newPhone = document.getElementById('editTelId').value;
    var connectedUserId = getConnectedUser();
    //var fondedUser = searchUserById(connectedUserId);
    var users = getObjectsFromLS("users");
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == connectedUserId) {
            users[i].email = newEmail;
            users[i].phone = newPhone;
            break;
        }
    }
    localStorage.setItem('users', JSON.stringify(users));
    location.reload();
}
//Logout Function (delete connectedUserId)
function logout() {
    localStorage.removeItem('connectedUserId');
    location.replace('login.html');
}
//Display header according to user role
function headerByUserId(spanId) {
    var connectedUserId = getConnectedUser();
    var userWishList = getWishlistUser();
    var headerUser = ``;
    if (connectedUserId) {
        var connectedUser = searchUserById(connectedUserId);
        if (connectedUser.role == 'admin') {
            headerUser = `
        <header class="header_area sticky-header">
		<div class="main_menu">
			<nav class="navbar navbar-expand-lg navbar-light main_box">
				<div class="container">
					<!-- Brand and toggle get grouped for better mobile display -->
					<a class="navbar-brand logo_h" href="index.html"><img src="img/logo.png" alt=""></a>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
					 aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<!-- Collect the nav links, forms, and other content for toggling -->
					<div class="collapse navbar-collapse offset" id="navbarSupportedContent">
						<ul class="nav navbar-nav menu_nav ml-auto">
                            <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
							<li class="nav-item"><a class="nav-link" href="profile.html">Welcome ${connectedUser.fName} ${connectedUser.lName}</a></li>
                            <li class="nav-item"><a class="nav-link" href="orders.html">Orders</a></li>
                            <li class="nav-item submenu dropdown">
								<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
								 aria-expanded="false">Products</a>
								    <ul class="dropdown-menu">
                                        <li class="nav-item"><a class="nav-link" href="products.html">My Products</a></li>
							            <li class="nav-item"><a class="nav-link" href="add-product.html">Add products</a></li>
							            <li class="nav-item"><a class="nav-link" href="add-categorie.html">Add categories</a></li>
                                    </ul>
                                </li>
							<li class="nav-item"><a class="nav-link" href="search.html">Search</a></li>
							<li class="nav-item"><a class="nav-link" href="" onclick="logout()">Logout</a></li>
						</ul>
						<ul class="nav navbar-nav navbar-right">
							<li class="nav-item"><a href="cart.html" class="cart"><span class="ti-bag"></span></a></li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	</header>        
        `;
        } else {
            headerUser = `
        <header class="header_area sticky-header">
		<div class="main_menu">
			<nav class="navbar navbar-expand-lg navbar-light main_box">
				<div class="container">
					<!-- Brand and toggle get grouped for better mobile display -->
					<a class="navbar-brand logo_h" href="index.html"><img src="img/logo.png" alt=""></a>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
					 aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<!-- Collect the nav links, forms, and other content for toggling -->
					<div class="collapse navbar-collapse offset" id="navbarSupportedContent">
						<ul class="nav navbar-nav menu_nav ml-auto">
                            <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
							<li class="nav-item"><a class="nav-link" href="profile.html">Welcome ${connectedUser.fName} ${connectedUser.lName}</a></li>
                            <li class="nav-item"><a class="nav-link" href="shop.html">Products</a></li>
                            
                            <li class="nav-item"><a class="nav-link" href="wishlist.html">Wishlist (${userWishList.length})</a></li>
                            <li class="nav-item"><a class="nav-link" href="search.html">Search</a></li>
                            <li class="nav-item"><a class="nav-link" href="" onclick="logout()">Logout</a></li>
						</ul>
						<ul class="nav navbar-nav navbar-right">
							<li class="nav-item"><a href="cart.html" class="cart"><span class="ti-bag"> (${getUserOrders()})</span></a></li>
							</ul>
					</div>
				</div>
			</nav>
		</div>
	</header>        
        `;
        }
    } else {
        headerUser = `
        <header class="header_area sticky-header">
		<div class="main_menu">
			<nav class="navbar navbar-expand-lg navbar-light main_box">
				<div class="container">
					<!-- Brand and toggle get grouped for better mobile display -->
					<a class="navbar-brand logo_h" href="index.html"><img src="img/logo.png" alt=""></a>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
					 aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<!-- Collect the nav links, forms, and other content for toggling -->
					<div class="collapse navbar-collapse offset" id="navbarSupportedContent">
						<ul class="nav navbar-nav menu_nav ml-auto">
                        <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="shop.html">Products</a></li>
							<li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
							<li class="nav-item submenu dropdown">
								<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
								 aria-expanded="false">SignUp</a>
								<ul class="dropdown-menu">
									<li class="nav-item"><a class="nav-link" href="store-signup.html">Admin</a></li>
									<li class="nav-item"><a class="nav-link" href="customers-signup.html">User</a></li>
								</ul>
							</li>
                            	<li class="nav-item submenu dropdown">
								<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button"
									aria-haspopup="true" aria-expanded="false">Blog</a>
								<ul class="dropdown-menu">
									<li class="nav-item"><a class="nav-link" href="blog.html">Blog</a></li>
									<li class="nav-item"><a class="nav-link" href="single-blog.html">Blog Details</a>
									</li>
								</ul>
							</li>
							<li class="nav-item"><a class="nav-link" href="search.html">Search</a></li>
						</ul>
						<ul class="nav navbar-nav navbar-right">
							<li class="nav-item"><a href="login.html" class="cart Click-here"><span class="ti-bag"></span></a></li>
							</ul>
					</div>
				</div>
			</nav>
		</div>
	</header>        
        `;
    }
    document.getElementById(spanId).innerHTML = headerUser;
}
//Search Product by name and category
function searchProduct() {
    var products = getObjectsFromLS('products');
    var prName = document.getElementById('searchPrByNameId').value;
    var prCategory = document.getElementById('searchPrByCategoryId').value;
    var searchedProduct = [];
    var productsDiv = ``;
    if (prName != '' && prCategory != '') {
        for (let i = 0; i < products.length; i++) {
            if (products[i].name == prName && products[i].category == prCategory && products[i].status) {
                searchedProduct.push(products[i]);
            }
        }
    } else if (prName == '' && prCategory != '') {
        for (let i = 0; i < products.length; i++) {
            if (products[i].category == prCategory && products[i].status) {
                searchedProduct.push(products[i]);
            }
        }
    } else if (prName != '' && prCategory == '') {
        for (let i = 0; i < products.length; i++) {
            if (products[i].name == prName && products[i].status) {
                searchedProduct.push(products[i]);
            }
        }
    } else {
        for (let i = 0; i < products.length; i++) {
            if (products[i].status) {
                searchedProduct.push(products[i]);
            }
        }
    }

    for (let i = 0; i < searchedProduct.length; i++) {
        productsDiv = productsDiv + `
                        <div class="col-lg-4 col-md-6">
                    <div class="single-product">
                        <img class="img-fluid" src="img/product/p1.jpg" alt="">
                        <div class="product-details">
                            <h6>${searchedProduct[i].name}</h6>
                            <div class="price">
                                <h6>$${searchedProduct[i].price}</h6>
                                <h6 class="l-through">$${searchedProduct[i].price}</h6>
                            </div>
                            <div class="prd-bottom">

                                <div class="social-info">
                                    <span class="ti-bag"></span>
                                    <button onclick="goToDisplay(${searchedProduct[i].id})" class="btn hover-text">Display</button>
                                </div>
                                <div class="social-info">
                                    <span class="ti-bag"></span>
                                    <button onclick="deleteProduct(${i})" class="hover-text">Delete</button>
                                </div>
                     
                            </div>
                        </div>
                    </div>
                </div>
        `
    }
    document.getElementById('resultOfSearchedProduct').innerHTML = productsDiv;
}
//Add To Wishlist
function addToWishlist(idPr) {
    var wishlist = getObjectsFromLS('wishlist');
    var connectedUserId = getConnectedUser();
    var id = JSON.parse(localStorage.getItem('idWishlistKey') || '1');
    var prWishlist = {
        id: id,
        idUser: connectedUserId,
        idProduct: idPr
    }
    wishlist.push(prWishlist);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    localStorage.setItem('idWishlistKey', id + 1);
    location.replace('wishList.html');

}
//Return wishlist table of connected user
function getWishlistUser() {
    var wishlistTab = getObjectsFromLS('wishlist');
    var connectedUserId = getConnectedUser();
    var myWishlist = [];
    for (let i = 0; i < wishlistTab.length; i++) {
        if (wishlistTab[i].idUser == connectedUserId) {
            myWishlist.push(wishlistTab[i])
        }
    }
    return myWishlist;
}
//Display wishlist
function displayUserWishlist() {
    var wishlistTab = getObjectsFromLS('wishlist');
    var myWishlist = getWishlistUser();
    var wishlistTr = '';
    if (myWishlist.length == 0) {
        wishlistTr = ` <h3 class="text-center">Wishlist is Empty</h3>`
    } else {
        wishlistTr = `<table class="table table-bordered text-center">
                <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product Price</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Category</th>
                    <th scope="col">Action</th>
                </tr>`;
        for (let i = 0; i < myWishlist.length; i++) {
            var wishlist = myWishlist[i];
            var product = searchProductById(wishlist.idProduct);
            wishlistTr = wishlistTr + `
         <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.category}</td>
            <td>
            <button class="btn btn-danger" onclick="deleteObject(${getObjectPositionById(wishlist.id, wishlistTab)},'wishlist')">Delete</button>
            </td>
        </tr>`;
        }
        wishlistTr = wishlistTr + `</table>`;
    }
    document.getElementById('wishlistDiv').innerHTML = wishlistTr;
}
//Display Orders (only connected Admin)
function displayOrder() {
    var orders = getObjectsFromLS('orderList');
    var connectedUserId = getConnectedUser();
    var displayOrdersDiv = `
    <table class="table table-bordered text-center" >
            <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Unite Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Total TTC Price</th>
                    <th scope="col">Action</th>
            </tr>`;
    var adminOrders = 0;
    for (let i = 0; i < orders.length; i++) {
        var product = searchProductById(orders[i].idProduct);
        if (product.idUser == connectedUserId) {
            var user = searchUserById(orders[i].idUser);
            displayOrdersDiv = displayOrdersDiv + `
         <tr>
            <td>${user.fName}</td>
            <td>${user.lName}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${orders[i].qty}</td>
            <td>${orders[i].qty * product.price}</td>
            <td>${orders[i].qty * product.price * 1.19}</td>`
            if (!orders[i].status) {
                displayOrdersDiv = displayOrdersDiv + `<td>
                <button class="btn btn-success" onclick="confirmOrder(${orders[i].id})">Confirm</button>
                </td>
            </tr>`;
            } else {
                displayOrdersDiv = displayOrdersDiv + `<td> Product Confirmed </td >
            </tr>`;
            }
            adminOrders += 1;
        }
    }
    if (adminOrders == 0) {
        displayOrdersDiv = `<h2>No Order Exist</h2>`;
    } else {
        displayOrdersDiv = displayOrdersDiv + `</table>`;
    }
    document.getElementById('displayOrdersDiv').innerHTML = displayOrdersDiv;
}
//Function that return connected user orders
function getUserOrders() {
    var userOrders = [];
    var orders = getObjectsFromLS('orderList');
    var connectedUserId = getConnectedUser();
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].idUser == connectedUserId) {
            userOrders.push(searchProductById(orders[i]));
        }
    }
    console.log(userOrders);
    return userOrders.length;
}
//Confirm user order by shop admin (orders[i].status=true)
function confirmOrder(id) {
    var orderList = getObjectsFromLS('orderList');
    for (let i = 0; i < orderList.length; i++) {
        if (orderList[i].id == id) {
            orderList[i].status = true;
        }
    }
    localStorage.setItem('orderList', JSON.stringify(orderList));
    location.reload();
}
//Display all products in table with checkbox for every row
function deleteMultiProducts() {
    var products = getObjectsFromLS('products');
    var productTab = '';
    productTab = `<table class="table table-bordered text-center">
                <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Action</th>
                </tr>`;
    for (let i = 0; i < products.length; i++) {
        var product = products[i];
        productTab = productTab + `
         <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td>
            <input type="checkbox" onclick="getCheckboxValue(this)" id="${product.id}" value="${i}">
            </td>
        </tr>`;
    }
    productTab = productTab + `</table>
    <button class="btn btn-danger" onclick="deleteSelectedProduct()">Delete</button>`;
    document.getElementById('displayAllProductsTab').innerHTML = productTab;
}
//Get id of checked product
var checkedElementTab = [];
function getCheckboxValue(index) {
    //var checkedElementTab = getObjectsFromLS('checkedElementTabKey');
    checkedElementTab.push(index.id);
    //localStorage.setItem('checkedElementTabKey', JSON.stringify(checkedElementTab));
    console.log(checkedElementTab);
}
//Delete selected product from LS
function deleteSelectedProduct() {
    var products = getObjectsFromLS('products');
    //var checkedElementTab = getObjectsFromLS('checkedElementTabKey');
    for (let i = 0; i < checkedElementTab.length; i++) {
        products.splice(getObjectPositionById(Number(checkedElementTab[i]), products), 1);
    }
    localStorage.setItem('products', JSON.stringify(products));
    location.reload();
}
//#region CHECK INPUT
//1-check uniqueness
function emailExists(email) {
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var userExists = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            userExists = true;
            break;
        }
    }
    return userExists;
}
function patentExists(patentNumber) {
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var nbrExists = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].patentNumber == patentNumber) {
            nbrExists = true;
            break;
        }
    }
    return nbrExists;
}
//2-check name length (>3) 
function checkProductName(name, nbr) {
    return (name.length > nbr);
}
//3-check price (>10) && stock (>0)
function checkProduct(name, nbr) {
    return (name > nbr);
}
//4-Check email format
function verifyEmailFormat(email) {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
}
//5-Display error message
function displayErrorMsg(id, condition, msg) {
    if (condition) {
        document.getElementById(id).innerHTML = "";
    } else {
        document.getElementById(id).innerHTML = msg;
        document.getElementById(id).style.color = 'red';
    }
}
//6-Compare
function compare(x, y) {
    return x < y;
}
//#endregion