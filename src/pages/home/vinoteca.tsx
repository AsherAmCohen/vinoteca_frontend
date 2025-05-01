import { CssBaseline } from "@mui/material"
import { ToolBar } from "../../components/home/tool-bar"
import { Home } from "../../components/home/home"
import { useRef, useEffect, useState } from "react"
import { History } from "../../components/home/history"
import { WineList } from "../../components/home/winelist"

export const Vinoteca = () => {
    const homeRef = useRef<HTMLDivElement | null>(null)
    const historyRef = useRef<HTMLDivElement | null>(null)
    const winelistRef = useRef<HTMLDivElement | null>(null)
    const sectionRefs = [homeRef, historyRef, winelistRef]

    const [currentIndex, setCurrentIndex] = useState(0)
    const isScrolling = useRef(false)

    const scrollToSection = (index: number) => {
        sectionRefs[index].current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (isScrolling.current) return

            isScrolling.current = true

            if (e.deltaY > 0 && currentIndex < sectionRefs.length - 1) {
                setCurrentIndex((prev) => {
                    const next = prev + 1
                    scrollToSection(next)
                    return next
                })
            } else if (e.deltaY < 0 && currentIndex > 0) {
                setCurrentIndex((prev) => {
                    const next = prev - 1
                    scrollToSection(next)
                    return next
                })
            }

            setTimeout(() => {
                isScrolling.current = false
            }, 1000)
        }

        window.addEventListener("wheel", handleWheel, { passive: true })
        return () => window.removeEventListener("wheel", handleWheel)
    }, [currentIndex])

    return (
        <div className="h-screen overflow-y-hidden">
            <CssBaseline enableColorScheme />
            <ToolBar
                homeRef={homeRef}
                historyRef={historyRef}
                winelistRef={winelistRef}
            />

            <section ref={homeRef} className="h-screen flex snap-start text-white">
                <Home />
            </section>

            <section ref={historyRef} className="h-screen flex snap-start text-white">
                <History />
            </section>

            <section ref={winelistRef} className="h-screen flex snap-start text-white">
                <WineList/>
            </section>
        </div>
    )
}
