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
  Tooltip,
  Button,
  useMediaQuery
} from '@chakra-ui/react'
import { maxLetters } from '../../components/helperFunctions/stringUtility'
import Helmet from '../../components/layout/Helmet'
import {AiOutlineEye, AiOutlinePlus} from 'react-icons/ai'
import {FaRegEdit, FaTrash} from 'react-icons/fa'
import {TiLockClosedOutline, TiLockOpenOutline} from 'react-icons/ti'
import { deleteNotes, getNotes } from '../../api/privateNotesApi'
import AddUpdateNotesModels from '../../components/utils/AddUpdateNotesModels'
import {NotesState} from '../../context'

const MyNotes = () => {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [publish, setPublish] = useState(false)
  const [notesId, setNotesId] = useState(0)

  const [isLessThan500] = useMediaQuery("(max-width: 500px)")
  
  const toast = useToast()
  const {myNotes, setMyNotes} = NotesState()

  const handleDeleteNotes = async(nodeId) => {
    try {
      const res = await deleteNotes(nodeId)
      // console.log(res)
      toast({
        title: "Success",
        description: 'Notes deleted successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
      setMyNotes(myNotes.filter(note => note.id !== res.id))
    } catch (error) {
      toast({
        title: "Error Occured",
        description: 'Failed to delete notes',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  useEffect(() => {
    const fetchNotes = async() => {
      setLoading(true)
      try {
        const res = await getNotes();
        // console.log(res)
        setMyNotes(res)
        setLoading(false)
      } catch (error) {
        // console.log(error)
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
  }, [toast, setMyNotes])

  const handlePopulateData = (notes) => {
    setNotesId(notes.id)
    setTitle(notes.title)
    setCategory(notes.category)
    setDescription(notes.description)
    setPublish(notes.is_published)
  }

  return (
  <Helmet title={"My Notes"}>
    <Heading textAlign="center" my={2}>My Notes</Heading>
    <AddUpdateNotesModels 
      title={title} 
      setTitle={setTitle} 
      category={category} 
      setCategory={setCategory} 
      description={description} 
      setDescription={setDescription}
      publish={publish}
      setPublish={setPublish} 
      >
        <Button 
        pos={isLessThan500 ? 'relative' : 'absolute'}
        right={isLessThan500 ? '' : 5}
        top={3}
        display="flex"
        m="auto"
        bg="purple"
        colorScheme='purple'
        ><AiOutlinePlus /> Add Notes</Button>
    </AddUpdateNotesModels>

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
    {myNotes && myNotes.length === 0 && !loading && <Box w="100%" bg="purple" p={5} mt={5} color="white" textAlign="center" fontWeight="bold">Notes Not Found</Box>}
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

                <AddUpdateNotesModels
                  title={title} 
                  setTitle={setTitle} 
                  category={category} 
                  setCategory={setCategory} 
                  description={description} 
                  setDescription={setDescription}
                  publish={publish}
                  setPublish={setPublish} 
                  notesId={notesId}
                  setNotesId={setNotesId}
                >
                  <Tooltip hasArrow label="Click to Edit Note">
                    <IconButton onClick={() => handlePopulateData(notes)} icon={<FaRegEdit fontSize="20px" />} bg="yellow.600" color="white" colorScheme='yellow' />
                  </Tooltip>
                </AddUpdateNotesModels>

                <Tooltip hasArrow label="Click to Delete Note">
                  <IconButton onClick={() => handleDeleteNotes(notes.id)} icon={<FaTrash fontSize="20px" />} bg="red.600" color="white" colorScheme='red' />
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