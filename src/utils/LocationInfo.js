import { v4 as uuidv4 } from 'uuid';

export const createLocationInfo = () => {
  const  locationId = uuidv4();
  return {
      id: locationId,
      addressCity: '',
      addressState: '',
      addressStreet: '',
      addressZipCode: '',
      dba: '',
      phone: '',
      note: '',
      selected: {
          name: 'none'
      },
  }
};
