import { AiOutlineQuestionCircle, AiOutlineSearch } from 'react-icons/ai';
import { Register } from '.';
import React, { useEffect, useState } from "react";
import { useSearch } from './context/SearchContext';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Modal from 'react-modal';
import Image from 'next/image';
import SignIn from './SignIn';
import Dropdowns from './DropDwon';
import Hamburger from './Hamburger';
type Props = {
  // Other props
};

const Header = ({ /* Other props */ }: Props) => {
  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: "100",
    },
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "wheat 4px solid",
      borderRadius: "16px",
    },
  };

  const secondModalStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      zIndex: "100",
    },
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "wheat 4px solid",
      borderRadius: "16px",
    },
  };

  const auth = getAuth();
  const [isModalOpen, setIsModalOpen] =useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState<boolean>(false)
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSignUp = () => {
    setIsOpen(true);
  };
  const onLogOut = () => {
    auth.signOut();
    router.push('/')
    setLoggedIn(false);
    setIsLogoutOpen(false)
  };
  const clickCart = () => {
    if (loggedIn) {
      router.push("/Cart");
    } else {
      setIsModalOpen(true);
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        setLoggedIn(true);
      }
      console.log(data);
    });
  }, []);

  const { setSearchProductByName } = useSearch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchProductByName(e.target.value);
  };

  const router = useRouter();

  const showSearchbar = router.pathname === "/";
  return (
    <div className="header-container">
      <div className='sm-screen'> <Hamburger 
      loggedIn = {loggedIn}
      setIsLogoutOpen = {setIsLogoutOpen}
      setIsModalOpen= {setIsModalOpen}
      />
      <div className="header-name">
        <h1 onClick={() => router.push('/')} className="cursor-pointer " >ITEM STORE</h1>
      </div>
      </div>
     <div className='large-screen'>
      <div className="header-name">
        <h1 onClick={() => router.push('/')} className="cursor-pointer " >ITEM STORE</h1>
      </div>
      <form
        style={{
          display: showSearchbar ? "flex" : "none",
        }}
        className="header-form"
      >
        <span>
          <AiOutlineSearch size={30} />
        </span>
        <input
        className='header-input w-full '
          type="text"
          id=""
          placeholder="search your item here"
          onChange={handleSearch}
        />
      </form>
      <div className='nav-items'>
        <button>Offer</button>
        <button  className="cursor-pointer flex align-center hover:caret-orange-100" onClick={() => router.push('/need-help')}> <AiOutlineQuestionCircle/>  Need Help</button>

        <div>
            {" "}
            {loggedIn ? (
              <div>
              {/* <button onClick={()=> setIsLogoutOpen(true)} className="logoutContainer">
                <Image src='/user.png' width={30} height={30} alt= '' />
              </button> */}
              <Dropdowns setIsLogoutOpen = {setIsLogoutOpen}/>
              </div>
            ) : (
              <button className="SignIn bg-slate-50 rounded-lg hover:bg-yellow-500 py-2 px-4 " onClick={() => setIsModalOpen(true)}>
                Sign in
              </button>
            )}
             <Modal isOpen={isLogoutOpen} onRequestClose={() => setIsLogoutOpen(false)} style={modalStyle}>
                <div className="logout">
                  <h2  className="text-xl">Do you want to logout?</h2>
                  <div><button className="registerButton px-2" onClick={onLogOut} >Yes</button> <button className="registerButton px-2" onClick={()=>setIsLogoutOpen(false) } >No</button></div>
                </div>
              </Modal>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              style={modalStyle}
            >
              <SignIn
                setIsModalOpen={setIsModalOpen}
               
                isModalOpen={isModalOpen}
                loggedIn={loggedIn}
                handleSignUp={handleSignUp}
              />

              <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                style={secondModalStyle}
              >
                <Register
                  setIsOpen={setIsOpen}
                  setIsModalOpen={setIsModalOpen}
                  loggedIn={loggedIn}
                />

                <button className="closeModal" onClick={() => setIsOpen(false)}>
                  <span>X</span>
                </button>
              </Modal>
              <button
                className="closeModal"
                onClick={() => setIsModalOpen(false)}
              >
                <span>X</span>
              </button>
            </Modal>
          </div>
      </div></div>
    </div>
  );
};

export default Header;
