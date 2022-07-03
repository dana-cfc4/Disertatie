import React, { useEffect, useRef } from "react";
import * as Awesomplete from "awesomplete";
import "../styles/awesomplete.css";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../store/actions/products";
import { setCategories } from "../store/actions/categories";
import { setSubCategories } from "../store/actions/subcategories";
import { setSubSubCategories } from "../store/actions/subsubcategories";
import { setBrands } from "../store/actions/brands";
<script src="awesomplete.js"></script>;

const SearchProduct = ({
  selectProdus,
  productss,
  categoriess,
  subcategoriess,
  subsubcategoriess,
  brandss,
}) => {
  let input;
  const selectProducts = (state) => state.products;
  const { products } = useSelector(selectProducts);

  const selectCategories = (state) => state.categories;
  const { categories } = useSelector(selectCategories);

  const selectSubCategories = (state) => state.subcategories;
  const { subcategories } = useSelector(selectSubCategories);

  const selectSubSubCategories = (state) => state.subsubcategories;
  const { subsubcategories } = useSelector(selectSubSubCategories);

  const selectBrands = (state) => state.brands;
  const { brands } = useSelector(selectBrands);

  const getProductNames = () => {
    const productNames = products.map((product) => product.denumire);
    return productNames;
  };

  const prevProducts = usePrevious(productss)

  const getBrandNames = () => {
    const brandNames = brands.map((brand) => brand.nume);
    return brandNames;
  };

  const getCategoriesNames = () => {
    const categoriesNames = categories.map((categorie) => categorie.nume);
    return categoriesNames;
  };

  const getSubCategoriesNames = () => {
    const subcategoriesNames = subcategories.map((subcategorie) => subcategorie.nume);
    return subcategoriesNames;
  };

  const getSubSubCategoriesNames = () => {
    const subsubcategoriesNames = subsubcategories.map((subsubcategorie) => subsubcategorie.nume);
    return subsubcategoriesNames;
  };

  const productsArray = products.map((produs) => [
    produs.denumire,
    produs.denumire,
  ]);

  const brandArray = brands.map((brand) => [
    brand.nume,
    brand.nume,
  ]);

  const categoriesArray = categories.map((category) => [
    category.nume,
    category.nume,
  ]);

  const subcategoriesArray = subcategories.map((subcategory) => [
    subcategory.nume,
    subcategory.nume,
  ]);

  const subsubcategoriesArray = subsubcategories.map((subsubcategory) => [
    subsubcategory.nume,
    subsubcategory.nume,
  ]);

  let finalArray = []
  finalArray = [...finalArray, ...productsArray, ...categoriesArray, ...subcategoriesArray, ...brandArray, ...subsubcategoriesArray]

  const allProducts = Object.fromEntries(finalArray);

  function createCountryItem(suggestion) {

    const productSuggestion = allProducts[suggestion];
    if (productSuggestion) {
      let li = document.createElement("li");
      const productToDisplay = products.find(product => product.denumire === productSuggestion)

      let brandName = ''
      if (productToDisplay) {
        brandName = brands.find(brand => brand._id === productToDisplay.idBrand) ?
          brands.find(brand => brand._id === productToDisplay.idBrand).nume : ''
      }
      if (productToDisplay)
        li.classList.add("suggestion");

      if (productToDisplay)
        li.innerHTML =
          '<div class="divStyle">' +
          '<img src="' +
          Object.values(productToDisplay.imagini[0])[0][0]
          + '"width=\"70px\" height=\"70px\">' +
          '<div class="divStyle2">' +
          "<strong>" +
          suggestion +
          "</strong>" +
          '<small class="suggestion-details">' +
          brandName +
          "</small>" +
          "</div>" +
          "</div>";
      else li.innerHTML =
        "<strong>" +
        suggestion +
        "</strong>"
      return li
    }
  }

  function createSuggestionItem(suggestion, input) {
    let li;

    if (!suggestion) return;

    if (allProducts[suggestion]) {
      li = createCountryItem(suggestion, input);
    }
    return li;
  }

  function selectHandler(event) {
    const selection = event.text.value;
    selectProdus(selection);
  }

  function initProductSearch() {
    document.createDocumentFragment()
    document.createDocumentFragment();

    let list = [];
    input = document.getElementById("csirt-search");
    const productNames = getProductNames();
    const categoriesNames = getCategoriesNames();
    const subcategoriesNames = getSubCategoriesNames();
    const subsubcategoriesNames = getSubSubCategoriesNames();
    const brandNames = getBrandNames();

    list = [...list, ...productNames, ...categoriesNames, ...subcategoriesNames, ...brandNames, ...subsubcategoriesNames];

    let awesomplete = new Awesomplete(input, {
      minChars: 1,
      maxItems: 10,
      autoFirst: true,
      item: createSuggestionItem,
    });

    awesomplete.list = list;

    input.addEventListener("awesomplete-selectcomplete", selectHandler);
  }

  function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    }, [productss]);

    return ref.current;
  }

  useEffect(() => {
    if (JSON.stringify(prevProducts) !== JSON.stringify(productss))
      initProductSearch()
  }, [productss]);

  return (
    <input
      id="csirt-search"
      class="awesomplete"
      type="search"
      placeholder="Cauta..."
    />
  );
};

export default SearchProduct;
