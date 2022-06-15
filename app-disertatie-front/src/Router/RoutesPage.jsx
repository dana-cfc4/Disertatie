import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PersonalProfile from "../Components/PersonalProfile";
import PrincipalPage from "../Components/PrincipalPage";
import Favorites from "../Components/Favorites";
import CategoriesPage from "../Components/CategoriesPage";
import ShoppingCart from "../Components/ShoppingCart";
import PrivateRoute from "../Components/PrivateRoute";
import ProductPage from "../Components/ProductPage";
import Checkout from "../Components/Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const RoutesPage = () => {
  const stripePromise = loadStripe(
    'pk_test_51IcwaYEbug5QSXQNFk1NgqvStCkavGxZwLRcVdhUhPBNvbyAXDDJ5KmHgVIsTE72rmTAkEB79Hzik8Q7CFvq0DSq00TqzKs9iJ'
);
    return (
      <Routes>
        <Route exact path="/" element={<PrincipalPage />} />
        <Route path="contulmeu">
          <Route
            path=":userId"
            element={
              <PrivateRoute>
                <PersonalProfile />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="categorii">
          <Route path=":idCategorie" element={<CategoriesPage />} />
        </Route>
        <Route path="favorite" element={<Favorites />} />
        <Route path="cosdecumparaturi" element={<ShoppingCart />} />
        <Route path="finalizarecomanda" element={
          <Elements stripe={stripePromise}>
          <Checkout />
          </Elements>
        } />
        <Route path="produse">
          <Route path=":idProdus" element={<ProductPage />} />
        </Route>
      </Routes>
    );
}
export default RoutesPage;