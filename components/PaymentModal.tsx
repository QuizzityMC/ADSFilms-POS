import type { Product } from "../lib/products"
import Modal from "./Modal"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  order: Record<string, number>
  products: Product[]
  onPaymentComplete: (withReceipt: boolean) => void
}

export default function PaymentModal({ isOpen, onClose, order, products, onPaymentComplete }: PaymentModalProps) {
  const total = Object.entries(order).reduce((sum, [id, quantity]) => {
    const product = products.find((p) => p.id === id)
    return sum + (product ? product.price * quantity : 0)
  }, 0)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">Payment</h2>
      <ul className="mb-4">
        {Object.entries(order).map(([id, quantity]) => {
          const product = products.find((p) => p.id === id)
          if (!product) return null
          return (
            <li key={id} className="mb-2">
              {product.name}: {quantity} x ${product.price.toFixed(2)} = ${(quantity * product.price).toFixed(2)}
            </li>
          )
        })}
      </ul>
      <p className="text-xl font-bold mb-4">Total: ${total.toFixed(2)}</p>
      <div className="flex gap-4">
        <button
          onClick={() => onPaymentComplete(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex-1 text-lg"
        >
          Payment Complete with Receipt
        </button>
        <button
          onClick={() => onPaymentComplete(false)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex-1 text-lg"
        >
          Payment Complete without Receipt
        </button>
      </div>
    </Modal>
  )
}

