const FilterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
      };
    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
      };
    case "SET_LIST_VIEW":
      return {
        ...state,
        list_view: false,
      };
    case "UPDATE_FILTER_VALUE":
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };
    case "FILTER_PRODUCTS":
      const { all_products } = state;
      let tempFilterProducts = [...all_products];
      let { text, category, company, color } = state.filters;
      if (text) {
        tempFilterProducts = tempFilterProducts.filter((currentEle) => {
          return currentEle.name.toLowerCase().includes(text);
        });
      }
      if (company!=='all') {
        tempFilterProducts = tempFilterProducts.filter((item) => {
          return item.company.toLowerCase() === company.toLowerCase();
        });
      }
      if (category!=='all') {
        tempFilterProducts = tempFilterProducts.filter((item) => {
          return item.category.toLowerCase() === category.toLowerCase();
        });
      }
      
      if (color!=='all') {
        tempFilterProducts = tempFilterProducts.filter((item) => {
          return item.colors.includes(color)
        }
           
        );
      }

      return {
        ...state,
        filter_products: tempFilterProducts,
      };
    case "GET_SORT_VALUE":
      // let userSortValue = document.getElementById("sort");
      // let sortValue = userSortValue.options[userSortValue.selectedIndex].value;
      // console.log(sortValue);
      return {
        ...state,
        sorting_value: action.payload,
      };
    case "SORTING_PRODUCT":
      let newSortData;
      const { filter_products, sorting_value } = state;
      let tempSortData = [...filter_products];

      const sortProducts = (a, b) => {
        if (sorting_value === "a-z") {
          return a.name.localeCompare(b.name);
        }
        if (sorting_value === "z-a") {
          return b.name.localeCompare(a.name);
        }
        if (sorting_value === "lowest") {
          return a.price - b.price;
        }
        if (sorting_value === "highest") {
          return b.price - a.price;
        }
      };
      newSortData = tempSortData.sort(sortProducts);

      return {
        ...state,
        filter_products: newSortData,
      };
    default:
      return state;
  }
};

export default FilterReducer;
