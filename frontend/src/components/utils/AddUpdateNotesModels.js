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
    Checkbox
} from '@chakra-ui/react'
const AddUpdateNotesModels = (props) => {
  const {children, title, setTitle, category, setCategory, description, setDescription, setPublish, handleSubmit} = props;
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
    <span onClick={onOpen}>{children}</span>

    <Modal
      isOpen={isOpen}
      onClose={onClose}
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
          <Checkbox onChange={(e) => setPublish(e.target.checked)}>
                Publish
            </Checkbox>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleSubmit} colorScheme='blue' mr={3}>
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  )
}

export default AddUpdateNotesModels