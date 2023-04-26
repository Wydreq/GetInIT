import AccountInfo from "../../components/companyPanel/AccountInfo";
import classes from './CompanyPanel.module.css';

const CompanyPanel = () => {
    return (<div className={classes.container}>
        <AccountInfo/>
    </div>)
}

export default CompanyPanel;