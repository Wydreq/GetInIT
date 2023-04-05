import { AppBar, Toolbar } from "@mui/material"
import { Stack } from "@mui/system";
import { NavLink, Link } from 'react-router-dom'
import classes from './MainNavigation.module.css'
import logo from '../assets/navbarLogo.png'

const MainNavigation = () => {
    return (
        <AppBar position='absolute'>
            <Toolbar>
                <img src={logo} alt='logo' style={{marginRight: 'auto'}}/>
                <Stack direction='row' spacing={2}>
                    <NavLink style={{textDecoration: 'none'}} to='/' className={({ isActive }) => (isActive ? classes.active : classes.navElement)} end>Home</NavLink>
                    <NavLink style={{textDecoration: 'none'}} className={classes.navElement}>Login</NavLink>
                    <NavLink style={{textDecoration: 'none'}} to='/register' className={({ isActive }) => (isActive ? classes.active : classes.navElement)}>Register company</NavLink>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default MainNavigation; 