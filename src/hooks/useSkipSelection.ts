"use client"

import { useState, useCallback } from "react"

export function useSkipSelection(initialSkipSize = 6) {
  const [selectedSkip, setSelectedSkip] = useState<number>(initialSkipSize)

  const selectSkip = useCallback((skipSize: number) => {
    setSelectedSkip(skipSize)
  }, [])

  const calculateTotalPrice = useCallback((priceBeforeVat: number, vat: number) => {
    return Math.round(priceBeforeVat * (1 + vat / 100))
  }, [])

  return {
    selectedSkip,
    selectSkip,
    calculateTotalPrice,
  }
}
