import { RefObject } from "react";

export interface ToolBarProps {
    homeRef: RefObject<HTMLDivElement | null>
    historyRef: RefObject<HTMLDivElement | null>
    winelistRef: RefObject<HTMLDivElement | null>
    currentIndex: number
}