import fetch from "node-fetch";

async function getUsersData() {
  const response = await fetch("https://fakestoreapi.com/users");
  const usersData = await response.json();
  console.log("Users:");
  //console.log(usersData);
  return usersData;
}

async function getCartsData() {
  const response = await fetch(
    "https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07"
  );
  const cartsData = await response.json();
  console.log("Carts:");
  //console.log(cartsData);
  return cartsData;
}

async function getProductsData() {
  const response = await fetch("https://fakestoreapi.com/products");
  const productsData = await response.json();
  console.log("Products:");
  //console.log(productsData);

  const productToPriceMap = new Map();

  for (const product of productsData) {
    productToPriceMap.set(product.id, product.price);
  }

  //console.log(productToPriceMap);
  return productsData;
}

async function getCategoriesTotalValue() {
  const products = await getProductsData();

  const categoriesValues = {};
  products.forEach((product) => {
    if (categoriesValues[product.category]) {
      categoriesValues[product.category] += product.price;
    } else {
      categoriesValues[product.category] = product.price;
    }
  });
  console.log(categoriesValues);
  return categoriesValues;
}

getUsersData();
getCartsData();
getProductsData();
getCategoriesTotalValue();
