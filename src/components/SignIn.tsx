import { useState, ChangeEvent, FormEvent } from 'react';
// import { toast } from 'react-toastify';
import Modal from 'react-modal';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Register from './Register';
import Spinner from './Spinner';
// import Spinner from './Spinner';

type SignInProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loggedIn: boolean;
  handleSignUp: () => void;
  isModalOpen : boolean
};

type FormData = {
  email: string;
  password: string;
};

const SignIn: React.FC<SignInProps> = ({ setIsModalOpen, loggedIn, handleSignUp, isModalOpen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [text, setText] = useState<any>('Sign In');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const modalStyle = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      zIndex: '100',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);

      setIsModalOpen(false);
    } catch (error) {
      toast.error('Bad User Credentials');
      if (error) {
        setText('Sign in');
      }
    }
  };

  const handleText = () => {
    if (!loggedIn) {
      setText(() => <Spinner/>)
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
          <label>Email</label>
          <input
            className="border border-gray-400 w-full h-[40px]"
            type="email"
            id="email"
            value={formData.email}
            onChange={onChange}
          />

          <label>Password</label>
          <input
            className="border border-gray-400 w-full h-[40px] "
            type="password"
            id="password"
            value={formData.password}
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
      <div className="create">
        <h2>Don't have an account ?</h2>
        <button onClick={handleSignUp}>Create One</button>
      </div>
    </div>
  );
};

export default SignIn;
