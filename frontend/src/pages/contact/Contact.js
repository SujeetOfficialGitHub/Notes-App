import React from 'react'
import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  Textarea,
  Button
} from '@chakra-ui/react'
import Helmet from '../../components/layout/Helmet'

const Contact = () => {
  return (
    <Helmet title={"Contact"}>
      <VStack spacing={5} mx="auto"  mt={10} border="1px solid purple" p={5} borderRadius={5}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input type='text' placeholder='Enter your name' />
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type='email' placeholder='Enter your email' />
        </FormControl>

        <FormControl>
          <FormLabel>Message</FormLabel>
          <Textarea placeholder='Write message here...' />
        </FormControl>
        <Button bg="purple" color="white" w="100%" sx={{ _hover: { backgroundColor: "#662d91" }, _active: { backgroundColor: "#DDA0DD" } }}>Send</Button>
      </VStack>
    </Helmet>
  )
}

export default Contact