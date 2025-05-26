// import { Button } from "@mui/material";
// import { useEffect, useState } from "react";
// import { ScrollButtonProps } from "../../types/scroll-button";
// import { scrollToSection } from "../../utils/scroll-to-section";

// export const ScrollButton = (props: ScrollButtonProps) => {
//     const { label, section } = props;
//     const [isVisible, setIsVisible] = useState(false)

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 // Verifica si la sección está en la vista
//                 entries.forEach(entry => {
//                     if (entry.target === section.current) {
//                         setIsVisible(entry.isIntersecting)
//                     }
//                 })
//             },
//             {
//                 rootMargin: '0px',
//                 threshold: 0.5
//             }
//         )
//         if (section.current) {
//             observer.observe(section.current)
//         }

//         return () => {
//             if (section.current) {
//                 observer.unobserve(section.current)
//             }
//         }
//     }, [section])

//     return (
//         <Button
//             variant='text'
//             sx={{
//                 mr: 1,
//                 color: isVisible ? 'var(--vinoteca-palette-neutral-950)' : 'var(--vinoteca-palette-common-white)',
//                 background: isVisible ? 'var(--vinoteca-palette-common-white)' : 'var(--vinoteca-palette-neutral-950)',
//                 fontWeight: 'bold',
//                 '&:hover': {
//                     color: 'var(--vinoteca-palette-neutral-950)',
//                     background: 'var(--vinoteca-palette-common-white)',
//                 }
//             }}
//             size='small'
//             onClick={() => scrollToSection(section)}
//         >
//             {label}
//         </Button>
//     )
// }

import { Button } from "@mui/material"

interface ScrollButtonProps {
    label: string
    section: any
    isActive?: boolean
}

export const ScrollButton = ({ label, section, isActive = false }: ScrollButtonProps) => {
    const handleClick = () => {
        section.current?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <Button
            variant={isActive ? "contained" : "text"}
            onClick={handleClick}
            sx={{
                mr: 1,
                color: isActive ? 'var(--vinoteca-palette-neutral-950)' : 'var(--vinoteca-palette-common-white)',
                background: isActive ? 'var(--vinoteca-palette-common-white)' : 'var(--vinoteca-palette-neutral-950)',
                fontWeight: 'bold',
                '&:hover': {
                    color: 'var(--vinoteca-palette-neutral-950)',
                    background: 'var(--vinoteca-palette-common-white)',
                }
            }}
        >
            {label}
        </Button>
    )
}
