import { Icon, Info as InformationIcon } from "@phosphor-icons/react"
import { HouseLine as AddressIcon } from "@phosphor-icons/react"
import { Bag as OrdersIcon } from "@phosphor-icons/react"
import { Wine as WineListIcon } from "@phosphor-icons/react"
import { Trademark as MarkIcon } from "@phosphor-icons/react"
import { Tag as TagIcon } from "@phosphor-icons/react"
import { User as UserIcon } from "@phosphor-icons/react"
import { LockKey as RoleIcon } from "@phosphor-icons/react"

export const navIcons = {
    'information': InformationIcon,
    'address': AddressIcon,
    'orders': OrdersIcon,
    'winelist': WineListIcon,
    'mark': MarkIcon,
    'category': TagIcon,
    'user': UserIcon,
    'role': RoleIcon
} as Record<string, Icon>