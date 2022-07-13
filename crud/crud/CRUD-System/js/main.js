var productName = document.getElementById("student-name"),
    phoneNumber = document.getElementById("phone-number"),
    ageNumber = document.getElementById("age-number"),
    city = document.getElementById("city"),
    addBtn = document.getElementById("add-btn"),
    emptyAlert = document.getElementById("empty-input-alert"),
    inputs = document.getElementsByClassName("form-control"),
    searchText = document.getElementById("search-text"),
    displayTableHref = document.getElementById("display-table-href"),
    PNameAlert = document.getElementById("PNameAlert"),
    PAgeAlert = document.getElementById("PAgeAlert"),
    PPhoneAlert = document.getElementById("PPhoneAlert"),
    PCityAlert = document.getElementById("PCity-Alert"),
    logOutBtn = document.getElementById("logOutBtn"),
    productTable = [],
    currentIndex;


//Update Table After Refresh -- from storage:
if (localStorage.getItem("ProductsList") == null) {

  productTable = [];

} else {
  
  productTable = JSON.parse(localStorage.getItem("ProductsList"));
  displayProduct();
};


//Add New Product Function:
addBtn.onclick = function () {

  if(
    productName.value == "" || 
    phoneNumber.value == "" || 
    ageNumber.value == "" || 
    city.value == ""
    ) {

    emptyAlert.innerHTML = "Please Fill In Required Info and Try Again!";
    displayTableHref.removeAttribute("href");

  } else if(addBtn.innerHTML == "Add Product") {
      
        addProduct();
        displayTableHref.setAttribute("href", "#display-table-href");
        emptyAlert.innerHTML = "";

  } else {
        
          submitEditProduct(currentIndex);
          displayTableHref.setAttribute("href", "#display-table-href");
          emptyAlert.innerHTML = "";
       }

  localStorage.setItem("ProductsList", JSON.stringify(productTable));
  displayProduct();
  resetForm();
};


//Add Product to Array:
function addProduct() {

  if(
    validateProductName() == true &&
    validatephoneNumber() == true &&
    validateageNumber() == true &&
    validatecity() == true
  ) {

    var product = {

      name: productName.value,
      category: phoneNumber.value,
      age: ageNumber.value,
      description: city.value,
    };

    productTable.push(product);
  }
};


//Display Products Table:
function displayProduct() {
  var newProduct = "";

  for (var i = 0; i < productTable.length; i++) {
    newProduct += `<tr>
                    <td>${i}</td>
                    <td>${productTable[i].name}</td>
                    <td>${productTable[i].category}</td>
                    <td>${productTable[i].price}</td>
                    <td>${productTable[i].description}</td>
                    <td>
                        <a href="#" class="text-decoration-none">
                            <i onclick="updateProduct(${i})" class="fas fa-edit text-green"></i>
                        </a>
                    </td>
                    <td>
                        <i onclick="deleteProduct(${i})" class="fas fa-minus-circle text-danger"></i>
                    </td>
                </tr>`;
  }
  document.getElementById("table-body").innerHTML = newProduct;
};


//Reset Form After Adding
function resetForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }

  productName.classList.remove("is-invalid");
  productName.classList.remove("is-valid");
  PNameAlert.classList.remove("d-block");
  PNameAlert.classList.add("d-none");

  phoneNumber.classList.remove("is-valid");
  phoneNumber.classList.remove("is-invalid");
  PCategoryAlert.classList.remove("d-block");
  PCategoryAlert.classList.add("d-none");

  ageNumber.classList.remove("is-valid");
  ageNumber.classList.remove("is-invalid");
  PPriceAlert.classList.remove("d-block");
  PPriceAlert.classList.add("d-none");

  city.classList.remove("is-invalid");
  city.classList.remove("is-valid");
  PCityAlert.classList.remove("d-block");
  PCityAlert.classList.add("d-none");
};


//Delete Poduct From Table & Storage Function:
function deleteProduct(index) {

  productTable.splice(index, 1);
  localStorage.setItem("ProductsList", JSON.stringify(productTable));
  displayProduct();
};


//Edit Product Info Function:
function updateProduct(index) {
  addBtn.innerHTML = "Update Product";

  productName.value = productTable[index].name;
  phoneNumber.value = productTable[index].category;
  ageNumber.value = productTable[index].price;
  city.value = productTable[index].description;

  currentIndex = index;
};


//Submit Eidt Product Function:
function submitEditProduct(currentIndex) {
  addBtn.innerHTML = "Add Product";

  if(
    validateProductName() == true &&
    validatephoneNumber() == true &&
    validateageNumber() == true &&
    validatecity() == true
  ) {
    productTable[currentIndex].name = productName.value;
    productTable[currentIndex].category = phoneNumber.value;
    productTable[currentIndex].price = ageNumber.value;
    productTable[currentIndex].description = city.value;
  }
};


