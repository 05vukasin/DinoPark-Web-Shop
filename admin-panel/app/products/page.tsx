import { Product } from "@/types/product"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

export default async function page() {
    let products: Product[] = []
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Product`)
        products = await res.json()
    } catch (error) {
        console.error(error)
    }

    return (
        <div className="p-4">
            <div className="mb-4 flex items-center gap-3">
                <h1 className="text-2xl font-semibold">Products</h1>
                <Link
                    href={"/products/new"}
                    className="primary-button"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    Add product
                </Link>
            </div>
            <div className="w-full">
                <table className="primary-table w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            return (
                                <tr
                                    key={product.id}
                                    className="relative"
                                >
                                    <td>
                                        {product.id}
                                        <Link
                                            href={`/products/${product.id}`}
                                            className="absolute top-0 left-0 w-full h-full z-10"
                                        ></Link>
                                    </td>
                                    <td>{product.imageUrl}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
