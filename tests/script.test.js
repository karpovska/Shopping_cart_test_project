jest.unstable_mockModule("node-fetch", function () {
  return import("../__mocks__/node-fetch.js");
});

import { jest } from "@jest/globals";
import {
  getUsersData,
  getProductsData,
  getCategoriesTotalValue,
} from "../script";

describe("Example API Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Test getUsersData function", async () => {
    const testUser = {
      email: "john@gmail.com",
      username: "johnd",
    };
    const results = await getUsersData();
    const findUser = results.find(({ id }) => id === 1);

    expect(findUser.email).toEqual(testUser.email);
    // I have problems to mocking ESM modules and I can't test this code properly
    // expect(result).toEqual(users);
    // expect(fetch).toHaveBeenCalledTimes(1);
    // expect(fetch).toHaveBeenCalledWith("https://fakestoreapi.com/users");
  });

  test("Test getProductsData function", async () => {
    const testProduct = { id: 1, price: 109.95 };

    const results = await getProductsData();
    const foundProduct = results.find(
      (product) => product.id === testProduct.id
    );
    expect(foundProduct.price).toEqual(testProduct.price);
    // expect(fetch).toHaveBeenCalledTimes(1);
    // expect(fetch).toHaveBeenCalledWith("https://fakestoreapi.com/products");
  });

  test("Test getCategoriesTotalValue function", async () => {
    const testCategs = {
      jewelery: 883.98,
      electronics: 1994.99,
      "women's clothing": 157.72,
    };

    const result = await getCategoriesTotalValue();
    Object.keys(testCategs).forEach((key) => {
      expect(result).toHaveProperty(key);
      expect(result[key]).toEqual(testCategs[key]);
    });
  });
});
