import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import shringar from "../assests/shringar.png";
import { Link, useNavigate } from "react-router-dom";
import { BsBagCheck } from "react-icons/bs";
import ProfileDropDown from "./ProfileDropDown";
import { Badge } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  const [searchOpen, setSearchOpen] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (keyWord.trim()) {
      navigate(`/search/${keyWord}`);
      setSearchOpen(false);
    } else {
      navigate("/");
      setSearchOpen(false);
    }
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
    {
      key: "3",
      label: <p>Dashboard</p>,
      children: [
        {
          key: "2-1",
          label: <Link to={"/admin/userlist"}>Users</Link>,
        },
        {
          key: "2-2",
          label: <Link to={"/admin/orderlist"}>Orders</Link>,
        },
        {
          key: "2-3",
          label: <Link to={"/admin/productlist"}>Products</Link>,
        },
      ],
    },
  ];
  return (
    <div className="lg:px-24 md:px-12 px-6 py-4 bg-transparent fixed top-0 right-0 left-0 z-10">
      <div className="flex items-center justify-between">
        {searchOpen ? (
          <div className="flex-1">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                x
                placeholder="Search.."
                onChange={(e) => setKeyWord(e.target.value)}
                className="w-[100%] px-4 py-1 outline-none border-b-[2px] border-black"
              />
            </form>
          </div>
        ) : (
          <>
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
          </>
        )}
        <div className="flex items-center gap-3">
          {searchOpen ? (
            <AiOutlineClose
              onClick={() => setSearchOpen(false)}
              className="text-2xl cursor-pointer"
            />
          ) : (
            <AiOutlineSearch
              onClick={() => setSearchOpen(true)}
              className="text-2xl cursor-pointer"
            />
          )}

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
