import NavBar from "@/app/ui/navigationComponents/navbar";
import classes from "./layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavBar />
            <div className={classes.pageContainer}>
                {children}
            </div>
        </>
    )
}