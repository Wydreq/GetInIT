import classes from './NotFoundPage.module.css';
import img from '../assets/404.png';
const NotFoundPage = () => {
    return (
        <div className={classes.container}>
            <img className={classes.errorImage} src={img} alt='404'/>
            <span className={classes.text}>Page not found!</span>
        </div>
    )
};

export default NotFoundPage;