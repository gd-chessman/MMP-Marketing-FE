import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ArrowRightIcon } from 'lucide-react';
import React from 'react'

const BorderExchangeToken = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full h-full relative max-w-[335px] xl:max-w-[400px] lg:max-w-[380px] md:max-w-[360px] max-h-[49px] xl:max-h-[60px] lg:max-h-[55px] md:max-h-[52px] aspect-[335/49] xl:aspect-[400/60] lg:aspect-[380/55] md:aspect-[360/52]'>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="100%" 
        height="100%" 
        viewBox="0 0 335 49" 
        fill="none"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <foreignObject x="-19.5" y="-19.5396" width="374" height="88"><div style={{ backdropFilter: 'blur(10px)', clipPath: 'url(#bgblur_0_445_1383_clip_path)', height: '100%', width: '100%' }}></div></foreignObject><path data-figma-bg-blur-radius="20" d="M32.6289 47.7104L13.3926 28.7915L13.3926 13.6216C13.3925 13.4331 13.3221 13.2512 13.1943 13.1128L2.21192 1.21042L140.645 1.21043L144.362 4.86571C144.467 4.96913 144.6 5.03865 144.742 5.06688L144.888 5.08153L322.387 5.08154L333.75 16.2593L333.75 47.7104L32.6289 47.7104Z" fill="url(#paint0_linear_445_1383)" stroke="url(#paint1_linear_445_1383)" strokeWidth="1.5" strokeLinejoin="round" />
        <defs>
          <clipPath id="bgblur_0_445_1383_clip_path" transform="translate(19.5 19.5396)"><path d="M32.6289 47.7104L13.3926 28.7915L13.3926 13.6216C13.3925 13.4331 13.3221 13.2512 13.1943 13.1128L2.21192 1.21042L140.645 1.21043L144.362 4.86571C144.467 4.96913 144.6 5.03865 144.742 5.06688L144.888 5.08153L322.387 5.08154L333.75 16.2593L333.75 47.7104L32.6289 47.7104Z" />
          </clipPath><linearGradient id="paint0_linear_445_1383" x1="335.783" y1="34.525" x2="25.843" y2="19.0948" gradientUnits="userSpaceOnUse">
            <stop stop-color="#330C5E" />
            <stop offset="1" stop-color="#0F2A58" />
          </linearGradient>
          <linearGradient id="paint1_linear_445_1383" x1="335.783" y1="31.4282" x2="26.0039" y2="14.4638" gradientUnits="userSpaceOnUse">
            <stop stop-color="#F70FFF" />
            <stop offset="1" stop-color="#12D6DF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex text-neutral w-full items-center flex-col xl:gap-4 gap-1 justify-center h-full top-0 left-0 absolute z-10 xl:mx-6 mx-2 xl:px-4 px-2 xl:py-6 py-4">
        {children}
      </div>
    </div>
  )
}


