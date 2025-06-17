"use client"

export default function ReferralStructure() {
  return (
    <div className="flex justify-center py-8">
      <div className="relative w-full max-w-4xl">
        {/* Level 1 - Root (25%) */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold border-2 border-cyan-400 relative z-10">
              You
            </div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-cyan-400 text-sm font-medium">
              25%
            </div>
          </div>
        </div>

        {/* Connection line from root to level 2 */}
        <div className="absolute top-20 left-1/2 w-px h-8 bg-cyan-400 transform -translate-x-1/2"></div>

        {/* Level 2 - Two main branches (35% each) */}
        <div className="flex justify-center gap-32 mb-12 relative">
          {[1, 2].map((i) => (
            <div key={i} className="relative">
              <div className="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-cyan-300">
                {i}
              </div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-cyan-400 text-sm font-medium">
                35%
              </div>
            </div>
          ))}

          {/* Horizontal connection line */}
          <div className="absolute top-6 left-1/2 w-64 h-px bg-cyan-400 transform -translate-x-1/2"></div>
          {/* Vertical connections to nodes */}
          <div className="absolute top-6 left-1/2 w-px h-6 bg-cyan-400 transform -translate-x-32"></div>
          <div className="absolute top-6 left-1/2 w-px h-6 bg-cyan-400 transform translate-x-32"></div>
        </div>

        {/* Level 3 - Four branches (3% each) */}
        <div className="flex justify-center gap-16 mb-12 relative">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative">
              <div className="w-10 h-10 bg-cyan-300 rounded-full flex items-center justify-center text-white text-xs font-bold border border-cyan-200">
                {i}
              </div>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-cyan-300 text-xs font-medium">
                3%
              </div>
            </div>
          ))}

          {/* Connection lines */}
          <div className="absolute top-5 left-1/2 w-48 h-px bg-cyan-300 transform -translate-x-1/2"></div>
          <div className="absolute top-5 left-1/2 w-px h-5 bg-cyan-300 transform -translate-x-24"></div>
          <div className="absolute top-5 left-1/2 w-px h-5 bg-cyan-300 transform -translate-x-8"></div>
          <div className="absolute top-5 left-1/2 w-px h-5 bg-cyan-300 transform translate-x-8"></div>
          <div className="absolute top-5 left-1/2 w-px h-5 bg-cyan-300 transform translate-x-24"></div>
        </div>

        {/* Level 4 - Eight branches (1% each) */}
        <div className="flex justify-center gap-8 relative">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="relative">
              <div className="w-8 h-8 bg-cyan-200 rounded-full flex items-center justify-center text-slate-700 text-xs font-bold">
                {i + 1}
              </div>
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-cyan-200 text-xs font-medium">
                1%
              </div>
            </div>
          ))}

          {/* Connection lines */}
          <div className="absolute top-4 left-1/2 w-56 h-px bg-cyan-200 transform -translate-x-1/2"></div>
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute top-4 w-px h-4 bg-cyan-200"
              style={{ left: `calc(50% + ${(i - 3.5) * 32}px)` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
