import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";

const Home = ({ username, setUsername, password, setPassword, setErrorLoginMessage, errorLoginMessage }) => {
    return (
        <div>
            <LoginForm
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                setErrorLoginMessage={setErrorLoginMessage}
                errorLoginMessage={errorLoginMessage} />

            <Footer
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                setErrorLoginMessage={setErrorLoginMessage}
            />
        </div>
    );
};

export default Home;
