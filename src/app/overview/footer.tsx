import BorderPrimary from '@/components/border-primary'
import { useRouter } from 'next/navigation'
import React from 'react'

const Footer = () => {
    const router = useRouter()
    return (
        <div className='bg-footer w-full h-svh flex items-center justify-center relative pt-20 overflow-hidden '>

            <div className=' relative mb-[5%] container mx-auto w-full flex flex-col gap-32 z-30'>
                <div className='flex items-center justify-center h-[178px] bg-gradient-to-l from-[#0b4343]/70 to-[#014185]/70 w-full backdrop-blur-lg rounded-lg overflow-hidden'>
                    <div className="border-4 rounded-l-lg border-r-0 border-solid border-[#33FCFF] h-full w-16" />
                    <div className='flex items-center justify-around flex-1 h-[100%] overflow-hidden '>
                        <div className='flex flex-col  justify-center gap-4'>
                            <div className='flex items-center gap-2'>
                                <h3 className='text-neutral text-4xl font-bold bg-gradient-to-t from-[#33FCFF] to-[#2492FE] bg-clip-text'>Swap Now</h3><span className="text-neutral bg-transparent text-4xl font-bold">- Leade the Future</span>
                            </div>
                            <p className='text-neutral text-lg max-w-[750px]'>
                                Join the MEMEPUMP community in making breakthrough swaps – trade fast, earn rewards instantly, and unlock limitless profit opportunities!
                            </p>
                        </div>

                        <div className='h-[43px] w-[199px] relative' onClick={() => router.push('/swap')}>
                            <BorderPrimary >Swap Now</BorderPrimary>
                        </div>
                    </div>
                    <div className="border-4 rounded-r-lg border-l-0 border-solid border-[#33FCFF] h-full w-16" />
                </div>
                <div className='flex flex-col items-center justify-center gap-8'>
                    <h1 className='text-[70px] orbitron-font  font-bold text-center text-white uppercase bg-gradient-purple-cyan bg-clip-text'>
                        MEMEPUMP
                    </h1>
                    <div className='flex items-center justify-center gap-8'>
                        {/* Telegram Icon */}
                        <a href="#" className="hover:scale-110 transition-transform duration-200 p-3 rounded-full border-2 h-12 w-12 flex items-center justify-center border-solid border-[#1DA1F2]">
                            <img src="/tele-icon.png" alt="Telegram" className="w-6 h-6 mr-1" />
                        </a>

                        {/* Twitter Icon */}
                        <a href="#" className="hover:scale-110 transition-transform duration-200 p-3 rounded-full border-2 h-12 w-12 flex items-center justify-center border-solid border-[#1DA1F2]">
                            <svg className="w-6 h-6 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                        </a>

                        {/* Facebook Icon */}
                        <a href="#" className="hover:scale-110 transition-transform duration-200 p-3 rounded-full border-2 h-12 w-12 flex items-center justify-center border-solid border-[#1DA1F2]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                <g clip-path="url(#clip0_473_1869)">
                                    <path d="M22.2927 0.423061L18.5104 0.416992C14.261 0.416992 11.5149 3.23441 11.5149 7.59511V10.9047H7.71193C7.6338 10.9047 7.55644 10.9201 7.48426 10.95C7.41208 10.9799 7.34651 11.0237 7.29127 11.079C7.23604 11.1343 7.19224 11.1999 7.16237 11.2721C7.1325 11.3442 7.11715 11.4216 7.11719 11.4997V16.295C7.11719 16.4527 7.17985 16.604 7.29138 16.7155C7.40292 16.827 7.55419 16.8897 7.71193 16.8897H11.5149V28.9896C11.5149 29.1473 11.5776 29.2986 11.6891 29.4101C11.8006 29.5216 11.9519 29.5843 12.1096 29.5843H17.0715C17.2292 29.5843 17.3805 29.5216 17.492 29.4101C17.6035 29.2986 17.6662 29.1473 17.6662 28.9896V16.8897H22.1128C22.2705 16.8897 22.4218 16.827 22.5333 16.7155C22.6448 16.604 22.7075 16.4527 22.7075 16.295L22.7093 11.4997C22.7092 11.342 22.6464 11.1907 22.5349 11.0792C22.4233 10.9676 22.272 10.9049 22.1143 10.9047H17.6662V8.09912C17.6662 6.75064 17.9875 6.06609 19.7441 6.06609L22.2921 6.06518C22.4498 6.0651 22.601 6.0024 22.7124 5.89087C22.8239 5.77935 22.8865 5.62812 22.8865 5.47044V1.0178C22.8865 0.860222 22.824 0.709086 22.7127 0.597577C22.6013 0.486068 22.4503 0.423302 22.2927 0.423061Z" fill="url(#paint0_linear_473_1869)" />
                                </g>
                                <defs>
                                    <linearGradient id="paint0_linear_473_1869" x1="15.0019" y1="0.416992" x2="15.0019" y2="29.5843" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#33FCFF" />
                                        <stop offset="1" stop-color="#0086D4" />
                                    </linearGradient>
                                    <clipPath id="clip0_473_1869">
                                        <rect width="29.1676" height="29.1676" fill="white" transform="translate(0.416992 0.416992)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </a>
                    </div>
                    <p className='text-neutral text-center text-base max-w-[750px]'>
                        Join the MEMEPUMP community to seize DeFi opportunities and unlock exclusive rewards — connect with us now via Telegram, Facebook, and Twitter on our official website!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer