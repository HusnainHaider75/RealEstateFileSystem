import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/login";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import { useAuth0 } from "@auth0/auth0-react";
import IntinitationFrom_QR_Code from "./pages/FormsSetting/IntinitationFromSettings";
import BookingForm_QR_Code from "./pages/FormsSetting/BookingFormSetting";
import TopLeftSetting from './pages/Settings/TopLeftSetting';
import { useParams } from "react-router";

function App() {
  const{ isAuthenticated }=useAuth0();
  return (
  
    <>
    <Router> 
      { isAuthenticated ? <Topbar/> : ""}
      <div className="container"> 
      { isAuthenticated ? <Sidebar/> : "" } 
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/users" component={UserList}/> 
          <Route exact path="/user/:id" component={User}/> 
          <Route exact path="/newUser" component={NewUser}/> 
          <Route exact path="/products" component={ProductList}/> 
          <Route exact path="/product/:productId" component={Product}/>
          <Route exact path="/newproduct" component={NewProduct}/> 
          <Route exact path="/users/QrCode/RegNo/:RegNo/IntinitationNo/:IntinitationFromNo" component={IntinitationFrom_QR_Code}/> 
          <Route exact path="/users/QrCode/RegNo/:RegNo/BookingFormNo/:BookingFormNo" component={BookingForm_QR_Code}/> 
          <Route exact path="/settings" component={TopLeftSetting}/> 
        </Switch>
      </div>
    </Router>
    </>
  );
}

export default App;
