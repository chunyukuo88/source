import LocationForm from './LocationForm.svelte';
import { fireEvent, render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import { submissionHandler } from './utils';
import userEvent from "@testing-library/user-event";

jest.mock('./utils');

describe('Interactions', ()=>{
    beforeEach(()=>{
       jest.clearAllMocks();
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
           expect(selection).toHaveTextContent('none');

           await userEvent.selectOptions(dropdown, 'tires')
           const options  = await document.querySelectorAll('option');

           expect(options[0].selected).toBeFalsy();
           expect(options[1].selected).toBeFalsy();
           expect(options[2].selected).toBeTruthy();
           expect(options[3].selected).toBeFalsy();
           selection = document.querySelector('#user-selection');
           expect(selection).toHaveTextContent('Your selection: tires');
       });
    });
    describe('GIVEN: The form is incomplete', ()=>{
        describe('WHEN: The user clicks the submit button,', ()=>{
            it('THEN: The submission button is not clickable.', async ()=>{
              submissionHandler.mockImplementation(jest.fn());
              render(LocationForm);

              const submissionButton = screen.getByRole('button', { name: 'submit'});

              await fireEvent.click(submissionButton);

              expect(submissionHandler).toBeCalledTimes(0);
              expect(submissionButton).toBeDisabled();
          });
       });
    });
    describe('GIVEN: The form is complete and valid,', ()=>{
        describe('WHEN: The user clicks the submit button,', ()=>{
            it('THEN: The submission handler is invoked.', async ()=>{
                render(LocationForm);
                const addressCity = screen.getByTestId('addressCity');
                const addressState = screen.getByTestId('addressState');
                const addressStreet = screen.getByTestId('addressStreet');
                const addressZipCode = screen.getByTestId('addressZipCode');
                const dba = screen.getByTestId('dba');
                const phone = screen.getByTestId('phone');

                await fireEvent.input(addressCity, { target: { value: 'Killadelphia' }});
                await fireEvent.input(addressState, { target: { value: '...of disaster' }});
                await fireEvent.input(addressStreet, { target: { value: '123 Sesame Street' }});
                await fireEvent.input(addressZipCode, { target: { value: '12345' }});
                await fireEvent.input(dba, { target: { value: 'Al\'s Used Fireworks' }});
                await fireEvent.input(phone, { target: { value: '1-800-EXLAX' }});

                const submissionButton = await screen.getByRole('button', { name: 'submit'});

                await fireEvent.click(submissionButton);

                expect(submissionHandler).toBeCalledTimes(1);
            });
        });
    });
});

