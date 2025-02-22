import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Pricing", path: "/pricing" },
    { label: "Contact Us", path: "/contact" },
  ];

  const navList = (
    <ul className="flex flex-col lg:flex-row lg:justify-center space-y-2 lg:space-y-0 lg:space-x-6">
      {navItems.map(({ label, path }) => (
        <Typography
          key={label}
          as="li"
          variant="small"
          color="black"
          className="p-1 font-normal"
        >
          <a
            onClick={() => navigate(path)}
            className="flex items-center cursor-pointer"
          >
            {label}
          </a>
        </Typography>
      ))}
    </ul>
  );

  const Buttons = ({ mobile }) => (
    <div
      className={`flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-4 ${
        mobile ? "mx-2" : ""
      }`}
    >
      {[
        { text: "Log In", path: "/login" },
        { text: "Sign In", path: "/signup" },
        { text: "NGO Management", path: "/NgoMgm" },
      ].map(({ text, path }, index) => (
        <Button
          key={text}
          fullWidth={mobile}
          variant={index === 0 ? "text" : "gradient"}
          size="sm"
          className="px-4 cursor-pointer"
          onClick={() => navigate(path)}
        >
          <span>{text}</span>
        </Button>
      ))}
    </div>
  );

  return (
    <Navbar className="sticky top-0 z-10 max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-amber-300">
      <div className="flex items-center justify-between text-black">
        {/* Logo */}
        <Typography
          as="span"
          onClick={() => navigate("/")}
          className="cursor-pointer py-1.5 font-medium"
        >
          NGO
        </Typography>

        {/* Centered Menu */}
        <div className="hidden lg:flex flex-grow justify-center">{navList}</div>

        {/* Buttons & Mobile Menu Toggle */}
        <div className="flex items-center">
          <div className="hidden lg:flex">
            <Buttons />
          </div>
          <IconButton
            variant="text"
            className="ml-4 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav((prevOpen) => !prevOpen)}
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

      <Collapse open={openNav} className="flex flex-col items-center space-y-2">
        {navList}
        <Buttons mobile />
      </Collapse>
    </Navbar>
  );
}

export default StickyNavbar;