export const scrollToSection = (section: any) => {
    section?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}