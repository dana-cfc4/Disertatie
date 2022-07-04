import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./LinkList.css";
import { useSelector, useDispatch } from "react-redux";
import { setBrands } from "../store/actions/brands";
import { setCategories } from "../store/actions/categories";
import { setSubCategories } from "../store/actions/subcategories";
import { setSubSubCategories } from "../store/actions/subsubcategories";
import { setProducts } from "../store/actions/products";

const CautaDeToate = (props) => {
  const dispatch = useDispatch()

  const selectBrand = (state) => state.brands;
  const { brands } = useSelector(selectBrand);

  const selectProducts = (state) => state.products;
  const { products } = useSelector(selectProducts);

  const selectCategories = (state) => state.categories;
  const { categories } = useSelector(selectCategories);

  const selectSubCategories = (state) => state.subcategories;
  const { subcategories } = useSelector(selectSubCategories);

  const selectSubSubCategories = (state) => state.subsubcategories;
  const { subsubcategories } = useSelector(selectSubSubCategories);

  const foundBrand = brands.find(brand => brand.nume.toLowerCase() === props.msg)

  const foundCategory = categories.find(category => category.nume.toLowerCase() === props.msg)

  const foundSubCategory = subcategories.find(subcategory => subcategory.nume.toLowerCase() === props.msg)

  const foundSubSubCategory = subsubcategories.find(subsubcategory => subsubcategory.nume.toLowerCase() === props.msg)

  const foundProduct = products.find(product => product.denumire.toLowerCase() === props.msg)

  useEffect(() => {
    dispatch(setProducts("https://backend-r4zkv.ondigitalocean.app/products"));
    dispatch(setBrands("https://backend-r4zkv.ondigitalocean.app/brands"));
    dispatch(setCategories("https://backend-r4zkv.ondigitalocean.app/categories"));
    dispatch(setSubCategories("https://backend-r4zkv.ondigitalocean.app/subcategories"));
    dispatch(setSubSubCategories("https://backend-r4zkv.ondigitalocean.app/subsubcategories"));
  }, []);

  const linkMarkup =

    foundBrand ?
      <li key={foundBrand._id} className="link-list-item">
        <Link to={`/branduri/${foundBrand._id}`} className="link-list-item-url">
          Vezi produsele apartinand brand-ului ales
        </Link>
      </li> :
      foundCategory ?
        <li key={foundCategory._id} className="link-list-item">
          <Link to={`/categorii/${foundCategory._id}`} className="link-list-item-url">
            Vezi produsele apartinand categoriei alese
          </Link>
        </li> :
        foundSubCategory ?
          <li key={foundSubCategory._id} className="link-list-item">
            <Link to={`/categorii/${foundSubCategory._id}`} className="link-list-item-url">
              Vezi produsele apartinand categoriei alese
            </Link>
          </li> :
          foundSubSubCategory ?
            <li key={foundSubSubCategory._id} className="link-list-item">
              <Link to={`/categorii/${foundSubSubCategory._id}`} className="link-list-item-url">
                Vezi produsele apartinand categoriei alese
              </Link>
            </li> :
            foundProduct ?
              <li key={foundProduct._id} className="link-list-item">
                <Link to={`/produse/${foundProduct._id}`} className="link-list-item-url">
                  Vezi produsul ales
                </Link>
              </li> :
              <li key={props.msg} onClick={props.actionProvider.handleCautaOrice} className="link-list-item">
                <p className="link-list-item-url">
                  Nu a fost gasit niciun rezultat. Incearca din nou!
                </p>
              </li>

  return <ul className="link-list">{linkMarkup}</ul>;
};

export default CautaDeToate;