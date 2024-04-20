import React, { useState } from "react";
import { Modal, Form } from "antd";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from '../../redux/loadersSlice';
import { VerifyAccount } from '../../apicalls/transactions';

function TransferFundsModal({ showtransferFundsModal, setShowtransferFundsModal, reloadData }) {
    const [isVerified, setIsVerified] = useState('');
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
                <Form layout="vertical" form={form}>
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

                    <Form.Item label="Amount" name="amount">
                        <input type="text" />
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <textarea type="text" />
                    </Form.Item>

                    <div className="flex justify-end gap-1">
                        <button className="secondary-outlined-btn" onClick={handleCancel}>Cancel</button>
                        <button className="primary-contained-btn">Transfer</button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}

export default TransferFundsModal;
