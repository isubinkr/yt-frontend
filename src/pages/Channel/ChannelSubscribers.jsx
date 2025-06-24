import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserChannelSubscribers } from "../../store/Slices/subscriptionSlice";
import { Avatar, Button } from "../../components";
import { Link } from "react-router-dom";

function ChannelSubscribers() {
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.user.profileData?._id);
  const subscribers = useSelector(
    (state) => state.subscription.channelSubscribers
  );

  useEffect(() => {
    if (channelId) {
      dispatch(getUserChannelSubscribers(channelId));
    }
  }, [dispatch, channelId]);

  return (
    <>
      {subscribers?.map((subscriber) => (
        <Link
          key={subscriber?._id}
          className="flex border-b border-slate-500 px-3 py-1 justify-between items-center text-white"
        >
          <div className="flex gap-3 items-center">
            <Avatar
              src={subscriber?.avatar}
              channelName={subscriber?.username}
            />
            <div>
              <h5 className="text-sm">{subscriber?.username}</h5>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default ChannelSubscribers;
