import Category from "./Components/category.js";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from "react";

function App() {
  let [finalCategory, setFinalCategory] = useState([]);
  let [products, setProducts] = useState([]);
  let [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (categoryName !== "") {
      axios.get(`https://dummyjson.com/products/category/${categoryName}`)
        .then((res) => res.data)
        .then((finalRes) => {
          setProducts(finalRes.products);
        })
        .catch(() => {
          toast.error('Something went wrong');
        });
    }
  }, [categoryName]);

  useEffect(() => {
    getCategory();
    getProducts();
  }, []);

  let getCategory = () => {
    axios.get('https://dummyjson.com/products/category-list')
      .then((res) => res.data)
      .then((finalRes) => {
        setFinalCategory(finalRes);
      })
      .catch(() => {
        toast.error('Something went wrong');
      });
  };

  let getProducts = () => {
    axios.get('https://dummyjson.com/products')
      .then((res) => res.data)
      .then((finalRes) => {
        setProducts(finalRes.products);
      })
      .catch(err => {
        toast.error('Something went wrong');
      });
  }

  let pItems = products.map((product, index) => {
    return <ProductItem key={index} product={product} />
  });

  return (
    <>
      <ToastContainer />
      <div className="py-[40px]">
        <div className="max-w-[1320px] mx-auto">
          <h1 className="text-center text-[40px] font-bold ab-[30px]">
            Our Products
          </h1>
          <div className="grid grid-cols-[30%_auto] gap-[20px]">
            <div>
              {finalCategory.length > 0 ? <Category finalCategory={finalCategory} setCatName={setCategoryName} /> : <p>Loading categories...</p>}
            </div>
            <div className="mt-4">
              <div className="grid grid-cols-3 gap-5">
                {pItems.length > 0 ? pItems : <p>Loading products...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

function ProductItem({ product }) {
  return (
    <div className="shadow-lg text-center pb-4 mx-[auto]">
      <img src={product.images[0]} alt={product.title} className="w-[100] h-[220px]" />
      <h4>{product.title}</h4>
      <p>$ {product.price}</p>
    </div>
  );
}