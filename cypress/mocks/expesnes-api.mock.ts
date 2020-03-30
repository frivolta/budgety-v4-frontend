import { ApiExpensDetails } from "../../src/types";
import { successfullLoginResponse } from "./signin-api.mock";

export const expensesSuccessRequestApi: ApiExpensDetails[] = [
  {
    description: "Shop Groceries",
    date: "2020-03-29T20:24:14Z",
    amount: 100,
    _id: "5e8103f00ffb7e5e9ef321f0",
    category: "groceries",
    type: "expense",
    user: successfullLoginResponse.user.id,
    createdAt: "2020-03-29T20:24:16.601Z",
    updatedAt: "2020-03-29T20:24:16.601Z",
    __v: 0,
    id: "5e8103f00ffb7e5e9ef321f0"
  },
  {
    description: "Mobile phone",
    date: "2020-02-29T20:24:14Z",
    amount: 650,
    _id: "5e8103f00ffb7e5e9ef321f1",
    category: "utilities",
    type: "expense",
    user: successfullLoginResponse.user.id,
    createdAt: "2020-03-29T20:24:16.601Z",
    updatedAt: "2020-03-29T20:24:16.601Z",
    __v: 0,
    id: "5e8103f00ffb7e5e9ef321f1"
  },
  {
    description: "Paycheck February",
    date: "2020-02-29T20:24:14Z",
    amount: 2000,
    _id: "5e8103f00ffb7e5e9ef321f2",
    category: "business",
    type: "income",
    user: successfullLoginResponse.user.id,
    createdAt: "2020-03-29T20:24:16.601Z",
    updatedAt: "2020-03-29T20:24:16.601Z",
    __v: 0,
    id: "5e8103f00ffb7e5e9ef321f2"
  },
  {
    description: "Selling weed",
    date: "2020-03-29T20:24:14Z",
    amount: 145.45,
    _id: "5e8103f00ffb7e5e9ef321f3",
    category: "business",
    type: "income",
    user: successfullLoginResponse.user.id,
    createdAt: "2020-03-29T20:24:16.601Z",
    updatedAt: "2020-03-29T20:24:16.601Z",
    __v: 0,
    id: "5e8103f00ffb7e5e9ef321f3"
  },
  {
    description: "Account bills",
    date: "2020-03-24T20:24:14Z",
    amount: 300,
    _id: "5e8103f00ffb7e5e9ef321f4",
    category: "services",
    type: "expense",
    user: successfullLoginResponse.user.id,
    createdAt: "2020-03-29T20:24:16.601Z",
    updatedAt: "2020-03-29T20:24:16.601Z",
    __v: 0,
    id: "5e8103f00ffb7e5e9ef321f4"
  }
];

export const createExpenseSuccessfullResponse: ApiExpensDetails = {
  description: "Generic",
  date: "2020-03-30T10:04:24Z",
  amount: 0,
  _id: "5e81c7f60ffb7e5e9ef321f4",
  category: "groceries",
  type: "expense",
  user: "5e74da7ad59b6154a55d9b2c",
  createdAt: "2020-03-30T10:20:38.299Z",
  updatedAt: "2020-03-30T10:20:38.299Z",
  __v: 0,
  id: "5e81c7f60ffb7e5e9ef321f4"
};
