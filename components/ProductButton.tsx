import type { Product } from "../lib/products"

interface ProductButtonProps {
  product: Product
  onClick: () => void
}

export default function ProductButton({ product, onClick }: ProductButtonProps) {
  const bgColor = product.section === "tickets" ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"

  return (
    <button
      onClick={onClick}
      className={`${bgColor} text-white p-6 rounded-lg text-xl font-semibold transition-colors w-full h-24 flex flex-col justify-center items-center`}
    >
      <span className="mb-2">{product.name}</span>
      <span>${product.price.toFixed(2)}</span>
    </button>
  )
}

