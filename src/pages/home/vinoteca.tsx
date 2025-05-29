import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { History } from "../../components/home/history";
import { WineList } from "../../components/home/winelist";
import { Home } from "../../components/home/home";
import { ToolBar } from "../../components/home/tool-bar";

export const Vinoteca = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const winelistRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const refs = [homeRef, historyRef, winelistRef];
      const offsets = refs.map((ref) => {
        if (!ref.current) return Number.MAX_VALUE;
        const rect = ref.current.getBoundingClientRect();
        return Math.abs(rect.top);
      });

      const minOffset = Math.min(...offsets);
      const index = offsets.indexOf(minOffset);
      setCurrentIndex(index);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ToolBar
        homeRef={homeRef}
        historyRef={historyRef}
        winelistRef={winelistRef}
        currentIndex={currentIndex}
      />
      <Box ref={homeRef}>
        <Home />
      </Box>
      <Box ref={historyRef}>
        <History />
      </Box>
      <Box ref={winelistRef}>
        <WineList />
      </Box>
    </>
  );
};
