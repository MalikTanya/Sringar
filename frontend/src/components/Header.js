import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import shringar from "../assests/shringar.png";
import { Link } from "react-router-dom";
import { BsBagCheck } from "react-icons/bs";
import ProfileDropDown from "./ProfileDropDown";
import { Badge } from "antd";
const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  const items = [
    {
      key: "1",
      label: (
        <Link to={"/profile"} className="no-underline">
          Profile
        </Link>
      ),
    },
    {
      key: "2",
      label: <p onClick={logoutHandler}>Logout</p>,
    },
  ];
  return (
    <div className="lg:px-24 md:px-12 px-6 py-4 bg-transparent fixed top-0 right-0 left-0 z-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-xl">Shringar</h2>
        </div>
        <ul className="flex items-center">
          <Link to={"/"} className="mx-4 text-lg text-black">
            <li>Home</li>
          </Link>
          <Link to={"/shop"} className="mx-4 text-lg text-black">
            <li>Shop</li>
          </Link>
          <Link to={"/products"} className="mx-4 text-lg text-black">
            <li>Products</li>
          </Link>
          <Link to={"/contact"} className="mx-4 text-lg text-black">
            <li>Contact</li>
          </Link>
        </ul>
        <div className="flex items-center gap-3">
          <Link to={"/cart"}>
            <Badge count={cartItems?.length}>
              <BsBagCheck className="text-2xl" />
            </Badge>
          </Link>
          {userInfo ? (
            <ProfileDropDown name={userInfo.name} items={items} />
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
