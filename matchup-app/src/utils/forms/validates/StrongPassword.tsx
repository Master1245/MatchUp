export const StrongPassword = (password: string): string | null => {
    if (password.length < 8) {
        return 'Password should have at least 8 characters.';
    }

    // Add more password validation rules as per your requirements

    return null;
};