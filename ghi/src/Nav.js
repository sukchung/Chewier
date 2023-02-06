import { useState, useEffect } from "react";
import { useToken } from "./Auth";
import { NavLink, useNavigate } from "react-router-dom";
import NavCartButton from "./Cart/NavCartButton";

import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import "./Styles/Nav.css";
import pawprint1 from "./Images/pawprint1.png";

const myaccount = [
  {
    name: "My Account",
    href: "/account",
  },
  {
    name: "My Pets",
    href: "/petslist",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, , logout] = useToken();
  const { countCartItems } = props;

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [token]);

  function handleLogout(event) {
    logout();
    navigate("/");
  }

  return (
    <Popover className="relative bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div
          id="nav-padding"
          className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10"
        >
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <NavLink to="/">
              <span className="sr-only">Chewier</span>
              <img
                className="h-8 w-auto sm:h-10"
                src={pawprint1}
                alt="paw print"
              />
            </NavLink>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            {loggedIn && (
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-gray-500",
                        "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      )}
                    >
                      <span>My Account</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-gray-600" : "text-gray-400",
                          "ml-2 h-5 w-5 group-hover:text-gray-500"
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                            {myaccount.map((item) => (
                              <NavLink
                                key={item.name}
                                to={item.href}
                                className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                              >
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">
                                    {item.name}
                                  </p>
                                </div>
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            )}
            <NavLink
              to="/products"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Products
            </NavLink>
            <NavLink
              to="/custom"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Customization
            </NavLink>
          </Popover.Group>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <div
              style={{
                width: "60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "25px",
                paddingRight: "10px",
              }}
            >
              <NavCartButton
                onClick={props.onShowCart}
                // countCartItems={countCartItems}
                to="/cart"
              />
            </div>
            {!loggedIn && (
              <>
                <NavLink
                  to="/login"
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/signup"
                  className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-violet-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Sign up
                </NavLink>
              </>
            )}
            {loggedIn && (
              <div style={{ width: "100px" }}>
                <button
                  onClick={handleLogout}
                  className="whitespace-nowrap text-base font-medium rounded-md border border-transparent bg-violet-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <img className="h-8 w-auto" src={pawprint1} alt="Chewier" />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {myaccount.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                    >
                      <span className="ml-3 text-base font-medium text-gray-900">
                        {item.name}
                      </span>
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <NavLink
                  to="/products"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Products
                </NavLink>
                <NavLink
                  to="/custom"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Customization
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/signup"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Sign up
                </NavLink>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?{" "}
                  <NavLink
                    to="/login"
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    Log in
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
