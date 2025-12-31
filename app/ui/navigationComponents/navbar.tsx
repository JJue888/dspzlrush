import NavLinks from "@/app/ui/navigationComponents/nav-links";
import classes from "./navbar.module.css";

export default function NavBar() {
    return (
        <>
            <header className={classes.navContainer}>
                <NavLinks />
            </header>
        </>
    )
}
