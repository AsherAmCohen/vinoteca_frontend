import { Icon, Info as InformationIcon } from "@phosphor-icons/react"
import { HouseLine as AddressIcon } from "@phosphor-icons/react"
import { Bag as OrdersIcon } from "@phosphor-icons/react"
import { Wine as WineListIcon } from "@phosphor-icons/react"
import { Trademark as MarkIcon } from "@phosphor-icons/react"

export const navIcons = {
    'information': InformationIcon,
    'address': AddressIcon,
    'orders': OrdersIcon,
    'winelist': WineListIcon,
    'mark': MarkIcon
} as Record<string, Icon>