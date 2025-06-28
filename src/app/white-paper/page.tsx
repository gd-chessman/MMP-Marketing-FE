'use client'
import React from 'react'
import { useLang } from "@/lang/useLang"
import WhitePaperPageTwo from './page-section'
import { CheckIcon } from 'lucide-react'
import { ProtectedRoute } from "@/components/ProtectedRoute"

const WhitePaperPage = () => {
  const { t, tArray } = useLang()

  return (
    <ProtectedRoute>
      <div className="min-h-screen  text-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="text-center lg:mb-12 mb-6">
            <h1 className="text-2xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {t('whitePaper.title')}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto"></div>
          </div>

          {/* Section 1: Introduction */}
          <section className="lg:mb-12 mb-6">
            <h2 className="text-xl lg:text-3xl font-bold mb-6 text-yellow-400">{t('whitePaper.sections.introduction.title')}</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
              <p className="text-base leading-relaxed">
                {t('whitePaper.sections.introduction.description')}
              </p>
            </div>

            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-red-400">{t('whitePaper.sections.introduction.problems.title')}</h3>
              <p className="mb-4 text-sm">{t('whitePaper.sections.introduction.problems.description')}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {tArray('whitePaper.sections.introduction.problems.items').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-green-400">{t('whitePaper.sections.introduction.solutions.title')}</h3>
              <p className="mb-4 text-sm">{t('whitePaper.sections.introduction.solutions.description')}</p>
              <ul className="space-y-2">
                {tArray('whitePaper.sections.introduction.solutions.items').map((item: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-400 mr-2"><CheckIcon className="w-4 h-4" /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 2: Problems */}
          <section className="lg:mb-12 mb-6">
            <h2 className="text-xl lg:text-3xl font-bold mb-6 text-yellow-400">{t('whitePaper.sections.problems.title')}</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
              <p className="text-base leading-relaxed">
                {t('whitePaper.sections.problems.description')}
              </p>
            </div>

            <div className="grid gap-6">
              <div className="bg-blue-500/20 border border-red-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-red-400">{t('whitePaper.sections.problems.subsections.rugPull.title')}</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  {tArray('whitePaper.sections.problems.subsections.rugPull.items').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-red-400">{t('whitePaper.sections.problems.subsections.unfairDistribution.title')}</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  {tArray('whitePaper.sections.problems.subsections.unfairDistribution.items').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-500/20 border border-red-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-red-400">{t('whitePaper.sections.problems.subsections.lackOfUtility.title')}</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  {tArray('whitePaper.sections.problems.subsections.lackOfUtility.items').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-500/20 border border-red-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-red-400">{t('whitePaper.sections.problems.subsections.informationOverload.title')}</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  {tArray('whitePaper.sections.problems.subsections.informationOverload.items').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-red-400">{t('whitePaper.sections.problems.subsections.entryBarriers.title')}</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  {tArray('whitePaper.sections.problems.subsections.entryBarriers.items').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-green-400">{t('whitePaper.sections.problems.subsections.memepumpSolutions.title')}</h3>
                <ul className="space-y-2">
                  {tArray('whitePaper.sections.problems.subsections.memepumpSolutions.items').map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-400 mr-2">🚀</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: AI Solutions */}
          <section className="lg:mb-12 mb-6">
            <h2 className="text-xl lg:text-3xl font-bold mb-6 text-yellow-400">{t('whitePaper.sections.aiSolutions.title')}</h2>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
              <h3 className="text-xl lg:text-2xl font-bold mb-4 text-blue-400">{t('whitePaper.sections.aiSolutions.dataInsights.title')}</h3>
              <p className="text-base leading-relaxed mb-4">
                {t('whitePaper.sections.aiSolutions.dataInsights.description')}
              </p>
              
              <h4 className="text-xl font-bold mb-3 text-blue-300">{t('whitePaper.sections.aiSolutions.dataInsights.whyNewParadigm.title')}</h4>
              <p className="mb-4 text-sm">{t('whitePaper.sections.aiSolutions.dataInsights.whyNewParadigm.description')}</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-6 text-sm">
                {tArray('whitePaper.sections.aiSolutions.dataInsights.whyNewParadigm.items').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              
              <h4 className="text-xl font-bold mb-3 text-blue-300">{t('whitePaper.sections.aiSolutions.dataInsights.dataFramework.title')}</h4>
              <p className="mb-4 text-sm">{t('whitePaper.sections.aiSolutions.dataInsights.dataFramework.description')}</p>
              
              <div className="grid gap-4">
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <h5 className="font-bold mb-2">{t('whitePaper.sections.aiSolutions.dataInsights.dataFramework.sections.marketDashboard.title')}</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    {tArray('whitePaper.sections.aiSolutions.dataInsights.dataFramework.sections.marketDashboard.items').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-500/20 border border-blue-500/30 rounded-lg p-4">
                  <h5 className="font-bold mb-2">{t('whitePaper.sections.aiSolutions.dataInsights.dataFramework.sections.sectorIndex.title')}</h5>
                  <p className="mb-2 text-sm">{t('whitePaper.sections.aiSolutions.dataInsights.dataFramework.sections.sectorIndex.description')}</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    {tArray('whitePaper.sections.aiSolutions.dataInsights.dataFramework.sections.sectorIndex.items').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-sm mt-2 italic">{t('whitePaper.sections.aiSolutions.dataInsights.dataFramework.sections.sectorIndex.example')}</p>
                </div>

                <div className="bg-orange-500/20 border border-blue-500/30 rounded-lg p-4">
                  <h5 className="font-bold mb-2">{t('whitePaper.sections.aiSolutions.dataInsights.dataFramework.sections.tokenAnalysis.title')}</h5>
                  <p className="mb-2 text-sm">{t('whitePaper.sections.aiSolutions.dataInsights.dataFramework.sections.tokenAnalysis.description')}</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    {tArray('whitePaper.sections.aiSolutions.dataInsights.dataFramework.sections.tokenAnalysis.items').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-500/20 border border-blue-500/30 rounded-lg p-4">
                  <h5 className="font-bold mb-2">{t('whitePaper.sections.aiSolutions.dataInsights.dataFramework.sections.alphaNews.title')}</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    {tArray('whitePaper.sections.aiSolutions.dataInsights.dataFramework.sections.alphaNews.items').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-500/20 border border-blue-500/30 rounded-lg p-4">
                  <h5 className="font-bold mb-2">{t('whitePaper.sections.aiSolutions.dataInsights.dataFramework.sections.onchainTrading.title')}</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    {tArray('whitePaper.sections.aiSolutions.dataInsights.dataFramework.sections.onchainTrading.items').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <h5 className="font-bold mb-2">{t('whitePaper.sections.aiSolutions.dataInsights.dataFramework.sections.onchainUpdate.title')}</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    {tArray('whitePaper.sections.aiSolutions.dataInsights.dataFramework.sections.onchainUpdate.items').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl lg:text-2xl font-bold mb-4 text-purple-400">{t('whitePaper.sections.aiSolutions.aiEnabled.title')}</h3>
              <p className="text-base leading-relaxed mb-6">
                {t('whitePaper.sections.aiSolutions.aiEnabled.description')}
              </p>

              <h4 className="text-lg lg:text-xl font-bold mb-3 text-purple-300">{t('whitePaper.sections.aiSolutions.aiEnabled.howAIChanges.title')}</h4>
              
              <div className="grid gap-6">
                <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                  <h5 className="font-bold mb-2">{t('whitePaper.sections.aiSolutions.aiEnabled.howAIChanges.sections.dataAnalysis.title')}</h5>
                  <p className="mb-2 text-sm">{t('whitePaper.sections.aiSolutions.aiEnabled.howAIChanges.sections.dataAnalysis.description')}</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    {tArray('whitePaper.sections.aiSolutions.aiEnabled.howAIChanges.sections.dataAnalysis.items').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-sm mt-2 italic">{t('whitePaper.sections.aiSolutions.aiEnabled.howAIChanges.sections.dataAnalysis.notification')}</p>
                </div>

                <div className="bg-green-500/20 border border-purple-500/30 rounded-lg p-4">
                  <h5 className="font-bold mb-2">{t('whitePaper.sections.aiSolutions.aiEnabled.howAIChanges.sections.marketPrediction.title')}</h5>
                  <p className="mb-2 text-sm">{t('whitePaper.sections.aiSolutions.aiEnabled.howAIChanges.sections.marketPrediction.description')}</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    {tArray('whitePaper.sections.aiSolutions.aiEnabled.howAIChanges.sections.marketPrediction.items').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-sm mt-2 italic">{t('whitePaper.sections.aiSolutions.aiEnabled.howAIChanges.sections.marketPrediction.briefing')}</p>
                </div>

                <div className="bg-blue-500/20 border border-purple-500/30 rounded-lg p-4">
                  <h5 className="font-bold mb-2">{t('whitePaper.sections.aiSolutions.aiEnabled.howAIChanges.sections.aiAssistant.title')}</h5>
                  <p className="mb-2 text-sm">{t('whitePaper.sections.aiSolutions.aiEnabled.howAIChanges.sections.aiAssistant.description')}</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    {tArray('whitePaper.sections.aiSolutions.aiEnabled.howAIChanges.sections.aiAssistant.items').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-sm mt-2 italic">{t('whitePaper.sections.aiSolutions.aiEnabled.howAIChanges.sections.aiAssistant.watchlist')}</p>
                </div>
                <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                  <h5 className="font-bold mb-2">{t('whitePaper.sections.aiSolutions.aiEnabled.howAIChanges.sections.aiAssistantUpdate.title')}</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    {tArray('whitePaper.sections.aiSolutions.aiEnabled.howAIChanges.sections.aiAssistantUpdate.items').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <h5 className="font-bold mb-2 mt-2">{t('whitePaper.sections.aiSolutions.aiEnabled.howAIChanges.sections.aiAssistantUpdate.content')}</h5>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Tokenomics */}
          <section className="lg:mb-12 mb-6">
            <h2 className="text-xl lg:text-3xl font-bold mb-6 text-yellow-400">{t('whitePaper.sections.tokenomics.title')}</h2>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
              <h3 className="text-xl lg:text-2xl font-bold mb-4 text-green-400">{t('whitePaper.sections.tokenomics.memepumpToken.title')}</h3>
              
              <div className="grid gap-6">
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <h4 className="text-xl font-bold mb-3 text-green-300">{t('whitePaper.sections.tokenomics.memepumpToken.governance.title')}</h4>
                  <p className="text-base leading-relaxed">
                    {t('whitePaper.sections.tokenomics.memepumpToken.governance.description')}
                  </p>
                </div>

                <div className="bg-blue-500/20 border border-green-500/30 rounded-lg p-4">
                  <h4 className="text-xl font-bold mb-3 text-green-300">{t('whitePaper.sections.tokenomics.memepumpToken.incentiveStructure.title')}</h4>
                  <p className="text-base leading-relaxed mb-3">
                    {t('whitePaper.sections.tokenomics.memepumpToken.incentiveStructure.description')}
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                    {tArray('whitePaper.sections.tokenomics.memepumpToken.incentiveStructure.items').map((item: string, index: number) => (
                      <li key={index}><strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-purple-500/20 border border-green-500/30 rounded-lg p-4">
                  <h4 className="text-xl font-bold mb-3 text-green-300">{t('whitePaper.sections.tokenomics.memepumpToken.incentiveStructureUpdate.title')}</h4>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                    {tArray('whitePaper.sections.tokenomics.memepumpToken.incentiveStructureUpdate.items').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <h4 className="text-xl font-bold mb-3 text-green-300">{t('whitePaper.sections.tokenomics.memepumpToken.incentiveStructureUpdate2.title')}</h4>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                    {tArray('whitePaper.sections.tokenomics.memepumpToken.incentiveStructureUpdate2.items').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
              <h3 className="text-xl lg:text-2xl font-bold mb-4 text-green-400">{t('whitePaper.sections.tokenomics.tokenomics.title')}</h3>
              
              <div className="grid gap-4">
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="text-lg font-bold mb-2">{t('whitePaper.sections.tokenomics.tokenomics.sections.seedRound.title')}</h4>
                  <p className="text-sm mb-2">{t('whitePaper.sections.tokenomics.tokenomics.sections.seedRound.description')}</p>
                  <p className="text-sm mb-2"><strong>{t('whitePaper.sections.tokenomics.tokenomics.sections.seedRound.vesting.title')}</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    {tArray('whitePaper.sections.tokenomics.tokenomics.sections.seedRound.vesting.items').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <h4 className="text-lg font-bold mb-2">{t('whitePaper.sections.tokenomics.tokenomics.sections.communityRewards.title')}</h4>
                  <p className="text-sm mb-2">{t('whitePaper.sections.tokenomics.tokenomics.sections.communityRewards.description')}</p>
                  <p className="text-sm mb-2"><strong>{t('whitePaper.sections.tokenomics.tokenomics.sections.communityRewards.vesting.title')}</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    {tArray('whitePaper.sections.tokenomics.tokenomics.sections.communityRewards.vesting.items').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                  <h4 className="text-lg font-bold mb-2">{t('whitePaper.sections.tokenomics.tokenomics.sections.liquidityPool.title')}</h4>
                  <p className="text-sm mb-2">{t('whitePaper.sections.tokenomics.tokenomics.sections.liquidityPool.description')}</p>
                  <p className="text-sm"><strong>{t('whitePaper.sections.tokenomics.tokenomics.sections.liquidityPool.vesting')}</strong></p>
                </div>

                <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4">
                  <h4 className="text-lg font-bold mb-2">{t('whitePaper.sections.tokenomics.tokenomics.sections.marketingPartnership.title')}</h4>
                  <p className="text-sm mb-2">{t('whitePaper.sections.tokenomics.tokenomics.sections.marketingPartnership.description')}</p>
                  <p className="text-sm"><strong>{t('whitePaper.sections.tokenomics.tokenomics.sections.marketingPartnership.vesting')}</strong></p>
                </div>

                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                  <h4 className="text-lg font-bold mb-2">{t('whitePaper.sections.tokenomics.tokenomics.sections.teamOperations.title')}</h4>
                  <p className="text-sm mb-2">{t('whitePaper.sections.tokenomics.tokenomics.sections.teamOperations.description')}</p>
                  <p className="text-sm mb-2"><strong>{t('whitePaper.sections.tokenomics.tokenomics.sections.teamOperations.vesting.title')}</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    {tArray('whitePaper.sections.tokenomics.tokenomics.sections.teamOperations.vesting.items').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                  <h4 className="text-lg font-bold mb-2">{t('whitePaper.sections.tokenomics.tokenomics.sections.reserveFund.title')}</h4>
                  <p className="text-sm mb-2">{t('whitePaper.sections.tokenomics.tokenomics.sections.reserveFund.description')}</p>
                  <p className="text-sm mb-2"><strong>{t('whitePaper.sections.tokenomics.tokenomics.sections.reserveFund.vesting.title')}</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    {tArray('whitePaper.sections.tokenomics.tokenomics.sections.reserveFund.vesting.items').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-sm mb-2 mt-2">{t('whitePaper.sections.tokenomics.tokenomics.sections.reserveFund.content')}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl lg:text-2xl font-bold mb-4 text-green-400">{t('whitePaper.sections.tokenomics.airdrop.title')}</h3>
              
              <div className="grid gap-4">
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <h4 className="text-lg font-bold mb-2">{t('whitePaper.sections.tokenomics.airdrop.overview.title')}</h4>
                  <p className="text-sm">{t('whitePaper.sections.tokenomics.airdrop.overview.description')}</p>
                </div>

                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="text-lg font-bold mb-2">{t('whitePaper.sections.tokenomics.airdrop.resources.title')}</h4>
                  <h5 className="font-bold mb-2 text-sm">{t('whitePaper.sections.tokenomics.airdrop.resources.channels.title')}</h5>
                  <p className="text-sm mb-2">{t('whitePaper.sections.tokenomics.airdrop.resources.channels.description')}</p>
                  <h5 className="font-bold mb-2 text-sm">{t('whitePaper.sections.tokenomics.airdrop.resources.socialParticipation.title')}</h5>
                  <p className="text-sm">{t('whitePaper.sections.tokenomics.airdrop.resources.socialParticipation.description')}</p>
                </div>

                <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                  <h4 className="text-lg font-bold mb-2">{t('whitePaper.sections.tokenomics.airdrop.tasks.title')}</h4>
                  <p className="text-sm mb-2">{t('whitePaper.sections.tokenomics.airdrop.tasks.description')}</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    {tArray('whitePaper.sections.tokenomics.airdrop.tasks.items').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4">
                  <h4 className="text-lg font-bold mb-2">{t('whitePaper.sections.tokenomics.airdrop.distribution.title')}</h4>
                  <p className="text-sm mb-2">{t('whitePaper.sections.tokenomics.airdrop.distribution.description')}</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    {tArray('whitePaper.sections.tokenomics.airdrop.distribution.requirements').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-sm mt-2">{t('whitePaper.sections.tokenomics.airdrop.distribution.conclusion')}</p>
                </div>
              </div>
            </div>
          </section>

          <WhitePaperPageTwo />

          {/* Footer */}
          <div className="text-center pt-2 border-t border-white/20">
            <p className="text-white/60">
              © 2025 MEMEPUMP. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default WhitePaperPage