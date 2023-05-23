import classes from './ButtonsContainer.module.css';

const ButtonsContainer = () => {
    return (
        <div className={classes.container}>
            <div className={classes.button}>Add new offer</div>
            <div className={classes.button}>Check your offers</div>
            <div className={classes.button}>Edit account info</div>
            <div className={classes.button}>Add new company account</div>
        </div>
    )
}

export default ButtonsContainer;