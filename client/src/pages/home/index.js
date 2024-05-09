import react, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle";

function Home() {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  return (
    <div>
      <PageTitle title={`Welcome ${user.username} to your Wallet!`} />
      <div className="bg-secondary p-2 mt-2 w-65 br-3 flex flex-col gap-1 uppercase">
        <div className="flex justify-between">
          <h1 className="text-md">Account Number</h1>
          <h1 className="text-md">{user._id}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md">Balance</h1>
          <h1 className="text-md">$ {user.balance || 0}</h1>
        </div>
        </div>

        <div className="card p-2 mt-2 w-65 br-3 flex flex-col gap-1 uppercase">
          <div className="flex justify-between">
            <h1 className="text-md">First Name</h1>
            <h1 className="text-md">{user.firstName}</h1>
          </div>
        <div className="flex justify-between">
          <h1 className="text-md">Last Name</h1>
          <h1 className="text-md">{user.lastName}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md">Date of Birth</h1>
          <h1 className="text-md">{user.dob}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md">Email</h1>
          <h1 className="text-md">{user.email}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md">Phone Number</h1>
          <h1 className="text-md">{user.phoneNumber}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md">Identification Type</h1>
          <h1 className="text-md">{user.IDType}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md">Identification Number</h1>
          <h1 className="text-md">{user.IDNumber}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md">Country</h1>
          <h1 className="text-md">{user.country}</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
