import React, { useEffect, useState } from 'react'
import { 
  useToast,
  Heading, 
  Card,
  Box,
  Text,
  CardHeader,
  CardBody,
  SimpleGrid,
  CardFooter,
  IconButton,
  Spinner,
  Tooltip
} from '@chakra-ui/react'
import { maxLetters } from '../../components/helperFunctions/stringUtility'
import Helmet from '../../components/layout/Helmet'
import {AiOutlineEye} from 'react-icons/ai'
import {FaRegEdit, FaTrash} from 'react-icons/fa'
import {TiLockClosedOutline, TiLockOpenOutline} from 'react-icons/ti'
import { getNotes } from '../../api/privateNotesApi'

const MyNotes = () => {
  const [myNotes, setMyNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  useEffect(() => {
    const fetchNotes = async() => {
      setLoading(true)
      try {
        const res = await getNotes();
        // console.log(res)
        setMyNotes(res)
        setLoading(false)
      } catch (error) {
        console.log(error)
        toast({
          title: "Error Occured",
          description: "Failed to fetch Notes",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "top-right"
        })
        setLoading(false)
      }
    }
    fetchNotes()
  }, [toast])

  return (
  <Helmet title={"My Notes"}>
    <Heading textAlign="center" my={2}>My Notes</Heading>
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
    {myNotes.length === 0 && !loading && <Box w="100%" bg="purple" p={5} mt={5} color="white" textAlign="center" fontWeight="bold">Notes Not Found</Box>}
    <SimpleGrid p={5} spacing={4} className='card__items' templateColumns={['repeat(auto-fit, minmax(100%, 1fr))', 'repeat(auto-fit, minmax(350px, 1fr))']}>
      {myNotes && 
        myNotes.map((notes) => (
          <Card key={notes.id} boxShadow="outline">
              <CardHeader pb={1} display="flex" justifyContent="space-between">
                <Heading size="md" textAlign="justify">{notes.title}</Heading>
              </CardHeader>

              <CardBody py={0}>
                <Text textAlign="justify">{maxLetters(notes.description, 100)}</Text>
              </CardBody>

              <CardFooter display="flex" flexWrap="wrap" justifyContent="space-between">
                <Tooltip hasArrow label="Click to View Details">
                  <IconButton icon={<AiOutlineEye fontSize="20px" />} bg="purple" color="white" colorScheme='purple' />
                </Tooltip>

                <Tooltip hasArrow label="Click to Edit Note">
                  <IconButton icon={<FaRegEdit fontSize="20px" />} bg="yellow.600" color="white" colorScheme='yellow' />
                </Tooltip>

                <Tooltip hasArrow label="Click to Delete Note">
                  <IconButton icon={<FaTrash fontSize="20px" />} bg="red.600" color="white" colorScheme='red' />
                </Tooltip>

                <Tooltip hasArrow label={notes.is_published ? "Click to UnPublish Note" : "Click to Publish Note"} >
                  <IconButton 
                    icon={notes.is_published ? 
                      <TiLockOpenOutline fontSize="20px" /> 
                      : <TiLockClosedOutline fontSize="20px" />} 
                    bg={notes.is_published ? "green" : "orange"} 
                    color="white" 
                    colorScheme={notes.is_published ? "green" : "orange"} 
                  />
                </Tooltip>
              </CardFooter>
            </Card>
        ))}
    </SimpleGrid>
  </Helmet>

  )
} 

export default MyNotes