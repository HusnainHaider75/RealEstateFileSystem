import "./App.css";
import { useState } from "react";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FileList from "./pages/FileList/FileList";
import UpdateFile from "./pages/UpdateFile/UpdateFile";
import NewFile from "./pages/NewFile/NewFile";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/login";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import { useAuth0 } from "@auth0/auth0-react";
import IntinitationLetter from "./pages/FormsSetting/IntinitationFromSettings";
import BookingForm from "./pages/FormsSetting/BookingFormSetting";
import TopLeftSetting from './pages/Settings/TopLeftSetting';
import  ShowForm from './pages/ShowForm/ShowForm';
import Members from './pages/Members/Members';
import NewMember from './pages/NewMember/NewMember';
import UpdateMember from './pages/UpdateMember/UpdateMember'
import Test from "./test";


function App() {
  const{ isAuthenticated }=useAuth0();
  const [State, SetState] = useState(true)
  return (
    <>
    <Router> 
      { isAuthenticated && State===true ? <Topbar/> : ""}
      <div className="container"> 
      { isAuthenticated && State===true ? <Sidebar/> : "" }
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/test" component={Test}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/files" component={FileList}/> 
          <Route exact path="/members" component={Members}/> 
          <Route exact path="/newmember" component={NewMember}/> 
          <Route exact path="/updatemember/:id" component={UpdateMember}/> 
          <Route exact path="/updatefile/:id" component={UpdateFile}/> 
          <Route exact path="/newfile" component={NewFile}/> 
          <Route exact path="/products" component={ProductList}/> 
          <Route exact path="/product/:productId" component={Product}/>
          <Route exact path="/newproduct" component={NewProduct}/> 
          <Route exact path="/settings" component={TopLeftSetting}/>
          <Route exact path="/QRCode/registration/:RegNo/type/:type"> <ShowForm NewState={SetState}/></Route>
          <Route exact path="/intimationQrCode/registration/:RegNo/type/:type"> <IntinitationLetter NewState={SetState} /></Route>
          <Route exact path="/bookingQrCode/registration/:RegNo/type/:type"> <BookingForm NewState={SetState}/></Route>
        </Switch>
      </div>
    </Router>
    </>
  );
}

export default App;
