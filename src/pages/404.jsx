import React from 'react'
import {
    Box,
    Button,
    Heading,
    Icon,
    Image,
    Stack,
    Text,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { MdHome } from 'react-icons/md'

function NotFound() {
    return (
        <Box height='100vh' width='100%' overflow='hidden'>
            <Box
                as={Stack}
                height='100%'
                alignItems='center'
                justifyContent='center'
                direction='column'>
                <Box width='100%' height='40vh' my='2rem'>
                    <Image
                        src='/images/notfound.svg'
                        width='100%'
                        height='100%'
                        objectFit='contain'
                    />
                </Box>
                <Heading size='4xl' as='h1' my='1rem'>
                    404 | Not found
                </Heading>
                <Text my='2rem' fontSize='1.2rem'>
                    The resource you are looking for doesn't exist
                </Text>
                <Button
                    as={Link}
                    to='/'
                    bg='cyan.500'
                    height='3.5rem'
                    borderRadius='10px'
                    _hover={{ bg: 'cyan.600' }}
                    _focus={{ outline: 'none' }}
                    color='#fff'>
                    <Icon as={MdHome} fontSize='1.8rem' mr='.5rem' />
                    <Text fontSize='1.3rem' fontWeight='500'>
                        Go back home &rarr;
                    </Text>
                </Button>
            </Box>
        </Box>
    )
}

export default NotFound
