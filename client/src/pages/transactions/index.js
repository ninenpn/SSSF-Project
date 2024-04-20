import React from "react";
import PageTitle from "../../components/PageTitle";
import { Table } from "antd";
import TransferFundsModal from "./transferFundsModal";

function Transactions() {
    const [showtransferFundsModal, setShowtransferFundsModal] = React.useState(false);
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Transaction ID',
            dataIndex: 'transactionId',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Reference',
            dataIndex: 'reference',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
    ]
    return (
    <div>
        <div className="flex justify-between items-center">
            <PageTitle title="Transactions" />

            <div className="flex gap-1">
                <button className="primary-outlined-btn">Deposit</button>
                <button className="primary-contained-btn"
                    onClick={() => setShowtransferFundsModal(true)}
                >Transfer</button>
            </div>
        </div>

            <Table columns={columns} dataSource={[]} className="mt-2"/>

            {showtransferFundsModal && (
            <TransferFundsModal 
                showtransferFundsModal={showtransferFundsModal}
                setShowtransferFundsModal={setShowtransferFundsModal}
            />)}
    </div>
    );
}

export default Transactions;