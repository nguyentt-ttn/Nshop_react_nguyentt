import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axios";
import productSchema from "../schemaValid/productSchema";
import { ProductContext } from "../contexts/ProductContext";

const ProductForm = () => {
  const { id } = useParams();
  const { dispatch } = useContext(ProductContext);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });
  if (id) {
		useEffect(() => {
			(async () => {
				const { data } = await api.get(`/products/${id}`);
				reset(data);
			})();
		}, [id, reset]);
	}

  const onSubmit = async (data) => {
    if (id) {
      const res = await api.patch(`/products/${id}`, data);
      dispatch({ type: "UPDATE_PRODUCT", payload: res.data });

    } else {
      const res = await api.post("/products", data);
      dispatch({ type: "ADD_PRODUCT", payload: res.data });
    }
    if(confirm("Thành công!"))nav("/admin");
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{id ? " UPDATE" : "ADD"} PRODUCT</h1>
        <div className="mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            {...register("title", { required: true })}
          />
          {errors.title?.message && (
            <p className="text-danger">{errors.title?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors.price?.message && (
            <p className="text-danger">{errors.price?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            {...register("description", { required: true })}
          />
          {errors.description?.message && (
            <p className="text-danger">{errors.description?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            {id ? "Update" : "Add"} Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
