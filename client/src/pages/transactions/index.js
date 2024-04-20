import React, { useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import { Table, message } from "antd";
import TransferFundsModal from "./transferFundsModal";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetTransactionsOfUser } from "../../apicalls/transactions";
import moment from "moment";

function Transactions() {
    const [showtransferFundsModal, setShowtransferFundsModal] = React.useState(false);
    const [data = [], setData] = React.useState([{}]);
    const dispatch = useDispatch();
    const user = useSelector(state => state.users);
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text, record) => {return moment(record.createdAt).format('DD-MM-YYYY, hh:mm:ss A')}
        },
        {
            title: 'Transaction ID',
            dataIndex: '_id',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            render: (text, record) => {return record.sender === user._id ? 'Sent' : 'Received'}
        },
        {
            title: 'Account',
            dataIndex: '',
            render: (text, record) => {return record.sender === user._id ? record.receiver : record.sender}
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
    const getData = async() => {
        try {
            dispatch(ShowLoading());
            const response = await GetTransactionsOfUser();
            if (response.success) {
                setData(response.data);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    useEffect(() => {
        getData();
    }, []);

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

            <Table columns={columns} dataSource={data} className="mt-2"/>

            {showtransferFundsModal && (
            <TransferFundsModal 
                showtransferFundsModal={showtransferFundsModal}
                setShowtransferFundsModal={setShowtransferFundsModal}
            />)}
    </div>
    );
}

export default Transactions;