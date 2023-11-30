// AddressForm.tsx

type Props = {
    contact: string
    contactType : string
    handleContactTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent) => void;
    handleContactChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    setIsModalOpen: (isModalOpen: boolean) => void;
  }
  
  const ContactAddress = ({contact,contactType, handleContactTypeChange, handleSubmit, handleContactChange, setIsModalOpen }:Props) => {
   
 
    return (
      <div className="">
        <form onSubmit={handleSubmit} className="delivery-address-form">
        <div className="checkout-inputs-container">
          <div> <input 
            className="checkout-input"
              type="radio"
              value="Home"
              checked={contactType === "Primary"}
              onChange={handleContactTypeChange}
            />
          
          <label>Primary </label>
          </div>
       <div> <input
              className="checkout-input"
              type="radio"
              value="Office"
              checked={contactType === "Secondary"}
              onChange={handleContactTypeChange}
            />
            <label>
            Secondary
          </label></div>
           
        </div>
          <div className="flex mt-6 mb-6 h-24">
          
            <textarea className="text-area" value={contact} onChange={handleContactChange} placeholder="Enter contact" />
          </div>
          <div>
            <button onClick={()=> setIsModalOpen(false)} className="save-address" type="submit">Save Contact</button>
          </div>
        </form>
        
      </div>
    );
  };
  
  export default ContactAddress;
  