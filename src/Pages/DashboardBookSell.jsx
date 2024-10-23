import { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import DashContent from "../Components/DashBoardContent";
import UploadPage from "../Components/UploadPage";
import DashBoardPageContent from "../Components/DashboardPage";
import ManagePage from "../Components/ManagePage";
import EditPage from "../Components/EditPage";

export default function Dashboard() {
    const [valid, setValid] = useState(false);
    const nav = useNavigate();
    const [page, setPage] = useState("Home");
    const [user, setUser] = useState({});

    useEffect(() => {
        async function VerifyToken() {
            const LoginTokenStored = localStorage.getItem("LoginToken");
            if (LoginTokenStored) {
                try {
                    const response = await fetch(`http://localhost:5000/getToken/${LoginTokenStored}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch token. Response status: ' + response.status);
                    }
                    const data = await response.json();
                    if (data.type === "LoginToken") {
                        setValid(true);
                    } else {
                        console.warn('Invalid token type:', data.type);
                        nav('/Login');
                    }
                } catch (error) {
                    console.error('Error during token verification:', error);
                    nav('/Login');
                }
            } else {
                console.warn("No login token found in localStorage");
                nav('/Login');
            }
        }
        VerifyToken();
    }, [nav]);

    useEffect(() => {
        async function FetchUserToken() {
            const UserID = localStorage.getItem("LoggedInUserID");
            if (!UserID) {
                console.warn("UserID not found in localStorage");
                nav('/Login'); // Redirect if UserID is not available
                return;
            }
            try {
                const response = await fetch(`http://localhost:5000/fetchUser/${UserID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user. Response status: ' + response.status);
                }
                const data = await response.json();
                if (data) {
                    setUser(data);
                } else {
                    console.warn('No user data returned for UserID:', UserID);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                nav('/Login'); // Redirect if fetching user fails
            }
        }
        FetchUserToken();
    }, [nav]);

    function changePage(PageText) {
        setPage(PageText);
    }

    if (valid) {
        if (page === "Home") {
            return (
                <DashContent 
                    Component={<DashBoardPageContent />} 
                    PageChangeFn={changePage} 
                    user={user.fname} 
                    userEmail={user.email} 
                />
            );
        } else if (page === "Upload") {
            return (
                <DashContent 
                    Component={<UploadPage Uploader={localStorage.getItem("LoggedInUserID")} />} 
                    PageChangeFn={changePage} 
                    user={user.fname} 
                    userEmail={user.email} 
                />
            );
        } else if (page.startsWith("Edit")) {
            return (
                <DashContent 
                    Component={<EditPage BookID={page.slice(4)} Uploader={localStorage.getItem("LoggedInUserID")} pageChangeFn={changePage} />} 
                    PageChangeFn={changePage} 
                    user={user.fname} 
                    userEmail={user.email} 
                />
            );
        } else if (page === "Manage") {
            return (
                <DashContent 
                    Component={<ManagePage UploaderID={localStorage.getItem("LoggedInUserID")} PageChangeFn={changePage} />} 
                    PageChangeFn={changePage} 
                    user={user.fname} 
                    userEmail={user.email} 
                />
            );
        } else if (page === "LogOut") {
            localStorage.removeItem("LoginToken");
            localStorage.removeItem("LoggedInUserID");
            nav("/");
        }
    }

    return null;
}
