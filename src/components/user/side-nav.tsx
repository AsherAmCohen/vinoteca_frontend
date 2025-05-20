import { Box, Divider, Stack, Typography } from "@mui/material"
import { NavItemConfigProps, NavItemProps, RenderNavItemsProps } from "../../types/side-nav"
import { ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { navItem } from "./config"
import { isNavItemActive } from "../../lib/is-nav-item-active"
import { navIcons } from "./nav-icons"
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from "react-redux"

export const SideNav = () => {
    const location = useLocation()
    const pathname = location.pathname

    // Permisos del usuario
    const userPermissions = useSelector((state: any) => state.Auth.user?.permissions || []);

    return (
        <Box
            sx={{
                bgcolor: 'var(--Vinoteca-Background-Dark)',
                color: 'var(--Vinoteca-Background-Light)',
                display: {
                    xs: 'none',
                    lg: 'flex'
                },
                flexDirection: 'column',
                height: '100%',
                left: 0,
                maxWidth: '100%',
                position: 'fixed',
                scrollbarWidth: 'none',
                top: 0,
                width: 'var(--Vinoteca-SideNav-width)',
                zIndex: 'var(--Vinoteca-Sidenav-zIndex)',
                '&::-webkit-scrollbar': { display: 'none' }
            }}
        >
            <Stack>
                Logo
            </Stack>
            <Divider
                sx={{ bgcolor: 'var(--Vinoteca-Background-Light)' }}
            />
            <Box
                component='nav'
                sx={{
                    flex: '0 1 auto',
                    p: '12px'
                }}
            >
                {renderNavItems({ pathname, items: navItem, userPermissions })}
            </Box>
        </Box>
    )
}

const renderNavItems = ({ items = [], pathname, userPermissions = [] }: RenderNavItemsProps) => {
    const children = items.reduce((acc: ReactNode[], curr: NavItemConfigProps) => {
        const { key, permissions = [], ...item } = curr;

        // Verificar permisos
        const hasPermission = permissions.some((p: any) => userPermissions.includes(p))
        if(!hasPermission) return acc;

        acc.push(
            <NavItem key={key} pathname={pathname} {...item} />
        )

        return acc;
    }, []);

    return (
        <Stack component='ul' spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {children}
        </Stack>
    )
}

const NavItem = ({ disabled, external, href, icon, matcher, pathname, title }: NavItemProps) => {
    const active = isNavItemActive({ disabled, external, href, matcher, pathname });
    const Icon = icon ? navIcons[icon] : null;

    return (
        <li>
            <Box
                {...(href
                    ? {
                        ...(external
                            ? {
                                component: 'a',
                                href,
                                target: '_blank',
                                rel: 'noreferrer',
                            }
                            : {
                                component: RouterLink,
                                to: href,
                            }
                        ),
                        target: external ? '_blank' : undefined,
                        rel: external ? 'noreferrer' : undefined
                    }
                    : { role: 'button' }
                )}
                sx={{
                    alignItems: 'center',
                    borderRadius: 1,
                    color: 'var(--Vinoteca-Background-Light)',
                    cursor: 'pointer',
                    display: 'flex',
                    flex: '0 0 auto',
                    gap: 1,
                    p: '6px 16px',
                    position: 'relative',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    ...(active && {
                        bgcolor: 'var(--Vinoteca-Background-Light)',
                        color: 'var(--Vinoteca-Background-Dark)'
                    }),
                    '&:hover': {
                        color: 'var(--Vinoteca-Background-Dark)',
                        bgcolor: 'var(--Vinoteca-Background-Light)'
                    }
                }}
            >
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        flex: '0 0 auto',
                    }}
                >
                    {Icon
                        ? <Icon
                            fill='currentColor'
                            fontSize='var(--Vinoteca-Icon-FontSize-md)'
                            weight={
                                active
                                    ? 'fill'
                                    : undefined
                            }
                        />
                        : null
                    }
                </Box>
                <Box
                    sx={{
                        flex: '1 1 auto'
                    }}
                >
                    <Typography
                        component='span'
                        sx={{
                            color: 'inherit',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            lineHeight: '28px'
                        }}
                    >
                        {title}
                    </Typography>
                </Box>
            </Box>
        </li>
    )
}