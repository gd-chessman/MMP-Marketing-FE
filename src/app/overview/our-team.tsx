import BoxFeauture from '@/components/border'
import BorderOurTeam from '@/components/border-our-team';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import React, { useEffect, useState } from 'react'

const OurTeam = () => {
    const [isClient, setIsClient] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    useEffect(() => {
        setIsClient(true);
        setWindowWidth(window.innerWidth);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const team = [
        {
            name: 'ROBIN',
            role: 'CTO',
            description: '기술 이사, 기술 아키텍처 설계 및 구현 담당.'
        },
        {
            name: 'TIGER P.K',
            role: 'Backend Developer',
            description: '기술 이사, 기술 아키텍처 설계 및 구현 담당.'
        },
        {
            name: 'Qi SNAKE',
            role: 'Blockchain Developer',
            description: 'Web3 애플리케이션 개발, 기능 구축 및 블록체인과의 상호작용 담당.'
        },
        {
            name: 'HLEES',
            role: 'Frontend Developer',
            description: '사용자 인터페이스(UI/UX) 개발 전문가, 친숙하고 사용하기 쉬운 인터페이스 제작.'
        },
        {
            name: 'WILD',
            role: 'Frontend Developer',
            description: '사용자 인터페이스 개발 지원 및 다양한 디바이스 호환성 보장.'
        },
        {
            name: 'Hunter',
            role: 'Frontend Developer',
            description: '사용자 인터페이스 성능 최적화 및 동적 기능 구현.'
        },
        {
            name: 'REISHI',
            role: 'UI/UX Designer',
            description: '사용자 인터페이스(UI/UX) 개발 전문가, 친숙하고 사용하기 쉬운 인터페이스 제작.'
        },
        {
            name: 'ALAN',
            role: 'Marketing & Community Manager',
            description: '마케팅 전략 수립 및 프로젝트 커뮤니티 개발 담당.'
        },
        {
            name: 'POOH',
            role: 'Marketing & Community Manager',
            description: '홍보 캠페인 관리, 파트너십 및 커뮤니티 개발 담당.'
        },
        {
            name: 'B.A.O ',
            role: 'Marketing & Community Manager',
            description: '파트너 및 사용자와의 관계 관리, 이벤트를 통한 마케팅 기회 창출 담당.'
        }
    ]
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
        <div className='bg-feature bg-[#020616BD]/60 z-50 w-full h-svh flex items-center justify-around relative pt-20 overflow-hidden'>
            <div className='absolute top-0 right-0 w-full h-full bg-[#0f121ad6] backdrop-blur-lg' />
            <div className='eclipse-box absolute bottom-[10%] left-[10%] w-[375px] h-[375px] z-20' style={{background: '#0090ff57'}}/>
            <div className='eclipse-box absolute top-[10%] right-[10%] w-[254px] h-[254px] z-20' style={{ background: '#15dffd63', filter: 'blur(50px)' }} />
            <div className=' relative mb-[5%] container mx-auto w-full flex flex-col gap-16'>
                <div className='flex flex-col items-center justify-center gap-4  '>
                    <h2
                        ref={titleRef}
                        className={`title-feature text-[36px] xl:text-[43px] bg-clip-text absolute top-[-1px] left-0 w-full h-full text-center animate-fade-in-up ${titleInView ? 'in-view' : ''}`}
                    >
                        OUR TEAM
                    </h2>
                    {/* <h3
                        ref={title2Ref}
                        className={`text-[#DFE0EF] text-[32px] w-fit webkit-text-stroke-1 font-bold h-[50px] bg-black/60 xl:min-w-[300px] min-w-[200px] flex items-center justify-center text-center z-10 leading-none animate-fade-in-up-delayed ${title2InView ? 'in-view' : ''}`}
                    >
                        OUR TEAM
                    </h3> */}
                </div>

                <div className='flex w-full h-full justify-between flex-wrap gap-[1%] mt-10'>
                    {team.map((item, index) => (
                        <BorderOurTeam className='w-full max-w-[19%] mb-10'>
                            <div className={`text-neutral  font-bold bg-gradient-to-t from-white to-[#00C0FF] bg-clip-text ${isClient && windowWidth < 1600 ? 'text-sm' : 'text-lg'}`}>{item.name}</div>
                            <div className={`text-neutral font-medium  ${isClient && windowWidth < 1600 ? 'text-xs' : 'text-sm'}`}>{item.role}</div>
                            <div className={`text-neutral text-center ${isClient && windowWidth < 1600 ? 'text-xs' : 'text-sm'} mt-1`}>
                                {item.description}
                            </div>
                        </BorderOurTeam>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default OurTeam