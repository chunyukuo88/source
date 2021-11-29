import LocationForm from './LocationForm.svelte';
import { fireEvent, render, screen, cleanup } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import { inputsAreTooShort, submissionHandler } from './utils';
import userEvent from '@testing-library/user-event';
import { createLocationInfo } from '../utils/locationUtils';

jest.mock('../utils/locationUtils');
const expectedFormData = {
    addressCity: 'Killadelphia',
    addressState: '...of disaster',
    addressStreet: '123 Sesame Street',
    addressZipCode: '12345',
    id: '123',
    note: '',
    dba: 'Al\'s Used Fireworks',
    phone: '1-800-EXLAX',
    selected: {
        category: 'automotive',
        id: 3,
        name: 'tires'
    },
};
const emptyFormData = {
    id: '123',
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
};
async function enterInput(element, string) {
    fireEvent.input(element, {
        target: {
            value: string
        },
    });
}
function getFormInputs(){
    const addressCity = screen.getByTestId('addressCity');
    const addressState = screen.getByTestId('addressState');
    const addressStreet = screen.getByTestId('addressStreet');
    const addressZipCode = screen.getByTestId('addressZipCode');
    const dba = screen.getByTestId('dba');
    const phone = screen.getByTestId('phone');
    return { addressCity, addressState, addressStreet, addressZipCode, dba, phone };
}
jest.mock('./utils', ()=>{
    const originalModule = jest.requireActual('./utils');
    return {
        __esModule: true,
        ...originalModule,
        submissionHandler: jest.fn(),
        inputsAreTooShort: jest.fn()
    };
});


beforeEach(()=>{
    createLocationInfo.mockImplementation(()=> emptyFormData);
});
afterEach(async () => {
    jest.clearAllMocks();
    cleanup();
});

describe('Interactions', ()=>{
    describe('GIVEN: The form is complete and valid with the exception of the recyclable,', ()=>{
        describe('WHEN: The user clicks the submit button,', ()=>{
            it('THEN: The submission handler is invoked with the form data.', async ()=>{
                render(LocationForm);
                const { addressCity, addressState, addressStreet, addressZipCode, dba, phone } = getFormInputs();
                const expectedFormData = {
                    addressCity: 'Killadelphia',
                    addressState: '...of disaster',
                    addressStreet: '123 Sesame Street',
                    addressZipCode: '12345',
                    id: '123',
                    note: '',
                    dba: 'Al\'s Used Fireworks',
                    phone: '1-800-EXLAX',
                    selected: {
                        name: 'none'
                    },
                };

                await enterInput(addressCity, 'Killadelphia');
                await enterInput(addressState, '...of disaster');
                await enterInput(addressStreet, '123 Sesame Street');
                await enterInput(addressZipCode, '12345');
                await enterInput(dba, 'Al\'s Used Fireworks');
                await enterInput(phone, '1-800-EXLAX');

                const submissionButton = await screen.getByRole('button', { name: 'submit'});

                await fireEvent.click(submissionButton);

                expect(submissionHandler).toBeCalledTimes(1);
                expect(submissionHandler).toBeCalledWith(expectedFormData);
            });
        });
    });
    describe('WHEN: The user has not yet selected a recyclable,', ()=>{
       it('THEN: That selection string says none have been selected.', ()=>{
           render(LocationForm);

           const selection = document.querySelector('#user-selection');

           expect(selection).toHaveTextContent('none');
       });
    });
    describe('WHEN: The user selects a recyclable,', ()=>{
       it('THEN: That selection is rendered in the document.', async ()=>{
           render(LocationForm);
           const dropdown = screen.getByTestId('dropdown');
           let selection = document.querySelector('#user-selection');
           expect(selection).toHaveTextContent(' ');

           await userEvent.selectOptions(dropdown, 'tires');
           const options  = await document.querySelectorAll('option');

           expect(options[0].selected).toBeFalsy();
           expect(options[1].selected).toBeFalsy();
           expect(options[2].selected).toBeTruthy();
           selection = document.querySelector('#user-selection');
           expect(selection).toHaveTextContent('Your selection: tires');
       });
    });
    describe('GIVEN: The form is incomplete', ()=>{
        describe('WHEN: The user clicks the submit button,', ()=>{
            it('THEN: The submission button is not clickable.', async ()=>{
                inputsAreTooShort.mockImplementation(()=>true);
                render(LocationForm);

              const submissionButton = screen.queryByRole('button', { name: 'form incomplete'});
              await fireEvent.click(submissionButton);

              expect(submissionButton).toBeInTheDocument();
              expect(submissionButton).toBeDisabled();
          });
       });
    });
    describe('GIVEN: The form is complete and valid,', ()=>{
        describe('WHEN: The user clicks the submit button,', ()=>{
            it('THEN: The submission handler is invoked with the form data.', async ()=>{
                inputsAreTooShort.mockImplementation(()=>false);
                render(LocationForm);
                const { addressCity, addressState, addressStreet, addressZipCode, dba, phone, note } = getFormInputs();
                const dropdown = screen.getByTestId('dropdown');

                await userEvent.selectOptions(dropdown, 'tires');
                await enterInput(addressCity, 'Killadelphia');
                await enterInput(addressState, '...of disaster');
                await enterInput(addressStreet, '123 Sesame Street');
                await enterInput(addressZipCode, '12345');
                await enterInput(dba, 'Al\'s Used Fireworks');
                await enterInput(phone, '1-800-EXLAX');
                await enterInput(note, '');

                const submissionButton = await screen.getByRole('button', { name: 'submit'});

                await fireEvent.click(submissionButton);

                expect(submissionHandler).toBeCalledTimes(1);
                expect(submissionHandler).toBeCalledWith(expectedFormData);
            });
        });
    });
});

