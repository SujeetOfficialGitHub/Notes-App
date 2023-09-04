import {
    FormControl,
    FormLabel,
    Button,
    VStack,
    Input,
    InputRightElement,
    InputGroup,
    useToast,
    Spinner
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { signup } from '../../api/authApi';
import validator from "email-validator";
import passwordValidator from 'password-validator';
import { authInputValidation } from '../helperFunctions/authValidation';
import { capitalizedFirstLetter } from '../helperFunctions/stringUtility';
import { NotesState } from '../../context';

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [loading, setLoading] = useState(false)

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const toast = useToast()
    const schema = new passwordValidator();

    const { setToken } = NotesState();
  
    const handleSignup = async() => {
        // Validata all fields data entered by users 
        const inputValidate = authInputValidation(validator, schema, toast, name, email, password1, password2)
        if (inputValidate){
            try {
                setLoading(true)
                const credentials = {name, email, password: password1};
                const res = await signup(credentials)
                // console.log(res)
                setToken(res?.token?.access)
                toast({
                    title: "Sign up successfully",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right',
                })
                setLoading(false)
                setName('');
                setEmail('');
            } catch (error) {
                // console.log(error)
                // Show email if already registered
                if (error.response.data?.errors?.email){
                    toast({
                        title: "Error Occured",
                        description: capitalizedFirstLetter(error.response.data.errors.email[0]),
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                        position: 'top-right',
                    })
                }else{
                    toast({
                        title: "Error Occured",
                        description: "Faild to Signup",
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                        position: 'top-right',
                    })
                    
                }
                setLoading(false)
            }
            
        }
        setPassword1('')
        setPassword2('')
    }
    return (
    <VStack spacing={3}>
        <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input 
                type='text' 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder='Enter you name' 
            />
        </FormControl>

        <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
                type='email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder='Enter your email' 
            />
        </FormControl>
        <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    placeholder='Enter password'
                    />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder='Enter confirm password'
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button onClick={handleSignup} colorScheme='purple' w="full">
            {loading ? <Spinner color='white' /> : "Sign Up"}
        </Button>
    </VStack>
  )
}

export default Signup