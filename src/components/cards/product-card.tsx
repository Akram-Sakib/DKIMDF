"use client";

import { QueryKeys } from "@/constants/common";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

type Product = {
  id: number;
  product: string;
  brand?: string;
  description: string;
  weight?: string;
  features?: string[];
  image: string;
};

const fetchProducts = async () => {
  const res = await axios.get("/products.json");
  return res.data as Product[];
};

const ProductCard = ({ product }: { product: Product }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 md:w-72 w-full">
    <Image
      width={192}
      height={192}
      src={`/products/${product.image}`}
      alt={product.product}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">{product.product}</h3>
      {product.brand && (
        <p className="text-sm text-gray-500">Brand: {product.brand}</p>
      )}
      <p className="text-sm text-gray-600 mt-2">{product.description}</p>
      {product.features && (
        <ul className="text-sm text-gray-700 mt-2 list-disc list-inside">
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      )}
      {product.weight && (
        <p className="text-sm text-gray-500 mt-2">Weight: {product.weight}</p>
      )}
    </div>
  </div>
);

const ProductGrid = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QueryKeys.PRODUCTS],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products.</p>;
  if (data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }
};

export { ProductCard, ProductGrid };
