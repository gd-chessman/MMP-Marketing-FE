import React, { useState, useEffect } from 'react';

const BorderOurTeam = ({ children, className }: { children: React.ReactNode, className?: string }) => {
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
        <div className={`relative w-[100%] h-auto aspect-[417/261] ${isClient && windowWidth < 1600 ? 'aspect-[310/198]' : 'aspect-[417/261]'} ${className}`}>
            {/* Top decorative SVG - responsive positioning */}
            <svg xmlns="http://www.w3.org/2000/svg" width="310" height="198" viewBox="0 0 310 198" fill="none" className='absolute top-0 left-0 w-full h-full'>
                <g filter="url(#filter0_d_453_2931)">
                    <path d="M5.5 34.5L16 45L16.5 114L5 125.5V176.5L16 189H277.5L305 161.5V12.5L293.5 1H194L182.5 12.5H108L96 1H17L5.5 12.5V34.5Z" fill="url(#paint0_linear_453_2931)" shape-rendering="crispEdges" />
                    <path d="M5.5 34.5L16 45L16.5 114L5 125.5V176.5L16 189H277.5L305 161.5V12.5L293.5 1H194L182.5 12.5H108L96 1H17L5.5 12.5V34.5Z" stroke="white" shape-rendering="crispEdges" />
                </g>
                <defs>
                    <filter id="filter0_d_453_2931" x="0.5" y="0.5" width="309" height="197" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_453_2931" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_453_2931" result="shape" />
                    </filter>
                    <linearGradient id="paint0_linear_453_2931" x1="155" y1="1" x2="155" y2="189" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#7FDDFF" stop-opacity="0" />
                        <stop offset="0.511314" stop-color="#3CA8CD" stop-opacity="0.39" />
                        <stop offset="1" stop-color="#33FCFF" />
                    </linearGradient>
                </defs>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="65" height="10" viewBox="0 0 65 10" fill="none" className='absolute top-0 left-[36%] z-10' style={{transform: 'rotate(180deg)'}}>
                <path d="M55.0565 9.4248L64.4697 0.000226021H58.1942L48.781 9.4248H55.0565Z" fill="url(#paint0_linear_453_3046)" />
                <path d="M42.8622 9.4248L52.2754 0.000226021H45.9999L36.5867 9.4248H42.8622Z" fill="url(#paint1_linear_453_3046)" />
                <path d="M30.6659 9.4248L40.0791 0.000226021H33.8036L24.3904 9.4248H30.6659Z" fill="url(#paint2_linear_453_3046)" />
                <path d="M18.4706 9.4248L27.8838 0.000226021H21.6083L12.1951 9.4248H18.4706Z" fill="url(#paint3_linear_453_3046)" />
                <path d="M6.27524 9.4248L15.6885 0.000226021H9.41298L-0.000253677 9.4248H6.27524Z" fill="url(#paint4_linear_453_3046)" />
                <defs>
                    <linearGradient id="paint0_linear_453_3046" x1="59.9149" y1="9.46099" x2="59.8773" y2="0.693824" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#050509" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_453_3046" x1="47.7206" y1="9.46099" x2="47.6829" y2="0.693824" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#050509" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_453_3046" x1="35.5243" y1="9.46099" x2="35.4866" y2="0.693824" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#050509" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_453_3046" x1="23.329" y1="9.46099" x2="23.2913" y2="0.693824" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#050509" />
                    </linearGradient>
                    <linearGradient id="paint4_linear_453_3046" x1="11.1337" y1="9.46099" x2="11.096" y2="0.693824" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#050509" />
                    </linearGradient>
                </defs>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="65" viewBox="0 0 10 65" fill="none" className='absolute bottom-[44%] left-1 mx-auto z-10'>
                <path d="M0 55.0565L9.42458 64.4697V58.1942L0 48.781L0 55.0565Z" fill="url(#paint0_linear_453_3052)" />
                <path d="M0 42.8617L9.42458 52.2749V45.9994L0 36.5862L0 42.8617Z" fill="url(#paint1_linear_453_3052)" />
                <path d="M0 30.6659L9.42458 40.0791V33.8036L0 24.3904L0 30.6659Z" fill="url(#paint2_linear_453_3052)" />
                <path d="M0 18.471L9.42458 27.8843V21.6088L0 12.1955L0 18.471Z" fill="url(#paint3_linear_453_3052)" />
                <path d="M0 6.27573L9.42458 15.689V9.41347L0 0.000234604L0 6.27573Z" fill="url(#paint4_linear_453_3052)" />
                <defs>
                    <linearGradient id="paint0_linear_453_3052" x1="-0.0361891" y1="59.9149" x2="8.73098" y2="59.8773" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#C2A4CA" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_453_3052" x1="-0.0361891" y1="47.7201" x2="8.73098" y2="47.6824" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#C2A4CA" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_453_3052" x1="-0.0361891" y1="35.5243" x2="8.73098" y2="35.4866" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#C2A4CA" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_453_3052" x1="-0.0361891" y1="23.3295" x2="8.73098" y2="23.2918" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#C2A4CA" />
                    </linearGradient>
                    <linearGradient id="paint4_linear_453_3052" x1="-0.0361891" y1="11.1342" x2="8.73098" y2="11.0965" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#C2A4CA" />
                    </linearGradient>
                </defs>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="145" viewBox="0 0 14 145" fill="none" className='absolute bottom-8 right-3 h-[70%] mx-auto z-10'>
                <path d="M0 13.4562L13.4724 0L13.4724 8.97079L0 22.427L0 13.4562Z" fill="url(#paint0_linear_453_3058)" />
                <path d="M0 30.8893L13.4724 17.4331L13.4724 26.4039L0 39.8601L0 30.8893Z" fill="url(#paint1_linear_453_3058)" />
                <path d="M0 48.3224L13.4724 34.8662L13.4724 43.837L0 57.2932L0 48.3224Z" fill="url(#paint2_linear_453_3058)" />
                <path d="M0 65.7555L13.4724 52.2993L13.4724 61.2701L0 74.7263L0 65.7555Z" fill="url(#paint3_linear_453_3058)" />
                <path d="M0 83.1886L13.4724 69.7324L13.4724 78.7032L0 92.1594L0 83.1886Z" fill="url(#paint4_linear_453_3058)" />
                <path d="M0 100.622L13.4724 87.1655L13.4724 96.1363L0 109.592L0 100.622Z" fill="url(#paint5_linear_453_3058)" />
                <path d="M0 118.055L13.4724 104.599L13.4724 113.569L0 127.026L0 118.055Z" fill="url(#paint6_linear_453_3058)" />
                <path d="M0 135.487L13.4724 122.031L13.4724 131.002L0 144.458L0 135.487Z" fill="url(#paint7_linear_453_3058)" />
                <defs>
                    <linearGradient id="paint0_linear_453_3058" x1="-2" y1="7.21908" x2="20.8647" y2="1.88978" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#9B9B9D" />
                        <stop offset="1" stop-color="#F1B0FE" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_453_3058" x1="-2" y1="24.6522" x2="20.8647" y2="19.3229" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#9B9B9D" />
                        <stop offset="1" stop-color="#F1B0FE" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_453_3058" x1="-2" y1="42.0853" x2="20.8647" y2="36.756" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#9B9B9D" />
                        <stop offset="1" stop-color="#F1B0FE" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_453_3058" x1="-2" y1="59.5184" x2="20.8647" y2="54.1891" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#9B9B9D" />
                        <stop offset="1" stop-color="#F1B0FE" />
                    </linearGradient>
                    <linearGradient id="paint4_linear_453_3058" x1="-2" y1="76.9515" x2="20.8647" y2="71.6222" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#9B9B9D" />
                        <stop offset="1" stop-color="#F1B0FE" />
                    </linearGradient>
                    <linearGradient id="paint5_linear_453_3058" x1="-2" y1="94.3846" x2="20.8647" y2="89.0553" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#9B9B9D" />
                        <stop offset="1" stop-color="#F1B0FE" />
                    </linearGradient>
                    <linearGradient id="paint6_linear_453_3058" x1="-2" y1="111.818" x2="20.8647" y2="106.488" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#9B9B9D" />
                        <stop offset="1" stop-color="#F1B0FE" />
                    </linearGradient>
                    <linearGradient id="paint7_linear_453_3058" x1="-2" y1="129.25" x2="20.8647" y2="123.921" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#9B9B9D" />
                        <stop offset="1" stop-color="#F1B0FE" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Content container - responsive padding */}
            <div className="flex flex-col items-center justify-center  gap-1  top-0 left-0 absolute z-10 xl:mx-6 mx-2 px-2 py-4 h-[90%]">
                {children}
            </div>
        </div>
    );
};

export default BorderOurTeam;