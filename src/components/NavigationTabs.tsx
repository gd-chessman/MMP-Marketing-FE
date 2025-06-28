'use client'
import React, { useState, useEffect } from 'react'

interface NavigationTabsProps {
    activeSection: string
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeSection }) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            setIsVisible(scrollY > 100)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }

    const navigationItems = [
        { id: 'join-us', label: 'Intro' },
        { id: 'features', label: 'Highlights'},
        { id: 'exchange-token', label: 'Coins'},
        { id: 'tokenomics', label: 'Tokenomics'},
        { id: 'our-team', label: 'Teams'},
        { id: 'road-map', label: 'RoadMap'},
        { id: 'footer', label: 'Footer'}
    ]

    return (
        <div className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className=" backdrop-blur-md rounded-full p-2 border ">
                <div className="flex flex-col gap-10">
                    {navigationItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`h-5 w-5 border-2 flex items-center cursor-pointer hover:border-primary justify-center ${activeSection === item.id ? 'border-primary' : 'border-white'} bg-transparent rounded-full relative`}
                            title={item.label}
                        >
                            {activeSection === item.id && <div className='absolute top-[-30px] right-[150%] flex items-center justify-center'>
                                <p className='text-primary mr-2 text-base font-bold'>{item.label}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="77" viewBox="0 0 19 77" fill="none">
                                    <path d="M18 0V19.5L1 36.5L18 53.5V77" stroke="url(#paint0_linear_473_1819)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_473_1819" x1="9.5" y1="77" x2="9.5" y2="0" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#5558FF" />
                                            <stop offset="1" stop-color="#00C0FF" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>}
                            <div className={`h-3 w-3 border rounded-full ${activeSection === item.id ? 'bg-primary' : 'border-white'}`} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NavigationTabs 