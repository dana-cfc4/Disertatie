import React, { useEffect } from "react";
import * as Awesomplete from "awesomplete";
import "../styles/awesomplete.css";
<script src="awesomplete.js"></script>;

const SearchProduct = ({
  selectProdus,
  products,
  categories,
  subcategories,
  subsubcategories,
  brands,
}) => {
  let input;
  document.createDocumentFragment()
  document.createDocumentFragment();

  const getProductNames = () => {
    const productNames = products.map((product) => product.denumire);
    return productNames;
  };

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
  finalArray = [...finalArray, ...productsArray, ...brandArray, ...categoriesArray, ...subcategoriesArray, ...subsubcategoriesArray]
  const allProducts = Object.fromEntries(finalArray);

  function createCountryItem(suggestion) {
    let li = document.createElement("li");
    const product = allProducts[suggestion];

    li.classList.add("suggestion");

    li.innerHTML =
      // '<span class="sprite-flag ' +
      // product +
      // '">
      "</span > " +
      "<strong>" +
      suggestion +
      "</strong>" +
      '<small class="suggestion-details">' +
      "Country " +
      "</small>";

    return li;
  }

  function createSuggestionItem(suggestion, input) {
    console.log(allProducts[suggestion], "suggestion");
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
    input.text = ''
  }

  function initProductSearch() {
    let list = [];
    input = document.getElementById("csirt-search");
    const productNames = getProductNames();
    const brandNames = getBrandNames();
    const categoriesNames = getCategoriesNames();
    const subcategoriesNames = getSubCategoriesNames();
    const subsubcategoriesNames = getSubSubCategoriesNames();
    list = [...list, ...productNames, ...categoriesNames, ...subcategoriesNames];

    let awesomplete = new Awesomplete(input, {
      minChars: 1,
      maxItems: 10,
      autoFirst: true,
      item: createSuggestionItem,
    });

    awesomplete.list = list;

    input.addEventListener("awesomplete-selectcomplete", selectHandler);
  }

  useEffect(() => initProductSearch(), [brands]);

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
