import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2)
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  const history = useNavigate();

  useEffect(() => {
    if (success) {
      history(`/order/${order._id}`);
    }
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div className="mt-24 md:px-24 sm:px-12 px-6 grid grid-cols-3 gap-5">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="col-span-2">
        <h1 className="font-bold text-xl text-center">Order Details</h1>
        <div className="flex items-start flex-col">
          <h2 className="font-semibold text-2xl">SHIPPING</h2>
          <p className="mt-2">
            <strong>Addresss : </strong>
            {cart.shippingAddress.address},{cart.shippingAddress.city},
            {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
          </p>
        </div>
        <hr className="my-4" />
        <div>
          <h2 className="font-semibold text-2xl">PAYMENT METHOD</h2>
          <p className="mt-2">
            <strong>Method : </strong> {cart.paymentMethod}
          </p>
        </div>
        <hr className="my-4" />
        <div>
          <h2 className="font-semibold text-2xl">ORDER ITEMS</h2>
          {cart.cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div>
              {cart.cartItems.map((item, index) => {
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
        {error && <Message type="error" message={error} />}
        {success && (
          <Message type="success" message={"Order placed successfully"} />
        )}
        <h1 className="font-bold text-xl text-center">Order Summary</h1>
        <div className="border rounded-lg px-6 py-4 mt-4">
          <div className="flex justify-between my-2">
            <p className="font-semibold text-lg">Items</p>
            <p className="font-semibold">{cart.itemsPrice} $</p>
          </div>
          <div className="flex justify-between my-2">
            <p className="font-semibold text-lg">Shipping</p>
            <p className="font-semibold">{cart.shippingPrice} $</p>
          </div>
          <div className="flex justify-between my-2">
            <p className="font-semibold text-lg">Tax</p>
            <p className="font-semibold">{cart.taxPrice} $</p>
          </div>
          <div className="flex justify-between my-2">
            <p className="font-semibold text-lg">Total</p>
            <p className="font-semibold">{cart.totalPrice} $</p>
          </div>
          <button
            onClick={placeOrderHandler}
            className="bg-blue-500 text-lg text-white px-4 py-2 rounded-sm w-full mt-6"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
