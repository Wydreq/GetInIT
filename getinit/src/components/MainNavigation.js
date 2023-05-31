import { AppBar, Toolbar } from "@mui/material"
import { Stack } from "@mui/system";
import {NavLink, Form, useRouteLoaderData} from 'react-router-dom'
import classes from './MainNavigation.module.css'
import logo from '../assets/navbarLogo.png'

const MainNavigation = () => {

    const token = useRouteLoaderData('root');

    return (
        <AppBar position='fixed'>
            <Toolbar>
                <img src={logo} alt='logo' style={{marginRight: 'auto'}}/>
                <Stack direction='row' spacing={2}>
                    {token && <NavLink style={{textDecoration: 'none'}} to='/' className={({ isActive }) => (isActive ? classes.active : classes.navElement)} end>Home</NavLink>}
                    {token && <NavLink style={{textDecoration: 'none'}} to='/userPanel' className={({ isActive }) => (isActive ? classes.active : classes.navElement)} end>Your Panel</NavLink>}
                    {!token && <NavLink style={{textDecoration: 'none'}} to='/auth' className={({ isActive }) => (isActive ? classes.active : classes.navElement)}>Sign In</NavLink>}
                    {token && <Form action="/logout" method="post">
                        <button className={classes.btn}>Logout</button>
                    </Form>}
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default MainNavigation; 