"use client"

import {
  useEffect,
  useState,
} from 'react';

import {
  ArrowRight,
  Award,
  CheckCircle,
  Truck,
} from 'lucide-react';

import type {
  Skip,
  Step,
} from '../types/skip';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface FloatingSidebarProps {
  skip: Skip
  totalPrice: number
  steps: Step[]
}

const FloatingSidebar = ({ skip, totalPrice, steps }: FloatingSidebarProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsVisible(scrollPosition > 200)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`
        fixed right-8 top-1/2 -translate-y-1/2 w-80 z-50 transition-all duration-300
        ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"}
      `}
    >
      <Card className="bg-white/95 backdrop-blur-sm border border-slate-200 shadow-xl">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">Your Selection</h3>
            <div className="flex items-center justify-between">
              <Badge className="bg-blue-700 text-white px-3 py-1 text-sm">
                {skip.size} Yard Skip
              </Badge>
              <span className="text-2xl font-semibold text-slate-900">
                £{totalPrice}
              </span>
            </div>
          </div>

          {/* Skip Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Capacity</span>
              <span className="font-medium text-slate-900">{skip.capacity}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Ideal For</span>
              <span className="font-medium text-slate-900">{skip.ideal_for}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Hire Period</span>
              <span className="font-medium text-slate-900">{skip.hire_period_days} days</span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-900">Features</h4>
            <div className="space-y-2">
              {skip.allowed_on_road && (
                <div className="flex items-center space-x-2 text-sm">
                  <Truck className="w-4 h-4 text-green-700 flex-shrink-0" />
                  <span className="text-slate-600">Road Placement Allowed</span>
                </div>
              )}
              {skip.allows_heavy_waste && (
                <div className="flex items-center space-x-2 text-sm">
                  <Award className="w-4 h-4 text-purple-700 flex-shrink-0" />
                  <span className="text-slate-600">Heavy Waste Accepted</span>
                </div>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-900">Progress</h4>
            <div className="space-y-2">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center space-x-2">
                  <div
                    className={`
                      w-5 h-5 rounded-full flex items-center justify-center
                      ${step.completed ? "bg-green-600" : step.current ? "bg-blue-700" : "bg-slate-200"}
                    `}
                  >
                    {step.completed ? (
                      <CheckCircle className="w-3 h-3 text-white" />
                    ) : (
                      <step.icon className={`w-3 h-3 ${step.current ? "text-white" : "text-slate-400"}`} />
                    )}
                  </div>
                  <span
                    className={`
                      text-sm
                      ${step.completed ? "text-slate-900" : step.current ? "text-blue-700 font-medium" : "text-slate-500"}
                    `}
                  >
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button className="w-full h-11 bg-blue-700 hover:bg-blue-800 text-white border-0 shadow-md">
            <span className="font-medium">Continue to Permits</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default FloatingSidebar 