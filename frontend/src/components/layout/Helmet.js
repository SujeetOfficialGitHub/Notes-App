import React from 'react'
import { Box } from '@chakra-ui/react'

const Helmet = ({children, title}) => {
    document.title = title
  return (
    <Box display="grid"  maxW="1800px" mx="auto" pos="relative">
        {children}
    </Box>
  )
}

export default Helmet