import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

const OrderScreen = ({ match }) => {
  const { orderId } = useParams();
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  if (!loading) {
    order.itemsPrice = order?.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  useEffect(() => {
    if (!userInfo) {
      history("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };
    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    console.log("call");
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return (
    <div className="mt-24 md:px-24 sm:px-12 px-6 grid grid-cols-3 gap-5">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message />
      ) : (
        <>
          <div className="col-span-2">
            <div className="flex items-start flex-col">
              <h1 className="font-bold text-xl text-center mb-6">
                Order {orderId}
              </h1>
              <h2 className="font-semibold text-2xl">SHIPPING</h2>
              <p className="mt-2">
                <strong>Addresss : </strong>
                {order?.shippingAddress.address},{order?.shippingAddress.city},
                {order?.shippingAddress.postalCode},
                {order?.shippingAddress.country}
              </p>
              <div>
                <p>
                  <strong>Name : </strong>
                  {order?.user?.name}
                </p>
                <strong>
                  Mail :{" "}
                  <a
                    href={`mailto:${order?.user?.email}`}
                    className="font-normal"
                  >
                    {order?.user?.email}
                  </a>
                </strong>
              </div>
              {!order.isDelivered ? (
                <Alert
                  className="mt-4 w-[100%]"
                  message="Not Delivered"
                  type="error"
                  showIcon
                />
              ) : (
                <Alert
                  className="mt-4 w-[100%]"
                  message={order.deliveredAt}
                  type="success"
                  showIcon
                />
              )}
            </div>
            <hr className="my-4" />
            <div>
              <h2 className="font-semibold text-2xl">PAYMENT METHOD</h2>
              <p className="mt-2">
                <strong>Method : </strong> {order?.paymentMethod}
              </p>
              {!order.isPaid ? (
                <Alert
                  className="mt-4"
                  message="Not Paid"
                  type="error"
                  showIcon
                />
              ) : (
                <Alert
                  className="mt-4"
                  message={order.paidAt}
                  type="success"
                  showIcon
                />
              )}
            </div>
            <hr className="my-4" />
            <div>
              <h2 className="font-semibold text-2xl">ORDER ITEMS</h2>
              {order?.orderItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <div>
                  {order?.orderItems.map((item, index) => {
                    return (
                      <>
                        <div className="flex items-center my-3 justify-between w-[600px]">
                          <div className="flex items-center">
                            <img
                              className="max-w-[50px] rounded-md"
                              src={item.image}
                              alt=""
                            />
                            <Link
                              to={`/product/${item.product}`}
                              className="ml-4 hover:underline"
                            >
                              {item.name}
                            </Link>
                          </div>
                          <p className="font-semibold">
                            {item.qty} X {item.price}$ ={" "}
                            {(item.qty * item.price).toFixed(2)}$
                          </p>
                        </div>
                        <hr className="my-2" />
                      </>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div>
            <h1 className="font-bold text-xl text-center">Order Summary</h1>
            <div className="border rounded-lg px-6 py-4 mt-4">
              <div className="flex justify-between my-2">
                <p className="font-semibold text-lg">Items</p>
                <p className="font-semibold">{order?.itemsPrice} $</p>
              </div>
              <div className="flex justify-between my-2">
                <p className="font-semibold text-lg">Shipping</p>
                <p className="font-semibold">{order?.shippingPrice} $</p>
              </div>
              <div className="flex justify-between my-2">
                <p className="font-semibold text-lg">Tax</p>
                <p className="font-semibold">{order?.taxPrice} $</p>
              </div>
              <div className="flex justify-between my-2">
                <p className="font-semibold text-lg">Total</p>
                <p className="font-semibold">{order?.totalPrice} $</p>
              </div>
              {!order.isPaid && (
                <div>
                  {loadingPay && <Loader />}
                  <PayPalButton
                    amount={order?.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderScreen;
