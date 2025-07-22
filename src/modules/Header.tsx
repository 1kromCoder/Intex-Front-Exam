import { Button } from 'antd';
import { UserIcon } from '../assets/icon';
import Text from '../components/Text';
import { LogoutOutlined } from '@ant-design/icons';
import toast, { Toaster } from 'react-hot-toast';
import { Context } from '../context/Context';
import { useContext } from 'react';

const Header = () => {
  const { setToken } = useContext(Context);

  function logOut() {
    toast.success("Logged Out!");
    setToken(null);
    location.pathname = "/";
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className="py-[20.5px] px-[40px] flex justify-between border-b-[3px] bg-[#f4f4f1] border-b-[#EBEBFF]">
        <div></div>
        <div className="flex gap-[20px] items-center relative">
          <a href="http://44.201.132.40/api/#/" target="_blank">
            <Text classList="!text-[#A6A6A6] cursor-pointer hover:underline">Просмотр веб-сайта</Text>
          </a>
          <Text>|</Text>
          <div className="relative group">
            <div className="flex flex-col items-end group-hover:block">
              <Text classList="flex gap-[10px] items-center  !text-[#A6A6A6] cursor-pointer">
                <UserIcon />
                {localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")!).username} Admin
              </Text>

              <div className="bg-white shadow-md rounded-[8px] p-[8px] hidden group-hover:flex flex-col z-50 absolute top-[100%] right-0">
                <Button
                  icon={<LogoutOutlined />}
                  onClick={logOut}
                  type="text"
                  className="!text-[#f15832f4] !border-[2px] !text-[20px] !h-[35px] !border-red-300 hover:text-red-700"
                >
                  Log Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
