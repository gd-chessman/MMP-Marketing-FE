import { useState, useEffect } from 'react'

export const useActiveSection = () => {
    const [activeSection, setActiveSection] = useState('join-us')

    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                'join-us',
                'features', 
                'exchange-token',
                'tokenomics',
                'our-team',
                'road-map',
                'footer'
            ]

            const scrollPosition = window.scrollY + 100 // Offset for better detection

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i])
                if (section) {
                    const sectionTop = section.offsetTop
                    const sectionHeight = section.offsetHeight
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        setActiveSection(sections[i])
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Check initial position

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return activeSection
} 