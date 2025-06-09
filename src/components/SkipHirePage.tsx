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
import FloatingSidebar from './floating-sidebar';
import { ProgressSteps } from './progress-steps';
import { SelectedSkipSummary } from './selected-skip-summary';
import { SkipCard } from './skip-card';
import { TrustIndicators } from './trust-indicators';
import { Button } from './ui/button';

const steps: Step[] = [
  { id: 1, name: "Location", icon: MapPin, completed: true },
  { id: 2, name: "Waste Type", icon: Trash2, completed: true },
  { id: 3, name: "Skip Size", icon: Truck, completed: false, current: true },
  { id: 4, name: "Permits", icon: Shield, completed: false },
  { id: 5, name: "Schedule", icon: Calendar, completed: false },
];

const SkipHirePage: React.FC = () => {
  const { selectedSkip, selectSkip, calculateTotalPrice } = useSkipSelection(6);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedSkipData, setFetchedSkipData] = useState<Skip[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    const fetchSkips = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Skip[] = await response.json();
        setFetchedSkipData(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSkips();
  }, []);

  const handleContinue = async () => {
    setIsLoading(true);
    // Simulate API call or navigation
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Add your actual navigation or API call here
  };

  const skipDataToDisplay = fetchedSkipData.length > 0 ? fetchedSkipData : [];
  const selectedSkipData = skipDataToDisplay.find((skip) => skip.size === selectedSkip);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      {/* Progress Steps */}
      <div className="relative z-10">
        <ProgressSteps steps={steps} />
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div
            className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">
              Choose Your Perfect Skip
            </h1>
          </div>

          <div className="mt-8">
            <TrustIndicators />
          </div>
        </div>

        {/* Skip Grid */}
        {isLoading && <p className="text-center text-slate-600">Loading skip options...</p>}
        {error && <p className="text-center text-red-600">Error loading skips: {error}</p>}
        {!isLoading && !error && skipDataToDisplay.length === 0 && (
          <p className="text-center text-slate-600">No skip options available for this location.</p>
        )}
        {!isLoading && !error && skipDataToDisplay.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16">
            {skipDataToDisplay.map((skip, index) => (
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
        )}

        {/* Selected Skip Summary */}
        {selectedSkipData && (
          <div className="mb-8 sm:mb-12">
            <SelectedSkipSummary
              skip={selectedSkipData}
              totalPrice={calculateTotalPrice(selectedSkipData.price_before_vat, selectedSkipData.vat)}
            />
          </div>
        )}

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-8 sm:pt-12 border-t border-slate-200">
          <Button
            variant="outline"
            className="flex items-center justify-center space-x-3 h-12 px-6 bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 order-2 sm:order-1"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Previous Step</span>
          </Button>

          <Button
            className={`
              flex items-center justify-center space-x-3 h-12 px-8
              ${isLoading ? "bg-red-700 hover:bg-red-800" : "bg-slate-900 hover:bg-slate-800"}
              text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 order-1 sm:order-2 relative
            `}
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
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Floating Sidebar */}
      {selectedSkipData && (
        <FloatingSidebar
          skip={selectedSkipData}
          totalPrice={calculateTotalPrice(selectedSkipData.price_before_vat, selectedSkipData.vat)}
          steps={steps}
        />
      )}
    </div>
  );
};

export default SkipHirePage;
