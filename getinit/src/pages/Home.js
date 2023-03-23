import { Link } from "react-router-dom";

const HomePage = () => {
    return (
    <div>
        <p>Home page</p>
        <Link to="/login">Login</Link>
    </div>


    );
};

export default HomePage;