import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PrincipalPage from "../Components/PrincipalPage";
import Favorites from "../Components/Favorites";
import CategoriesPage from "../Components/CategoriesPage";
import ShoppingCart from "../Components/ShoppingCart";
import PrivateRoute from "../Components/PrivateRoute";
import ProductPage from "../Components/ProductPage";
import Checkout from "../Components/Checkout";
import BrandsProducts from "../Components/BrandsProducts";
import PersonalProfile from "../Components/PersonalProfile";
import About from "../Components/About";
import Angajamente from "../Components/Angajamente";
import IntrebariFrecvente from "../Components/IntrebariFrecvente";
import MyOrders from "../Components/MyOrders";
import MyOrderedProducts from "../Components/MyOrderedProducts";
import MyReviews from "../Components/MyReviews";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import RecommendedPrincipalPage from "../Components/RecommendedPrincipalPage";
import ModalitatiDePlata from '../Components/ModalitatiDePlata';
import Livrare from '../Components/Livrare';
import Retur from '../Components/Retur';
import Reclamatii from '../Components/Reclamatii';
import DevinoInfluencer from '../Components/DevinoInfluencer';
import Cariere from '../Components/Cariere';

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
      <Route path="produsecomandate" element={<MyOrderedProducts />} />
      <Route path="recomandari" element={<RecommendedPrincipalPage />} />
      <Route path="desprenoi" element={<About />} />
      <Route path="angajamente" element={<Angajamente />} />
      <Route path="intrebarifrecvente" element={<IntrebariFrecvente />} />
      <Route path="modalitatideplata" element={<ModalitatiDePlata />} />
      <Route path="conditiidelivrare" element={<Livrare />} />
      <Route path="politicideretur" element={<Retur />} />
      <Route path="reclamatii" element={<Reclamatii />} />
      <Route path="devinoinfluencer" element={<DevinoInfluencer />} />
      <Route path="cariere" element={<Cariere />} />
      <Route path="recenziilemele" element={<MyReviews />} />
      <Route path="categorii">
        <Route path=":idCategorie" element={<CategoriesPage />} />
      </Route>
      <Route path="branduri">
        <Route path=":idBrand" element={<BrandsProducts />} />
      </Route>
      <Route path="comenzilemele">
        <Route index element={<MyOrders />} />
        <Route path=":idComanda">
          <Route index element={<MyOrders />} />
        </Route>
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