"use client"
import { UserIcon } from "lucide-react"

export default function ReferralStructure() {
  return (
    <div className="flex justify-center py-8">
      <div className="relative w-full flex flex-col items-center pb-10">
        {/* Level 1 - Root (25%) */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-purple-cyan rounded-full flex items-center justify-center text-white font-bold border-2 border-cyan-400 relative z-10">
              <UserIcon
                className="w-5 h-5"
              />
            </div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-cyan-400 text-sm font-medium">
              25%
            </div>
          </div>
        </div>

        {/* Connection line from root to level 2 */}
        {/* <div className="absolute top-[32px] left-1/2 w-px h-8 bg-cyan-400 transform -translate-x-1/2"></div> */}
        <div className="h-5 w-[1px] border border-solid border-cyan-400 z-20 relative" />
        <div className="h-12 w-full max-w-[639px] border border-solid border-cyan-400 z-20 relative border-b-0" />
        {/* Level 2 - Two main branches (35% each) */}
        <div className="flex justify-between w-full max-w-[675px] absolute top-[84px] z-30">
          {[1, 2].map((i) => (
            <div key={i} className="relative text-center">
              <div className="w-10 h-10 bg-gradient-purple-cyan rounded-full flex items-center justify-center text-white font-bold border-2 border-cyan-400 relative z-10">
                <UserIcon
                  className="w-5 h-5"
                />
              </div>
              <div className="text-cyan-400 text-sm font-medium mt-1">
                3.5%
              </div>
            </div>
          ))}
        </div>
        <div className="h-10 w-full max-w-[947px] border border-solid border-cyan-400 z-20 relative border-b-0 flex justify-between" >
          <div className="flex-1 border-y-0 h-10 border border-solid border-cyan-400"></div>
          <div className="flex-1 border-y-0 h-10 border border-solid border-cyan-400"></div>
          <div className="flex-1 border-y-0 h-10 border border-solid border-cyan-400"></div>

        </div>
        {/* Level 3 - Four branches (3% each) */}
        <div className="flex justify-between w-full max-w-[984px] absolute top-[133px] z-30">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative">
              <div className="w-10 h-10 bg-gradient-purple-cyan rounded-full flex items-center justify-center text-white font-bold border-2 border-cyan-400 relative z-10">
                <UserIcon
                  className="w-5 h-5"
                />
              </div>
              <div className=" text-cyan-300 text-xs font-medium text-center mt-1">
                3%
              </div>
            </div>
          ))}
        </div>
        <div className="h-10 w-full max-w-[1115px]  z-20 relative border-b-0 flex justify-between" style={{ marginTop: '13px' }}>
          <div className="flex-1 border-y-0 border-t h-10 border border-solid border-cyan-400"></div>
          <div className="flex-1 h-10 border-none "></div>
          <div className="flex-1 border-y-0 border-t h-10 border border-solid border-cyan-400"></div>
          <div className="flex-1  h-10 border-none"></div>
          <div className="flex-1 border-y-0 border-t h-10 border border-solid border-cyan-400"></div>
          <div className="flex-1  h-10 border-none"></div>
          <div className="flex-1 border-y-0 border-t h-10 border border-solid border-cyan-400"></div>
        </div>

        {/* Level 4 - Eight branches (1% each) */}
        <div className="flex justify-between w-full max-w-[1142px] absolute top-[191px] z-30">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="relative">
              <div className="w-8 h-8 bg-gradient-purple-cyan rounded-full flex items-center justify-center text-white font-bold border-2 border-cyan-400 relative z-10">
                <UserIcon
                  className="w-5 h-5"
                />
              </div>
              <div className="text-center mt-1 text-cyan-200 text-xs font-medium">
                2%
              </div>
            </div>
          ))}
        </div>
        <div className="h-10 w-full max-w-[1195px] z-20 relative border-b-0 flex justify-between" style={{ marginTop: '8px' }}>
          <div className="flex-1 border-y-0 border-t h-10 border border-solid border-cyan-400"></div>
          <div className="flex-1 h-10 border-none "></div>
          <div className="flex-1 border-y-0 border-t h-10 border border-solid border-cyan-400"></div>
          <div className="flex-1  h-10 border-none"></div>
          <div className="flex-1 border-y-0 border-t h-10 border border-solid border-cyan-400"></div>
          <div className="flex-1  h-10 border-none"></div>
          <div className="flex-1 border-y-0 border-t h-10 border border-solid border-cyan-400"></div>
          <div className="flex-1  h-10 border-none"></div>
          <div className="flex-1 border-y-0 border-t h-10 border border-solid border-cyan-400"></div>
          <div className="flex-1  h-10 border-none"></div>
          <div className="flex-1 border-y-0 border-t h-10 border border-solid border-cyan-400"></div>
          <div className="flex-1  h-10 border-none"></div>
          <div className="flex-1 border-y-0 border-t h-10 border border-solid border-cyan-400"></div>
          <div className="flex-1  h-10 border-none"></div>
          <div className="flex-1 border-y-0 border-t h-10 border border-solid border-cyan-400"></div>
        </div>

        <div className="flex justify-between w-full max-w-[1226px] absolute top-[237px] z-30">
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className="relative">
              <div className="w-8 h-8 bg-gradient-purple-cyan rounded-full flex items-center justify-center text-white font-bold border-2 border-cyan-400 relative z-10">
                <UserIcon
                  className="w-5 h-5"
                />
              </div>
              <div className="text-center mt-2 text-cyan-200 text-xs font-medium">
                1%
              </div>
            </div>
          ))}
        </div>

        {/* Connection lines */}
        {/* <div className="absolute top-4 left-1/2 w-56 h-px bg-cyan-200 transform -translate-x-1/2"></div>
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute top-4 w-px h-4 bg-cyan-200"
              style={{ left: `calc(50% + ${(i - 3.5) * 32}px)` }}
            ></div>
          ))}
        </div> */}
      </div>
    </div>
  )
}
