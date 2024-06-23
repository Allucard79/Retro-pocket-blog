import { useState } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Avatar,
  Collapse,
} from "@material-tailwind/react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../../context/Context";
import logo from "../../assets/img/logo.png";
import adminPicture from "../../assets/img/admin.png";
import Search from "../search/Search";
import Share from "../share/Share";

export default function Nav() {
  const [openNav, setOpenNav] = useState(false);

  const context = useContext(Context);
  const { mode, toggleMode, language, toggleLanguage } = context;

  const admin = localStorage.getItem("admin");

  const navigate = useNavigate();

  //* Logout Function
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navMenu = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
        style={{ color: mode === "dark" ? "white" : "white" }}
      >
        <Link to={"/"} className="flex items-center">
          {language === "pl" ? "Strona główna" : "Home"}
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
        style={{ color: mode === "dark" ? "white" : "white" }}
      >
        <Link to={"/allposts"} className="flex items-center">
          {language === "pl" ? "Panel" : "Dashboard"}
        </Link>
      </Typography>
      {!admin ? (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
          style={{ color: mode === "dark" ? "white" : "white" }}
        >
          <Link to={"/adminlogin"} className="flex items-center">
            {language === "pl" ? "Zaloguj" : "Login"}
          </Link>
        </Typography>
      ) : (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
          style={{ color: mode === "dark" ? "white" : "white" }}
        >
          <button onClick={logout}>
            {" "}
            {language === "pl" ? "Wyloguj" : "Logout"}
          </button>
        </Typography>
      )}
    </ul>
  );

  return (
    <>
      <Navbar
        className="sticky inset-0 z-20 h-max max-w-full border-none rounded-none py-2 px-4 lg:px-8 lg:py-2"
        style={{ background: mode === "dark" ? "rgb(30, 41, 59)" : "#21346C" }}
      >
        {/* Desktop View  */}
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex">
            <Link to={"/"}>
              <Typography
                as="a"
                className="mr-4 cursor-pointer py-2 text-xl font-bold flex gap-2 items-center"
                style={{ color: mode === "dark" ? "white" : "white" }}
              >
                {/* Logo Image  */}
                <img
                  className=" sm:w-16 w-12 sm:h-16 h-12 rounded-xl"
                  src={logo}
                />
                {/* Logo Text  */}
                <span>Retro Nook</span>
              </Typography>
            </Link>
            <div className="cursor-pointer text-sm flex items-center">
              {language === "pl" ? (
                <>
                  {/* PL Language  */}
                  <IconButton
                    size="sm"
                    onClick={toggleLanguage}
                    className=" lg:inline-block rounded-full"
                    style={{
                      background: mode === "light" ? "#ced6e0" : "#57606f",
                      color: mode === "dark" ? "white" : "black",
                    }}
                  >
                    <svg
                      width="30px"
                      height="30px"
                      viewBox="0 0 64 64"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      class="iconify iconify--emojione"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        d="M48 6.6C43.3 3.7 37.9 2 32 2v4.6h16"
                        fill="#ed4c5c"
                      ></path>

                      <path
                        d="M32 11.2h21.6C51.9 9.5 50 7.9 48 6.6H32v4.6z"
                        fill="#ffffff"
                      ></path>

                      <path
                        d="M32 15.8h25.3c-1.1-1.7-2.3-3.2-3.6-4.6H32v4.6z"
                        fill="#ed4c5c"
                      ></path>

                      <path
                        d="M32 20.4h27.7c-.7-1.6-1.5-3.2-2.4-4.6H32v4.6"
                        fill="#ffffff"
                      ></path>

                      <path
                        d="M32 25h29.2c-.4-1.6-.9-3.1-1.5-4.6H32V25z"
                        fill="#ed4c5c"
                      ></path>

                      <path
                        d="M32 29.7h29.9c-.1-1.6-.4-3.1-.7-4.6H32v4.6"
                        fill="#ffffff"
                      ></path>

                      <path
                        d="M61.9 29.7H32V32H2c0 .8 0 1.5.1 2.3h59.8c.1-.8.1-1.5.1-2.3c0-.8 0-1.6-.1-2.3"
                        fill="#ed4c5c"
                      ></path>

                      <path
                        d="M2.8 38.9h58.4c.4-1.5.6-3 .7-4.6H2.1c.1 1.5.3 3.1.7 4.6"
                        fill="#ffffff"
                      ></path>

                      <path
                        d="M4.3 43.5h55.4c.6-1.5 1.1-3 1.5-4.6H2.8c.4 1.6.9 3.1 1.5 4.6"
                        fill="#ed4c5c"
                      ></path>

                      <path
                        d="M6.7 48.1h50.6c.9-1.5 1.7-3 2.4-4.6H4.3c.7 1.6 1.5 3.1 2.4 4.6"
                        fill="#ffffff"
                      ></path>

                      <path
                        d="M10.3 52.7h43.4c1.3-1.4 2.6-3 3.6-4.6H6.7c1 1.7 2.3 3.2 3.6 4.6"
                        fill="#ed4c5c"
                      ></path>

                      <path
                        d="M15.9 57.3h32.2c2.1-1.3 3.9-2.9 5.6-4.6H10.3c1.7 1.8 3.6 3.3 5.6 4.6"
                        fill="#ffffff"
                      ></path>

                      <path
                        d="M32 62c5.9 0 11.4-1.7 16.1-4.7H15.9c4.7 3 10.2 4.7 16.1 4.7"
                        fill="#ed4c5c"
                      ></path>

                      <path
                        d="M16 6.6c-2.1 1.3-4 2.9-5.7 4.6c-1.4 1.4-2.6 3-3.6 4.6c-.9 1.5-1.8 3-2.4 4.6c-.6 1.5-1.1 3-1.5 4.6c-.4 1.5-.6 3-.7 4.6c-.1.8-.1 1.6-.1 2.4h30V2c-5.9 0-11.3 1.7-16 4.6"
                        fill="#428bc1"
                      ></path>

                      <g fill="#ffffff">
                        <path d="M25 3l.5 1.5H27l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>

                        <path d="M29 9l.5 1.5H31l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>

                        <path d="M21 9l.5 1.5H23l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>

                        <path d="M25 15l.5 1.5H27l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>

                        <path d="M17 15l.5 1.5H19l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>

                        <path d="M9 15l.5 1.5H11l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>

                        <path d="M29 21l.5 1.5H31l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>

                        <path d="M21 21l.5 1.5H23l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>

                        <path d="M13 21l.5 1.5H15l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>

                        <path d="M25 27l.5 1.5H27l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>

                        <path d="M17 27l.5 1.5H19l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>

                        <path d="M9 27l.5 1.5H11l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>

                        <path d="M11.8 13l1.2-.9l1.2.9l-.5-1.5l1.2-1h-1.5L13 9l-.5 1.5h-1.4l1.2.9l-.5 1.6"></path>

                        <path d="M3.8 25l1.2-.9l1.2.9l-.5-1.5l1.2-1H5.5L5 21l-.5 1.5h-1c0 .1-.1.2-.1.3l.8.6l-.4 1.6"></path>
                      </g>
                    </svg>
                  </IconButton>
                </>
              ) : (
                <>
                  {/* EN Language */}
                  <IconButton
                    size="sm"
                    onClick={toggleLanguage}
                    className=" lg:inline-block rounded-full"
                    style={{
                      background: mode === "light" ? "#ced6e0" : "#57606f",
                      color: mode === "dark" ? "white" : "black",
                    }}
                  >
                    <svg
                      width="30px"
                      height="30px"
                      viewBox="0 0 64 64"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      class="iconify iconify--emojione"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        d="M32 2c16.6 0 30 13.4 30 30H2C2 15.4 15.4 2 32 2z"
                        fill="#f9f9f9"
                      ></path>
                      <path
                        d="M32 62C15.4 62 2 48.6 2 32h60c0 16.6-13.4 30-30 30"
                        fill="#ed4c5c"
                      ></path>
                    </svg>
                  </IconButton>
                </>
              )}
            </div>
          </div>
          {/* Home Page Link  */}

          {/* All Items  */}
          <div className="flex items-center gap-4">
            {/* navMenu  */}
            <div className="hidden lg:block">{navMenu}</div>
            {/* Search Icon */}
            <div>
              <Search />
            </div>
            {/* Share Icon */}
            {admin ? (
              <div className="hidden lg:block">
                <Share />
              </div>
            ) : (
              ""
            )}

            {admin ? (
              <div>
                <Link to={"/admindashboard"}>
                  <div className="">
                    <Avatar
                      key={1}
                      src={adminPicture}
                      alt="avatar"
                      withBorder={true}
                      className=" text-red-500 w-10 h-10"
                      style={{
                        border:
                          mode === "dark"
                            ? "2px solid rgb(226, 232, 240)"
                            : "2px solid rgb(30, 41, 59)",
                      }}
                    />
                  </div>
                </Link>
              </div>
            ) : (
              ""
            )}

            {/* dark And Light Button */}
            <div>
              {mode === "light" ? (
                <>
                  {/* Light Button  */}
                  <IconButton
                    onClick={toggleMode}
                    className=" lg:inline-block rounded-full"
                    style={{
                      background: mode === "light" ? "#ced6e0" : "#57606f",
                      color: mode === "dark" ? "white" : "black",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-black"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    </svg>
                  </IconButton>
                </>
              ) : (
                <>
                  {/* Dark Button  */}
                  <IconButton
                    onClick={toggleMode}
                    className=" lg:inline-block rounded-full"
                    style={{
                      background: mode === "light" ? "#ced6e0" : "#57606f",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      />
                    </svg>
                  </IconButton>
                </>
              )}
            </div>
            {/* Mobile Toggle  */}
            <div>
              <IconButton
                className="ml-auto h-10 w-10 text-inherit rounded-lg lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
                style={{
                  background: mode === "light" ? "#ced6e0" : "#57606f",
                  color: mode === "dark" ? "white" : "black",
                }}
              >
                {openNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </IconButton>
            </div>
          </div>
        </div>
        {/* Mobile View */}
        <Collapse open={openNav}>
          {/* navMenu  */}
          {navMenu}
        </Collapse>
      </Navbar>
    </>
  );
}
