"use client"
import { UserIcon, StarIcon } from "lucide-react"
import { useLang } from "@/lang/useLang"

export default function ReferralStructure({ type }: { type: string }) {
  const { t } = useLang()

  return (
    <div className="text-white py-8">
      <div className="bg-dark-300 px-6 rounded-lg border border-gray/30 flex flex-col items-center text-center">
        {type === "normal" && (
          <>
            <div className="w-16 h-16 bg-gradient-purple-cyan rounded-full flex items-center justify-center border-2 border-cyan-400 mb-4">
              <UserIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">{t('referral.structure.your_reward')}</h3>
            {/* Card for Regular Customers */}
            <>
              <p className="text-3xl font-bold text-cyan-400 mb-2">10%</p>
              <p className="text-[#e10cf2] mb-4">{t('referral.structure.total_commission')}</p>
              <div className="flex gap-10 items-center justify-center">
                <p>+ 5% {t('referral.structure.paid_in')} USDT/SOL</p>
                <p>+ 5% {t('referral.structure.paid_in')} Memepump Coin</p>
              </div>
            </>
          </>
        )}
        {/* Card for BJs / Influencers */}
        {type === "bj" && (
          <>
            <div className="bg-dark-300 p-6 rounded-lg border border-gray/30 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-purple-cyan rounded-full flex items-center justify-center border-2 border-yellow-400 mb-4">
                <StarIcon className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('referral.structure.your_reward')}</h3>
              <p className="text-3xl font-bold text-yellow-400 mb-2">20%</p>
              <p className="text-[#e10cf2] mb-4">{t('referral.structure.total_commission')}</p>
              <div className="flex gap-10">
                <p>+ 10% {t('referral.structure.paid_in')} USDT/SOL</p>
                <p>+ 10% {t('referral.structure.paid_in')} Memepump Coin</p>
              </div>
            </div>
          </>)}
      </div>
    </div>
  )
}
