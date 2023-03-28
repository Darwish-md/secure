import { useLocation, Link } from "react-router-dom";
import ConnectButton from "./ConnectButton";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export default function NavBar() {
  return (
    <nav className='relative mx-auto p-6 bg-denimDark h-100'>
      {/* Flex container */}
      <div className='flex items-center justify-between'>
        {/* Logo */}
        <div className='pt-2 flex flex-wrap'>
          <img src='/assets/pngwing.com (1).png' alt='' className='h-20 w-20' />
          <h1 className='text-center m-auto text-2xl font-cyber'>Secure</h1>
        </div>
        {/* Menu items */}
        <div className='hidden md:flex space-x-10 mr-3'>
        <Link
            to='/'
            className='p-5 hover:bg-denimLight rounded text-xl cursor-pointer'
          >
            Home
          </Link>
          <Link
            to='/mission'
            className='p-5 hover:bg-denimLight rounded text-xl cursor-pointer'
          >
            Mission
          </Link>
          <Link
            to='/elections'
            className='p-5 hover:bg-denimLight rounded text-xl cursor-pointer'
          >
            Elections
          </Link>
          <Link
            to='/chat'
            className='p-5 hover:bg-denimLight rounded text-xl cursor-pointer'
          >
            Chat
          </Link>
          {/* Button */}
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
}
