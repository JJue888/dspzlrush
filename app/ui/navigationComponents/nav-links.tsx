'use client'

import {usePathname} from "next/navigation";
import Link from "next/link";
import classes from "./nav-links.module.css"

const links = [
    {name: 'Home', link: '/dashboard'},
    {name: 'PNMS', link: '/dashboard/pnms'},
    {name: 'Add PNM', link: '/dashboard/pnms/create'}
]

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => {
                return (
                    <Link key={link.link} href={link.link} className={classes.navText}>
                        <p>{link.name}</p>
                    </Link>
                )
            })}
        </>
    )
}
