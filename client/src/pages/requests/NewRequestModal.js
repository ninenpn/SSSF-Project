import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { SentRequest } from '../../apicalls/requests';
import { VerifyAccount } from '../../apicalls/transactions';

const NewRequestModal = ({ showNewRequestModal, setShowNewRequestModal, reloadData }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [isVerified, setIsVerified] = useState(false);

    const onFinish = async (values) => {
        try {
            const response = await SentRequest(values);
            if (response.success) {
                message.success(response.message || 'Request sent successfully');
                setShowNewRequestModal(false);
                reloadData();
            } else {
                message.error(response.message || 'Failed to send request');
            }
        } catch (error) {
            console.error('Failed to send request:', error);
            message.error('Failed to send request');
        }
    };

    const handleVerify = async () => {
        try {
            const receiver = form.getFieldValue('receiver');
            const response = await VerifyAccount({ receiver });
            if (response.success) {
                message.success('Account verified successfully');
                setIsVerified(true);
            } else {
                message.error(response.message || 'Account verification failed');
                setIsVerified(false);
            }
        } catch (error) {
            console.error('Failed to verify account:', error);
            message.error('Account verification failed');
            setIsVerified(false);
        }
    };

    const handleCancel = () => {
        setShowNewRequestModal(false);
    };

    return (
        <Modal
            title="Send Request"
            visible={showNewRequestModal}
            onCancel={handleCancel}
            footer={null}
        >
            <Form form={form} onFinish={onFinish}>
                <Form.Item 
                    name="receiver"
                    rules={[{ required: true, message: 'Receiver is required' }]}
                >
                    <Input placeholder="Receiver ID" />
                </Form.Item>
                <Button type="primary" onClick={handleVerify} style={{ marginBottom: '16px' }}>
                    Verify
                </Button>
                {isVerified && (
                    <div style={{ marginBottom: '16px', color: 'green' }}>
                        Account Verified Successfully
                    </div>
                )}
                <Form.Item
                    name="amount"
                    rules={[{ required: true, message: 'Amount is required' }]}
                >
                    <Input type="number" placeholder="Amount" />
                </Form.Item>
                <Form.Item
                    name="description"
                    rules={[{ required: true, message: 'Description is required' }]}
                >
                    <Input.TextArea placeholder="Description" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={!isVerified}>
                        Send Request
                    </Button>
                    <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default NewRequestModal;
