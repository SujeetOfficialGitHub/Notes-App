import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormLabel,
    FormControl,
    Input,
    Textarea,
    Checkbox,
    useToast
} from '@chakra-ui/react'
import { addNotes, updateNotes } from '../../api/privateNotesApi';
import { NotesState } from '../../context';



const AddUpdateNotesModels = (props) => {
  const {children, title, setTitle, category, setCategory, description, setDescription, publish, setPublish, notesId, setNotesId} = props;
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {myNotes, setMyNotes} = NotesState()
  const toast = useToast()

  const handleModalClode = () => {
    setTitle('')
    setCategory('')
    setDescription('')
    setPublish(false)
    onClose()
  }

  const handleSubmit = async() => {
    if (!title || !category || !description){
      toast({
        title: "Warning",
        description: "You are missing required fields",
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "top-right"
      })
    }
    try {
      const inputData = {title, category, description, is_published: publish}
      const res = await addNotes(inputData)
      // console.log(res)
      setTitle('')
      setCategory('')
      setDescription('')
      setPublish(false)
      setMyNotes((prev) => [res, ...prev])
    } catch (error) {
      // console.log(error)
      toast({
        title: "Error Occured",
        // description: "You are missing required fields",
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "top-right"
      })
    }
  }
  const handleUpdateNote = async() => {
    try {
      const inputData = {title, category, description, is_published: publish}
      const res = await updateNotes(inputData, notesId)

      const updatedNotes = myNotes.map(note => {
        if (note.id === res.id){
          return res
        }else{
          return note
        }
      })
      setMyNotes(updatedNotes)
      setNotesId(0)
      handleModalClode()
    } catch (error) {
        console.log(error)
      toast({
        title: "Error Occured",
        description: "Failed to update notes",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "top-right"
      })
    }
  }


  return (
    <>
    <span onClick={onOpen}>{children}</span>

    <Modal
      isOpen={isOpen}
        onClose={handleModalClode}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Notes</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input  
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Enter title' 
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Input  
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder='Enter category' 
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Write your notes here'
                size='md'
            />
          </FormControl>
          <Checkbox onChange={(e) => setPublish(e.target.checked)} defaultChecked={publish ? true : false}>
                Publish
            </Checkbox>
        </ModalBody>

        <ModalFooter>
          {!notesId ? (
            <Button onClick={handleSubmit} colorScheme='purple' bg="purple" mr={3}>
                Add
            </Button>
          
          ) : (
            <Button onClick={handleUpdateNote} colorScheme='green' bg="green" mr={3}>
                Update
            </Button>
          
          )}
          <Button onClick={handleModalClode}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  )
}

export default AddUpdateNotesModels