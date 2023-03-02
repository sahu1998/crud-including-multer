import React from "react";
import MainLayout from "../../layout";

const Home = () => {
  // const history = useNavigate();
  // const authenticateUser = async () => {
  //   const token = localStorage.getItem("token");
  //   const isValidUser = await userVerifiyHandler(`/home?token=${token}`);
  //   console.log("auth: ", isValidUser);
  //   if (!isValidUser.data.login) {
  //     localStorage.removeItem("login");
  //     localStorage.removeItem("token");
  //     history("/signin");
  //   }
  // };

  // useEffect(() => {
  //   authenticateUser();
  // }, []);

  return (
    <MainLayout>
      <div style={{ textAlign: "center" }}>
        <h1>HOME PAGE</h1>
      </div>
    </MainLayout>
  );
};

export default Home;
