import type { Product } from "../lib/products"

interface OrderSummaryProps {
  order: Record<string, number>
  products: Product[]
  onRemove: (id: string) => void
  onComplete: () => void
  onClear: () => void
}

export default function OrderSummary({ order, products, onRemove, onComplete, onClear }: OrderSummaryProps) {
  const totalItems = Object.values(order).reduce((a, b) => a + b, 0)
  const totalPrice = Object.entries(order).reduce((total, [id, quantity]) => {
    const product = products.find((p) => p.id === id)
    return total + (product ? product.price * quantity : 0)
  }, 0)

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Current Order</h2>
      <div className="max-h-64 overflow-y-auto mb-4">
        {Object.entries(order).map(([id, quantity]) => {
          const product = products.find((p) => p.id === id)
          if (!product) return null
          return (
            <div key={id} className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded">
              <div>
                <span className="font-semibold">{product.name}</span>
                <br />
                <span>
                  {quantity} x ${product.price.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => onRemove(id)}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors text-lg"
              >
                Remove
              </button>
            </div>
          )
        })}
      </div>
      <p className="text-right mb-2 text-xl">Total Items: {totalItems}</p>
      <p className="text-right mb-4 text-xl font-bold">Total Price: ${totalPrice.toFixed(2)}</p>
      <div className="flex gap-2">
        <button
          onClick={onComplete}
          className="bg-green-500 text-white px-4 py-3 rounded hover:bg-green-600 transition-colors flex-1 text-xl"
        >
          Pay Now
        </button>
        <button
          onClick={onClear}
          className="bg-red-500 text-white px-4 py-3 rounded hover:bg-red-600 transition-colors flex-1 text-xl"
        >
          Clear Order
        </button>
      </div>
    </div>
  )
}

