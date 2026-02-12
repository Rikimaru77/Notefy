import { useState } from "react";
import LogIn from "../components/login.tsx";

const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

function login() {
    if (isLoggedIn) {
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
                    <button type="button" onClick={ LogIn }>Login</button>
                </form>
            </>
        );
    }
}

export default 
{ isLoggedIn, login };