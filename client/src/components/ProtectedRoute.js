import react, { useEffect } from "react";
import { message } from 'antd';
import { GetUserInfo } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, ReloadUser } from "../redux/usersSlice";
import DefaultLayout from "./DefaultLayout";

function ProtectedRoute(props) {
    const {user, reloadUser} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getData = async() => {
        try {
            const response = await GetUserInfo();
            if(response.success) {
                dispatch(setUser(response.data));
            }
            else {
                message.error(response.message);
                navigate("/login");
            }
            dispatch(ReloadUser(false));
        } catch (error) {
            navigate("/login");
            message.error(error.message);
        }
    };

    useEffect(() => {
        if(localStorage.getItem("token")) {
            if(!user){
                getData();
            }
        } else {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        if(reloadUser) {
            getData();
        }
    });


    return (
        user && 
        <div>
            <DefaultLayout>
                {props.children}
            </DefaultLayout>
        </div>
    );
}

export default ProtectedRoute;