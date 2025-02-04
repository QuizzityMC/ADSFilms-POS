"use client"

import { useState } from "react"
import ProductButton from "../components/ProductButton"
import OrderSummary from "../components/OrderSummary"
import Modal from "../components/Modal"
import PaymentModal from "../components/PaymentModal"
import { products } from "../lib/products"
import Link from "next/link"
import { jsPDF } from "jspdf"

export default function Home() {
  const [order, setOrder] = useState<Record<string, number>>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  const addToOrder = (productId: string) => {
    setOrder((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }))
  }

  const removeFromOrder = (productId: string) => {
    setOrder((prev) => {
      const newOrder = { ...prev }
      if (newOrder[productId] > 1) {
        newOrder[productId]--
      } else {
        delete newOrder[productId]
      }
      return newOrder
    })
  }

  const clearOrder = () => {
    setOrder({})
  }

  const completeOrder = () => {
    if (Object.keys(order).length === 0) {
      alert("Please add items to the order before completing.")
      return
    }
    setIsPaymentModalOpen(true)
  }

  const generatePDFReceipt = (order: Record<string, number>) => {
    const doc = new jsPDF()
    let yPos = 20

    doc.setFontSize(20)
    doc.text("ADS Studios Receipt", 105, yPos, { align: "center" })
    yPos += 20

    doc.setFontSize(12)
    Object.entries(order).forEach(([id, quantity]) => {
      const product = products.find((p) => p.id === id)
      if (product) {
        doc.text(`${product.name} x${quantity}: $${(product.price * quantity).toFixed(2)}`, 20, yPos)
        yPos += 10
      }
    })

    yPos += 10
    const total = Object.entries(order).reduce((sum, [id, quantity]) => {
      const product = products.find((p) => p.id === id)
      return sum + (product ? product.price * quantity : 0)
    }, 0)
    doc.setFontSize(16)
    doc.text(`Total: $${total.toFixed(2)}`, 20, yPos)

    doc.save("ADS_Studios_Receipt.pdf")
  }

  const handlePaymentComplete = (withReceipt: boolean) => {
    if (withReceipt) {
      generatePDFReceipt(order)
    }
    localStorage.setItem("lastOrder", JSON.stringify({ order }))
    setIsPaymentModalOpen(false)
    setIsModalOpen(true)
    setOrder({})
  }

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">ADS Studios</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-2">Tickets</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {products
              .filter((p) => p.section === "tickets")
              .map((product) => (
                <ProductButton key={product.id} product={product} onClick={() => addToOrder(product.id)} />
              ))}
          </div>
          <h2 className="text-2xl font-bold mb-2">Merchandise</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {products
              .filter((p) => p.section === "merchandise")
              .map((product) => (
                <ProductButton key={product.id} product={product} onClick={() => addToOrder(product.id)} />
              ))}
          </div>
        </div>
        <div className="md:w-1/2">
          <OrderSummary
            order={order}
            products={products}
            onRemove={removeFromOrder}
            onComplete={completeOrder}
            onClear={clearOrder}
          />
          <Link
            href="/totals"
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full text-center text-lg"
          >
            View Totals
          </Link>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Order Completed</h2>
        <p>Thank you for your purchase!</p>
      </Modal>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        order={order}
        products={products}
        onPaymentComplete={handlePaymentComplete}
      />
    </main>
  )
}

