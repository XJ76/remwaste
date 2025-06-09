import { CheckCircle } from "lucide-react"
import type { Step } from "../types/skip"

interface ProgressStepsProps {
  steps: Step[]
}

export function ProgressSteps({ steps }: ProgressStepsProps) {
  return (
    <div className="bg-white/60 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex items-center justify-center sm:justify-between">
          {steps.map((step, stepIdx) => (
            <div key={step.id} className="flex items-center flex-shrink-0">
              <div className="flex items-center">
                <div
                  className={`
                    relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl 
                    transition-all duration-500 transform
                    ${
                      step.completed
                        ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg scale-110"
                        : step.current
                          ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl scale-110"
                          : "bg-white border-2 border-gray-200 text-gray-400 shadow-sm"
                    }
                  `}
                >
                  {step.completed ? (
                    <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6" />
                  ) : (
                    <step.icon className="w-4 h-4 sm:w-6 sm:h-6" />
                  )}
                  {step.current && (
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 animate-ping opacity-20"></div>
                  )}
                </div>
                <div className="ml-2 sm:ml-4 hidden md:block">
                  <p
                    className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                      step.completed || step.current ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {step.name}
                  </p>
                  {step.current && <p className="text-xs text-blue-600 font-medium">Current Step</p>}
                </div>
              </div>
              {stepIdx < steps.length - 1 && (
                <div
                  className={`
                    hidden md:block w-8 lg:w-16 xl:w-20 h-1 ml-4 sm:ml-6 rounded-full transition-all duration-500
                    ${step.completed ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gray-200"}
                  `}
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile Step Names */}
        <div className="block md:hidden mt-4 text-center">
          {steps.map(
            (step) =>
              step.current && (
                <div key={step.id}>
                  <p className="text-sm font-semibold text-gray-900">{step.name}</p>
                  <p className="text-xs text-blue-600 font-medium">Current Step</p>
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  )
}
