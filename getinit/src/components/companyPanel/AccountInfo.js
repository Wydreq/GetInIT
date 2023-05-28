import classes from './AccountInfo.module.css';

const AccountInfo = (props) => {
    return (
        <div className={classes.container}>
            <h1>Your name: {props.userInfo.firstName} {props.userInfo.lastName}</h1>
            <p>Your mail: {props.userInfo.mail}</p>
            <p>Role: {props.userInfo.role}</p>
        </div>
    )
}

export default AccountInfo;