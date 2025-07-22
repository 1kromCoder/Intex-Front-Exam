import { useContext, useState, useEffect, type FormEvent } from "react";
import registerBg from "../../assets/images/registerBg.png";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import loading from "../../assets/images/Loading.png";
import { paths } from "../../hooks/path";
import { getRequest, loginRequest } from "../../service/getRequest";
import { Button, Heading, Text } from "../../components";

const Login = () => {
  const { setToken } = useContext(Context);
  const [isLoading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;

    try {
      const users = await loginRequest("/admin/login", { username, password });

      console.log(users);
      
      if (users) {
        setToken(users.accessToken);
        setIsLoggedIn(true);
        location.pathname=paths.products
        localStorage.setItem("user", JSON.stringify({username}));
        toast.success("Logged In!");
      } else {
        toast.error("Admin not found");
        setLoading(false);
      }
    } catch (err:any) {
      toast.error(err?.message || "An error occurred");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(false);
      navigate(paths.products, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        style={{ backgroundImage: `url(${registerBg})` }}
        className="h-screen w-screen bg-cover bg-center flex justify-center items-center"
      >
        <div className="bg-[#F8F8F8] w-[620px] h-[520px] rounded-[25px] text-center py-[35px] space-y-[50px]">
          <div className="space-y-[17px] flex flex-col items-center justify-between">
            <Heading tag="h1" classList="!text-[#009398]">
              Intex-market.uz
            </Heading>
            <Text classList="!font-semibold !text-[#A3A3A3] !w-[500px] !text-[22px]">
              Tizimga kirish uchun foydalanuvchi nomingiz va parolingizni kiriting.
            </Text>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[16px] px-[130px] justify-center items-center"
          >
            <input
              name="username"
              required
              className="w-[360px] h-[60px] border-[1px] outline-none text-[#3d3c3c] border-[#CBCBCB] rounded-[17px] text-[25px] !font-semibold text-center shadow-md"
              type="text"
              placeholder="Username"
            />
            <input
              name="password"
              required
              className="w-[360px] h-[60px] border-[1px] outline-none text-[#3d3c3c] border-[#CBCBCB] rounded-[17px] text-[25px] !font-semibold text-center shadow-md"
              type="password"
              placeholder="Password"
            />
            <Button
              type="submit"
              classList="mt-[20px] w-[230px] cursor-pointer flex item-center justify-center duration-300 hover:scale-[1.01]"
            >
              {isLoading ? (
                <img className="w-[30px] h-[30px] mt-[5px]" src={loading} alt="Loading" />
              ) : (
                "Войти"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;