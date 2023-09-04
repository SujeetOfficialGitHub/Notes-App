import React from 'react'
import { Box } from '@chakra-ui/react'

const Helmet = ({children}) => {
  return (
    <Box display="grid"  maxW="1800px" mx="auto">
        {children}
    </Box>
  )
}

export default Helmet