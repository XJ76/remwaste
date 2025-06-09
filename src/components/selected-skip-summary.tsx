import {
  Star,
  Truck,
} from 'lucide-react';

import type { Skip } from '../types/skip';
import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
} from './ui/card';

interface SelectedSkipSummaryProps {
  skip?: Skip
  totalPrice: number
}

export function SelectedSkipSummary({ skip, totalPrice }: SelectedSkipSummaryProps) {
  if (!skip) {
    return null
  }

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl sm:shadow-2xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-white/10 rounded-full -translate-y-16 sm:-translate-y-32 translate-x-16 sm:translate-x-32"></div>
      <CardContent className="p-4 sm:p-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center space-x-3 sm:space-x-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-bold text-white mb-1">{skip.size} Yard Skip Selected</h3>
              <p className="text-blue-100 font-medium text-sm sm:text-base">{skip.ideal_for}</p>
              <p className="text-blue-200 text-xs sm:text-sm">
                {skip.hire_period_days} day hire • {skip.capacity}
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right w-full sm:w-auto">
            <p className="text-2xl sm:text-4xl font-bold text-white mb-1">£{totalPrice}</p>
            <p className="text-blue-100 text-sm sm:text-base">including VAT & delivery</p>
            <Badge className="bg-white/20 text-white border-white/30 mt-2 text-xs sm:text-sm">
              <Star className="w-3 h-3 mr-1" />
              Premium Service
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
