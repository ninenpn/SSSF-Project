import React, { useEffect } from "react";
import { Table, Tabs, message } from "antd";
import PageTitle from "../../components/PageTitle";
import NewRequestModal from "./NewRequestModal";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetAllRequestByUser } from "../../apicalls/requests";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const { TabPane } = Tabs;

const Requests = () => {
    const [data, setData] = React.useState([{}]);
    const [showNewRequestModal, setShowNewRequestModal] = React.useState(false);
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.users);
    const columns = [
        {
            title: 'Request ID',
            dataIndex: '_id',
        },
        {
            title: 'Sender',
            dataIndex: 'sender',
        },
        {
            title: 'Receiver',
            dataIndex: 'receiver',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text, record) => {return moment(record.createdAt).format('DD-MM-YYYY, hh:mm:ss A')}
        },
        {
            title: 'Status',
            dataIndex: 'status',
        }
    ]

    const getData = async() => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllRequestByUser();
            if (response.success) {
                const sendData = response.data.filter(item => item.sender === user._id);
                const ReceivedData = response.data.filter(item => item.receiver === user._id);
                setData(
                    {sent: sendData,
                    received: ReceivedData}
                );
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
        <div className="flex justify-between">
            <PageTitle title="Requests" />
            <button className="primary-outlined-btn" 
            onClick={() => setShowNewRequestModal(true)}
            >Request Funds</button>
        </div>

        <Tabs defaultActiveKey="1">
            <TabPane tab="Sent" key="1">
                <Table columns={columns} dataSource={data.sent} />
            </TabPane>
            <TabPane tab="Received" key="2">
                <Table columns={columns} dataSource={data.received} />
            </TabPane>
        </Tabs>

        {showNewRequestModal && (
            <NewRequestModal
                showNewRequestModal={showNewRequestModal}
                setShowNewRequestModal={setShowNewRequestModal}
            />
        )}
    </div>
  );
};

export default Requests;
