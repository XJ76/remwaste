export interface Skip {
  id: number
  size: number
  hire_period_days: number
  price_before_vat: number
  vat: number
  allowed_on_road: boolean
  allows_heavy_waste: boolean
  popular?: boolean
  capacity: string
  ideal_for: string
}

export interface Step {
  id: number
  name: string
  icon: any
  completed: boolean
  current?: boolean
}
