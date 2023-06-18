import React from "react";
import ChangePasswordForm from '../companyPanel/editInfo/ChangePasswordForm';
import { render, screen } from "@testing-library/react";

describe("ChangeEmailForm", ()=>{
    test("should render input fields and button", ()=>{
        render(<ChangePasswordForm/>);

        expect(screen.getByLabelText('Old password*')).toBeInTheDocument();
        expect(screen.getByLabelText('New password*')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm new password*')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    })
})