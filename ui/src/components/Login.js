import {
    Box,
    Button,
    Stack,
    useColorModeValue,
    FormControl,
    FormLabel,
    Input,
    Heading,
    CloseButton,
  } from '@chakra-ui/react';

import { useState, useCallback } from 'react';

export default function LoginCard({ onLoginChange }) {
    const closeModal = useCallback(event => {
      onLoginChange(event.target.value)
    }, [onLoginChange])

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const usernameChangeHandler = (event) => {
        setUsername(event.target.value);
    };
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
    
        const body = {
          username,
          password
        };
    
        try {
          fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          });
          setUsername('');
          setPassword('');
        } catch (err) {
          console.error(err.message);
        }
        
      };
  
    return (
        <Stack  mx={'auto'} maxW={'lg'} px={6}>
          <Box 
            style={{ zIndex: "1" }}
            position={"absolute"}
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={70}>
              <CloseButton style={{float: 'right'}} onClick={closeModal}/>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'} paddingBottom={7}>Sign in</Heading>
            </Stack>
            <Stack spacing={4}>
                <FormControl id="username" isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input 
                        type="username" 
                        value={username}
                        onChange={usernameChangeHandler}
                    />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input 
                        type="password" 
                        value={password}
                        onChange={passwordChangeHandler}
                    />
                </FormControl>
                <Stack spacing={10}>
                    <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    </Stack>
                    <Button
                    onClick={submitHandler}
                    bg={'purple.400'}
                    color={'white'}
                    _hover={{
                        bg: 'purple.500',
                    }}>
                    Sign in
                    </Button>
                </Stack>
            </Stack>
          </Box>
        </Stack>
    );
  }