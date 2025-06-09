"use client"

import type React from 'react';
import {
  useEffect,
  useState,
} from 'react';

import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  Shield,
  Trash2,
  Truck,
} from 'lucide-react';

import { useSkipSelection } from '../hooks/useSkipSelection';
import type {
  Skip,
  Step,
} from '../types/skip';
import { ProgressSteps } from './progress-steps';
import { SelectedSkipSummary } from './selected-skip-summary';
import { SkipCard } from './skip-card';
import { TrustIndicators } from './trust-indicators';
import { Button } from './ui/button';

const skipData: Skip[] = [
  {
    id: 17933,
    size: 4,
    hire_period_days: 14,
    price_before_vat: 278,
    vat: 20,
    allowed_on_road: true,
    allows_heavy_waste: true,
    popular: false,
    capacity: "30-40 bin bags",
    ideal_for: "Small home projects",
  },
  {
    id: 17934,
    size: 6,
    hire_period_days: 14,
    price_before_vat: 305,
    vat: 20,
    allowed_on_road: true,
    allows_heavy_waste: true,
    popular: true,
    capacity: "50-60 bin bags",
    ideal_for: "Kitchen renovations",
  },
  {
    id: 17935,
    size: 8,
    hire_period_days: 14,
    price_before_vat: 375,
    vat: 20,
    allowed_on_road: true,
    allows_heavy_waste: true,
    popular: false,
    capacity: "70-80 bin bags",
    ideal_for: "Bathroom renovations",
  },
  {
    id: 17936,
    size: 10,
    hire_period_days: 14,
    price_before_vat: 400,
    vat: 20,
    allowed_on_road: false,
    allows_heavy_waste: false,
    popular: false,
    capacity: "90-100 bin bags",
    ideal_for: "Large home projects",
  },
  {
    id: 17937,
    size: 12,
    hire_period_days: 14,
    price_before_vat: 439,
    vat: 20,
    allowed_on_road: false,
    allows_heavy_waste: false,
    popular: false,
    capacity: "110-120 bin bags",
    ideal_for: "Commercial projects",
  },
  {
    id: 17938,
    size: 14,
    hire_period_days: 14,
    price_before_vat: 470,
    vat: 20,
    allowed_on_road: false,
    allows_heavy_waste: false,
    popular: false,
    capacity: "130-140 bin bags",
    ideal_for: "Large commercial work",
  },
]

const steps: Step[] = [
  { id: 1, name: "Location", icon: MapPin, completed: true },
  { id: 2, name: "Waste Type", icon: Trash2, completed: true },
  { id: 3, name: "Skip Size", icon: Truck, completed: false, current: true },
  { id: 4, name: "Permits", icon: Shield, completed: false },
  { id: 5, name: "Schedule", icon: Calendar, completed: false },
]

const SkipHirePage: React.FC = () => {
  const { selectedSkip, selectSkip, calculateTotalPrice } = useSkipSelection(6)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const selectedSkipData = skipData.find((skip) => skip.size === selectedSkip)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Progress Steps */}
      <ProgressSteps steps={steps} />

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div
            className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-3 sm:mb-4 px-4">
              Choose Your Perfect Skip
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Select from our premium range of skip sizes, each designed to handle your specific project needs with
              <span className="font-semibold text-blue-600"> professional service guaranteed</span>
            </p>
          </div>

          <TrustIndicators />
        </div>

        {/* Skip Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {skipData.map((skip, index) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              isSelected={selectedSkip === skip.size}
              onSelect={selectSkip}
              calculateTotalPrice={calculateTotalPrice}
              animationDelay={index * 100}
            />
          ))}
        </div>

        {/* Selected Skip Summary */}
        {selectedSkipData && (
          <div className="mb-6 sm:mb-8">
            <SelectedSkipSummary
              skip={selectedSkipData}
              totalPrice={calculateTotalPrice(selectedSkipData.price_before_vat, selectedSkipData.vat)}
            />
          </div>
        )}

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 sm:pt-8 border-t border-white/20">
          <Button
            variant="outline"
            className="flex items-center justify-center space-x-3 h-12 px-6 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300 order-2 sm:order-1"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold">Previous Step</span>
          </Button>

          <Button className="flex items-center justify-center space-x-3 h-12 px-6 sm:px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 order-1 sm:order-2">
            <span className="font-semibold">Continue to Permits</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SkipHirePage
