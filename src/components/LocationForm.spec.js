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
       describe('WHEN: The user clicks the submit button,', ()=>{
          it('THEN: The submission handler is invoked.', async ()=>{
              submissionHandler.mockImplementation(jest.fn());
              render(LocationForm);

              const submissionButton = screen.getByRole('button', { name: 'submit'});

              await fireEvent.click(submissionButton);

              // TODO: Figure out why this test is passing--it shouldn't
              expect(submissionHandler).toBeCalledTimes(1);
              expect(submissionButton).toBeDisabled();
          });
       });
    });
    describe('GIVEN: The form is NOT complete', ()=>{
        it('THEN: The submission button is not clickable.', ()=>{
          render(LocationForm);

          const submissionButton = screen.getByRole('button', { name: 'submit'});

          expect(submissionButton).toBeDisabled();
        });
    });
});

