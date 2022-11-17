import Head from 'next/head'
import {
    Image,
    Box,
    Flex,
    Icon,
    IconButton,
    Button,
    ButtonGroup,
    Drawer,
    Text,
    useColorMode,
    useColorModeValue,
    VStack, Stack, Spacer,
    useBreakpointValue,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { useSession, signIn, signOut } from "next-auth/react";

import { ArrowForwardIcon } from '@chakra-ui/icons';
import { FaMoon, FaCloudSun, FaCloud, FaSun } from 'react-icons/fa';

import BlindSlider from '../components/BlindSlider'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';





const Login = () => {
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

    const { data: session } = useSession();

    const bgHeight = useBreakpointValue({ base: '144vh', md: '94vh' });
    const presetTextMargin = useBreakpointValue({ base: '1vh', md: "6vh" });
    const rowColumn = useBreakpointValue({ base: 'row', md: 'column' });
    const columnRow = useBreakpointValue({ base: 'column', md: 'row' });
    const smallMedium = useBreakpointValue({ base: 'sm', md: 'md' });
    const manualBoxHeight = useBreakpointValue({ base: '100vh', md: '50vh' });
    const trueFalse = useBreakpointValue({ base: true, md: false });

    const phone = windowSize < 768; //number should be adjusted
    if (session) {
        return (
            <div id="Home">

                <NavBar page="Authentication" login={true} />
                {/* TODO */}
                <Flex bgGradient={useColorModeValue('linear-gradient(to-t, orange.300 0%, orange.200 33%, blue.100 83%, blue.200 100%)',
                    'linear-gradient(to-t, orange.900 0%, #4d1215 33%, gray.900 83%, #0c0d12 100%)')}
                    h="150vh" w="100%" pt="15vh" direction="column" alignItems="center" mt="6vh">

                    Imagine being able to login
                    <div id="okta-login-container"></div>

                    <Spacer />
                    <Footer />
                </Flex >
            </div >
        )
    }
    else {
        return (
            <div id="Home">

                <NavBar page="Authentication" />
                {/* TODO */}
                <Flex bgGradient={useColorModeValue('linear-gradient(to-t, orange.300 0%, orange.200 33%, blue.100 83%, blue.200 100%)',
                    'linear-gradient(to-t, orange.900 0%, #4d1215 33%, gray.900 83%, #0c0d12 100%)')}
                    h="150vh" w="100%" pt="15vh" direction="column" alignItems="center" mt="6vh">
                    <Flex my="100px">
                        Not Logged in
                    </Flex>
                    <div id="okta-login-container">
                        <Button onClick={() => signIn()}>
                            Log in
                        </Button>
                    </div>
                    <Spacer />
                    <Button onClick={() => signIn()}>
                        Log in
                    </Button>
                    <Footer />
                </Flex >
            </div >
        )
    }
};

export default Login;
