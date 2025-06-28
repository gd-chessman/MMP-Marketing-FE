import React, { useState, useEffect } from 'react';

const BorderPrimary = ({ children }: { children: React.ReactNode }) => {
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

    return (
        <div className="relative w-[100%] h-auto aspect-[417/261] group transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg">
            {/* Top decorative SVG - responsive positioning */}
            <svg xmlns="http://www.w3.org/2000/svg" width="199" height="52" viewBox="0 0 199 52" fill="none" className="transition-all duration-300 ease-in-out group-hover:drop-shadow-lg">
                <g filter="url(#filter0_d_473_1846)">
                    <path d="M7.9587 19.029L36.0332 2.59581C37.2592 1.87823 38.654 1.5 40.0745 1.5H187C191.418 1.5 195 5.08173 195 9.5V21.3785C195 24.2919 193.416 26.975 190.865 28.3827L163.464 43.5042C162.281 44.1574 160.951 44.5 159.599 44.5H12C7.58172 44.5 4 40.9183 4 36.5V25.9332C4 23.0921 5.50679 20.4642 7.9587 19.029Z" fill="url(#paint0_linear_473_1846)" className="transition-all duration-300 ease-in-out group-hover:brightness-110" />
                </g>
                <defs>
                    <filter id="filter0_d_473_1846" x="0" y="0.5" width="199" height="51" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="3" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.176471 0 0 0 0 0.509804 0 0 0 0 0.568627 0 0 0 0.19 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_473_1846" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_473_1846" result="shape" />
                    </filter>
                    <linearGradient id="paint0_linear_473_1846" x1="102.178" y1="1.5" x2="101.78" y2="44.5211" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#15DFFD" />
                        <stop offset="1" stop-color="#014185" />
                    </linearGradient>
                </defs>
            </svg>
 
            {/* Content container - responsive padding */}
            <div className="flex flex-col xl:gap-4 gap-1 justify-center w-full items-center top-0 left-1 absolute z-10 py-[8px] cursor-pointer text-neutral font-bold text-lg transition-all duration-300 ease-in-out group-hover:text-white group-hover:scale-105">
                {children}
            </div>
        </div>
    );
};

export default BorderPrimary;