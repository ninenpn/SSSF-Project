import React from "react";
import { useNavigate } from "react-router-dom";
import { Col, Form, Row, message } from "antd";
import { LoginUsers } from "../../apicalls/users";

function Login() {
    const navigate = useNavigate();
    const onFinish = async(values) => {
        try {
            const response = await LoginUsers(values);
            if(response.success) {
                message.success(response.message);
                localStorage.setItem("token", response.token);
                window.location.href = "/home";
            }
            else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

return (
    <div className="bg-primary flex items-center justify-center h-screen"> 
        <div className="card w-400 p-2">  
            <div className="flex items-center justify-between">
                <h1 className="text-2xl">SSSFWallet - Login</h1>
            </div>
            <hr />
            <Form layout="vertical" onFinish={onFinish}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Email" name="email">
                            <input type="email" />
                        </Form.Item> 
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Password" name="password">
                            <input type="password" />
                        </Form.Item>
                    </Col>
                </Row>

                
                <button type="submit" className="primary-contained-btn w-100">
                    Login
                </button>
                <h1 className="text-sm underline mt-2" onClick={()=> navigate("/register")}> Don't have an account? Register </h1>
                
            </Form>
        </div>
    </div>
);
}

export default Login;