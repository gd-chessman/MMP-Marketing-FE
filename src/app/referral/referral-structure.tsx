"use client"
import { UserIcon, StarIcon } from "lucide-react"
import { useLang } from "@/lang/useLang"

export default function ReferralStructure({ type }: { type: string }) {
  const { t } = useLang()

  return (
    <div className="text-white py-4 sm:py-6 xl:py-8">
      <div className="bg-dark-300 px-3 sm:px-4 rounded-lg border border-gray/30 flex flex-col items-center text-center">
        {type === "normal" && (
          <>
            <div className="w-12 h-12 sm:w-14 sm:h-14 xl:w-16 xl:h-16 bg-gradient-purple-cyan rounded-full flex items-center justify-center border-2 border-cyan-400 mb-3 sm:mb-4">
              <UserIcon className="w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-4">{t('referral.structure.your_reward')}</h3>

            <div className="flex gap-[10%] w-full">
              {/* When buy MPB */}
              <div className="w-full">
                <h4 className="font-semibold mb-2 text-base sm:text-lg">{t('referral.structure.when_downline_buys_mpb')}</h4>
                <p className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-2">10%</p>
                <p className="text-[#e10cf2] mb-3 sm:mb-4 text-sm sm:text-base">{t('referral.structure.total_commission')} </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 xl:gap-10 items-center justify-center text-xs sm:text-sm">
                  <p>+ 5% {t('referral.structure.paid_in')} SOL</p>
                  <p>+ 5% {t('referral.structure.paid_in')} MMP</p>
                </div>
              </div>

              {/* When buy MPB */}
              <div className="w-full">
                <h4 className="font-semibold mb-2 text-base sm:text-lg">{t('referral.structure.when_downline_buys_mmp')}</h4>
                <p className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-2">20%</p>
                <p className="text-[#e10cf2] mb-3 sm:mb-4 text-sm sm:text-base">{t('referral.structure.total_commission')} </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 xl:gap-10 items-center justify-center text-xs sm:text-sm">
                  <p>+ 10% {t('referral.structure.paid_in')} SOL</p>
                  <p>+ 10% {t('referral.structure.paid_in')} MMP</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs sm:text-sm mt-6 text-yellow-400 xl:max-w-[52%] mx-auto">{t('referral.structure.note')}</p>
            </div>
          </>
        )}
        {/* Card for BJs / Influencers */}
        {type === "bj" && (
          <>
            <div className="w-12 h-12 sm:w-14 sm:h-14 xl:w-16 xl:h-16 bg-gradient-purple-cyan rounded-full flex items-center justify-center border-2 border-yellow-400 mb-3 sm:mb-4">
              <StarIcon className="w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8 text-yellow-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-4">{t('referral.structure.your_reward')}</h3>
            <div className="flex gap-[10%] w-full">
              {/* When buy MPB */}
              <div className="w-full flex flex-col items-center justify-center">
                <h4 className="font-semibold mb-2 text-base sm:text-lg">{t('referral.structure.when_downline_buys_mpb')}</h4>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">20%</p>
                <p className="text-[#e10cf2] mb-3 sm:mb-4 text-sm sm:text-base">{t('referral.structure.total_commission')}</p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 xl:gap-10 text-xs sm:text-sm">
                  <p>+ 10% {t('referral.structure.paid_in')} SOL</p>
                  <p>+ 10% {t('referral.structure.paid_in')} MMP</p>
                </div>
              </div>

             

              {/* When buy MMP */}
              <div className="w-full flex flex-col items-center justify-center">
                <h4 className="font-semibold mb-2 text-base sm:text-lg">{t('referral.structure.when_downline_buys_mmp')}</h4>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">40%</p>
                <p className="text-[#e10cf2] mb-3 sm:mb-4 text-sm sm:text-base">{t('referral.structure.total_commission')}</p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 xl:gap-10 text-xs sm:text-sm">
                  <p>+ 20% {t('referral.structure.paid_in')} SOL</p>
                  <p>+ 20% {t('referral.structure.paid_in')} MMP</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs sm:text-sm mt-6 text-yellow-400 xl:max-w-[52%] mx-auto">{t('referral.structure.note')}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
