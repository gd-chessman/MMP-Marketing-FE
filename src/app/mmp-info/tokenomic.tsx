'use client'
import BorderTokenomic from '@/components/border-tokenomic';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import React, { useEffect, useState } from 'react'

const TokenomicMMP = () => {
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
    const { elementRef: titleRef, isIntersecting: titleInView } = useIntersectionObserver<HTMLDivElement>({
        threshold: 0.3,
        rootMargin: '-50px'
    });

    const { elementRef: title2Ref, isIntersecting: title2InView } = useIntersectionObserver<HTMLDivElement>({
        threshold: 0.3,
        rootMargin: '-50px'
    });

    const { elementRef: descRef, isIntersecting: descInView } = useIntersectionObserver<HTMLDivElement>({
        threshold: 0.3,
        rootMargin: '-50px'
    });

    return (
        <div className='bg-feature bg-[#020616BD]/60 z-50 w-full h-svh flex  justify-center relative pt-[6%] overflow-hidden'>
            <div className='absolute top-0 right-0 w-full h-full bg-[#0f121ad6] backdrop-blur-lg' />
            <div className='eclipse-box absolute bottom-[10%] left-[10%] w-[375px] h-[375px] z-20' style={{background: '#0090ff57'}}/>
            <div className='eclipse-box absolute top-[10%] right-[10%] w-[254px] h-[254px] z-20' style={{background: '#15dffd63', filter: 'blur(50px)'}}/>
            <div className='container mx-auto px-4 relative flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center justify-center gap-4 bg-black/60 w-fit pb-8'>
                    <h2
                        ref={titleRef}
                        className={`title-feature text-[36px] xl:text-[43px] bg-clip-text absolute ${isClient && windowWidth < 1800 ? 'top-0' : 'top-[0px]'} left-0 w-full h-full text-center animate-fade-in-up ${titleInView ? 'in-view' : ''}`}
                    >
                        TOKENOMICS
                    </h2>
                    {/* <h3
                        ref={title2Ref}
                        className={`text-[#DFE0EF] text-[32px] webkit-text-stroke-1 font-bold h-[50px] bg-black/60 xl:min-w-[440px] min-w-[300px] flex items-center justify-center text-center z-10 leading-none animate-fade-in-up-delayed ${title2InView ? 'in-view' : ''}`}
                    >
                        TOKENOMICS
                    </h3> */}
                </div>
                <div className='flex flex-col items-center justify-center gap-4 relative h-[50px] mt-10'>
                    <p
                        ref={descRef}
                        className={`text-neutral text-center text-sm  xl:max-w-[1050px] max-w-[460px]  animate-fade-in-up-delayed ${descInView ? 'in-view' : ''}`}
                    >
                        MMP and MPB are two pioneering exchange-issued coins that represent a breakthrough in the world of Web3 and decentralized platforms. Built on Solana, they are not just liquidity tokens but also tools for creating value and opportunities for the community, aiming to establish a sustainable and powerful ecosystem.
                    </p>

                </div>
            </div>
        </div>
    )
}

export default TokenomicMMP