import {render, screen} from '@testing-library/react'
import UserPanel from "./UserPanel";

describe('User info', ()=>{
    test('Fetching user info', async () => {
        render(<UserPanel/>);

        const userInfo = await screen.findAllByRole('listitem');
        expect(userInfo).not.toHaveLength(0);
    })
})