import { useState } from "react";
import PropTypes from "prop-types";
import createApi from "./api";
import { AuthContext } from "./createcontext";

export const AuthProvider = ({ children }) => {
	const api = createApi();
	const [user, setUser] = useState(false);    

	const handleCreateUser = async (email, username, password) => {
		try {
			const res = await api.post("/auth/signup", {
				email,
				username,
				password,
			});
			window.location.href = "/";
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};

	const handleSignIn = async (username, password) => {
		try {
            setUser(username );
			const res = await api.post("/auth/login", {
				username,
				password,
			});
			console.log(res);
			localStorage.setItem("access_token", res.data.access_token);
			localStorage.setItem("refresh_token", res.data.refresh_token);
            console.log(user)
            if(localStorage.getItem("access_token")){
                setUser(true)
            }
            else{
                setUser(false)
            }
		} catch (err) {
			console.log(err.response.data.msg);
		}
	};

	const handleSignOut =  () => {
		try {
            console.log("qq")
			// const res = await api.post("/auth/signout");
			// console.log(res);
			localStorage.removeItem("access_token");
			localStorage.removeItem("refresh_token");            
		} catch (err) {
			console.log(err);
		}
	};
	function checkUserStatus(){
		if(localStorage.getItem("access_token")){
            setUser(true)
        }
        else{
           setUser(false)
        }
	}

	const value = {
		user,
		handleCreateUser,
		handleSignIn,
		handleSignOut,
		checkUserStatus
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthProvider;
