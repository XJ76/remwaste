"use client"

import {
  useEffect,
  useState,
} from 'react';

import {
  ArrowRight,
  Award,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Truck,
  X,
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
  const [isExpanded, setIsExpanded] = useState(false)
  const [isManuallyHidden, setIsManuallyHidden] = useState(false)
  const [isLandscape, setIsLandscape] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (!isManuallyHidden) {
        setIsVisible(scrollPosition > 200)
      }
    }

    const handleOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleOrientation)
    window.addEventListener("orientationchange", handleOrientation)
    
    // Initial check
    handleOrientation()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleOrientation)
      window.removeEventListener("orientationchange", handleOrientation)
    }
  }, [isManuallyHidden])

  const toggleVisibility = () => {
    if (isManuallyHidden) {
      setIsManuallyHidden(false)
      setIsVisible(true)
    } else {
      setIsVisible(false)
      setIsManuallyHidden(true)
    }
  }

  const handleContinue = async () => {
    setIsLoading(true)
    // Simulate API call or navigation
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    // Add your actual navigation or API call here
  }

  return (
    <>
      {/* Floating Reopen Button - Desktop */}
      <button
        onClick={toggleVisibility}
        className={`
          fixed z-50 transition-all duration-300
          ${isManuallyHidden ? "opacity-100" : "opacity-0 pointer-events-none"}
          hidden xl:flex items-center gap-2
          ${isLandscape 
            ? "right-8 top-1/2 -translate-y-1/2" 
            : "right-4 top-4"
          }
          bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg px-4 py-2 shadow-lg
          hover:bg-slate-50 hover:shadow-xl
        `}
      >
        <ShoppingCart className="w-5 h-5 text-slate-900" />
        <span className="text-sm font-medium text-slate-900">View Selection</span>
      </button>

      {/* Floating Reopen Button - Mobile */}
      <button
        onClick={toggleVisibility}
        className={`
          fixed z-50 transition-all duration-300
          ${isManuallyHidden ? "opacity-100" : "opacity-0 pointer-events-none"}
          xl:hidden
          bottom-4 right-4
          bg-white/95 backdrop-blur-sm border border-slate-200 rounded-full p-3 shadow-lg
          hover:bg-slate-50 hover:shadow-xl
        `}
      >
        <ShoppingCart className="w-6 h-6 text-slate-900" />
      </button>

      {/* Desktop Sidebar - Hidden on mobile and tablet */}
      <div
        className={`
          fixed z-50 transition-all duration-300
          ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"}
          hidden xl:block
          ${isLandscape ? "right-8 top-1/2 -translate-y-1/2 w-80" : "right-4 top-4 w-72"}
        `}
      >
        <Card className="bg-white/95 backdrop-blur-sm border border-slate-200 shadow-xl">
          {/* Toggle Button */}
          <button
            onClick={toggleVisibility}
            className={`
              absolute bg-white/95 backdrop-blur-sm border border-slate-200 shadow-lg hover:bg-slate-50 transition-colors
              ${isLandscape 
                ? "-left-10 top-1/2 -translate-y-1/2 rounded-l-lg p-2" 
                : "-left-8 top-0 -translate-y-1/2 rounded-l-lg p-1.5"
              }
            `}
          >
            {isManuallyHidden ? (
              <ChevronDown className={`${isLandscape ? "w-5 h-5" : "w-4 h-4"} text-slate-900`} />
            ) : (
              <X className={`${isLandscape ? "w-5 h-5" : "w-4 h-4"} text-slate-900`} />
            )}
          </button>

          <div className={`${isLandscape ? "p-6" : "p-4"} space-y-4`}>
            {/* Header */}
            <div className="space-y-2">
              <h3 className={`${isLandscape ? "text-lg" : "text-base"} font-semibold text-slate-900`}>Your Selection</h3>
              <div className="flex items-center justify-between">
                <Badge className="bg-slate-900 text-white px-3 py-1 text-sm">
                  {skip.size} Yard Skip
                </Badge>
                <span className={`${isLandscape ? "text-2xl" : "text-xl"} font-semibold text-slate-900`}>
                  £{totalPrice}
                </span>
              </div>
            </div>

            {/* Skip Details */}
            <div className="space-y-2">
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
                    <Truck className="w-4 h-4 text-slate-900 flex-shrink-0" />
                    <span className="text-slate-600">Road Placement Allowed</span>
                  </div>
                )}
                {skip.allows_heavy_waste && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Award className="w-4 h-4 text-slate-900 flex-shrink-0" />
                    <span className="text-slate-600">Heavy Waste Accepted</span>
                  </div>
                )}
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-900">Progress</h4>
              <div className="space-y-2">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-center space-x-2">
                    <div
                      className={`
                        w-5 h-5 rounded-full flex items-center justify-center
                        ${
                          step.completed
                            ? "bg-gradient-to-br from-green-500 to-emerald-600"
                            : step.current
                            ? "bg-gradient-to-br from-blue-600 to-purple-600"
                            : "bg-gray-200"
                        }
                      `}
                    >
                      {step.completed ? (
                        <CheckCircle className="w-3 h-3 text-white" />
                      ) : (
                        <step.icon className={`w-3 h-3 ${step.current ? "text-white" : "text-gray-400"}`} />
                      )}
                    </div>
                    <span
                      className={`
                        text-sm
                        ${
                          step.completed
                            ? "text-green-600"
                            : step.current
                            ? "text-blue-600 font-medium"
                            : "text-gray-500"
                        }
                      `}
                    >
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Button 
              className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white border-0 shadow-md relative"
              onClick={handleContinue}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <>
                  <span className="font-medium">Continue to Permits</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>

      {/* Mobile Bottom Bar - Hidden on desktop */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 xl:hidden
          ${isVisible ? "translate-y-0" : "translate-y-full pointer-events-none"}
        `}
      >
        <Card className="bg-white/95 backdrop-blur-sm border-t border-slate-200 shadow-lg rounded-t-xl">
          <div className="p-4">
            {/* Collapsed View */}
            <div
              className={`
                transition-all duration-300
                ${isExpanded ? "hidden" : "block"}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Badge className="bg-slate-900 text-white px-3 py-1 text-sm">
                    {skip.size} Yard Skip
                  </Badge>
                  <span className="text-lg font-semibold text-slate-900">
                    £{totalPrice}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-600"
                    onClick={toggleVisibility}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-600"
                    onClick={() => setIsExpanded(true)}
                  >
                    <ChevronUp className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Expanded View */}
            <div
              className={`
                transition-all duration-300
                ${isExpanded ? "block" : "hidden"}
              `}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Your Selection</h3>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-600"
                      onClick={toggleVisibility}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-600"
                      onClick={() => setIsExpanded(false)}
                    >
                      <ChevronUp className="w-5 h-5 rotate-180" />
                    </Button>
                  </div>
                </div>

                {/* Skip Details */}
                <div className="space-y-2">
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
                        <Truck className="w-4 h-4 text-slate-900 flex-shrink-0" />
                        <span className="text-slate-600">Road Placement Allowed</span>
                      </div>
                    )}
                    {skip.allows_heavy_waste && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Award className="w-4 h-4 text-slate-900 flex-shrink-0" />
                        <span className="text-slate-600">Heavy Waste Accepted</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-slate-900">Progress</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {steps.map((step) => (
                      <div key={step.id} className="flex flex-col items-center space-y-1">
                        <div
                          className={`
                            w-6 h-6 rounded-full flex items-center justify-center
                            ${
                              step.completed
                                ? "bg-gradient-to-br from-green-500 to-emerald-600"
                                : step.current
                                ? "bg-gradient-to-br from-blue-600 to-purple-600"
                                : "bg-gray-200"
                            }
                          `}
                        >
                          {step.completed ? (
                            <CheckCircle className="w-3 h-3 text-white" />
                          ) : (
                            <step.icon className={`w-3 h-3 ${step.current ? "text-white" : "text-gray-400"}`} />
                          )}
                        </div>
                        <span
                          className={`
                            text-xs text-center
                            ${
                              step.completed
                                ? "text-green-600"
                                : step.current
                                ? "text-blue-600 font-medium"
                                : "text-gray-500"
                            }
                          `}
                        >
                          {step.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button 
                  className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white border-0 shadow-md relative"
                  onClick={handleContinue}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <>
                      <span className="font-medium">Continue to Permits</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

export default FloatingSidebar 