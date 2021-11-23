import React from "react";
import "./login.css";
import { useHistory } from "react-router"; 
import { useAuth0 } from "@auth0/auth0-react";

export default function SignIn() {

  const redirect = useHistory();
  
  if(localStorage.getItem("auth0spajs")){
    redirect.push("/home")
  }
  
  const { loginWithRedirect, user, isAuthenticated } =useAuth0();

  const asyncLocalStorage = {
    setItem: function (key, value) {
      return Promise.resolve().then(function () {
        localStorage.setItem(key, value);
      });
    },
    getItem: function (key) {
      return Promise.resolve().then(function () {
        return localStorage.getItem(key);
      });
    },
  };

  if (user) {
    if (!localStorage.getItem("auth0spajs")) {
       asyncLocalStorage
        .setItem("auth0spajs", JSON.stringify(user))
        .then(async function () {
          const userdata = await asyncLocalStorage.getItem("auth0spajs");
          console.log(userdata);
        });
    }
  }
  

  console.log(user);
  return (
    <>
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <span className="logo">Demo</span>
          </div>
          <div className="topRight">
            <div class="wrapper">
              <img
              className="search-icon"
              src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2Ljk2NiA1Ni45NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTU1LjE0Niw1MS44ODdMNDEuNTg4LDM3Ljc4NmMzLjQ4Ni00LjE0NCw1LjM5Ni05LjM1OCw1LjM5Ni0xNC43ODZjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMywxMC4zMTgtMjMsMjMgIHMxMC4zMTgsMjMsMjMsMjNjNC43NjEsMCw5LjI5OC0xLjQzNiwxMy4xNzctNC4xNjJsMTMuNjYxLDE0LjIwOGMwLjU3MSwwLjU5MywxLjMzOSwwLjkyLDIuMTYyLDAuOTIgIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyAgcy0xNy03LjYyNi0xNy0xN1MxNC42MSw2LDIzLjk4NCw2eiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"
            />
              <input class="search" placeholder="Search" type="text" />
            </div>

              <button class="button-21" onClick={loginWithRedirect}>
                Login | Register
              </button>
          </div>
        </div>
      </div>
      { 
        isAuthenticated ?  redirect.push("/home") : ""
      }
    </>
  );
}
