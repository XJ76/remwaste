"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { CheckCircle, ArrowRight, Clock, Truck, Award, Star } from "lucide-react"
import type { Skip } from "../types/skip"

interface SkipCardProps {
  skip: Skip
  isSelected: boolean
  onSelect: (skipSize: number) => void
  calculateTotalPrice: (priceBeforeVat: number, vat: number) => number
  animationDelay: number
}

export function SkipCard({ skip, isSelected, onSelect, calculateTotalPrice, animationDelay }: SkipCardProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const totalPrice = calculateTotalPrice(skip.price_before_vat, skip.vat)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), animationDelay)
    return () => clearTimeout(timer)
  }, [animationDelay])

  return (
    <div
      className={`
        transition-all duration-700 transform
        ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
      `}
    >
      <Card
        className={`
          relative cursor-pointer transition-all duration-300 group
          ${
            isSelected
              ? "ring-2 sm:ring-4 ring-blue-500/50 shadow-xl sm:shadow-2xl transform scale-102 sm:scale-105 bg-gradient-to-br from-white to-blue-50"
              : "hover:shadow-lg sm:hover:shadow-xl hover:transform hover:scale-102 bg-white/90 backdrop-blur-sm"
          }
          border-0 overflow-hidden h-full
        `}
        onClick={() => onSelect(skip.size)}
      >
        {/* Popular Badge */}
        {skip.popular && (
          <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 z-10">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 sm:px-4 py-1 sm:py-2 shadow-lg text-xs sm:text-sm">
              <Star className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
              Most Popular
            </Badge>
          </div>
        )}

        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
            </div>
          </div>
        )}

        <CardContent className="p-0 h-full flex flex-col">
          {/* Skip Visualization */}
          <div className="relative h-32 sm:h-48 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

            {/* Skip Illustration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-20 h-12 sm:w-32 sm:h-20 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-lg shadow-2xl">
                  <div className="absolute inset-1 sm:inset-2 bg-yellow-200/50 rounded border border-yellow-600/30"></div>
                  <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 right-1 sm:right-2 h-0.5 sm:h-1 bg-yellow-700/40 rounded"></div>
                </div>
                <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-10 sm:w-16 h-2 sm:h-3 bg-gray-800/20 rounded-full blur-sm"></div>
              </div>
            </div>

            {/* Size Badge */}
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
              <Badge className="bg-white/90 text-gray-800 font-bold px-2 sm:px-3 py-1 shadow-lg text-xs sm:text-sm">
                {skip.size} Yard
              </Badge>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 flex-1 flex flex-col">
            <div className="flex-1">
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{skip.size} Yard Skip</h3>
              <p className="text-sm sm:text-base text-gray-600 font-medium">{skip.ideal_for}</p>
              <p className="text-xs sm:text-sm text-gray-500">{skip.capacity}</p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
              <div className="flex items-center space-x-2 text-xs">
                <Clock className="w-3 h-3 text-blue-500 flex-shrink-0" />
                <span className="text-gray-600">{skip.hire_period_days} days</span>
              </div>
              {skip.allowed_on_road && (
                <div className="flex items-center space-x-2 text-xs">
                  <Truck className="w-3 h-3 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">Road OK</span>
                </div>
              )}
              {skip.allows_heavy_waste && (
                <div className="flex items-center space-x-2 text-xs">
                  <Award className="w-3 h-3 text-purple-500 flex-shrink-0" />
                  <span className="text-gray-600">Heavy Waste</span>
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    £{totalPrice}
                  </span>
                  <p className="text-xs text-gray-500">inc. VAT & delivery</p>
                </div>
                <div className="text-right">
                  <p className="text-xs sm:text-sm text-gray-600 line-through">£{Math.round(totalPrice * 1.15)}</p>
                  <Badge variant="outline" className="text-xs border-green-200 text-green-700 bg-green-50">
                    Save £{Math.round(totalPrice * 0.15)}
                  </Badge>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              className={`
                w-full h-10 sm:h-12 font-semibold transition-all duration-300 transform text-sm sm:text-base
                ${
                  isSelected
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                }
                text-white border-0 hover:scale-105 active:scale-95
              `}
              onClick={(e) => {
                e.stopPropagation()
                onSelect(skip.size)
              }}
            >
              {isSelected ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Selected
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Select This Skip</span>
                  <span className="sm:hidden">Select</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
