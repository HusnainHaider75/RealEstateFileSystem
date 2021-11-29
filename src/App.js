import "./App.css";
import { useState } from "react";
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
import IntinitationLetter from "./pages/FormsSetting/IntinitationFromSettings";
import BookingForm from "./pages/FormsSetting/BookingFormSetting";
import TopLeftSetting from './pages/Settings/TopLeftSetting';
import  ShowForm from './pages/ShowForm/ShowForm';
import GridCheck from './GridCheck';
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
          <Route exact path="/grid" component={GridCheck}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/files" component={UserList}/> 
          <Route exact path="/file/:id" component={User}/> 
          <Route exact path="/newfile" component={NewUser}/> 
          <Route exact path="/products" component={ProductList}/> 
          <Route exact path="/product/:productId" component={Product}/>
          <Route exact path="/newproduct" component={NewProduct}/> 
          <Route exact path="/settings" component={GridCheck}/>
          <Route exact path="/showform"> <ShowForm NewState={SetState}/></Route>
          <Route exact path="/intimationQrCode/registration/:RegNo/type=/:type"> <IntinitationLetter NewState={SetState} /></Route>
          <Route exact path="/bookingQrCode/registration/:RegNo/type=/:type"> <BookingForm NewState={SetState}/></Route>
        </Switch>
      </div>
    </Router>
    </>
  );
}

export default App;
