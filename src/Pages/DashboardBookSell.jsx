import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashContent from "../Components/DashBoardContent";
import UploadPage from "../Components/UploadPage";
import DashBoardPageContent from "../Components/DashboardPage";
import ManagePage from "../Components/ManagePage";
import EditPage from "../Components/EditPage";

export default function Dashboard(){
    const[valid, setValid] = useState(false);
    const nav = useNavigate()
    const [page,setPage] = useState("Home")
    const [user, setUser] = useState({})

    useEffect(()=>{
        async function VerifyToken(){
            const LoginTokenStored =  localStorage.getItem("LoginToken")
            if(LoginTokenStored){
                try {
                    const response = await fetch(`http://localhost:5000/getToken/${LoginTokenStored}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json()
                    if(data.type == "LoginToken" ){
                        setValid(true)
                    }else{
                        nav('/Login')
                    }
                } catch (error) {
                    console.error('There was a problem with the auth operation:', error);
                    nav('/Login')
                }
            }else{
                nav('/Login')
            }
        }
        VerifyToken();
    },[])

    let UserID = localStorage.getItem("LoggedInUserID")
    useEffect(()=>{
        async function FetchUserToken(){
            UserID = localStorage.getItem("LoggedInUserID")
            try {
                const response = await fetch(`http://localhost:5000/fetchUser/${UserID}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json()
                setUser(data)
            } catch (error) {
                console.log('There was a problem with the fetch user option:', error);
            }
        }
        FetchUserToken();
    },[])

    function changePage(PageText){
        setPage(PageText)
    }

    if(valid){
        if(page == "Home"){
            return(
                <DashContent Component= {<DashBoardPageContent />} PageChangeFn={changePage} user={user.fname} userEmail={user.email} />
            );
        }else if(page == "Upload"){
            return(
                <DashContent Component={<UploadPage Uploader={UserID} />} PageChangeFn={changePage} user={user.fname} userEmail={user.email} />
            );
        }else if(page.startsWith("Edit")){
            return(
                <DashContent Component={<EditPage BookID={page.slice(4)} Uploader={UserID} pageChangeFn={changePage} />} PageChangeFn={changePage} user={user.fname} userEmail={user.email} />
            );
        }else if(page == "Manage"){
            return(
                <DashContent Component={<ManagePage UploaderID={UserID} PageChangeFn={changePage} />} PageChangeFn={changePage} user={user.fname} userEmail={user.email} />
            );
        }else if(page == "LogOut"){
            localStorage.removeItem("LoginToken")
            localStorage.removeItem("LoggedInUserID")
            nav("/")
        }
    }

    return null
}