'use client'
import React from 'react'
import { useLang } from '@/lang/useLang'

const WhitePaperPageTwo = () => {
  const { t, tArray } = useLang()

  return (
    <div className="mt-12">
      {/* 4.4 스테이킹 보상 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-yellow-400">{t('whitePaper.sections.staking.title')}</h2>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold mb-4 text-green-400">{t('whitePaper.sections.staking.rewards.title')}</h3>
          <div className="grid gap-4">
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
              <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                {tArray('whitePaper.sections.staking.rewards.items').map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold mb-4 text-green-400">{t('whitePaper.sections.staking.mechanism.title')}</h3>
          <div className="grid gap-4">
            <div className="bg-purple-500/20 border border-green-500/30 rounded-lg p-4">
              <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                {tArray('whitePaper.sections.staking.mechanism.items').map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold mb-4 text-green-400">{t('whitePaper.sections.staking.community.title')}</h3>
          <div className="grid gap-4">
            <div className="bg-blue-500/20 border border-green-500/30 rounded-lg p-4">
              <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                {tArray('whitePaper.sections.staking.community.items').map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-green-300">{t('whitePaper.sections.staking.community.summary')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 마이닝 앱 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-yellow-400">{t('whitePaper.sections.miningApp.title')}</h2>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold mb-4 text-blue-400">{t('whitePaper.sections.miningApp.overview.title')}</h3>
          <div className="grid gap-4">
            <div className="bg-green-500/20 border border-blue-500/30 rounded-lg p-4">
              <p className="text-sm leading-relaxed">{t('whitePaper.sections.miningApp.overview.content')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold mb-4 text-blue-400">{t('whitePaper.sections.miningApp.mechanism.title')}</h3>
          <div className="grid gap-4">
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-xl font-bold mb-2 text-blue-300">{t('whitePaper.sections.miningApp.mechanism.mining.title')}</h4>
              <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                {tArray('whitePaper.sections.miningApp.mechanism.mining.items').map((item: string, idx: number) => (    
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-500/20 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-xl font-bold mb-2 text-blue-300">{t('whitePaper.sections.miningApp.mechanism.points.title')}</h4>
              <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                {tArray('whitePaper.sections.miningApp.mechanism.points.items').map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold mb-4 text-blue-400">{t('whitePaper.sections.miningApp.security.title')}</h3>
          <div className="grid gap-4">
            <div className="bg-green-500/20 border border-blue-500/30 rounded-lg p-4">
              <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                {tArray('whitePaper.sections.miningApp.security.items').map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold mb-4 text-blue-400">{t('whitePaper.sections.miningApp.roadmap.title')}</h3>
          <div className="grid gap-4">
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
              <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                {tArray('whitePaper.sections.miningApp.roadmap.items').map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-green-300">{t('whitePaper.sections.miningApp.roadmap.summary')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 리소스 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-yellow-400">{t('whitePaper.sections.resources.title')}</h2>
        
        {/* Tutorial Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold mb-4 text-purple-400">{t('whitePaper.sections.resources.tutorial.title')}</h3>
          <p className="text-sm leading-relaxed mb-4">{t('whitePaper.sections.resources.tutorial.overview')}</p>
          
          <div className="grid gap-4">
            <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-xl font-bold mb-2 text-purple-300">{t('whitePaper.sections.resources.tutorial.usdc.title')}</h4>
              <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                {tArray('whitePaper.sections.resources.tutorial.usdc.items').map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-green-500/20 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-xl font-bold mb-2 text-purple-300">{t('whitePaper.sections.resources.tutorial.sol.title')}</h4>
              <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                {tArray('whitePaper.sections.resources.tutorial.sol.items').map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-500/20 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-xl font-bold mb-2 text-purple-300">{t('whitePaper.sections.resources.tutorial.staking.title')}</h4>
              <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                {tArray('whitePaper.sections.resources.tutorial.staking.items').map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Roadmap Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold mb-4 text-orange-400">{t('whitePaper.sections.resources.roadmap.title')}</h3>
          <p className="text-sm leading-relaxed mb-6">{t('whitePaper.sections.resources.roadmap.summary')}</p>
          
          <div className="grid gap-4">
            {tArray('whitePaper.sections.resources.roadmap.phases').map((phase: any, idx: number) => (
              <div key={idx} className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4">
                <h4 className="text-xl font-bold mb-3 text-orange-300">{phase.title}</h4>
                <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                  {phase.items.map((item: string, itemIdx: number) => (
                    <li key={itemIdx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <p className="mt-6 text-xs italic text-lime-300">{t('whitePaper.sections.resources.roadmap.note')}</p>
        </div>

        {/* Audit Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold mb-4 text-red-400">{t('whitePaper.sections.resources.audit.title')}</h3>
          <div className="grid gap-4">
            <div className="bg-green-500/20 border border-red-500/30 rounded-lg p-4">
              <p className="text-sm leading-relaxed">{t('whitePaper.sections.resources.audit.content')}</p>
            </div>
          </div>
        </div>

        {/* Terms Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold mb-1 text-indigo-400">{t('whitePaper.sections.resources.terms.title')}</h3>
          <p className="text-xs italic text-gray-300 mb-4">{t('whitePaper.sections.resources.terms.lastUpdate')}</p>
          
          <div className="grid gap-4">
            {tArray('whitePaper.sections.resources.terms.sections').map((section: any, idx: number) => (
              <div key={idx} className="bg-orange-500/20 border border-indigo-500/30 rounded-lg p-4">
                <h4 className="text-xl font-bold mb-3 text-indigo-300">{section.title}</h4>
                {section.content && <p className="text-sm mb-1">{section.content}</p>}
                {section.items && (
                  <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                    {section.items.map((item: string, itemIdx: number) => (
                      <li key={itemIdx}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.disclaimer && <p className="mt-3 text-xs italic text-white/80">{section.disclaimer}</p>}
                {section.prohibited && <p className="mt-3 text-xs italic text-red-300">{section.prohibited}</p>}
                {section.liability && <p className="mt-3 text-xs italic text-yellow-300">{section.liability}</p>}
              </div>
            ))}
          </div>
          
          <div className="grid gap-4 mt-4">
            <div className="bg-orange-500/20 border border-indigo-500/30 rounded-lg p-4">
              <h4 className="text-xl font-bold mb-2 text-indigo-300">{t('whitePaper.sections.resources.terms.improvements.title')}</h4>
              <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                {tArray('whitePaper.sections.resources.terms.improvements.items').map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold mb-4 text-teal-400">{t('whitePaper.sections.resources.privacy.title')}</h3>
          <p className="text-sm leading-relaxed mb-6">{t('whitePaper.sections.resources.privacy.overview')}</p>
          
          <div className="grid gap-4">
            {tArray('whitePaper.sections.resources.privacy.sections').map((section: any, idx: number) => (
              <div key={idx} className="bg-green-500/20 border border-teal-500/30 rounded-lg p-4">
                <h4 className="text-xl font-bold mb-3 text-teal-300">{section.title}</h4>
                {section.onchain && (
                  <div className="mb-4">
                    <h5 className="text-lg font-semibold mb-2 text-teal-200">{section.onchain.title}</h5>
                    <p className="text-base">{section.onchain.content}</p>
                  </div>
                )}
                {section.offchain && (
                  <div className="mb-4">
                    <h5 className="text-lg font-semibold mb-2 text-teal-200">{section.offchain.title}</h5>
                    <p className="text-base">{section.offchain.content}</p>
                  </div>
                )}
                {section.analytics && (
                  <div className="mb-0">
                    <h5 className="text-lg font-semibold mb-2 text-teal-200">{section.analytics.title}</h5>
                    <p className="text-base">{section.analytics.content}</p>
                  </div>
                )}
                {section.items && (
                  <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                    {section.items.map((item: string, itemIdx: number) => (
                      <li key={itemIdx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          
          <p className="mt-6 text-sm italic text-green-300">{t('whitePaper.sections.resources.privacy.contact')}</p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold mb-4 text-cyan-400">{t('whitePaper.sections.resources.faq.title')}</h3>
          
          <div className="grid gap-4">
            {tArray('whitePaper.sections.resources.faq.questions').map((faq: any, idx: number) => (
              <div key={idx} className="bg-cyan-500/20 border border-cyan-500/30 rounded-lg p-4">
                <h4 className="text-lg font-bold mb-3 text-cyan-300">{faq.question}</h4>
                <p className="text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default WhitePaperPageTwo