import React, { useState, useEffect } from 'react';

const BoxFeauture = ({children}: {children: React.ReactNode}) => {
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
        <div className="relative w-[90%] h-auto aspect-[417/261]">
            {/* Top decorative SVG - responsive positioning */}
            <svg 
                className={`absolute top-0 right-[8%] z-10 w-[35%] max-w-[146px] h-auto ${isClient && windowWidth < 1280 ? 'w-[20%] max-w-[80px]' : ''}`} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 146 14" 
                fill="none"
                preserveAspectRatio="xMidYMid meet"
            >
                <path d="M14.1652 13.4724L0.708984 1.90735e-05H9.67977L23.136 13.4724L14.1652 13.4724Z" fill="url(#paint0_linear_412_2558)" />
                <path d="M31.5978 13.4724L18.1416 1.90735e-05H27.1124L40.5686 13.4724L31.5978 13.4724Z" fill="url(#paint1_linear_412_2558)" />
                <path d="M49.0314 13.4724L35.5752 1.90735e-05H44.546L58.0022 13.4724L49.0314 13.4724Z" fill="url(#paint2_linear_412_2558)" />
                <path d="M66.464 13.4724L53.0078 1.90735e-05H61.9786L75.4348 13.4724L66.464 13.4724Z" fill="url(#paint3_linear_412_2558)" />
                <path d="M83.8976 13.4724L70.4414 1.90735e-05H79.4122L92.8684 13.4724L83.8976 13.4724Z" fill="url(#paint4_linear_412_2558)" />
                <path d="M101.33 13.4724L87.874 1.90735e-05H96.8448L110.301 13.4724L101.33 13.4724Z" fill="url(#paint5_linear_412_2558)" />
                <path d="M118.764 13.4724L105.308 1.90735e-05H114.278L127.735 13.4724L118.764 13.4724Z" fill="url(#paint6_linear_412_2558)" />
                <path d="M136.196 13.4724L122.74 1.90735e-05H131.711L145.167 13.4724L136.196 13.4724Z" fill="url(#paint7_linear_412_2558)" />
                <defs>
                    <linearGradient id="paint0_linear_412_2558" x1="7.22003" y1="13.5241" x2="7.2739" y2="0.991515" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#005EFF" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_412_2558" x1="24.6526" y1="13.5241" x2="24.7065" y2="0.991515" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#005EFF" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_412_2558" x1="42.0862" y1="13.5241" x2="42.1401" y2="0.991515" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#005EFF" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_412_2558" x1="59.5189" y1="13.5241" x2="59.5727" y2="0.991515" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#005EFF" />
                    </linearGradient>
                    <linearGradient id="paint4_linear_412_2558" x1="76.9525" y1="13.5241" x2="77.0063" y2="0.991515" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#005EFF" />
                    </linearGradient>
                    <linearGradient id="paint5_linear_412_2558" x1="94.3851" y1="13.5241" x2="94.4389" y2="0.991515" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#005EFF" />
                    </linearGradient>
                    <linearGradient id="paint6_linear_412_2558" x1="111.819" y1="13.5241" x2="111.873" y2="0.991515" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#005EFF" />
                    </linearGradient>
                    <linearGradient id="paint7_linear_412_2558" x1="129.251" y1="13.5241" x2="129.305" y2="0.991515" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#005EFF" />
                    </linearGradient>
                </defs>
            </svg>
            
            {/* Main border SVG - responsive */}
            <svg 
                className="w-full h-full" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox={`0 0 ${isClient && windowWidth < 1280 ? 300 : 417} ${isClient && windowWidth < 1280 ? 200 : 261}`} 
                fill="none"
                preserveAspectRatio="xMidYMid meet"
            >
                
                <foreignObject x="-24" y="-24" width="465" height="309">
                    <div style={{ backdropFilter: 'blur(12px)', clipPath: 'url(#bgblur_0_391_1181_clip_path)', height: '100%', width: '100%' }}></div>
                </foreignObject>
                <path data-figma-bg-blur-radius="24" d="M416 77L387.534 25H107.372L83.4007 1H18.4789L1 18.5V244L16.9807 260H86.3971L110.368 236H291.15L314.622 260H400.019L416 244V77Z" fill="#3352FF" fill-opacity="0.12" stroke="#00C0FF" stroke-width="2" />
                <defs>
                    <clipPath id="bgblur_0_391_1181_clip_path" transform="translate(24 24)">
                        <path d="M416 77L387.534 25H107.372L83.4007 1H18.4789L1 18.5V244L16.9807 260H86.3971L110.368 236H291.15L314.622 260H400.019L416 244V77Z" />
                    </clipPath>
                </defs>
            </svg>
            
            {/* Bottom decorative SVG - responsive positioning */}
            <svg 
                className="absolute bottom-0 left-[22.7%] z-10 w-[51%] max-w-[214px] h-auto" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 214 19" 
                fill="none"
                preserveAspectRatio="xMidYMid meet"
            >
                <foreignObject x="-99.1133" y="-100" width="412.244" height="218.5">
                    <div style={{ backdropFilter: 'blur(50px)', clipPath: 'url(#bgblur_0_391_1180_clip_path)', height: '100%', width: '100%' }}></div>
                </foreignObject>
                <path data-figma-bg-blur-radius="100" d="M19.3645 0L0.886719 18.5H213.131L195.153 0H19.3645Z" fill="#00C0FF" fill-opacity="0.3" />
                <defs>
                    <clipPath id="bgblur_0_391_1180_clip_path" transform="translate(99.1133 100)">
                        <path d="M19.3645 0L0.886719 18.5H213.131L195.153 0H19.3645Z" />
                    </clipPath>
                </defs>
            </svg>
            
            {/* Content container - responsive padding */}
            <div className="flex flex-col xl:gap-4 gap-1 justify-center h-full top-0 left-0 absolute z-10 xl:mx-6 mx-2 px-2 py-4">
                {children}
            </div>
        </div>
    );
};

export default BoxFeauture;