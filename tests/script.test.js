import { jest } from "@jest/globals";
import {
  getUsersData,
  getProductsData,
  getCartsData,
  getCategoriesTotalValue,
  getCartWithHighestValue,
  getFurthestUsers,
} from "../script";

jest.mock("node-fetch");
describe("Example API Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Test getUsersData function", async () => {
    const users = [{ id: 1, email: "john@gmail.com" }];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(users),
      })
    );
    const result = await getUsersData();
    //const findUser = result.find(({ id }) => id === testUser.id);
    expect(findUser.email).toEqual(testUser.email);
    expect(result).toEqual(users);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("https://fakestoreapi.com/users");
  });

  test("Test getProductsData function", async () => {
    const products = [{ id: 1, price: 10 }];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(products),
      })
    );
    const result = await getProductsData();
    expect(result).toEqual(products);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("https://fakestoreapi.com/products");
  });

  test("Test getCartsData function", async () => {
    const carts = [{ id: 1, userId: 1 }];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(carts),
      })
    );
    const result = await getCartsData();
    expect(result).toEqual(carts);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07"
    );
  });
});
