import { MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { ScrollButtonProps } from "../../types/scroll-button";
import { scrollToSection } from "../../utils/scroll-to-section";

export const ScrollButtonMenuItem = (props: ScrollButtonProps) => {
    const { label, section } = props;
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Verifica si la sección está en la vista
                entries.forEach(entry => {
                    if (entry.target === section.current) {
                        setIsVisible(entry.isIntersecting)
                    }
                })
            },
            {
                rootMargin: '0px',
                threshold: 0.5
            }
        )
        if (section.current) {
            observer.observe(section.current)
        }

        return () => {
            if (section.current) {
                observer.unobserve(section.current)
            }
        }
    }, [section])

    return (
        <MenuItem
            sx={{
                mr: 1,
                color: isVisible ? 'var(--vinoteca-palette-neutral-950)' : 'var(--vinoteca-palette-common-white)',
                background: isVisible ? 'var(--vinoteca-palette-common-white)' : 'var(--vinoteca-palette-neutral-950)',
                fontWeight: 'bold',
                '&:hover': {
                    color: 'var(--vinoteca-palette-neutral-950)',
                    background: 'var(--vinoteca-palette-common-white)',
                }
            }}
            onClick={() => scrollToSection(section)}
        >
            {label}
        </MenuItem>
    )
}