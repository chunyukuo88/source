import LocationForm from './LocationForm.svelte';
import { fireEvent, render, screen } from '@testing-library/svelte';
import { submissionHandler } from './utils';

jest.mock('./utils');

describe('Interactions', ()=>{
    describe('GIVEN: The form is complete and valid', ()=>{
       describe('WHEN: The user clicks the submit button,', ()=>{
          it('THEN: The submission handler is invoked.', async ()=>{
              submissionHandler.mockImplementation(jest.fn());
              render(LocationForm);

              const submissionButton = screen.getByRole('button', { name: 'submit'});
              
              await fireEvent.click(submissionButton);

              expect(submissionHandler).toBeCalledTimes(1);
          });
       });
    });
});

