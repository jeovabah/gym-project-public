import { Label } from '@radix-ui/react-label';
import InputMask from 'react-input-mask';

const PhoneInput = ({value,onChange}) => {
  return (
    <div>
    <Label>Numero de Telefone</Label>
    <InputMask
      mask="(99) 99999-9999"
      value={value}
      onChange={onChange}
    >
      {(inputProps) => <input {...inputProps} 
      type="tel" 
      placeholder="(XX) XXXXX-XXXX" 
      className="w-full p-2 bg-gray-300 rounded"
      id='phone'
      />}
    </InputMask>
    </div>
  );
};

export default PhoneInput;
