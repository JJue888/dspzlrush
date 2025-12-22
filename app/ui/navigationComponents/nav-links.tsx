'use client'

import {usePathname} from "next/navigation";

const links = [
    {name: 'Home', link: '/dashboard'},
    {name: 'PNMS', link: '/pnms'},
]

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <>

        </>
    )
}
