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
    <div>
      <div className="row grid-6">
        <div className="">
          <img src={p.thumbnail} alt="" />
          <div className="khungct2">
            <h2>{p.title}</h2>
            <p>Giá: {p.price}$</p>
            <p>Mô tả: {p.description}</p>
            <button className="btn btn-danger">Mua luon</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
