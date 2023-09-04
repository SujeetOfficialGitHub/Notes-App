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
import { login } from '../../api/authApi';
import { NotesState } from '../../context';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const { setToken } = NotesState();

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const toast = useToast()


    const handleLogin = async() => {
        if (!email || !password){
            toast({
                title: "Error Occured",
                description: "Email and password must be required",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "top-right"
            })
            return;
        }
        try {
            setLoading(true)
            const credentials = {email, password}
            const res = await login(credentials);
            // console.log(res)
            setToken(res?.token?.access);
            localStorage.setItem("token", res?.token?.access)
            toast({
                title: "Login successfully",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            })
            setLoading(false)
            setEmail('')
        } catch (error) {
            // console.log(error)
            toast({
                title: "Error Occured",
                description: "Email or password Invalid",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            })
            setLoading(false)
        }
        setPassword('')
    }
    return (
    <VStack spacing={3}>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter password'
                    />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button onClick={handleLogin} colorScheme='purple' w="full" >
            {loading ? <Spinner color='white' /> : "Login"}
        </Button>
    </VStack>
  )
}

export default Login