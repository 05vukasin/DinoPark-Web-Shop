"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Definišemo tip podataka za proizvod
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]); // Postavljamo tip podataka za useState
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://dinoparkwebshop-backend-1081514700612.us-central1.run.app/api/Product"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json(); // Oznaka da je odgovor niz tipa `Product`
        setProducts(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="bg-white min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
          Dino Park Shop
        </h1>

        {/* Prikaz učitavanja */}
        {loading && (
          <p className="text-center text-lg text-gray-600">Učitavanje...</p>
        )}

        {/* Prikaz greške */}
        {error && (
          <p className="text-center text-lg text-red-500">
            Greška pri učitavanju proizvoda. Pokušajte ponovo kasnije.
          </p>
        )}

        {/* Grid layout za prikaz proizvoda */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-gray-600 mt-1">{product.description}</p>
                <p className="text-green-600 font-bold text-lg mt-2">
                  {product.price} RSD
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopPage;
