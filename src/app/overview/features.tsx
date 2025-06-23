'use client'
import BoxFeauture from '@/components/border'
import React from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const features = () => {
    const { elementRef: titleRef, isIntersecting: titleInView } = useIntersectionObserver<HTMLHeadingElement>({
        threshold: 0.3,
        rootMargin: '-50px'
    });

    const { elementRef: title2Ref, isIntersecting: title2InView } = useIntersectionObserver<HTMLHeadingElement>({
        threshold: 0.3,
        rootMargin: '-50px'
    });

    const { elementRef: imageRef, isIntersecting: imageInView } = useIntersectionObserver<HTMLDivElement>({
        threshold: 0.2,
        rootMargin: '-50px'
    });

    const { elementRef: feature1Ref, isIntersecting: feature1InView } = useIntersectionObserver<HTMLDivElement>({
        threshold: 0.3,
        rootMargin: '-50px'
    });

    const { elementRef: feature2Ref, isIntersecting: feature2InView } = useIntersectionObserver<HTMLDivElement>({
        threshold: 0.3,
        rootMargin: '-50px'
    });

    const { elementRef: feature3Ref, isIntersecting: feature3InView } = useIntersectionObserver<HTMLDivElement>({
        threshold: 0.3,
        rootMargin: '-50px'
    });

    const { elementRef: feature4Ref, isIntersecting: feature4InView } = useIntersectionObserver<HTMLDivElement>({
        threshold: 0.3,
        rootMargin: '-50px'
    });

    return (
        <div className='bg-feature bg-[#020616BD]/60 z-50 w-full h-svh flex items-center justify-center relative pt-20 overflow-hidden'>
            <div className='absolute top-0 right-0 w-full h-full bg-[#020616c2]' />
            <div className='h-[50vh] flex items-center justify-center border-l-2 border-r-0 border-t-0 border-b-0 border-gray-500 border-solid absolute bottom-0 right-[27%] z-10 animate-pulse-slow'>
                <svg style={{ marginTop: '9vh', marginLeft: '10px' }} xmlns="http://www.w3.org/2000/svg" width="19" height="156" viewBox="0 0 19 156" fill="none">
                    <path d="M0.5 18L18.5 0V12L0.5 30V18Z" fill="url(#paint0_linear_391_1118)" />
                    <path d="M0.5 36L18.5 18V30L0.5 48V36Z" fill="url(#paint1_linear_391_1118)" />
                    <path d="M0.5 54L18.5 36V48L0.5 66V54Z" fill="url(#paint2_linear_391_1118)" />
                    <path d="M0.5 72L18.5 54V66L0.5 84V72Z" fill="url(#paint3_linear_391_1118)" />
                    <path d="M0.5 90L18.5 72V84L0.5 102V90Z" fill="url(#paint4_linear_391_1118)" />
                    <path d="M0.5 108L18.5 90V102L0.5 120V108Z" fill="url(#paint5_linear_391_1118)" />
                    <path d="M0.5 126L18.5 108V120L0.5 138V126Z" fill="url(#paint6_linear_391_1118)" />
                    <path d="M0.5 144L18.5 126V138L0.5 156V144Z" fill="url(#paint7_linear_391_1118)" />
                    <defs>
                        <linearGradient id="paint0_linear_391_1118" x1="0.430882" y1="8.70967" x2="17.1753" y2="8.78155" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#330C5E" />
                            <stop offset="1" stop-color="#0F2A58" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_391_1118" x1="0.430882" y1="26.7097" x2="17.1753" y2="26.7815" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#330C5E" />
                            <stop offset="1" stop-color="#0F2A58" />
                        </linearGradient>
                        <linearGradient id="paint2_linear_391_1118" x1="0.430882" y1="44.7097" x2="17.1753" y2="44.7815" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#330C5E" />
                            <stop offset="1" stop-color="#0F2A58" />
                        </linearGradient>
                        <linearGradient id="paint3_linear_391_1118" x1="0.430882" y1="62.7097" x2="17.1753" y2="62.7815" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#330C5E" />
                            <stop offset="1" stop-color="#0F2A58" />
                        </linearGradient>
                        <linearGradient id="paint4_linear_391_1118" x1="0.430882" y1="80.7097" x2="17.1753" y2="80.7815" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#330C5E" />
                            <stop offset="1" stop-color="#0F2A58" />
                        </linearGradient>
                        <linearGradient id="paint5_linear_391_1118" x1="0.430882" y1="98.7097" x2="17.1753" y2="98.7815" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#330C5E" />
                            <stop offset="1" stop-color="#0F2A58" />
                        </linearGradient>
                        <linearGradient id="paint6_linear_391_1118" x1="0.430882" y1="116.71" x2="17.1753" y2="116.782" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#330C5E" />
                            <stop offset="1" stop-color="#0F2A58" />
                        </linearGradient>
                        <linearGradient id="paint7_linear_391_1118" x1="0.430882" y1="134.71" x2="17.1753" y2="134.782" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#330C5E" />
                            <stop offset="1" stop-color="#0F2A58" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className='h-[10vh] w-[2px] bg-gray-500 absolute top-[47%] right-[22%] z-10 animate-pulse'>
                <div className={"w-2 h-2 rounded-full bg-gray-500 absolute top-0 left-[-3px] z-10 animate-ping"} />
            </div>
            <div className='absolute top-0 left-[22%] z-10 '>
                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="551" viewBox="0 0 90 551" fill="none">
                    <path d="M1 0L34.5 33.5V255.5L89 310V550.5" stroke="white" stroke-opacity="0.4" />
                </svg>
                <div className='w-1 h-4 bg-gray-500 absolute top-[15%] left-[36%] z-10 animate-pulse' />
            </div>
            <div className='h-full mx-36 py-8 relative z-20'>
                <div className='flex flex-col items-center justify-center gap-4 relative h-[50px]'>
                    <h2 
                        ref={titleRef}
                        className={`title-feature text-[36px] xl:text-[48px] bg-clip-text absolute top-0 left-0 w-full h-full text-center animate-fade-in-up ${titleInView ? 'in-view' : ''}`}
                    >
                        Key Features
                    </h2>
                    <h3 
                        ref={title2Ref}
                        className={`text-[#DFE0EF] text-[36px] xl:text-[48px] webkit-text-stroke-1 font-bold bg-black/60 xl:min-w-[440px] min-w-[300px] h-full text-center z-10 leading-none animate-fade-in-up-delayed ${title2InView ? 'in-view' : ''}`}
                    >
                        Key Features
                    </h3>
                </div>
                <div className='flex justify-between items-center xl:mx-10 mx-20'>
                    <div 
                        ref={imageRef}
                        className={`animate-fade-in-left animate-float ${imageInView ? 'in-view' : ''}`}
                    >
                        <img src="/layout-features.png" alt="feature-1" className='max-h-[1000px] w-full min-w-[400px] xl:min-w-[800px] h-auto object-cover' />
                    </div>
                    <div className='flex flex-col md:flex-row justify-center items-start gap-6 flex-1'>
                        {/* Left Column */}
                        <div className='flex flex-col gap-[140px] w-full  md:w-1/2 md:max-w-md md:mt-[23%]'>
                            <div 
                                ref={feature1Ref}
                                className={`animate-fade-in-up-delayed hover:scale-105 transition-transform duration-300 ${feature1InView ? 'in-view' : ''}`}
                            >
                                <BoxFeauture>
                                    <div className='text-neutral text-base xl:text-xl font-medium bg-gradient-to-t from-white to-[#00C0FF] bg-clip-text'>Hybrid DeFi + Simulated Trading</div>
                                    <div className='text-neutral text-sm xl:text-lg mt-2'>
                                        A unique ecosystem combining real trading with risk-free simulation markets.
                                    </div>
                                </BoxFeauture>
                            </div>
                            <div 
                                ref={feature2Ref}
                                className={`animate-fade-in-up-more-delayed hover:scale-105 transition-transform duration-300 ${feature2InView ? 'in-view' : ''}`}
                            >
                                <BoxFeauture>
                                    <div className='text-neutral text-base xl:text-xl font-medium bg-gradient-to-t from-white to-[#00C0FF] bg-clip-text'>Global Expansion Focus</div>
                                    <div className='text-neutral text-sm xl:text-lg mt-2'>
                                        Aggressive marketing and partnerships to ensure long-term growth.
                                    </div>
                                </BoxFeauture>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className='flex flex-col gap-[140px] w-full'>
                            <div 
                                ref={feature3Ref}
                                className={`animate-fade-in-up-delayed hover:scale-105 transition-transform duration-300 ${feature3InView ? 'in-view' : ''}`}
                            >
                                <BoxFeauture>
                                    <div className='text-neutral text-base xl:text-xl font-medium bg-gradient-to-t from-white to-[#00C0FF] bg-clip-text'>55% Community Rewards</div>
                                    <div className='text-neutral text-sm xl:text-lg mt-2'>
                                        The largest share of tokens goes directly to users via trading incentives, staking, and engagement.
                                    </div>
                                </BoxFeauture>
                            </div>
                            <div 
                                ref={feature4Ref}
                                className={`animate-fade-in-up-more-delayed hover:scale-105 transition-transform duration-300 ${feature4InView ? 'in-view' : ''}`}
                            >
                                <BoxFeauture>
                                    <div className='text-neutral text-base xl:text-xl font-medium bg-gradient-to-t from-white to-[#00C0FF] bg-clip-text'>DAO-Ready Governance</div>
                                    <div className='text-neutral text-sm xl:text-lg mt-2'>
                                        A portion of reserves is allocated for future decentralized decision-making.
                                    </div>
                                </BoxFeauture>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default features