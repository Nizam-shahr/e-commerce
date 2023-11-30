// Register.tsx
import React, { useState, ChangeEvent } from 'react';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import Spinner from './Spinner';
// import { signIn, signOut, useSession } from "next-auth/react";
// import Spinner from "./Spinner";

type RegisterProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  loggedIn: boolean;
  setIsOpen: (isOpen: boolean) => void;
  
};

function Register({ setIsModalOpen, loggedIn, setIsOpen }: RegisterProps) {
  const [text, setText] = useState<any>('Register');
  const [insteadText, setInsteadText] = useState<JSX.Element | null>(null);
  const [formData, setFormData] = useState<any>({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
            if (user) {
                updateProfile(user, {
                    displayName: name,
                  });
            }
    

     // Create a new object without the 'password' property
     const { password: _, ...formDataCopy } = formData;

     formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);
      setIsModalOpen(false);
    } catch (error) {
      if (error) {
        setText('Register');
        setInsteadText(() => (
          <div className="instead">
            <h2>Already have an account?</h2>
            <h2 className="black">Sign In</h2>
          </div>
        ));
      }
      toast.error("Something went wrong with registration or user already exist");
    }
  };

  const handleText = () => {
    if (!loggedIn) {
      setText(() => <Spinner/>);
    }
  };

  return (
    <div className="registerContainer">
      <div className="registerDetails ">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <h2>Sign Up with email and password</h2>
      </div>
      <div className="flex flex-col">
        <form onSubmit={onSubmit} className="register">
          <label>Name</label>
          <input
            className="border border-gray-400 w-full h-[40px] "
            type="name"
            id="name"
            value={name}
            onChange={onChange}
          />

          <label>Email</label>
          <input
            className="border border-gray-400 w-full h-[40px]"
            type="email"
            id="email"
            value={email}
            onChange={onChange}
          />

          <label>Password</label>
          <input
            className="border border-gray-400 w-full h-[40px] "
            type="password"
            id="password"
            value={password}
            onChange={onChange}
          />

          <button
            onClick={handleText}
            className="bg-blue-800 w-full p-3 registerButton"
          >
            {text}
          </button>
        </form>
      </div>
      <div>
        <button onClick={() => setIsOpen(false)}> {insteadText}</button>
      </div>
    </div>
  );
}

export default Register;
