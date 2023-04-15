async function logUsersData() {
  const response = await fetch("https://fakestoreapi.com/users");
  const usersData = await response.json();
  console.log("Users:");
  console.log(usersData);
}

async function logCartsData() {
  const response = await fetch(
    "https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07"
  );
  const cartsData = await response.json();
  console.log("Carts:");
  console.log(cartsData);
}

async function logProductsData() {
  const response = await fetch("https://fakestoreapi.com/products");
  const productsData = await response.json();
  console.log("Products:");
  console.log(productsData);
}

logUsersData();
logCartsData();
logProductsData();
