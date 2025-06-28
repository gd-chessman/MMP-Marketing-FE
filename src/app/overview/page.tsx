'use client'
import React from 'react'
import Features from './features'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useActiveSection } from '@/hooks/useActiveSection'
import ExchangeToken from './exchange-token'
import Tokenomics from './tokenomics'
import OurTeam from './our-team'
import RoadMap from './road-map'
import Footer from './footer'
import NavigationTabs from '@/components/NavigationTabs'

const page = () => {
    const { elementRef: titleRef, isIntersecting: titleInView } = useIntersectionObserver<HTMLHeadingElement>({
        threshold: 0.3,
        rootMargin: '-50px'
    });

    const { elementRef: descRef, isIntersecting: descInView } = useIntersectionObserver<HTMLParagraphElement>({
        threshold: 0.3,
        rootMargin: '-50px'
    });

    const { elementRef: buttonRef, isIntersecting: buttonInView } = useIntersectionObserver<HTMLButtonElement>({
        threshold: 0.3,
        rootMargin: '-50px'
    });

    const activeSection = useActiveSection();

    return (
        <div className='flex flex-col'>
            {/* Join Us Section */}
            <div id="join-us" className='bg-overview bg-blue-200 z-50 w-full min-h-screen sm:h-svh flex items-center justify-center relative overflow-hidden'>
                <div className='absolute top-[30%] sm:top-[40%] md:top-[50%] right-0 sm:right-4 md:right-8 animate-float'>
                    <img src="/box-elips.png" alt="bg-feature" className='max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[200px] 2xl:max-w-[230px] object-cover' />
                </div>
                <div className='absolute top-[10%] sm:top-[15%] md:top-[20%] left-0 sm:left-4 md:left-8 animate-float-delayed'>
                    <img src="/box-pan-elips.png" alt="bg-feature" className='max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[200px] 2xl:max-w-[230px] object-cover' />
                </div>
                <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative mb-[5%] sm:mb-[8%] lg:mb-[10%]'>
                    <div className='flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10'>
                        <h1 
                            ref={titleRef}
                            className={`text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] 2xl:text-[120px] orbitron-font tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.3em] font-bold text-center text-white uppercase bg-gradient-purple-cyan bg-clip-text animate-fade-in-up mobile-text-shadow ${titleInView ? 'in-view' : ''}`}
                        >
                            MEMEPUMP
                        </h1> 
                        <p 
                            ref={descRef}
                            className={`text-neutral text-sm sm:text-base md:text-lg 2xl:text-xl max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[700px] 2xl:max-w-[950px] text-center animate-fade-in-up-delayed ${descInView ? 'in-view' : ''}`}
                        >
                            MEMEPUMP is a community-driven memecoin platform on Solana, offering a groundbreaking trading and earning experience through DeFi incentives and decentralized governance.
                        </p>
                        <button 
                            ref={buttonRef}
                            className={`border-none text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 sm:px-8 md:px-10 py-2 sm:py-2 md:py-3 2xl:py-4 rounded-full cursor-pointer animate-fade-in-up-more-delayed hover:scale-105 active:scale-95 transition-transform duration-300 hover:shadow-lg hover:shadow-purple-500/50 touch-manipulation ${buttonInView ? 'in-view' : ''}`}
                        >
                            <span>
                                Join us
                            </span>
                        </button>
                    </div>
                    
                </div>
            </div>
            
            {/* Features Section */}
            <div id="features">
                <Features />
            </div>
            
            {/* Exchange Token Section */}
            <div id="exchange-token">
                <ExchangeToken />
            </div>
            
            {/* Tokenomics Section */}
            <div id="tokenomics">
                <Tokenomics />
            </div>
            
            {/* Our Team Section */}
            <div id="our-team">
                <OurTeam />
            </div>
            
            {/* Road Map Section */}
            <div id="road-map">
                <RoadMap />
            </div>
            
            {/* Footer Section */}
            <div id="footer">
                <Footer />
            </div>

            {/* Navigation Tabs */}
            <NavigationTabs activeSection={activeSection} />
        </div>

    )
}

export default page