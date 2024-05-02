export function validateName(name) {
    const nameRegex = /^[a-zA-Z\s]+$/;
    
    // Check if the name matches the regex pattern
    if (name.match(nameRegex)) {
        return true; // Name is valid
    } else {
        return false; // Name is invalid
    }
}

export function validateEmail(email) {
    // Regular expression to match a valid email address format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Check if the email matches the regex pattern
    if (email.match(emailRegex)) {
        return true; // Email is valid
    } else {
        return false; // Email is invalid
    }
}
