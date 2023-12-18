import React, { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { db } from '../../firebase';
import {
  updateDoc,
  doc,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from '../assets/svg/homeIcon.svg';
import Contacts from '@/components/contacts/Contacts';
import Delivery from '@/components/delivery/Delivery';

interface FormData {
  name: string;
  email: string;
}

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



function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: auth.currentUser?.displayName || '',
    email: auth.currentUser?.email || '',
  });
  const [isLogoutOpen, setIsLogoutOpen] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] =useState<boolean>(false);

  const { name, email } = formData;
const router = useRouter()


  const onSubmit = async () => {
    const auth = getAuth()
    const user = auth.currentUser
    try {
      if (user && user?.displayName !== name) {
        // Update display name in fb
        await updateProfile(user, {
          displayName: name,
        });

        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Could not update profile details');
    }
  };
  const onLogOut = () => {
    auth.signOut();
    router.push('/')
    setIsLogoutOpen(true)
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };



  return (
    <div className="profile mt-60">

        <div className="profile-left-container">

         <div className='profile-left'>
            <div className='px-4'>
                Your Order
            </div>
            <div className='px-4'>
                Need Help
            </div>
                <div className=' text-yellow-300 border-r-yellow-300 2px border-solid px-4'>
                    Profile
                </div>
                <div onClick={()=>setIsLogoutOpen(true)} className='log-out-profile cursor-pointer '>
                    Log Out
                    <Modal isOpen={isLogoutOpen} onRequestClose={() => setIsLogoutOpen(false)} style={modalStyle}>
                <div className="logout">
                  <h2  className="text-xl">Do you want to logout?</h2>
                  <div><button className="registerButton px-2" onClick={onLogOut} >Yes</button> <button className="registerButton px-2" onClick={()=>setIsLogoutOpen(false) } >No</button></div>
                </div>
              </Modal>
                </div>
         </div>
        </div>

        <div className="profile-right-container">
        <h2>Your Profile</h2>
            <div className='overflow-hidden profile-container'>
          <form className='profile-form my-4 '>
            <div className='profile-form-div'>
            <label className='font-bold' >Name</label>
            <input
            className='profile-input'
              type="text"
              id="name"
              value={name}
              onChange={onChange}
            />
                </div>
                <div className='profile-form-div'>
                <label className='font-bold' >Email</label>
            <input
            
            className='profile-input'
              type="email"
              id="email"
              value={email}
              onChange={onChange}
            />
            </div>
          </form>
          <button className=' py-2 px-4 mt-6 text-white' style= {{background:'wheat'}} onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}>Save</button>
         
        </div>
        <div>
          <Contacts/>
            <Delivery/>
        </div>
        </div>
    </div>
  );
}

export default Profile;
// Add your type definition for YourListingType as per your application's requirements
interface YourListingType {
  id: string;
  // ... other properties
}
