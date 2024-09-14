import React from "react";

function Category({ finalCategory = [], setCatName }) {
  let categoryList = finalCategory.map((item, index) => {
    return (
      <li onClick={() => setCatName(item)} key={index} className="font-serif font-[500] text-[20px] p-[10px] bg-[#ccc] cursor-[pointer] mb-4">
        {item}
      </li>
    );
  });

  return (
    <div>
      <h3 className="text-[25px] font-[500] p-[10px]">
        Product Category
      </h3>
      <ul>
        {categoryList.length > 0 ? categoryList : <li>No categories available</li>}
      </ul>
    </div>
  );
}

export default Category;