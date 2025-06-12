"use client"

interface TabNavigationProps {
  activeTab: "stake-list" | "withdrawals" | "interest-rates"
  setActiveTab: (tab: "stake-list" | "withdrawals" | "interest-rates") => void
}

export default function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  const tabs = [
    { id: "stake-list", label: "Stake List" },
    { id: "withdrawals", label: "Withdrawals" },
    { id: "interest-rates", label: "Interest Rates" },
  ]

  return (
    <div className="flex justify-center">
      <div className="bg-black/50 backdrop-blur-xl rounded-full inline-flex p-2 border border-blue-500/30">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-white/10"
            }`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
