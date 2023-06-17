import React from "react";
import CompanyUserBar from "../companyPanel/CompanyUserBar";
import { render, screen } from "@testing-library/react";

describe("CompanyUserBar", () =>{
    test("renders UserBar while list is not empty", ()=> {
        const users = [
            {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                email: 'example@example.com',
                role: 'Manager'
            },
            {
                id: 2,
                firstName: 'Jane',
                lastName: 'Does',
                email: 'example2@example.com',
                role: 'Employee'
            },
        ];
        

        render(
            <div>
                {users.map((user)=>(
                <CompanyUserBar key={user.id} user={user}/>
                ))}
            </div>
            
        );
        const elements = screen.getAllByTestId('UserBar');
        const icon = screen.getByTestId('StarsIcon');

        expect(icon).toBeInTheDocument();

        expect(elements).toHaveLength(2);
    });
    test("renders icon for manager", ()=> {
        const user = 
            {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                email: 'example@example.com',
                role: 'Manager'
            };
            
        render(
            <CompanyUserBar user={user}/>
        );
        const icon = screen.getByTestId('StarsIcon');

        expect(icon).toBeInTheDocument();
    });
})