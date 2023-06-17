import classes from './AccountInfo.module.css';
import StarsIcon from '@mui/icons-material/Stars';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
const AccountInfo = (props) => {
    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Hi {props.userInfo.firstName} {props.userInfo.lastName}! {props.userInfo.role === 'ManagerCompanyAccount' && <StarsIcon fontSize='inherit' data-testid="stars-icon"/>}{props.userInfo.role === 'EmployeeAccount' && <BadgeIcon fontSize='inherit' data-testid="badge-icon"/>}{props.userInfo.role === 'UserAccount' && <PersonIcon fontSize='inherit' data-testid="person-icon"/>}</h1>
            <p className={classes.mail}>Your mail: {props.userInfo.mail}</p>
        </div>
    )
}

export default AccountInfo;