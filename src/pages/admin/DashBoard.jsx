import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import api from "../../axios";

const DashBoard = () => {
  const {state, dispatch} = useContext(ProductContext)
  console.log(state)
  const handleRemove = async (id) => {
		if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
			try {
				await api.delete(`/products/${id}`);
				dispatch({ type: "DELETE_PRODUCT", payload: id });
			} catch (error) {
				console.error("Xóa sản phẩm thất bại:", error);
			}
		}
	};
  return (
    <>
    <div className="container">
      <h1>Hello, Admin</h1>
      <Link to="/admin/product-add" className="btn btn-success">
        Add new product
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Thumbnail</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>{p.price}</td>
              <td>
                {p.thumbnail ? (<img src={p.thumbnail} width={190} alt={p.title} />) : ("Đang cập nhật")}
              </td>
              <td>{p.description || "Đang cập nhật"}</td>
              <td>  <button className="btn btn-danger w-100 text-center" onClick={() => handleRemove(p.id)}>
									Remove
								</button>
                <Link to={`/admin/product-edit/${p.id}`}>
                  <button className="btn btn-primary w-100 text-center">Update</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default DashBoard;
