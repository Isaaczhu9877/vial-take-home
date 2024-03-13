import YourSvg from "/src/assets/logo.svg";
import ProfilePic from "/src/assets/Isaac-pfp.jpeg";
import { Avatar } from "@mantine/core";
import "./headetStyles.css";

function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <img src={YourSvg} style={{ width: 36, height: 36 }}></img>
        <div className="header__logo--title">Vial</div>
      </div>

      <div className="header__user">
        <div className="header__user--name">Isaac Zhu</div>
        <Avatar src={ProfilePic} alt="Isaac Zhu Profile Pic" />
      </div>
    </div>
  );
}

export default Header;
