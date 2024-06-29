import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axios";
import productSchema from "../schemaValid/productSchema";
import { ProductContext } from "../contexts/ProductContext";

const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env;

const ProductForm = () => {
  const { id } = useParams();
  const { dispatch } = useContext(ProductContext);
  const nav = useNavigate();
  const [thumbnailUrl, setThumbnailUrl] = useState(null);


  const [thumbnailOption, setThumbnailOption] = useState("keep");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await api.get(`/products/${id}`);
        
        setThumbnailUrl(data.thumbnail);
        reset(data);
      })();
    }
  }, [id, reset]);

  const uploadImage = async (file) => {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", VITE_UPLOAD_PRESET);

		const response = await fetch(`https://api.cloudinary.com/product/${VITE_CLOUD_NAME}/image/upload`, {
			method: "POST",
			body: formData,
		});
		const data = await response.json();
		return data.secure_url;
	};

  const onSubmit = async (product) => {
		try {
			let updatedProduct = { ...product };
			// Kiểm tra lựa chọn của admin và xử lý tương ứng
			switch (thumbnailOption) {
				case "upload":
					// Xử lý upload ảnh nếu admin chọn upload từ local
					if (product.thumbnail && product.thumbnail[0]) {
						const thumbnailUrl = await uploadImage(product.thumbnail[0]);
						updatedProduct = { ...updatedProduct, thumbnail: thumbnailUrl };
					}
					break;
				default:
				// Giữ nguyên ảnh cũ khi không thay đổi
				// Hoặc mặc định khi người dùng chọn "link ảnh online"
				// Tôi sử dụng switch case để dễ mở rộng cho các tình huống trong tương lai
			}

			if (id) {
				const { data } = await api.patch(`/products/${id}`, updatedProduct);
				dispatch({ type: "UPDATE_PRODUCT", payload: { id, product: updatedProduct } });
				console.log(data);
			} else {
				const { data } = await api.post("/products", updatedProduct);
				dispatch({ type: "ADD_PRODUCT", payload: data });
				console.log(data);
			}

			nav("/admin");
		} catch (error) {
			console.error(error);
		}
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
					<label htmlFor="thumbnailOption" className="form-label">
						Choose Thumbnail Option
					</label>
					<select
						className="form-control"
						id="thumbnailOption"
						value={thumbnailOption}
						onChange={(e) => setThumbnailOption(e.target.value)}
					>
						<option value="keep">Keep Current Thumbnail</option>
						<option value="link">Add Thumbnail from Link</option>
						<option value="upload">Upload Thumbnail from Local</option>
					</select>
				</div>

				<div className="mb-3">
					<label htmlFor="thumbnail" className="form-label">
						Thumbnail
					</label>
					{thumbnailOption === "link" && (
						<input type="text" className="form-control" id="thumbnail" {...register("thumbnail")} />
					)}
					{thumbnailOption === "upload" && (
						<input type="file" className="form-control" id="thumbnail" {...register("thumbnail", { required: true })} />
					)}
					{errors.thumbnail?.message && <p className="text-danger">{errors.thumbnail?.message}</p>}
					{thumbnailUrl && (
						<img src={thumbnailUrl} alt="Product Thumbnail" style={{ maxWidth: "200px", marginTop: "10px" }} />
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
