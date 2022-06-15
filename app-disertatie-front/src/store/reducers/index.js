import { combineReducers } from "redux";
import users from "./users";
import categories from "./categories";
import subcategories from "./subcategories";
import subsubcategories from "./subsubcategories";
import products from "./products";
import ratings from "./ratings";
import brands from "./brands";
import specifications from "./specifications";
import favorites from "./favorites";
import shoppingCarts from "./shoppingCarts";
import orders from "./orders";

export default combineReducers({
  users,
  categories,
  subcategories,
  subsubcategories,
  products,
  ratings,
  brands,
  specifications,
  favorites,
  shoppingCarts,
  orders
});
