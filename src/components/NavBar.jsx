import { useLocation, Link } from "react-router-dom";
import ConnectButton from "./ConnectButton";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <nav className='mx-auto p-6 bg-denimDark h-100'>
      {/* Flex container */}
      <div className='flex items-center justify-between'>
        {/* Logo */}
        <div className='pt-2 flex flex-row cursor-pointer' onClick={() => navigate('/')}>
          <img src='/assets/blocks.png' alt='' className='h-20 w-20' />
          <h1 className='text-center m-auto text-2xl font-cyber'>Secure</h1>
        </div>
        {/* Menu items */}
        <div className='hidden md:flex space-x-10 mr-3'>
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
          <Link
            to='/engage'
            className='p-5 hover:bg-denimLight rounded text-xl cursor-pointer'
          >
            Engage
          </Link>
          {/* Button */}
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
}
