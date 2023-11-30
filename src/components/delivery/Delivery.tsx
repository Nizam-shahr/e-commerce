import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus, AiOutlineUpload } from 'react-icons/ai';
import { DeliveryAddress } from "..";
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../../firebase";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";

type Address = {
  id: string;
  type: string;
  address: string;
};

function Delivery() {
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
      width: "25rem",
      marginRight: "-50%",
      overFlow: 'hidden',
      transform: "translate(-50%, -50%)",
      border: "#F5DEB3 4px solid",
      borderRadius: "16px",
    },
  };

  const [addressType, setAddressType] = useState<string>("Home");
  const [address, setAddress] = useState<string>("");
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>();
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeliveryModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const id = user.uid;
        setFormData({
          name: user.displayName || "",
          email: user.email || "",
          password: "", 
        });

        const fetchAddresses = async () => {
          try {
            const listingAddress = collection(db, "addresses");
            const q = query(listingAddress, where("userId", "==", id));
            const querySnap = await getDocs(q);
            const data = querySnap.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setAddresses(data);
          } catch (error) {
            toast.error("Error fetching addresses:");
          }
        };

        fetchAddresses();
      } else {
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        setAddresses([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleAddressTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressType(event.target.value);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddress(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (user) {
        await updateProfile(user, {
          displayName: formData.name,
        });
  
        const id = user.uid;
        const addressRef = await addDoc(collection(db, "addresses"), {
          userId: id,
          type: addressType,
          address,
        });
  
        setAddresses(prevAddresses => [
          ...prevAddresses,
          { id: addressRef.id, type: addressType, address },
        ]);
  
        setAddressType("Home");
        setAddress("");
      }
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };
  
  const handleEdit = (id: string) => {
    const selectedAddress = addresses.find((addr) => addr.id === id);
    if (selectedAddress) {
      setAddressType(selectedAddress.type);
      setAddress(selectedAddress.address);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "addresses", id));

      const updatedAddresses = addresses.filter((addr) => addr.id !== id);
      setAddresses(updatedAddresses);
      setAddressType("Home");
      setAddress("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <div className='delivery-address'>
      <div>
        <div className="flex justify-between gap-30">
          <h1 className='font-bold text-2xl'>Delivery Address</h1> 
          <button className="text-yellow-400" onClick={handleDeliveryModal}><AiOutlinePlus/> Add Address </button>
        </div>
        <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={modalStyle}>
          <div className="font-bold px-4">
            <h1 className='py-4 text-2xl'>Add Address</h1>
            <DeliveryAddress
              address={address}
              addressType={addressType}
              handleAddressTypeChange={handleAddressTypeChange}
              handleSubmit={handleSubmit}
              handleAddressChange={handleAddressChange}
            />
          </div>
        </Modal>
      </div>
      <h2>Addresses</h2>
      <div className="flex gap-8 flex-wrap">
        
        {address === "" && (
          addresses.map((addr) => (
            <div className="addresses relative" key={addr.id}>
              <div>
                <div className="flex gap-10 font-bold">
                  <h2> {addr.type}</h2>
                  <div className=" flex modification-button">
                    <button onClick={() => handleEdit(addr.id)}><AiOutlineEdit/></button>
                    <button onClick={() => handleDelete(addr.id)}><AiOutlineDelete/></button>
                  </div>
                </div>
                <h2 > {addr.address}</h2>
              </div>
            </div>
          ))
        ) 
          }
      </div>
    </div>
  );
}

export default Delivery;
