import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus, AiOutlineUpload } from 'react-icons/ai';
import { ContactAddress, DeliveryAddress } from "..";
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../../firebase";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";


function Contacts() {
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

  const [contactType, setContactType] = useState<string>("Primary");
  const [contact, setContact] = useState<string>("");
  const [contacts, setContacts] = useState<any[]>([]);
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

        const fetchContacts = async () => {
          try {
            const listingContact = collection(db, "contacts");
            const q = query(listingContact, where("userId", "==", id));
            const querySnap = await getDocs(q);
            const data = querySnap.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setContacts(data);
          } catch (error) {
            toast.error("Error fetching contacts:");
          }
        };

        fetchContacts();
      } else {
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        setContacts([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleContactTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactType(event.target.value);
  };

  const handleContactChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContact(event.target.value);
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
        const contactRef = await addDoc(collection(db, "contacts"), {
          userId: id,
          type: contactType,
          address: contact,
        });

        const newContacts = [
          { id: contactRef.id, type: contactType, address: contact },
        ];
        setContacts(newContacts);

        setContactType("Primary");
        setContact("");
      }
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  const handleEdit = (id: string) => {
    const selectedContact = contacts.find((contact) => contact.id === id);
    if (selectedContact) {
      setContactType(selectedContact.type);
      setContact(selectedContact.address);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "contacts", id));

      const updatedContacts = contacts.filter((contact) => contact.id !== id);
      setContacts(updatedContacts);
      setContactType("Primary");
      setContact("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className='delivery-address'>
      <div>
        <div className="flex justify-between gap-30">
          <h1 className='font-bold text-2xl'>Delivery Contact</h1> 
          <button className="text-yellow-400" onClick={handleDeliveryModal}><AiOutlinePlus/> Add Contact </button>
        </div>
        <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={modalStyle}>
          <div className="font-bold px-4">
            <h1 className='py-4 text-2xl'>Add Contact</h1>
              <ContactAddress
              contact={contact}
              contactType={contactType}
              handleContactTypeChange={handleContactTypeChange}
              handleSubmit={handleSubmit}
              handleContactChange={handleContactChange}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </Modal>
      </div>
      <div className="flex flex-col">
        <h2>Contacts</h2>
        {contact === "" ? (
          contacts.map((contact) => (
            <div className="addresses relative" key={contact.id}>
              <div>
                <div className="flex gap-10 font-bold">
                  <h2> {contact.type}</h2>
                  <div className="flex modification-button">
                    <button onClick={() => handleEdit(contact.id)}><AiOutlineEdit/></button>
                    <button onClick={() => handleDelete(contact.id)}><AiOutlineDelete/></button>
                  </div>
                </div>
                <h2> {contact.address}</h2>
              </div>
            </div>
          ))
        ) : (
          <div className="addresses relative">
            <div>
              <div className="flex gap-10 font-bold">
                <h2> {contactType}</h2>
                <div className=" flex modification-button">
                  <button onClick={() => handleDelete(contacts[0].id)}><AiOutlineDelete/></button>
                </div>
              </div>
              <h2> {contact}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contacts;
