"use client"

import {
  useEffect,
  useState,
} from 'react';

import {
  ArrowRight,
  Award,
  CheckCircle,
  Clock,
  Star,
  Truck,
} from 'lucide-react';

import type { Skip } from '../types/skip';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
} from './ui/card';

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

  const getSkipImageUrl = (size: number) => {
    if (size <= 6) {
      return "https://t3.ftcdn.net/jpg/00/42/65/80/240_F_42658037_HaGdRyE7pGNTRUblWGi4KxM95AxVLhDS.jpg"; // Small skip
    } else if (size <= 10) {
      return "https://t3.ftcdn.net/jpg/01/18/87/78/240_F_118877833_UnKzUpGEDkwyXbnBWu9vllzvOBlqGgOa.jpg"; // Medium skip
    } else {
      return "https://t4.ftcdn.net/jpg/01/86/62/45/240_F_186624584_IENpEPiJyPFev73GWAVb0PIo1IeaDLUM.jpg"; // Large skip
    }
  };

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
              ? "ring-2 ring-blue-500/30 shadow-lg bg-white"
              : "hover:shadow-md bg-white"
          }
          border border-slate-200 overflow-hidden h-full
        `}
        onClick={() => onSelect(skip.size)}
      >
        {/* Popular Badge */}
        {skip.popular && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
            <Badge className="bg-slate-900 text-white px-3 py-1 shadow-md text-xs">
              <Star className="w-3 h-3 mr-1" />
              Most Popular
            </Badge>
          </div>
        )}

        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute top-3 right-3 z-10">
            <div className="w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center shadow-md">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
        )}

        <CardContent className="p-0 h-full flex flex-col">
          {/* Skip Visualization */}
          <div className="relative h-40 bg-slate-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent"></div>

            {/* Skip Image */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img 
                src={getSkipImageUrl(skip.size)}
                alt={`${skip.size} Yard Skip`}
                className="max-h-full max-w-full object-contain drop-shadow-md"
              />
            </div>

            {/* Size Badge */}
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-white text-slate-900 font-medium px-3 py-1 shadow-sm text-sm hover:bg-red-100 transition-colors duration-200">
                {skip.size} Yard
              </Badge>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4 flex-1 flex flex-col">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{skip.size} Yard Skip</h3>
              <p className="text-sm text-slate-600 font-medium mb-1">{skip.ideal_for}</p>
              <p className="text-sm text-slate-500">{skip.capacity}</p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-slate-900 flex-shrink-0" />
                <span className="text-slate-600">{skip.hire_period_days} days</span>
              </div>
              {skip.allowed_on_road && (
                <div className="flex items-center space-x-2 text-sm">
                  <Truck className="w-4 h-4 text-slate-900 flex-shrink-0" />
                  <span className="text-slate-600">Road OK</span>
                </div>
              )}
              {skip.allows_heavy_waste && (
                <div className="flex items-center space-x-2 text-sm">
                  <Award className="w-4 h-4 text-slate-900 flex-shrink-0" />
                  <span className="text-slate-600">Heavy Waste</span>
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-semibold text-slate-900">
                    £{totalPrice}
                  </span>
                  <p className="text-xs text-slate-500">inc. VAT & delivery</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500 line-through">£{Math.round(totalPrice * 1.15)}</p>
                  <Badge variant="outline" className="text-xs border-green-200 text-green-700 bg-green-50">
                    Save £{Math.round(totalPrice * 0.15)}
                  </Badge>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              className={`
                w-full h-11 font-medium transition-all duration-300 text-sm
                ${
                  isSelected
                    ? "bg-red-700 hover:bg-red-800 shadow-md"
                    : "bg-slate-900 hover:bg-slate-800 shadow-sm hover:shadow-md"
                }
                text-white border-0
              `}
              onClick={(e) => {
                e.stopPropagation()
                onSelect(skip.size)
              }}
            >
              {isSelected ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2 animate-pulse" />
                  Selected
                </>
              ) : (
                <>
                  <span>Select This Skip</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
