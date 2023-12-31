import React, { useEffect, useState } from 'react'
import { publishedNotes } from '../../api/publishedNotesApi'
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
  Button,
  Spinner
} from '@chakra-ui/react'
import { maxLetters } from '../../components/helperFunctions/stringUtility'
import Helmet from '../../components/layout/Helmet'
import ViewNotesModel from '../../components/utils/ViewNotesModel'


const Home = () => {
  const [pubNotes, setPubNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  useEffect(() => {
    const fetchPublishedNotes = async() => {
      setLoading(true)
      try {
        const res = await publishedNotes();
        // console.log(res)
        setPubNotes(res)
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
    fetchPublishedNotes()
  }, [toast])

  return (
  <Helmet title={"Home"}>
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
    {pubNotes.length === 0 && !loading && <Box w="100%" bg="purple" p={5} mt={5} color="white" textAlign="center" fontWeight="bold">Notes Not Found</Box>}
    <SimpleGrid p={5} spacing={4} className='card__items' templateColumns={['repeat(auto-fit, minmax(100%, 1fr))', 'repeat(auto-fit, minmax(350px, 1fr))']}>
      {pubNotes && 
        pubNotes.map((notes) => (
          <Card key={notes.id} boxShadow="outline" maxW="350px" m="auto">
              <CardHeader pb={1}>
                <Heading size="md">{maxLetters(notes.title, 50)}</Heading>
              </CardHeader>
              <CardBody py={0}>
                <Text>{maxLetters(notes.description, 100)}</Text>
              </CardBody>
              <CardFooter >
                <ViewNotesModel notes={notes}>
                  <Button bg="purple" color="white" colorScheme='purple'>
                    View More
                  </Button>
                </ViewNotesModel>
              </CardFooter>
            </Card>
        ))}
    </SimpleGrid>
  </Helmet>

  )
} 

export default Home