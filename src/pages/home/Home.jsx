import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { useState, useEffect } from "react"
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import ClipLoader from "react-spinners/ClipLoader";
export default function Home() {

  const [Loading, SetLoading] = useState(false);

  useEffect(() => {
    SetLoading(true);
    setTimeout(() => {
      SetLoading(false);
    }, 2000);
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
