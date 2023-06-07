import AddNewAccountForm from "./AddNewAccountForm";
import {render, screen} from '@testing-library/react'

describe('Add new account', ()=>{
    test('Adding new employee account', () => {
        render(<AddNewAccountForm/>);
        const docElement = screen.getByText('Add new company account', {exact: false});
        expect(docElement).toBeInTheDocument();
    })
})