import classes from './AccountInfo.module.css';
import StarsIcon from '@mui/icons-material/Stars';
import PersonIcon from '@mui/icons-material/Person';
const AccountInfo = (props) => {
    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Hi {props.userInfo.firstName} {props.userInfo.lastName}! {props.userInfo.role === 'ManagerCompanyAccount' ? <StarsIcon fontSize='inherit'/> : <PersonIcon fontSize='inherit'/>}</h1>
            <p className={classes.mail}>Your mail: {props.userInfo.mail}</p>
        </div>
    )
}

export default AccountInfo;