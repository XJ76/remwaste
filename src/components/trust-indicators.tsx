import { Clock, Award, Zap } from "lucide-react"

export function TrustIndicators() {
  const indicators = [
    { icon: Clock, text: "Same Day Delivery", color: "text-blue-500" },
    { icon: Award, text: "Licensed & Insured", color: "text-green-500" },
    { icon: Zap, text: "Instant Booking", color: "text-purple-500" },
  ]

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-6 sm:mt-8">
      {indicators.map((indicator, index) => (
        <div key={index} className="flex items-center space-x-2 text-gray-600">
          <indicator.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${indicator.color}`} />
          <span className="font-medium text-sm sm:text-base">{indicator.text}</span>
        </div>
      ))}
    </div>
  )
}
