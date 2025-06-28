"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface StakingContextType {
    refreshStakingData: () => void
    setRefreshTrigger: (trigger: number) => void
    refreshTrigger: number
}

const StakingContext = createContext<StakingContextType | undefined>(undefined)

export const useStakingContext = () => {
    const context = useContext(StakingContext)
    if (context === undefined) {
        throw new Error('useStakingContext must be used within a StakingProvider')
    }
    return context
}

interface StakingProviderProps {
    children: ReactNode
}

export const StakingProvider: React.FC<StakingProviderProps> = ({ children }) => {
    const [refreshTrigger, setRefreshTrigger] = useState(0)

    const refreshStakingData = () => {
        setRefreshTrigger(prev => prev + 1)
    }

    const value: StakingContextType = {
        refreshStakingData,
        setRefreshTrigger,
        refreshTrigger
    }

    return (
        <StakingContext.Provider value={value}>
            {children}
        </StakingContext.Provider>
    )
} 