const ExchangeToken = () => {
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
  const { elementRef: descRef, isIntersecting: descInView } = useIntersectionObserver<HTMLParagraphElement>({
    threshold: 0.3,
    rootMargin: '-50px'
  });

  const { elementRef: mmpButtonRef, isIntersecting: mmpButtonInView } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
    rootMargin: '-50px'
  });

  const { elementRef: mpbButtonRef, isIntersecting: mpbButtonInView } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
    rootMargin: '-50px'
  });

  const { elementRef: mmpImageRef, isIntersecting: mmpImageInView } = useIntersectionObserver<HTMLImageElement>({
    threshold: 0.3,
    rootMargin: '-50px'
  });

  const { elementRef: mpbImageRef, isIntersecting: mpbImageInView } = useIntersectionObserver<HTMLImageElement>({
    threshold: 0.3,
    rootMargin: '-50px'
  });

  const { elementRef: mmpTextRef, isIntersecting: mmpTextInView } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
    rootMargin: '-50px'
  });

  const { elementRef: mpbTextRef, isIntersecting: mpbTextInView } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
    rootMargin: '-50px'
  });

  return (
    <div className='bg-feature bg-[#020616BD]/60 z-50 w-full h-svh flex items-center justify-center relative pt-20 overflow-hidden'>
      <div className='absolute top-0 right-0 w-full h-full bg-[#020616c2]' />
      <div className='container mx-auto px-4 relative mb-[10%]'>
        <div className='flex flex-col items-center justify-center gap-4 relative h-[50px]'>
          <h2
            ref={titleRef}
            className={`title-feature text-[36px] xl:text-[48px] bg-clip-text absolute top-0 left-0 w-full h-full text-center animate-fade-in-up ${titleInView ? 'in-view' : ''}`}
          >
            Exchange token
          </h2>
          <h3
            ref={title2Ref}
            className={`text-[#DFE0EF] text-[36px] xl:text-[48px] webkit-text-stroke-1 font-bold bg-black/60 xl:min-w-[440px] min-w-[300px] h-full text-center z-10 leading-none animate-fade-in-up-delayed ${title2InView ? 'in-view' : ''}`}
          >
            Exchange token
          </h3>
        </div>
        <div className='flex flex-col items-center justify-center gap-4 relative h-[50px] mt-10'>
          <p
            ref={descRef}
            className={`text-neutral text-center text-base  xl:max-w-[950px] max-w-[500px]  animate-fade-in-up-delayed ${descInView ? 'in-view' : ''}`}
          >
            MMP and MPB are two pioneering exchange-issued coins that represent a breakthrough in the world of Web3 and decentralized platforms. Built on Solana, they are not just liquidity tokens but also tools for creating value and opportunities for the community, aiming to establish a sustainable and powerful ecosystem.
          </p>
        </div>
        <div className='flex w-full items-center justify-evenly relative mt-20'>
          <div className='w-1/2 max-w-[316px] flex flex-col items-center justify-center gap-10'>
            <img 
              ref={mmpImageRef}
              src="/MMP-hex.png" 
              alt="exchange-token" 
              className={`w-full h-auto object-cover animate-fade-in-up ${mmpImageInView ? 'in-view' : ''}`} 
            />
            <div 
              ref={mmpTextRef}
              className={`flex flex-col items-center justify-center gap-1 animate-fade-in-up-delayed ${mmpTextInView ? 'in-view' : ''}`}
            >
              <span className='text-white text-center text-base'>MMP</span>
              <span className='text-white text-center text-base'>Meme Meta Pump </span>
            </div>
         
            <div 
              ref={mmpButtonRef}
              className={`animate-fade-in-up-delayed ${mmpButtonInView ? 'in-view' : ''}`}
            >
              <BorderExchangeToken>
                <div className='text-white text-center text-base w-full flex items-center justify-center gap-3'>
                  Explore <ArrowRightIcon className='w-4 h-4' />
                </div>
              </BorderExchangeToken>
            </div>
          </div>
          <div className='w-1/2 max-w-[316px] flex flex-col items-center justify-center gap-10'>
            <img 
              ref={mpbImageRef}
              src="/MPB-hex.png" 
              alt="exchange-token" 
              className={`w-full h-auto object-cover animate-fade-in-up ${mpbImageInView ? 'in-view' : ''}`} 
            />
            <div 
              ref={mpbTextRef}
              className={`flex flex-col items-center justify-center gap-1 animate-fade-in-up-delayed ${mpbTextInView ? 'in-view' : ''}`}
            >
              <span className='text-white text-center text-base'>MPB</span>
              <span className='text-white text-center text-base'>Meme Pump Boost
              </span>
            </div>
            <div 
              ref={mpbButtonRef}
              className={`animate-fade-in-up-delayed ${mpbButtonInView ? 'in-view' : ''}`}
            >
              <BorderExchangeToken>
                <div className='text-white text-center text-base w-full flex items-center justify-center gap-3'>
                  Explore <ArrowRightIcon className='w-4 h-4' />
                </div>
              </BorderExchangeToken>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ExchangeToken