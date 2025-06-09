import {
  Award,
  Clock,
  Zap,
} from 'lucide-react';

export function TrustIndicators() {
  const indicators = [
    { icon: Clock, text: "Same Day Delivery", color: "text-slate-900" },
    { icon: Award, text: "Licensed & Insured", color: "text-slate-900" },
    { icon: Zap, text: "Instant Booking", color: "text-slate-900" },
  ]

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mt-8 sm:mt-12">
      {indicators.map((indicator, index) => (
        <div 
          key={index} 
          className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-slate-200"
        >
          <div className="bg-slate-100 p-2 rounded-lg">
            <indicator.icon className={`w-5 h-5 ${indicator.color}`} />
          </div>
          <span className="font-medium text-slate-900">{indicator.text}</span>
        </div>
      ))}
    </div>
  )
}
