"use client";

import { useEffect, useState } from "react";
import getAllOrders from "@/api/getAllOrders";
import { Order } from "@/types/order";
import Image from "next/image";
export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-[#000000a7] h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-gray-600 text-lg animate-pulse">
          No orders found <i className="fa-solid fa-truck-fast ml-2"></i>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-10">
      {orders.map((order) => (
        <div
          key={order.id}
          data-aos="fade-up"
          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
        >
          {/*  Header */}
          <div className="bg-gray-100 px-6 py-3 border-b">
            <h2 className="text-lg font-semibold text-gray-800 flex justify-between items-center">
              <span>
                Order <span className="text-teal-800">#{order.id}</span>
              </span>
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </h2>
          </div>

          {/*  Customer +  Shipping Info */}
          <div className=" bg-blue-50 p-6 grid md:grid-cols-2 gap-8">
            {/* Customer Info */}
            <div>
              <h3 className=" font-bold mb-3 ">Customer Details</h3>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>
                  <span className="font-medium  text-black">Name:</span>{" "}
                  {order.user.name}
                </li>
                <li>
                  <span className="font-medium text-black">Email:</span>{" "}
                  {order.user.email}
                </li>
                <li>
                  <span className="font-medium text-black">Phone:</span>{" "}
                  {order.user.phone}
                </li>
              </ul>
            </div>

            {/* Shipping Info */}
            <div>
              <h3 className=" font-bold mb-3 ">Shipping Details</h3>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>
                  <span className="font-medium text-black">City:</span>{" "}
                  {order.shippingAddress.city}
                </li>
                <li>
                  <span className="font-medium text-black">Address:</span>{" "}
                  {order.shippingAddress.details}
                </li>
                <li>
                  <span className="font-medium text-black">Phone:</span>{" "}
                  {order.shippingAddress.phone}
                </li>
              </ul>
            </div>
          </div>

          {/* 🛍️ Products */}
          <div className="border-t bg-gray-100 p-6 space-y-4">
            <h3 className=" font-bold mb-3 ">Products :</h3>
            <div className="space-y-4">
              {order.cartItems.map((item, index) => (
                <div
                  key={item._id}
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                  className="flex items-center gap-4 bg-white border rounded-xl p-3 hover:shadow-sm transition"
                >
                  <Image
                    width={300}
                    height={300}
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-gray-800 font-medium text-sm sm:text-base">
                      {item.product.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {item.product.brand?.name}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Count: {item.count}
                    </p>
                  </div>
                  <p className="text-gray-900 font-semibold text-sm sm:text-base">
                    <span className="text-purple-500">{item.price} EGP </span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 💰 Summary */}
          <div className="border-t p-6 flex  lg:flex-row justify-between lg:items-center text-sm  bg-white">
            <div className="space-y-1">
              <p>
                <span className="font-medium">Payment:</span>{" "}
                <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 inset-ring inset-ring-purple-700/10">
                  {order.paymentMethodType}
                </span>
              </p>
              <p>
                <span className="font-medium">P a i d :</span>{" "}
                <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 inset-ring inset-ring-purple-700/10 ms-4">
                  {order.isPaid ? "Yes" : "No"}
                </span>
              </p>
              <p>
                <span className="font-medium">Delivered:</span>{" "}
                <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 inset-ring inset-ring-purple-700/10">
                  {order.isDelivered ? "Yes" : "No"}
                </span>
              </p>
            </div>

            <div className="text-right mt-4 sm:mt-0">
              <p className="text-lg font-bold text-gray-900">
                Total:{" "}
                <span className="text-purple-700">
                  {order.totalOrderPrice} EGP{" "}
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
