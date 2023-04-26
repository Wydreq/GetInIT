import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import classes from './Root.module.css'

const RootLayout = () => {
    return ( 
    <div className={classes.root}>
        <MainNavigation/>
        <Outlet />
    </div>
    )
}

export default RootLayout;