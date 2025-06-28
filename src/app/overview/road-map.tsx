import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import React from 'react'

const RoadMap = () => {
    const { elementRef: titleRef, isIntersecting: titleInView } = useIntersectionObserver<HTMLDivElement>({
        threshold: 0.3,
        rootMargin: '-50px'
    });
    const { elementRef: descRef, isIntersecting: descInView } = useIntersectionObserver<HTMLDivElement>({
        threshold: 0.3,
        rootMargin: '-50px'
    });

    const phases = [
        {
            title: "Phase 1",
            subtitle: "Foundation & Launch (Q2 2025)",
            items: ["Product Finalization", "White Paper & Community Building", "Pre-Launch Token Distribution"],
        },
        {
            title: "Phase 2",
            subtitle: "Official Launch & Early Growth (Q3 2025)",
            items: ["Mainnet Launch", "Token Distribution", "Initial Market Integration"],
        },
        {
            title: "Phase 3",
            subtitle: "Ecosystem Expansion & Feature Development (Q4 2025 - Q1 2026)",
            items: ["Enhanced Liquidity & Simulation Modules", "Stake & Premium Services Launch", "Global Outreach"],
        },
        {
            title: "Phase 4",
            subtitle: "Decentralized Governance & Long-Term Innovation (Q2 2026 and Beyond)",
            items: ["DAO Transition", "Cross-Chain Integrations", "Continuous Feature Enhancements", "Community Initiatives"],
        },
    ]
    return (
        <div className='bg-feature bg-[#020616BD]/60 z-50 w-full h-svh flex items-center justify-center relative pt-20 overflow-hidden '>
            <div className='absolute top-0 right-0 w-full h-full bg-[#0f121ad6] backdrop-blur-lg' />
            <div className='eclipse-box absolute bottom-[0%] left-[10%] w-[375px] h-[375px] z-20' style={{ background: '#0090ff57' }} />
            <div className='eclipse-box absolute top-[10%] right-[10%] w-[254px] h-[254px] z-20' style={{ background: '#15dffd63', filter: 'blur(50px)' }} />
            <div className=' relative mb-[5%] container mx-auto w-full flex flex-col gap-40'>
                <div className='flex flex-col items-center gap-6 mt-10 '>
                    <h2
                        ref={titleRef}
                        className={`title-feature text-[36px] xl:text-[43px] bg-clip-text absolute top-[-1px] left-0 w-full h-full text-center animate-fade-in-up ${titleInView ? 'in-view' : ''}`}
                    >
                        Road Map
                    </h2>
                    <div className='flex flex-col items-center justify-center gap-4 relative mt-10'>
                        <p
                            ref={descRef}
                            className={`text-neutral text-center text-base  xl:max-w-[1050px] max-w-[500px]  animate-fade-in-up-delayed ${descInView ? 'in-view' : ''}`}
                        >
                            The MEMEPUMP project is structured around a dynamic, phased roadmap designed to ensure a steady expansion of our ecosystem while consistently integrating community feedback and promoting innovation. Below is an outline of our planned milestones
                        </p>
                    </div>
                </div>
                <div className="relative h-full z-30">

                    {/* Phases */}
                    <div className="relative">
                        {/* Timeline Line */}


                        {/* Phases */}
                        <div className="flex">
                            {phases.map((phase, index) => (
                                <div key={index} className="relative flex-1">
                                    {/* Phase Card */}
                                    <div className="bg-transparent backdrop-blur-sm border-t border-b-0 border-l-0 border-r-0 border-white border-solid pt-10 p-6 pl-0  transition-all duration-300 hover:border-cyan-500/30">
                                        <div className="flex items-center gap-3 mb-4 lg:hidden">
                                            <div className="w-3 h-3 bg-cyan-400 rotate-45" />
                                            <div className="h-0.5 flex-1 bg-gradient-to-r from-cyan-500 to-transparent" />
                                        </div>

                                        <h3 className="text-3xl font-bold bg-gradient-to-t from-[#1366FF] to-[#00C0FF] bg-clip-text mb-2">{phase.title}</h3>
                                        <p className="bg-gradient-to-t from-[#1366FF] to-[#00C0FF] bg-clip-text text-base mb-6 leading-relaxed">{phase.subtitle}</p>

                                        <ul className="space-y-3">
                                            {phase.items.map((item, itemIndex) => (
                                                <li key={itemIndex} className="flex items-start gap-3 text-gray-300 text-sm">
                                                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className='absolute top-[-14px] left-[-2px] z-0'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                            <path d="M15 4L26 15L15 26L4 15L15 4Z" fill="#33FCFF" />
                                            <g filter="url(#filter0_f_453_3618)">
                                                <path d="M28.293 15L15 28.293L1.70703 15L15 1.70703L28.293 15Z" stroke="#33FCFF" stroke-opacity="0.8" />
                                            </g>
                                            <defs>
                                                <filter id="filter0_f_453_3618" x="0" y="0" width="30" height="30" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                                    <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_453_3618" />
                                                </filter>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>


            </div>
        </div>
    )
}

export default RoadMap