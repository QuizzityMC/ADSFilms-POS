export interface Product {
  id: string
  name: string
  price: number
  section: "tickets" | "merchandise"
}

export const products: Product[] = [
  { id: "family-adult", name: "tBitN premiere - Family Member/Adult", price: 0, section: "tickets" },
  { id: "family-child", name: "tBitN premiere - Family Member/Child", price: 0, section: "tickets" },
  { id: "adult", name: "tBitN premiere - Adult", price: 1.5, section: "tickets" },
  { id: "child", name: "tBitN premiere - Child", price: 0.5, section: "tickets" },
  { id: "cast", name: "tBitN premiere - Cast Member", price: 0, section: "tickets" },
  { id: "script", name: "Script Copy", price: 2.5, section: "merchandise" },
  { id: "dvd", name: "tBitN DVD", price: 5, section: "merchandise" },
  { id: "usb", name: "tBitN USB stick", price: 6, section: "merchandise" },
]

