'use client'
import React from 'react'
import Features from './features'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import ExchangeToken from './exchange-token'

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

    return (
        <div className='flex flex-col gap-1 '>
            <div className='bg-overview bg-blue-200 z-50 w-full h-svh flex items-center justify-center relative overflow-hidden'>
                <div className='absolute top-[50%] right-0 animate-float'>
                    <img src="/box-elips.png" alt="bg-feature" className='2xl:max-w-max max-w-[230px] object-cover' />
                </div>
                <div className='absolute top-[20%] left-0 animate-float-delayed'>
                    <img src="/box-pan-elips.png" alt="bg-feature" className='2xl:max-w-max max-w-[230px] object-cover' />
                </div>
                <div className='container mx-auto px-4 relative mb-[10%]'>
                    <div className='flex flex-col items-center justify-center gap-10'>
                        <h1 
                            ref={titleRef}
                            className={`text-[80px] orbitron-font 2xl:text-[120px] tracking-[0.3em] font-bold text-center text-white uppercase bg-gradient-purple-cyan bg-clip-text animate-fade-in-up ${titleInView ? 'in-view' : ''}`}
                        >
                            MEMEPUMP
                        </h1> 
                        <p 
                            ref={descRef}
                            className={`text-neutral text-base 2xl:text-lg 2xl:max-w-[950px] max-w-[500px] text-center animate-fade-in-up-delayed ${descInView ? 'in-view' : ''}`}
                        >
                            MEMEPUMP is a community-driven memecoin platform on Solana, offering a groundbreaking trading and earning experience through DeFi incentives and decentralized governance.
                        </p>
                        <button 
                            ref={buttonRef}
                            className={`border-none 2xl:text-xl text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-1 2xl:py-2 rounded-full cursor-pointer animate-fade-in-up-more-delayed hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-purple-500/50 ${buttonInView ? 'in-view' : ''}`}
                        >
                            <span>
                                Join us
                            </span>
                        </button>
                    </div>
                    
                </div>
            </div>
            <Features />
            <ExchangeToken />
        </div>

    )
}

export default page