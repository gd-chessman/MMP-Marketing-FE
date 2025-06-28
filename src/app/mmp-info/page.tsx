'use client'
import BoxFeauture from '@/components/border'
import React, { useState, useEffect } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import BorderPrimary from '@/components/border-primary'
import TokenomicMMP from './tokenomic'

const MmpInfo = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setWindowWidth(window.innerWidth);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { elementRef: titleRef, isIntersecting: titleInView } = useIntersectionObserver<HTMLHeadingElement>({
        threshold: 0.3,
        rootMargin: '-50px'
    });

    const { elementRef: mmpImageRef, isIntersecting: mmpImageInView } = useIntersectionObserver<HTMLImageElement>({
        threshold: 0.3,
        rootMargin: '-50px'
    });

    const { elementRef: mmpTextRef, isIntersecting: mmpTextInView } = useIntersectionObserver<HTMLDivElement>({
        threshold: 0.3,
        rootMargin: '-50px'
    });

    const { elementRef: mmpButtonRef, isIntersecting: mmpButtonInView } = useIntersectionObserver<HTMLDivElement>({
        threshold: 0.3,
        rootMargin: '-50px'
    });

    const { elementRef: mmpDescRef, isIntersecting: mmpDescInView } = useIntersectionObserver<HTMLParagraphElement>({
        threshold: 0.3,
        rootMargin: '-50px'
    });

    return (
        <div className='flex flex-col'>
            <div className='bg-feature bg-[#020616BD]/60 z-50 w-full sm:h-svh flex items-center justify-center relative pt-10 sm:pt-16 md:pt-20 overflow-hidden'>
                <div className='absolute top-0 right-0 w-full h-full bg-[#0f121ad6] backdrop-blur-lg' />
                <div className='eclipse-box absolute top-[10%] right-[10%] w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[254px] md:h-[254px] z-20' style={{ background: '#15dffd63', filter: 'blur(30px) sm:blur(40px) md:blur(50px)' }} />

                <div className='container mx-auto '>
                    <div className="flex flex-col h-svh items-center justify-center gap-10">
                        <h1
                            ref={titleRef}
                            className={`text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] 2xl:text-[120px] orbitron-font tracking-[0.1em] font-bold text-center text-white uppercase bg-gradient-purple-cyan bg-clip-text animate-fade-in-up mobile-text-shadow ${titleInView ? 'in-view' : ''}`}
                        >
                            MMP
                        </h1>

                        <div className='w-full flex-1 flex flex-col items-center justify-center gap-10'>
                            <img
                                ref={mmpImageRef}
                                src="/MMP-hex.png"
                                alt="exchange-token"
                                className={`w-full max-w-[280px] h-auto object-cover animate-fade-in-up ${mmpImageInView ? 'in-view' : ''}`}
                            />
                        </div>
                        <div className='flex items-center justify-center h-[220px] bg-gradient-to-l from-[#0b4343]/70 to-[#014185]/70 w-full backdrop-blur-lg rounded-lg overflow-hidden'>
                            <div className="border-4 rounded-l-lg border-r-0 border-solid border-[#33FCFF] h-full w-16" />
                            <div className='flex items-center justify-around flex-1 h-[100%] overflow-hidden '>
                                <div className='flex flex-col items-center justify-center gap-4'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='text-neutral text-4xl font-bold bg-transparent'>Introduction to the
                                        </h3><span className=" text-4xl font-bold bg-gradient-to-t from-[#33FCFF] to-[#2492FE] bg-clip-text">MemePump Project (MMP)</span>
                                    </div>
                                    <p className='text-neutral text-base px-10 text-center'>
                                        The MemePump (MMP) project is a groundbreaking initiative in the world of cryptocurrency, particularly in the Web3 space and decentralized platforms, aimed at introducing a new type of liquidity token. MMP is not just a cryptocurrency; it is a tool for creating value and opportunities for the community, with the goal of building a sustainable and robust ecosystem. Developed on the Solana platform, MemePump seeks to transform how users interact and engage in the cryptocurrency space.
                                    </p>
                                </div>
                            </div>
                            <div className="border-4 rounded-r-lg border-l-0 border-solid border-[#33FCFF] h-full w-16" />
                        </div>
                    </div>
                </div>
            </div>
            <TokenomicMMP />
        </div>
    )
}

export default MmpInfo