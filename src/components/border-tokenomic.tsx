import React, { useState, useEffect } from 'react';

interface BorderTokenomicProps {
    children: React.ReactNode;
    primaryColor?: string;
    secondaryColor?: string;
    tag?: React.ReactNode;
    tagBgColor?: string;
    tagTextColor?: string;
}

const BorderTokenomic = ({ 
    children, 
    primaryColor = "#3AB3D9", 
    secondaryColor = "#3AB3D9",
    tag,
    tagBgColor = "#6C1AFF",
    tagTextColor = "#fff"
}: BorderTokenomicProps) => {
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
        <div className="relative aspect-[417/261]">
            {/* Tag hiển thị số phía trên border */}
            {tag && (
                <div
                    style={{
                        color: primaryColor,
                        borderRadius: 4,
                        padding: '2px 18px 2px 0',
                        fontWeight: 700,
                        fontSize: 14,
                        position: 'absolute',
                        left: '30%',
                        top: -5,
                        zIndex: 20,
                        display: 'flex',
                        alignItems: 'center',
                        borderTopLeftRadius: 8,
                        borderBottomLeftRadius: 8,
                    }}
                >
                    <span style={{paddingLeft: 18}}>{tag}</span>
                </div>
            )}
            {/* Top decorative SVG - responsive positioning */}
            <svg width="185" height="71" viewBox="0 0 185 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="0.427246" width="61" height="17" fill={`url(#paint0_linear_445_1909_${primaryColor.replace('#', '')})`} />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.21092 24.4272C0.989868 24.4272 0 25.4171 0 26.6382V56.9536C0 57.8082 0.492599 58.5863 1.26512 58.952L25.0624 70.2147C25.3581 70.3547 25.6811 70.4272 26.0082 70.4272H182.789C184.01 70.4272 185 69.4374 185 68.2163V40.1011C185 39.2371 184.497 38.4523 183.712 38.0918L154.389 24.6289C154.1 24.496 153.785 24.4272 153.467 24.4272H2.21092ZM5.21092 27.4272C3.98987 27.4272 3 28.4171 3 29.6382V55.4855C3 56.3622 3.51796 57.156 4.32034 57.5092L26.4311 67.2399C26.7117 67.3635 27.015 67.4272 27.3217 67.4272H173.789C175.01 67.4272 176 66.4374 176 65.2163V41.2839C176 40.3984 175.472 39.5983 174.657 39.2506L147.38 27.6048C147.106 27.4876 146.81 27.4272 146.512 27.4272H5.21092Z" fill={secondaryColor} />
                <defs>
                    <linearGradient id={`paint0_linear_445_1909_${primaryColor.replace('#', '')}`} x1="24" y1="14.4272" x2="34.2346" y2="31.5322" gradientUnits="userSpaceOnUse">
                        <stop stop-color={primaryColor} />
                        <stop offset="1" stop-color={primaryColor} stop-opacity="0" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Content container - responsive padding */}
            <div className="flex flex-col xl:gap-4 gap-1 top-[35px] left-5 absolute z-10 ">
                {children}
            </div>
        </div>
    );
};

export default BorderTokenomic;