import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../axios";



const ProductDetail = () => {
  const { id } = useParams();
  const [p, setP] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/products/${id}`);
      setP(data);
    })();
  }, []);
  return (
    <div className="container w-50  py-6 mx-auto border border-gray-200 rounded-lg shadow">
      <div className="col-5">
        <div className="sidebar">
          <img src={p.thumbnail} width={300} alt="" />
          <div className="">
            <h2>{p.title}</h2>
            <p>Giá: {p.price}$</p>
            <p>Mô tả: {p.description}</p>
            <button className="btn btn-danger">Mua ngay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
