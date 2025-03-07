export interface BarberShopInfo {
  name: string
  description: string
  address: string
  phone: string
  hours: string[]
  image: string
  services: {
    name: string
    price: number
    duration: number
  }[]
}

export interface AvailableSlot {
  date: string
  times: string[]
}

