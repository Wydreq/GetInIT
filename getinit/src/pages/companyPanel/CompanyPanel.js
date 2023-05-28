import AccountInfo from "../../components/companyPanel/AccountInfo";
import classes from './CompanyPanel.module.css';
import ButtonsContainer from "../../components/companyPanel/ButtonsContainer";
import {useState, useEffect} from 'react';
import {TailSpin} from "react-loader-spinner";


const CompanyPanel = () => {
    const [isInfoLoaded, setIsInfoLoaded] = useState(false);
    const [user, setUser] = useState({
        firstName: 'Loading...',
        mail: 'Loading...',
        role: 'Loading...'
    });
    async function fetchUserInfo()
    {
        const response = await fetch('http://localhost:5099/api/account/AccountProfile', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        if (!response.ok) {
            throw new Error("Something went wrong!");
        }

        const data = await response.json();

        setUser({
            firstName: data.name,
            lastName: data.lastName,
            mail: data.email,
            role: data.role,
        })

            setIsInfoLoaded(true);
    }

    useEffect(()=> {
        fetchUserInfo();
    })

    return (
        <div className={isInfoLoaded ? classes.container : classes.container2}>
            {isInfoLoaded && <AccountInfo userInfo={user}/>}
            {isInfoLoaded && <ButtonsContainer userInfo={user}/>}
            {!isInfoLoaded &&
                <TailSpin
                height="200"
                width="200"
                color="#1976d2"
                ariaLabel="tail-spin-loading"
                radius="2"
                visible={true}
            />}
        </div>
    )
}

export default CompanyPanel;