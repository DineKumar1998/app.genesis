import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import logo from '../assets/images/profile.png'

// sidebar nav config
import navigation from "./_nav";
import { UserProfile } from "src/api/user/user";
// import C from "src/constants";
// import Constants from "src/secrets";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);
  const [logoImg, setlogoImg] = useState("")
  const [logotext, setlogotext] = useState("")

  React.useEffect(() => {
    async function fetchMyAPI() {
        let rs = await UserProfile()
        if (rs !== true){
            setlogotext(rs.company)
            if (rs.profile_pic !== null){
              setlogoImg(rs.profile_pic)
            }
            else {
              setlogoImg(logo)
            }
        }
        else {
          setlogotext("Demo App")
        }
    }
    fetchMyAPI()
  }, [])


  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          src={logoImg}
          height={40}
        />
        <p className="logo-text"><b>{logotext}</b></p>
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
