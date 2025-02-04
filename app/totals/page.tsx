"use client"

import { useEffect, useState } from "react"
import { products } from "../../lib/products"
import Link from "next/link"

interface OrderSummary {
  order: Record<string, number>
}

export default function Totals() {
  const [orders, setOrders] = useState<OrderSummary[]>([])

  useEffect(() => {
    const lastOrder = localStorage.getItem("lastOrder")
    if (lastOrder) {
      setOrders([JSON.parse(lastOrder)])
    }
  }, [])

  const calculateTotals = () => {
    const totals: Record<string, number> = {}
    const ticketTotals: Record<string, number> = {}
    let grandTotal = 0
    let totalPeople = 0

    orders.forEach((orderSummary) => {
      Object.entries(orderSummary.order).forEach(([id, quantity]) => {
        const product = products.find((p) => p.id === id)
        if (product) {
          totals[product.name] = (totals[product.name] || 0) + quantity
          grandTotal += product.price * quantity

          if (product.section === "tickets") {
            ticketTotals[product.name] = (ticketTotals[product.name] || 0) + quantity
            totalPeople += quantity
          }
        }
      })
    })

    return { totals, ticketTotals, grandTotal, totalPeople }
  }

  const { totals, ticketTotals, grandTotal, totalPeople } = calculateTotals()

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Order Totals</h1>

      <h2 className="text-2xl font-bold mb-2">Premiere Attendance</h2>
      <p className="text-xl mb-4">Total number of people: {totalPeople}</p>

      <h3 className="text-xl font-bold mb-2">Breakdown by Ticket Type:</h3>
      <table className="w-full mb-6">
        <thead>
          <tr>
            <th className="text-left">Ticket Type</th>
            <th className="text-left">Number of People</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(ticketTotals).map(([name, quantity]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-2xl font-bold mb-2">Merchandise Sales</h2>
      <table className="w-full mb-6">
        <thead>
          <tr>
            <th className="text-left">Item</th>
            <th className="text-left">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(totals).map(([name, quantity]) => {
            const product = products.find((p) => p.name === name)
            if (product && product.section === "merchandise") {
              return (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{quantity}</td>
                </tr>
              )
            }
            return null
          })}
        </tbody>
      </table>

      <p className="text-2xl font-bold mb-4">Grand Total: ${grandTotal.toFixed(2)}</p>

      <Link href="/" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors text-lg">
        Back to POS
      </Link>
    </div>
  )
}

