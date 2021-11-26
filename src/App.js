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
import IntinitationFrom_QR_Code from "./pages/FormsSetting/IntinitationFromSettings";
import BookingForm_QR_Code from "./pages/FormsSetting/BookingFormSetting";
import TopLeftSetting from './pages/Settings/TopLeftSetting';
import GridCheck from './GridCheck';
import Temp from "./temp"
function App() {
  const{ isAuthenticated }=useAuth0();
  const [State, SetState] = useState(true)
  return (
  
    <>
    <Router> 
      { isAuthenticated && State ? <Topbar/> : ""}
      <div className="container"> 
      { isAuthenticated && State ? <Sidebar/> : "" }
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/grid" component={GridCheck}/>
          <Route exact path="/temp" component={Temp}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/users" component={UserList}/> 
          <Route exact path="/user/:id" component={User}/> 
          <Route exact path="/newUser" component={NewUser}/> 
          <Route exact path="/products" component={ProductList}/> 
          <Route exact path="/product/:productId" component={Product}/>
          <Route exact path="/newproduct" component={NewProduct}/> 
          <Route exact path="/settings" component={TopLeftSetting}/>
          <Route exact path="/users/QrCode/RegNo/:RegNo/IntinitationNo/:IntinitationFromNo/IssueDate/:IssueDate"> <IntinitationFrom_QR_Code NewState={SetState} /></Route>
          <Route exact path="/users/QrCode/RegNo/:RegNo/BookingFormNo/:BookingFormNo/IssueDate/:IssueDate"> <BookingForm_QR_Code NewState={SetState}/></Route>

        </Switch>
      </div>
    </Router>
    </>
  );
}

export default App;
