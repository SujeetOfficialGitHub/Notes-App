


export const authInputValidation = (validator, schema, toast, name, email, password1, password2) => {
    
    // Add properties for password validation
    schema
    .is().min(4)                                    // Minimum length 8
    .is().max(20)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
    if (!name || name.length <= 2){
        toast({
            title: "Error Occured",
            description: "Name should be greater than 2 character",
            status: "warning",
            duration: "5000",
            isClosable: true,
            position: "top-right"
        })
        return false
    }else if (!validator.validate(email)){
        toast({
            title: "Error Occured",
            description: "Please enter valid email",
            status: "warning",
            duration: "5000",
            isClosable: true,
            position: "top-right"
        })
        return false
    }else if (!schema.validate(password1)){
        toast({
            title: "Error Occured",
            description: "Please enter a valid password",
            status: "warning",
            duration: "5000",
            isClosable: true,
            position: "top-right"
        })
        return false
        
    }else if (password1 !== password2) {
        toast({
            title: "Error Occured",
            description: "Password and confirm password doesn't match",
            status: "warning",
            duration: "5000",
            isClosable: true,
            position: "top-right"
        })
        return false
    }else{
        return true
    }
}