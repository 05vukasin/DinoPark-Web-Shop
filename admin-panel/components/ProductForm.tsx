"use client"
import { Product } from "@/types/product"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useState } from "react"
import Input from "./Input"
import ImageInput from "./ImageInput"
import { useRouter } from "next/navigation"

export default function ProductForm({ product }: { product?: Product }) {
    const router = useRouter()
    const [name, setName] = useState(product?.name || "")

    const [description, setDescription] = useState(product?.description || "")

    const [price, setPrice] = useState(product?.price.toString() || "")

    const [imageFile, setImageFile] = useState<File>()
    const [imageUrl, setImageUrl] = useState("")

    const [loading, setLoading] = useState(false)

    async function createProduct() {
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Product`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    price: price,
                }),
            })

            const resBody = await res.json()

            const newProductId = resBody.id

            if (imageFile) {
                const formData = new FormData()
                formData.set("image", imageFile)
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Product/${newProductId}/upload-image`, {
                    method: "POST",
                    body: formData,
                })
                const resBody = await res.json()
            }

            router.push(`/products/${newProductId}`)
        } catch (error) {}
        setLoading(false)
    }

    async function updateProduct() {
        if (!product) return
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Product/${product.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    price: price,
                }),
            })

            if (imageFile) {
                const formData = new FormData()
                formData.set("image", imageFile)
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/Product/${product.id}/upload-image`, {
                    method: "POST",
                    body: formData,
                })
            }

            router.refresh()
        } catch (error) {}
        setLoading(false)
    }

    return (
        <div className="p-4 relative">
            {loading ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-300/50 flex justify-center items-center">
                    <div className="loader-big"></div>
                </div>
            ) : (
                ""
            )}
            <div className="flex gap-3 items-center mb-4 ">
                <h1 className="text-2xl  font-semibold">{product ? product.name : "Add new product"}</h1>
                <Link
                    href={"/products"}
                    className="primary-button"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Products
                </Link>
            </div>
            <div className="space-y-4">
                <Input
                    value={name}
                    setValue={setName}
                    placeholder="Name"
                    className="primary-input"
                />
                <Input
                    value={description}
                    setValue={setDescription}
                    placeholder="Description"
                    className="primary-input"
                />
                <Input
                    value={price}
                    setValue={setPrice}
                    placeholder="Price"
                    type="number"
                    className="primary-input"
                />
                <ImageInput
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    imageFile={imageFile}
                    setImageFile={setImageFile}
                />
                <button
                    disabled={loading}
                    onClick={product ? updateProduct : createProduct}
                    className="primary-button"
                >
                    {product ? "Update product" : "Save product"}
                </button>
            </div>
        </div>
    )
}
