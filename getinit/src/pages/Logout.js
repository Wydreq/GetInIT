import { redirect } from 'react-router-dom';

export function action() {

    if (window.confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('token');
        return redirect('/auth');
    } else {
        return redirect('/');
    }
}