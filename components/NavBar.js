import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

import {
    Flex,
    Text,
    Image,
    Button,
    IconButton,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    useColorMode,
    useColorModeValue,
    useBreakpointValue,
    Spacer
} from '@chakra-ui/react'

import { MdGraphicEq } from 'react-icons/md';
import { SunIcon, MoonIcon, ChevronRightIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react';


const NavBar = (props) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [windowSize, setWindowSize] = useState(0);

    useEffect(() => {
        setWindowSize(window.outerWidth);
        let resize = function () { setWindowSize(window.outerWidth) };
        window.addEventListener('resize', resize, false);
        return (() => {
            window.removeEventListener('resize', resize, false);
        });
    }, [windowSize]);

    const phone = windowSize < 768; //number should be adjusted

    const { data: session } = useSession();

    let button;
    let profileImage = <></>;
    let profileName = <></>;

    if (session) {
        profileImage = <Image borderRadius='full' boxSize="35px" src={session.user.image} alt={session.user.name} />;
        button =
            <Button ml="20px" mr="10%" h="45px" onClick={() => signOut()}>
                <Text>
                    Log Out
                </Text>
            </Button>;
    } else {
        button =
            <Button mr="10%" h="45px"
                onClick={() => signIn()}>
                <Text>
                    Login
                </Text>
            </Button>
    }

    return (
        <Flex bg={useColorModeValue("gray.300", "gray.800")} h="60px" w="100%"
            alignItems="center" px="30px" position="fixed" top="0" zIndex="2">
            <IconButton size="md" mr="30px" aria-label='Color Mode' icon={useColorModeValue(<MoonIcon />, <SunIcon />)} onClick={toggleColorMode} />
            <Spacer />
            {/* <Image borderRadius='full' boxSize="45px" src="https://bit.ly/dan-abramov" alt={profileName} />;*/}
            {profileImage}
            {button}
        </Flex>
    )
};

export default NavBar;
