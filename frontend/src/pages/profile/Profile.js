import React, { useEffect, useState } from 'react'
import {
  Card,
  Avatar,
  useToast,
  Text,
  Box,
  Spinner
} from '@chakra-ui/react'
import { getProfileData } from '../../api/privateNotesApi'
import Helmet from '../../components/layout/Helmet'

const Profile = () => {
  const [profileData, setProfileData] = useState({})
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  useEffect(() => {
    const fetchProfileData = async() => {
      try {
        setLoading(true)
        const res = await getProfileData();
        // console.log(res)
        setProfileData(res)
        setLoading(false)
      } catch (error) {
        console.log(error)
        toast({
          title: "Error Occured",
          description: "Failed to fetch profile data",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right'

        })
        setLoading(false)
      }
    }
    fetchProfileData()
  },[toast])
  return (
    <Helmet title={"Profile"}>
      {loading && 
      <Box
      w="100vw" 
      h="100vh" 
      alignItems="center" 
      justifyContent="center" 
      display="flex" 
      position="fixed"
      zIndex="9999"
      >
          <Spinner size="xl" thickness='4px'/>
      </Box>}
      <Card w="fit-content" m="30px auto" textAlign="center" p={4}>
        <Avatar m="auto" name={profileData.name} />
        <Text>{profileData.name}</Text>
        <Text>{profileData.email}</Text>
      </Card>
    </Helmet>
  )
}

export default Profile