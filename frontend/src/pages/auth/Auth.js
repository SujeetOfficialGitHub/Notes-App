import { 
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel ,
    Box
} from '@chakra-ui/react'
import React from 'react'
import Login from '../../components/authentication/Login'
import Signup from '../../components/authentication/Signup'
import Helmet from '../../components/layout/Helmet'

const Auth = () => {
  return (
    <Helmet title={"Authenticate"}>
        <Box
        maxW="500px"
        m="auto"
        mt={10}
        p={5}
        boxShadow="2xl"
        rounded="lg"
        >
            <Tabs variant='soft-rounded' colorScheme='purple'>
                <TabList
                    display="flex"
                    justifyContent="space-evenly"
                >
                    <Tab w="full">Login</Tab>
                    <Tab w="full">Register</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Login />
                    </TabPanel>
                    <TabPanel>
                        <Signup />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    </Helmet>
  )
}

export default Auth