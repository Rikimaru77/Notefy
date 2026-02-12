import Register from "../components/Register";
import IsLoggedIn from "./login";

function login() {
    if (IsLoggedIn) {
        return (
            <>
                <p>Logged in !</p>
            </>
        );
    }
    else {
        return (
            <>
                <p>Log in Here :</p>
                <form>
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <button type="button" onClick={ Register }>Register</button>
                </form>
            </>
        );
    }
}

export default { login };