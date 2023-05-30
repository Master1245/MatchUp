
export function Validate( 
    username:string, email:string, password:string, confirmPassword:string, terms:boolean,
    onErrorUsername: (error: boolean) => void,
    onErrorEmail: (error: boolean) => void,
    onErrorPassword: (error: boolean) => void,
    onErrorConfirmPassword: (error: boolean) => void,
    onErrorTerms: (error: boolean) => void,
    ) {
    const errors_list = [];

    if (!username) {
        errors_list.push('Username is required');
        onErrorUsername(true);
    } else if (username.length < 3) {
        errors_list.push('Username must be 3 characters long');
        onErrorUsername(true);
    }

    if (!email) {
        errors_list.push('Email is required');
        onErrorEmail(true);
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors_list.push('Email address is invalid');
        onErrorEmail(true);
    }

    if (!password) {
        errors_list.push('Password is required');
        onErrorPassword(true);
    } else if (password.length < 6) {
        errors_list.push('Password must be 6 characters long');
        onErrorPassword(true);
    }

    if (!confirmPassword) {
        errors_list.push('Confirm Password is required');
        onErrorConfirmPassword(true);
    } else if (confirmPassword !== password) {
        errors_list.push('Confirm Password must be equal to password');
        onErrorConfirmPassword(true);
    }

    if (!terms) {
        errors_list.push('You must accept the terms and conditions');
        onErrorTerms(true);
    }

    return errors_list;
}