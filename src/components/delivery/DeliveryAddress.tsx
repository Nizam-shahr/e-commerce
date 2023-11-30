// AddressForm.tsx

type Props = {
  address: string
  addressType : string
  handleAddressTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent) => void;
  handleAddressChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const DeliveryAddress = ({address,addressType, handleAddressTypeChange, handleSubmit, handleAddressChange}:Props) => {
 

  return (
    <div className="">
      <form className="delivery-address-form" onSubmit={handleSubmit}>
        <div className="checkout-input-container">
          <div> <input 
            className="checkout-input"
              type="radio"
              value="Home"
              checked={addressType === "Home"}
              onChange={handleAddressTypeChange}
            />
          
          <label>   Home </label>
          </div>
       <div> <input
              className="checkout-input"
              type="radio"
              value="Office"
              checked={addressType === "Office"}
              onChange={handleAddressTypeChange}
            />
            <label>
            Office
          </label></div>
           
        </div>
        <div className="flex mt-6 mb-6 h-24">
          
          <textarea className="text-area" value={address} onChange={handleAddressChange} placeholder="Add address" />
        </div>
        <div>
          <button className="save-address" type="submit">Save Address</button>
        </div>
      </form>
      
    </div>
  );
};

export default DeliveryAddress;
