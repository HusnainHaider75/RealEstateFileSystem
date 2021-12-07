import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { useState, useEffect } from "react"
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {

  const [Loading, SetLoading] = useState(false);
  const { getAccessTokenSilently, logout } = useAuth0();

    async function PermissionToken() {
        try {
            const result = await getAccessTokenSilently();
            let temp= JSON.parse(atob(result.split('.')[1]));
            const Token = temp.permissions;
            localStorage.setItem("Permissions",JSON.stringify(Token))
        }
        catch (error) {
            console.log(error.message)
        }
    }


  useEffect(() => {
    SetLoading(true);
    setTimeout(() => {
      SetLoading(false);
    }, 2000);
    PermissionToken();
  }, [])

  

  return (
    <>
      <div className="home">
        {
          Loading
          ?
          <div className="HomeLoader">
            <ClipLoader color={"#123abc"} loading={Loading} size={50} marginLeft={500} />
          </div>
          :
          <>
            <FeaturedInfo />
            <Chart data={userData} title="User Analytics" grid dataKey="Active User" />
            <div className="homeWidgets">
              <WidgetSm />
              <WidgetLg />
            </div>
          </>
        }
      </div>
    </>
  );
}
