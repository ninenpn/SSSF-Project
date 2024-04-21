import {Modal, Form, message} from "antd";
import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { DepositFunds } from "../../apicalls/transactions";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

function DepositModal({showDepositModal, setShowDepositModal, reloadData}) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const onToken = async(token) => {
        try {
            dispatch(ShowLoading());
            const response = await DepositFunds({ token, amount: form.getFieldValue("amount") });
            dispatch(HideLoading());
            if (response.success) {
                reloadData();
                setShowDepositModal(false);
                message.success(response.message);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    return (
        <Modal 
            title="Deposit" 
            open={showDepositModal}
            onCancel={() => setShowDepositModal(false)}
            footer={null}
        >
            <div className="flex-col gap-1">
                <Form layout="vertical" form={form}>
                    <Form.Item label = "Amount" name="amount"
                        rules={[{required: true, message: "Please input the amount"}]}
                    >
                        <input type="number" />
                    </Form.Item>
                    <div className="flex justify-end gap-1">
                        <button className="primary-outlined-btn" onClick={() => setShowDepositModal(false)}>Cancel</button>
                        <StripeCheckout 
                            token={onToken} 
                            currency="USD"
                            amount={form.getFieldValue("amount") * 100}
                            shippingAddress
                            stripeKey="pk_test_51P7xWt2M4PnKTTVBR8iVVONyotu4vAgjkoz0MLEbuzM7cr9hPCGS33iUPgqiixL7HzDlFf6v3U7dK6TdbdRbi2JF00qiUXdHTC"

                        >
                            <button className="primary-contained-btn" type="submit">Deposit</button>
                        </StripeCheckout>
                    </div>
                </Form>
            </div>

        </Modal>
    )
}

export default DepositModal;
