import LocationForm from './LocationForm.svelte';
import { fireEvent, render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import { submissionHandler } from './utils';

jest.mock('./utils');

describe('Interactions', ()=>{
    beforeEach(()=>{
       jest.clearAllMocks();
    });
    describe('GIVEN: The form is complete and valid', ()=>{
        describe('GIVEN: The form is NOT complete', ()=>{
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

