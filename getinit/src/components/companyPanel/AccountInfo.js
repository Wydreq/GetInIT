import classes from './AccountInfo.module.css';

const AccountInfo = () => {
    return (
        <div className={classes.container}>
            <h1>Your name: Bartłomiej Wydrzycki</h1>
            <p>Your mail: bartlomiej.wydrzycki@gmail.com</p>
            <p>Member since: 31/04/2022</p>
        </div>
    )
}

export default AccountInfo;