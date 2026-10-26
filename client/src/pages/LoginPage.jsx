import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Input } from "@material-tailwind/react";
import { useLoginMutation } from "../redux/userRelated/userApiSlice";
import { authSuccess } from "../redux/userRelated/userSlice";

const demoAccounts = {
  admin: { username: "admin", password: "admin123" },
  parent: { username: "parent1", password: "parent1" },
  teacher: { username: "teacher1", password: "teacher1" },
};

function LoginPage({ role }) {
  const demoAccount = demoAccounts[role];
  const [login, {isLoading}] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, currentRole } = useSelector((state) => state.user);

  const submitHandler = async (data) => {
    
    const username = data.username;
    const password = data.password;
    const formData = {username, password}
    await login({role, formData})
    .unwrap()
    .then((payload) => dispatch(authSuccess(payload)))
  };

  

  useEffect(() => {
    if (currentUser !== null) {
      if (currentRole === "admin") {
        navigate("/Admin/dashboard");
      } else if (currentRole === "parent") {
        navigate("/Parent/dashboard");
      } else if ( currentRole === 'teacher') {
        navigate('/teacher/dashboard')
      }
    }
  }, [currentRole, navigate, currentUser]);

  return (
    <>
      <div className="bg-[url('/backgroundlogin.jpg')] w-full h-screen bg-cover flex justify-center items-center">
        <div className="flex flex-col bg-black/80 flex-1 p-12 max-w-[450px] gap-10 rounded">
          <h1 className="text-white font-bold text-3xl ">Đăng nhập</h1>
          <div>
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="flex flex-col gap-8"
            >
              <Input
                {...register("username", {
                  required: "Chưa nhập tên đăng nhập",
                })}
                id="username"
                name="username"
                type="text"
                required
                label="Tên đăng nhập"
                color="white"
                className="px-4 py-6"
              />
              {errors.username && (
                <p className="text-red-800 text-sm">
                  {errors.username.message}
                </p>
              )}

              <Input
                {...register("password", {
                  required: "Chưa nhập mật khẩu",
                })}
                id="password"
                name="password"
                type="password"
                required
                color="white"
                label="Mật khẩu"
                className="px-4 py-6"
              />

              {errors.password && (
                <p className="text-red-800 text-sm">
                  {errors.password.message}
                </p>
              )}

              <button
                className={`rounded py-2  text-white block font-bold ${isLoading ? `bg-gray-800` : `bg-red-700 `}`}
                type="submit"
                disabled={isLoading}
              >
                
                Đăng nhập
              </button>
              {demoAccount && (
                <div className="rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-white shadow-sm">
                  <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-white/70">
                    Tài khoản dùng thử
                  </p>
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-white/70">Username</span>
                    <span className="rounded bg-black/20 px-2 py-1 font-medium">
                      {demoAccount.username}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-4 text-sm">
                    <span className="text-white/70">Mật khẩu</span>
                    <span className="rounded bg-black/20 px-2 py-1 font-medium">
                      {demoAccount.password}
                    </span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
