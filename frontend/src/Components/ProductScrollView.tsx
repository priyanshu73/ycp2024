import React from "react";

interface Product {
  id: string;
  image: string;
  title: string;
  description: string;
}

interface ProductScrollProps {
  products: Product[];
}

const ProductScroll: React.FC<ProductScrollProps> = ({ products }) => {
  return (
    <div className="overflow-x-auto w-max py-2 px-4 space-x-4 flex">
      {products.map((product) => (
        <div
          key={product.id}
          className="w-48 bg-white shadow-lg rounded-lg flex-shrink-0"
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-32 w-full object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{product.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductScroll;
