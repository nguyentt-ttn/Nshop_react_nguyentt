import { createContext, useEffect, useReducer } from "react";
import { productReducer } from "../reducer/productReducer";
import api from "../axios";

export const ProductContext = createContext();

const ProductProvider = (props) => {
  const [state, dispatch] = useReducer(productReducer, { products: [] });
  useEffect(() => {
		(async () => {
			const { data } = await api.get("/products");
			dispatch({ type: "SET_PRODUCTS", payload: data });
		})();
	}, []);
  return <ProductContext.Provider value={{state, dispatch }}>{props.children}</ProductContext.Provider>;
};
export default ProductProvider;
