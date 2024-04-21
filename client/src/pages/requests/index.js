import React, { useEffect } from "react";
import { Tabs, message } from "antd";
import PageTitle from "../../components/PageTitle";
import NewRequestModal from "./NewRequestModal";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetAllRequestByUser } from "../../apicalls/requests";
import { useDispatch } from "react-redux";
const { TabPane } = Tabs;

const Requests = () => {
    const [data, setData] = React.useState([{}]);
    const [showNewRequestModal, setShowNewRequestModal] = React.useState(false);
    const dispatch = useDispatch();
    const columns = [
        {
            title: 'Request ID',
            dataIndex: '_id',
        },
        {
            title: 'User',
            dataIndex: 'user',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Description',
            dataIndex: 'dscription',
        },
        {
            title: 'Date',
            dataIndex: 'date',
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
        <div className="flex justify-between">
            <PageTitle title="Requests" />
            <button className="primary-outlined-btn" 
            onClick={() => setShowNewRequestModal(true)}
            >Request Funds</button>
        </div>

        <Tabs defaultActiveKey="1">
            <TabPane tab="Sent" key="1">Sent</TabPane>
            <TabPane tab="Received" key="2">Received</TabPane>
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
