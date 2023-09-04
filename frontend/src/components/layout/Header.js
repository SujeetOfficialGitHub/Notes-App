import React from 'react';
import { 
    Box, 
    Flex, 
    Heading, 
    VStack, 
    HStack, 
    IconButton, 
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button, 
} from "@chakra-ui/react";

import {GiHamburgerMenu} from 'react-icons/gi'
// import {AiOutlineClose} from 'react-icons/ai'
import {NavLink} from 'react-router-dom'
import { NotesState } from '../../context';


function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { handleLogout, isLoggedIn } = NotesState();

  return (
    <Box bg="purple" px={4}>
      <Flex 
      maxW="1800px" 
      mx="auto"
      h={16} 
      alignItems="center" 
      justifyContent="space-between"
      >
        <Heading size="lg" color="white">Notes App</Heading>

        <IconButton  
            display={{ base: "block", md: "none" }}
            colorScheme='purple' 
            onClick={onOpen} 
            icon={<GiHamburgerMenu style={{width: "100%", fontSize: '30px'}}/>} 
        />
        

        {/* Desktop navigation links  */}
        <HStack spacing={5} display={{base: 'none', md: "flex"}}>
            <NavLink to="/" className="desktop__nav-link">Home</NavLink>
            {isLoggedIn ? (<>
                <NavLink to="/profile" className="desktop__nav-link">Profile</NavLink>
                <NavLink to="/my-notes" className="desktop__nav-link">My Notes</NavLink>
                <NavLink to="/about" className="desktop__nav-link">About</NavLink>
                <NavLink to="/contact" className="desktop__nav-link">Contact</NavLink>
                <Button onClick={() => handleLogout()}>Logout</Button>
                </> ) : (<>
                    <NavLink to="/login" className="desktop__nav-link">Login / Sign Up</NavLink>
                </>)}
        </HStack>
      </Flex>

      {/* Mobile navigation links  */}
      <Drawer 
        display={{ base: isOpen ? "flex" : "none", md: "none" }}
        placement="right" 
        onClose={onClose} 
        isOpen={isOpen} 
        >
        <DrawerOverlay />
        <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>Notes App</DrawerHeader>
            <DrawerBody>
                <VStack spacing={5}>
                    <NavLink to="/" className="mobile__nav-link">Home</NavLink>
                {isLoggedIn ? (<>
                    <NavLink to="/profile" className="mobile__nav-link">Profile</NavLink>
                    <NavLink to="/my-notes" className="mobile__nav-link">My Notes</NavLink>
                    <NavLink to="/about" className="mobile__nav-link">About</NavLink>
                    <NavLink to="/contact" className="mobile__nav-link">Contact</NavLink>
                    <Button onClick={() => handleLogout()}>Logout</Button>
                </>) : (<>
                    <NavLink to="/login" className="mobile__nav-link">Login / Sign Up</NavLink>
                </>)}
                </VStack>
            </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}


export default Header;
