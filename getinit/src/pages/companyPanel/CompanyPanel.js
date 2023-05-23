import AccountInfo from "../../components/companyPanel/AccountInfo";
import classes from './CompanyPanel.module.css';
import ButtonsContainer from "../../components/companyPanel/ButtonsContainer";

const CompanyPanel = () => {
    return (<div className={classes.container}>
        <AccountInfo/>
        <ButtonsContainer/>
    </div>)
}

export default CompanyPanel;