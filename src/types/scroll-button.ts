import { RefObject } from "react";

export interface ScrollButtonProps {
    label: string;
    section: RefObject<HTMLDivElement | null>
}