'use client'
import BorderTokenomic from '@/components/border-tokenomic';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import React, { useEffect, useState } from 'react'

const Tokenomics = () => {
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

    console.log("windowWidth", windowWidth)
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
                {/* <TokenomicSvg /> */}
                <div className='flex items-center justify-center flex-1 relative z-10 w-full h-full'>
                    <img src="/tokenomics.png" alt="tokenomics" className={` ${isClient && windowWidth < 2049 ? 'max-w-[540px]' : 'max-w-[700px]'} h-full object-contain`} />
                    <div className={`absolute flex items-end justify-center gap-4 ${isClient && windowWidth < 1800 ? 'top-[7%] left-[27%]' : 'top-[8%] left-[26%]'}`}>
                        <BorderTokenomic primaryColor='#3AB3D9' secondaryColor='#3AB3D9' tag='18%' tagTextColor='#3AB3D9'>
                            <div className='flex flex-col items-center justify-center gap-4 relative'>
                                <p
                                    ref={descRef}
                                    className={`text-neutral text-center text-sm  xl:max-w-[950px] max-w-[500px]  animate-fade-in-up-delayed ${descInView ? 'in-view' : ''}`}
                                >
                                    Community Rewards
                                </p>
                            </div>
                        </BorderTokenomic>
                        <div style={{ marginBottom: '-40px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="232" height="99" viewBox="0 0 232 99" fill="none">
                                <path d="M23 10.4272L160.5 12.3186L178 33.1229L231 36.9055V97.4272" stroke="#3AB3D9" stroke-width="2" stroke-linecap="round" />
                                <path d="M10.4266 21.3123C8.14109 21.3123 5.83335 20.5578 3.90283 19.0267C-0.579511 15.432 -1.31177 8.84159 2.28298 4.33706C5.87773 -0.167475 12.4681 -0.877557 16.9504 2.71719C19.125 4.47019 20.5008 6.95545 20.7893 9.70699C21.0999 12.4807 20.3011 15.2101 18.5703 17.3847C16.5066 19.9587 13.4888 21.3123 10.4266 21.3123ZM4.01378 5.73501C1.17348 9.26319 1.75042 14.4556 5.30079 17.2959C8.82897 20.1362 14.0214 19.5593 16.8617 16.0089C18.2375 14.3003 18.8588 12.1479 18.6147 9.97327C18.3706 7.79867 17.3055 5.82377 15.5747 4.47019C12.0243 1.60771 6.85408 2.18464 4.01378 5.73501Z" fill="#CCCCCC" fill-opacity="0.5" />
                                <path d="M15.663 10.8613C15.663 13.746 13.3109 16.0981 10.4263 16.0981C7.54158 16.0981 5.18945 13.746 5.18945 10.8613C5.18945 7.97663 7.54158 5.62451 10.4263 5.62451C13.3109 5.62451 15.663 7.97663 15.663 10.8613Z" fill="#CCCCCC" fill-opacity="0.5" />
                            </svg>
                        </div>
                    </div>
                    <div className={`absolute flex items-end justify-center gap-4 ${isClient && windowWidth < 1800 ? 'top-[30%] left-[10%]' : 'top-[30%] left-[7%]'}`}>
                        <BorderTokenomic primaryColor='#3C01B7' secondaryColor='#3C01B7' tag='55%'  tagTextColor='#632AD7'>
                            <div className='flex flex-col items-center justify-center gap-4 relative'>
                                <p
                                    ref={descRef}
                                    className={`text-neutral text-center text-sm  xl:max-w-[950px] max-w-[500px]  animate-fade-in-up-delayed ${descInView ? 'in-view' : ''}`}
                                >
                                    Community Rewards
                                </p>
                            </div>
                        </BorderTokenomic>
                        <div style={{ marginBottom: '10px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="227" height="52" viewBox="0 0 227 52" fill="none">
                                <path d="M226 50.4272H137.5L98 10.9272H22.5" stroke="#3C01B7" stroke-width="2" stroke-linecap="round" />
                                <path d="M10.4266 21.3123C8.14109 21.3123 5.83335 20.5578 3.90283 19.0267C-0.579511 15.432 -1.31177 8.84159 2.28298 4.33706C5.87773 -0.167475 12.4681 -0.877557 16.9504 2.71719C19.125 4.47019 20.5008 6.95545 20.7893 9.70699C21.0999 12.4807 20.3011 15.2101 18.5703 17.3847C16.5066 19.9587 13.4888 21.3123 10.4266 21.3123ZM4.01378 5.73501C1.17348 9.26319 1.75042 14.4556 5.30079 17.2959C8.82897 20.1362 14.0214 19.5593 16.8617 16.0089C18.2375 14.3003 18.8588 12.1479 18.6147 9.97327C18.3706 7.79867 17.3055 5.82377 15.5747 4.47019C12.0243 1.60771 6.85408 2.18464 4.01378 5.73501Z" fill="#CCCCCC" fill-opacity="0.5" />
                                <path d="M15.663 10.8613C15.663 13.746 13.3109 16.0981 10.4263 16.0981C7.54158 16.0981 5.18945 13.746 5.18945 10.8613C5.18945 7.97663 7.54158 5.62451 10.4263 5.62451C13.3109 5.62451 15.663 7.97663 15.663 10.8613Z" fill="#CCCCCC" fill-opacity="0.5" />
                            </svg>
                        </div>
                    </div>
                    <div className={`absolute flex items-end justify-center gap-4 ${isClient && windowWidth < 1800 ? 'bottom-[12%] left-[10%]' : 'bottom-[19%] left-[10%]'}`}>
                        <BorderTokenomic primaryColor='#6600B6' secondaryColor='#6600B6' tag='10%' tagTextColor='#6600B6'>
                            <div className='flex flex-col items-center justify-center gap-4 relative'>
                                <p
                                    ref={descRef}
                                    className={`text-neutral text-center text-sm  xl:max-w-[950px] max-w-[500px]  animate-fade-in-up-delayed ${descInView ? 'in-view' : ''}`}
                                >
                                    Community Rewards
                                </p>
                            </div>
                        </BorderTokenomic>
                        <div style={{ marginBottom: '10px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="324" height="61" viewBox="0 0 324 61" fill="none">
                                <path d="M323.696 60.0215H323.203C323.061 60.342 322.756 60.5743 322.393 60.6113L322.29 60.6162H141.341L141.104 60.4756L90.8691 30.6162H1.9043C1.35214 30.6162 0.904429 30.1683 0.904297 29.6162C0.904297 29.064 1.35206 28.6163 1.9043 28.6162H91.4189L91.6553 28.7568L141.891 58.6162H321.696V0.426758H323.696V60.0215Z" fill="#6600B6" />
                            </svg>
                        </div>
                    </div>
                    <div className={`absolute flex items-end justify-center gap-4 ${isClient && windowWidth < 1800 ? 'bottom-[7%] right-[19%]' : 'bottom-[17%] right-[17%]'}`}>
                        <div style={{ marginBottom: '65px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="201" height="105" viewBox="0 0 201 105" fill="none">
                                <path d="M1 1.42676H82.4051L109.291 94.4268H178" stroke="#B806B2" stroke-width="2" stroke-linecap="round" />
                                <path d="M190.427 104.312C188.141 104.312 185.833 103.557 183.903 102.026C179.42 98.4315 178.688 91.8411 182.283 87.3366C185.878 82.832 192.468 82.122 196.95 85.7167C199.125 87.4697 200.501 89.955 200.789 92.7065C201.1 95.4802 200.301 98.2096 198.57 100.384C196.507 102.958 193.489 104.312 190.427 104.312ZM184.014 88.7345C181.173 92.2627 181.75 97.4551 185.301 100.295C188.829 103.136 194.021 102.559 196.862 99.0084C198.237 97.2998 198.859 95.1474 198.615 92.9728C198.371 90.7982 197.305 88.8233 195.575 87.4697C192.024 84.6072 186.854 85.1842 184.014 88.7345Z" fill="#CCCCCC" fill-opacity="0.5" />
                                <path d="M195.663 93.8608C195.663 96.7455 193.311 99.0976 190.426 99.0976C187.542 99.0976 185.189 96.7455 185.189 93.8608C185.189 90.9761 187.542 88.624 190.426 88.624C193.311 88.624 195.663 90.9761 195.663 93.8608Z" fill="#CCCCCC" fill-opacity="0.5" />
                            </svg>
                        </div>
                        <BorderTokenomic primaryColor='#0562B9' secondaryColor='#0562B9' tag='6%' tagTextColor='#9C00D3'>
                            <div className='flex flex-col items-center justify-center gap-4 relative'>
                                <p
                                    ref={descRef}
                                    className={`text-neutral text-center text-sm  xl:max-w-[950px] max-w-[500px]  animate-fade-in-up-delayed ${descInView ? 'in-view' : ''}`}
                                >
                                    Community Rewards
                                </p>
                            </div>
                        </BorderTokenomic>
                    </div>
                    <div className={`absolute flex items-end justify-center gap-4 ${isClient && windowWidth < 1800 ? 'bottom-[25%] right-[15%]' : 'bottom-[29%] right-[13%]'}`}>
                        <div style={{ marginBottom: '65px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="234" height="45" viewBox="0 0 234 45" fill="none">
                                <path d="M1 1.42676H79.5L117.5 33.4268H207" stroke="#C300B0" stroke-width="2" stroke-linecap="round" />
                                <path d="M223.427 44.3118C221.141 44.3118 218.833 43.5573 216.903 42.0262C212.42 38.4315 211.688 31.8411 215.283 27.3366C218.878 22.832 225.468 22.122 229.95 25.7167C232.125 27.4697 233.501 29.955 233.789 32.7065C234.1 35.4802 233.301 38.2096 231.57 40.3842C229.507 42.9582 226.489 44.3118 223.427 44.3118ZM217.014 28.7345C214.173 32.2627 214.75 37.4551 218.301 40.2954C221.829 43.1357 227.021 42.5588 229.862 39.0084C231.237 37.2998 231.859 35.1474 231.615 32.9728C231.371 30.7982 230.305 28.8233 228.575 27.4697C225.024 24.6072 219.854 25.1842 217.014 28.7345Z" fill="#CCCCCC" fill-opacity="0.5" />
                                <path d="M228.663 33.8608C228.663 36.7455 226.311 39.0976 223.426 39.0976C220.542 39.0976 218.189 36.7455 218.189 33.8608C218.189 30.9761 220.542 28.624 223.426 28.624C226.311 28.624 228.663 30.9761 228.663 33.8608Z" fill="#CCCCCC" fill-opacity="0.5" />
                            </svg>
                        </div>
                        <BorderTokenomic primaryColor='#C300B0' secondaryColor='#C300B0' tag='5%' tagTextColor='#C300B0'>
                            <div className='flex flex-col items-center justify-center gap-4 relative'>
                                <p
                                    ref={descRef}
                                    className={`text-neutral text-center text-sm  xl:max-w-[950px] max-w-[500px]  animate-fade-in-up-delayed ${descInView ? 'in-view' : ''}`}
                                >
                                    Community Rewards
                                </p>
                            </div>
                        </BorderTokenomic>
                    </div>
                    <div className={`absolute flex items-end justify-center gap-4 ${isClient && windowWidth < 1800 ? 'top-[22%] right-[11%]' : 'top-[24%] right-[9%]'}`}>
                        <div style={{ marginBottom: '-5%' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="239" height="99" viewBox="0 0 239 99" fill="none">
                                <path d="M228.427 21.3118C226.141 21.3118 223.833 20.5573 221.903 19.0262C217.42 15.4315 216.688 8.8411 220.283 4.33657C223.878 -0.167963 230.468 -0.878045 234.95 2.71671C237.125 4.4697 238.501 6.95496 238.789 9.7065C239.1 12.4802 238.301 15.2096 236.57 17.3842C234.507 19.9582 231.489 21.3118 228.427 21.3118ZM222.014 5.73452C219.173 9.2627 219.75 14.4551 223.301 17.2954C226.829 20.1357 232.021 19.5588 234.862 16.0084C236.237 14.2998 236.859 12.1474 236.615 9.97279C236.371 7.79818 235.305 5.82328 233.575 4.4697C230.024 1.60722 224.854 2.18415 222.014 5.73452Z" fill="#8B8B8B" />
                                <path d="M233.663 10.8608C233.663 13.7455 231.311 16.0976 228.426 16.0976C225.542 16.0976 223.189 13.7455 223.189 10.8608C223.189 7.97615 225.542 5.62402 228.426 5.62402C231.311 5.62402 233.663 7.97615 233.663 10.8608Z" fill="#8B8B8B" />
                                <path d="M1 97.4268L57 68.4268H175.5L218 16.9268" stroke="#0562B9" stroke-width="2" stroke-linecap="round" />
                            </svg>
                        </div>
                        <BorderTokenomic primaryColor='#9C00D3' secondaryColor='#9C00D3' tag='6%' tagTextColor='#9C00D3'>
                            <div className='flex flex-col items-center justify-center gap-4 relative'>
                                <p
                                    ref={descRef}
                                    className={`text-neutral text-center text-sm  xl:max-w-[950px] max-w-[500px]  animate-fade-in-up-delayed ${descInView ? 'in-view' : ''}`}
                                >
                                    Community Rewards
                                </p>
                            </div>
                        </BorderTokenomic>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Tokenomics