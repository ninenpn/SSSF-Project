import React from "react";
import { Modal, Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from '../../redux/loadersSlice';
import { TransferFunds, VerifyAccount } from '../../apicalls/transactions';
import { ReloadUser } from "../../redux/usersSlice";

function TransferFundsModal({ showtransferFundsModal, setShowtransferFundsModal, reloadData }) {
    const {user} = useSelector(state => state.users);
    console.log(user.balance);
    const [isVerified, setIsVerified] = React.useState('');
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const verifyAccount = async () => {
        try {
            dispatch(ShowLoading());
            const response = await VerifyAccount({ receiver: form.getFieldValue("receiver") });
            dispatch(HideLoading());

            // Check if response is defined and contains the 'success' property
            if (response && response.success) {
                setIsVerified('true');
            } else {
                setIsVerified('false');
            }
        } catch (error) {
            console.error("Verify account request failed:", error);
            dispatch(HideLoading());
            setIsVerified('false');
        }
    };

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            const payload = {
                ...values,
                sender: user._id,
                status: "success",
                reference: values.reference || "no reference"
            };
            const response = await TransferFunds(payload);
            if (response.success) {
                reloadData();
                setShowtransferFundsModal(false);
                message.success(response.message);
                dispatch(ReloadUser(true));
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            message.error(error.message);
            dispatch(HideLoading());
        }
    };

    const handleCancel = () => {
        setShowtransferFundsModal(false); // Close the modal
    };

    return (
        <div>
            <Modal
                title="Transfer Funds"
                visible={showtransferFundsModal} // Correct prop name
                onCancel={handleCancel}
                footer={null}
            >
                <Form layout="vertical" form={form} onFinish={onFinish}>
                    <div className="flex gap-2 items-center">
                        <Form.Item label="Account Number" name="receiver" className="w-100">
                            <input type="text" />
                        </Form.Item>
                        <button className="primary-contained-btn mt-1" type="button" onClick={verifyAccount}>Verify</button>
                    </div>

                    {isVerified === 'true' && (
                        <div className="success-bg">
                            Account Verified Successfully
                        </div>
                    )}

                    {isVerified === 'false' && (
                        <div className="error-bg">
                            Account Verification Failed
                        </div>
                    )}

                    <Form.Item label="Amount" name="amount"
                        rules={[{ required: true, message: "Please input the amount" }, {max: user.balance, message: "Insufficient funds"}]}
                    >
                        <input type="number" 
                        max={user.balance}
                        />
                    </Form.Item>

                    <Form.Item label="Reference" name="reference">
                        <textarea type="text" />
                    </Form.Item>

                    <div className="flex justify-end gap-1">
                        <button className="primary-outlined-btn" onClick={handleCancel}>Cancel</button>
                        {isVerified === "true" && (<button className="primary-contained-btn" type="submit">Transfer</button>)}
                    </div>
                </Form>
            </Modal>
        </div>
    );
}

export default TransferFundsModal;
