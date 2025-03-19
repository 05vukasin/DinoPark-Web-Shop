import ProductForm from "@/components/ProductForm"
import { Product } from "@/types/product"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

export default async function page({ params: { id } }: { params: { id: string } }) {
    let product: Product | undefined = undefined

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Product/${id}`)
        product = await res.json()
    } catch (error) {
        console.error(error)
    }

    if (!product) {
        return (
            <div className="p-4">
                <h1 className="text-2xl mb-4 font-semibold">Product not found</h1>
            </div>
        )
    }

    return <ProductForm product={product} />
}
