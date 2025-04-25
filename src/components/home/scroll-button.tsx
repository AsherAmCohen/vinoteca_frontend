import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ScrollButtonProps } from "../../types/scroll-button";
import { scrollToSection } from "../../utils/scroll-to-section";

export const ScrollButton = (props: ScrollButtonProps) => {
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
        <Button
            variant='text'
            sx={{
                mr: 1,
                color: isVisible ? 'var(--Vinoteca-Background-Dark)' : 'var(--Vinoteca-Background-Light)',
                background: isVisible ? 'var(--Vinoteca-Background-Light)' : 'var(--Vinoteca-Background-Dark)',
                fontWeight: 'bold',
                '&:hover': {
                    color: 'var(--Vinoteca-Background-Dark)',
                    background: 'var(--Vinoteca-Background-Light)',
                }
            }}
            size='small'
            onClick={() => scrollToSection(section)}
        >
            {label}
        </Button>
    )
}