//Search Product Function:
searchText.onkeyup = function () {
  var selectedProduct = searchText.value;

  var newProduct = "";

  for (var i = 0; i < productTable.length; i++) {
    if (
      productTable[i].name.toLowerCase().includes(selectedProduct.toLowerCase())
    ) {
      newProduct += `<tr>
                    <td>${i}</td>
                    <td>${productTable[i].name}</td>
                    <td>${productTable[i].category}</td>
                    <td>${productTable[i].price}</td>
                    <td>${productTable[i].description}</td>
                    <td>
                        <a href="#" class="text-decoration-none">
                            <i onclick="updateProduct(${i})" class="fas fa-edit text-green mr-3"></i>
                        </a>
                    </td>
                    <td>
                        <i onclick="deleteProduct(${i})" class="fas fa-minus-circle text-danger"></i>
                    </td>
                </tr>`;
    }
  }
  document.getElementById("table-body").innerHTML = newProduct;
};



// ************** Validation ************

// 1 -- Validate Name Function:
function validateProductName() {

  var regex = /^[A-Z][a-z A-z 0-9]{2,}$/;

  if (regex.test(productName.value) == true) {
  
      productName.classList.add("is-valid");
      productName.classList.remove("is-invalid");

      PNameAlert.classList.add("d-none");
      PNameAlert.classList.remove("d-block");

      addBtn.disabled = false;

      return true; 

  } else {
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");

    PNameAlert.classList.add("d-block");
    PNameAlert.classList.remove("d-none");

    addBtn.disabled = true;

    return false;
  }
};

//Check Duplicated Product Name
function checkDuplicatedNames() {

  for(var i = 0; i < productTable.length; i++)
      {
        if(productName.value == productTable[i].name) 
        {
          productName.classList.add("is-invalid");
          productName.classList.remove("is-valid");

          PNameAlert.classList.add("d-block");
          PNameAlert.classList.remove("d-none");

          PNameAlert.innerHTML = "Product Name Already Exists";

          addBtn.disabled = true;
        } 
      }
};

productName.addEventListener("keyup", validateProductName);
productName.addEventListener("blur", checkDuplicatedNames);


// 2 -- Validate Product Category Function:
function validatephoneNumber() {

  var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  if (regex.test(phoneNumber.value) == true) {

    phoneNumber.classList.add("is-valid");
    phoneNumber.classList.remove("is-invalid");

    PPhoneAlert.classList.add("d-none");
    PPhoneAlert.classList.remove("d-block");

    addBtn.disabled = false;

    return true;

  } else {
    phoneNumber.classList.add("is-invalid");
    phoneNumber.classList.remove("is-valid");

    PPhoneAlert.classList.add("d-block");
    PPhoneAlert.classList.remove("d-none");

    addBtn.disabled = true;

    return false;
  }
};

phoneNumber.addEventListener("keyup", validatephoneNumber);


// 3 -- Validate Product Price Function:
function validateageNumber() {

  var regex = /^100|[1-9]?\d$/;

  if (regex.test(ageNumber.value) == true) {

    ageNumber.classList.add("is-valid");
    ageNumber.classList.remove("is-invalid");

    PAgeAlert.classList.add("d-none");
    PAgeAlert.classList.remove("d-block");

    addBtn.disabled = false;

    return true;

  } else {
    ageNumber.classList.add("is-invalid");
    ageNumber.classList.remove("is-valid");

    PAgeAlert.classList.add("d-block");
    PAgeAlert.classList.remove("d-none");

    addBtn.disabled = true;

    return false;
  }
};

ageNumber.addEventListener("keyup", validateageNumber);


// 4 -- Validate Product Description:
function validatecity() {

  var regex = /^[a-z A-Z 0-9]{3,}$/;

  if (regex.test(city.value) == true) {

    city.classList.add("is-valid");
    city.classList.remove("is-invalid");

    PCityAlert.classList.add("d-none");
    PCityAlert.classList.remove("d-block");

    addBtn.disabled = false;

    return true;

  } else {
    city.classList.add("is-invalid");
    city.classList.remove("is-valid");

    PCityAlert.classList.add("d-block");
    PCityAlert.classList.remove("d-none");

    addBtn.disabled = true;

    return false;
  }
};

city.addEventListener("keyup", validatecity);


function logOut() {
  logOutBtn.setAttribute("href", "/login.html");
  // welcomeMsg.innerHTML = ""; 
}


document.body.addEventListener("contextmenu",function(e){
e.preventDefault()
})


function disableBack() { window.history.forward(); }
setTimeout("disableBack()", 0);
window.onunload = function () { null };