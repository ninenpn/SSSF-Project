import React from "react";
import { Col, Form, Row, message } from "antd";
import { useNavigate } from "react-router-dom";
import { RegisterUsers } from "../../apicalls/users";
function Register() {
    const navigate = useNavigate();
    const onFinish = async(values) => {
        try {
            const response = await RegisterUsers(values);
            if(response.success) {
                message.success(response.message);
                navigate("/login");
            }
            else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

return (
    <div className="m-3">   
    <div className="flex items-center justify-between">
        <h1 className="text-2xl">SSSFWallet - Register</h1>
        <h1 className="text-sm underline" onClick={()=> navigate("/login")}>
            Already have an account? Sign in
        </h1>
    </div>
    <hr />
    <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
            <Col span={6}>
                <Form.Item label="First Name" name="firstName">
                    <input type="text" />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="Last Name" name="lastName">
                    <input type="text" />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="Username" name="username">
                    <input type="text" />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="Date of Birth" name="dob">
                    <input type="date" />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="Email" name="email">
                    <input type="email" />
                </Form.Item> 
            </Col>
            <Col span={6}>
                <Form.Item label="Phone Number" name="phoneNumber">
                    <input type="text" />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="Identification Type" name="IDType">
                    <select>
                        <option value="National ID">National ID</option>
                        <option value="Passport">Passport</option>
                        <option value="Driver's License">Driver's License</option>
                    </select>
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="Identification Number" name="IDNumber">
                    <input type="text" />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item label="Address" name="address">
                    <input type="text" />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="Country" name="country"> 
                    <input type='country' />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="City" name="city">
                    <input type="text" />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="Password" name="password">
                    <input type="password" />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="Confirm Password" name="confirmPassword">
                    <input type="password" />
                </Form.Item>
            </Col>
        </Row>

        <div className="flex justify-end">
            <button type="submit" className="primary-contained-btn">
                Register
            </button>
        </div>
    </Form>
    </div>
);
}

export default Register;