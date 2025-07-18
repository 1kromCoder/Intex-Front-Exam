import { useContext, useState, type FormEvent } from "react";
import registerBg from "../../assets/images/registerBg.png";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import Text from "../../components/Text";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { paths } from "../../hooks/path";
import toast, { Toaster } from "react-hot-toast";
import loading from "../../assets/images/Loading.png"

const Login = () => {
  const { setToken } = useContext(Context);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate()
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
        setToken("token")
        setLoading(false)
        toast.success("Logged In!")
        navigate(paths.home)
    }, 2000)
  }
  
  return (
    <>
        <Toaster position="top-center" reverseOrder={false} />
        <div
        style={{ backgroundImage: `url(${registerBg})` }}
        className="h-screen w-screen bg-cover bg-center flex justify-center items-center">
            <div className="bg-[#F8F8F8] w-[620px] h-[520px] rounded-[25px] text-center py-[35px] space-y-[50px]">
                <div className="space-y-[17px] flex flex-col items-center justify-between">
                    <Heading tag="h1" classList="!text-[#009398]">Intex-market.uz</Heading>
                    <Text classList="!font-semibold !text-[#A3A3A3] !w-[500px] !text-[22px]">Tizimga kirish uchun foydalanuvchi nomingiz va parolingizni kiriting..</Text>
                </div>
                <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-[16px] px-[130px] justify-center items-center">
                    <input required className="w-[360px] h-[60px] border-[1px] outline-none text-[#3d3c3c] border-[#CBCBCB] rounded-[17px] text-[25px] !font-semibold text-center shadow-md" type="text" placeholder="Имя пользователя"/>
                    <input required className="w-[360px] h-[60px] border-[1px] outline-none text-[#3d3c3c] border-[#CBCBCB] rounded-[17px] text-[25px] !font-semibold text-center shadow-md" type="text" placeholder="Пароль"/>
                    <Button type="submit" classList="mt-[20px] cursor-pointer flex item-center justify-center hover:scale-[1.01]">{isLoading ? <img className="w-[30px] h-[30px] mt-[5px]" src={loading} /> : "Войти"}</Button>
                </form>
            </div>
        </div>
    </>
  );
};

export default Login;
