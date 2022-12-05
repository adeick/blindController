import Head from 'next/head'
import Link from 'next/link'

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
    List,
    ListItem,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';


import { ArrowForwardIcon } from '@chakra-ui/icons'
import { FaMoon, FaCloudSun, FaCloud, FaSun } from 'react-icons/fa';

import BlindSlider from '../components/BlindSlider'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBlinds } from '../store/blinds/action';

//import { updateBlinds, deleteBlinds } from "/store/blinds/action";



// const useAdmin = () => {
//     const tlaBlinds = useSelector((state) => state.blinds);
//     return { tlaBlinds };
// }

const Admin = () => {
    //     const { tlaBlinds } = useAdmin();
    const dispatch = useDispatch();

    const { colorMode, toggleColorMode } = useColorMode();
    const [windowSize, setWindowSize] = useState(0);
    const [adminList, setAdminList] = useState([]);
    const [activeBlindList, setActiveBlindList] = useState([]);
    const [browserBlinds, setBrowserBlinds] = useState([
        {
            "blindsId": -1,
            "blindsIP": "sddec22-11-1.ece.iastate.edu",
            "blindsPos": -1
        },
        {
            "blindsId": -1,
            "blindsIP": "sddec22-11-2.ece.iastate.edu",
            "blindsPos": -1
        },
        {
            "blindsId": -1,
            "blindsIP": "sddec22-11-3.ece.iastate.edu",
            "blindsPos": -1
        },
        {
            "blindsId": -1,
            "blindsIP": "sddec22-11-4.ece.iastate.edu",
            "blindsPos": -1
        },
        {
            "blindsId": -1,
            "blindsIP": "sddec22-11-5.ece.iastate.edu",
            "blindsPos": -1
        },
        {
            "blindsId": -1,
            "blindsIP": "sddec22-11-6.ece.iastate.edu",
            "blindsPos": -1
        },
        {
            "blindsId": -1,
            "blindsIP": "sddec22-11-7.ece.iastate.edu",
            "blindsPos": -1
        },
        {
            "blindsId": -1,
            "blindsIP": "sddec22-11-8.ece.iastate.edu",
            "blindsPos": -1
        },
        {
            "blindsId": -1,
            "blindsIP": "sddec22-11-9.ece.iastate.edu",
            "blindsPos": -1
        },
        {
            "blindsId": -1,
            "blindsIP": "sddec22-11-10.ece.iastate.edu",
            "blindsPos": -1
        },
        {
            "blindsId": -1,
            "blindsIP": "sddec22-11-11.ece.iastate.edu",
            "blindsPos": -1
        },
        {
            "blindsId": -1,
            "blindsIP": "sddec22-11-12.ece.iastate.edu",
            "blindsPos": -1
        },
        {
            "blindsId": -1,
            "blindsIP": "sddec22-11-13.ece.iastate.edu",
            "blindsPos": -1
        },
        {
            "blindsId": -1,
            "blindsIP": "sddec22-11-14.ece.iastate.edu",
            "blindsPos": -1
        },
        {
            "blindsId": -1,
            "blindsIP": "sddec22-11-15.ece.iastate.edu",
            "blindsPos": -1
        }]);
    const [IPListJSX, setIPListJSX] = useState([]);
    // const [blindSelected, setBlindSelected] = useState(0);
    const { data: session } = useSession();

    let addFlag = false;
    let deleteFlag = false;

    useEffect(() => {
        getAdmin();
        getBlinds();
    }, []);

    useEffect(() => {
        setWindowSize(window.outerWidth);
        let resize = function () { setWindowSize(window.outerWidth) };
        window.addEventListener('resize', resize, false);
        return (() => {
            window.removeEventListener('resize', resize, false);
        });
    }, [windowSize]);



    const getAdmin = () => {
        // GET request using fetch inside useEffect React hook
        fetch('http://sddec22-11.ece.iastate.edu:8080/getAdmins')
            .then(response => response.json())
            .then(data => setAdminList(data));
    }

    useEffect(() => {
        setIPListJSX(activeBlindList.map((blind, elementId) => {
            return <ListItem
                key={"blindsIP" + elementId}                // Just delete the last one
                textColor="white"
            >{blind.blindsIP}
            </ListItem>;
        }))
    }, [activeBlindList]);

    useEffect(() => {
    }, [browserBlinds]);


    const addBlinds = () => {
        addFlag = true;
        getBlinds();
    }

    const deleteBlinds = () => {
        deleteFlag = true;
        getBlinds();
    }

    const getBlinds = () => {
        fetch('http://sddec22-11.ece.iastate.edu:8080/blinds')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setActiveBlindList(data.filter((blind) => {
                    return blind.blindsIP.match(/sddec22-11-[1-9][0-5]?.ece.iastate.edu/);
                }));

                setBrowserBlinds(browserBlinds.map((blind) => {
                    const blindBeingUpdated = data.find(temp => temp.blindsIP == blind.blindsIP);
                    if (blindBeingUpdated) {
                        return blindBeingUpdated;
                    }
                    else {
                        return {
                            blindsId: -1,
                            blindsIP: blind.blindsIP,
                            blindsPos: -1
                        }
                    }
                }));
                // console.log("addFlag" + addFlag);
                if (addFlag) {
                    addFlag = false;
                    const newBlindIP = "sddec22-11-" + (data.length + 1) + ".ece.iastate.edu";

                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ "blindsIP": newBlindIP })
                    };
                    fetch('http://sddec22-11.ece.iastate.edu:8080/addBlind', requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            setActiveBlindList([...activeBlindList, data]);
                        });
                }
                if (deleteFlag) {
                    deleteFlag = false;
                    const fetchString = "http://sddec22-11.ece.iastate.edu:8080/blinds/" + (data[data.length - 1].blindsId);

                    const requestOptions = {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ "blindsIP": data[data.length - 1].blindsIP })
                    };
                    fetch(fetchString, requestOptions)
                        .then(response => setActiveBlindList(activeBlindList.slice(0, -1)));
                }
            });
    }

    const phone = windowSize < 768; //number should be adjusted

    let adminStack;
    if (session && adminList.find(element => element.adminEmail == session.user.email)) {
        adminStack =
            <Box bg="gray.600" p="40px" borderRadius={15}>
                <Stack direction={["column", "row"]} spacing="60px" h="100%">
                    <VStack h="100%" justifyContent="center" spacing="40px">
                        <Button size="lg"
                            bg="green.500" _hover={{ bg: "green.400" }} _active={{ bg: "green.300" }}
                            rightIcon={<Icon as={ArrowForwardIcon} color="black" />}
                            as="a"
                            w="170px"
                            onClick={addBlinds}
                        >
                            <Text color="black">
                                Add Blind
                            </Text>
                        </Button>
                        <Button size="lg"
                            bg="red.500" _hover={{ bg: "red.400" }} _active={{ bg: "red.300" }}
                            rightIcon={<Icon as={ArrowForwardIcon} color="black" />}
                            as="a"
                            w="170px"
                            onClick={deleteBlinds}
                        >
                            <Text color="black">
                                Delete Blind
                            </Text>
                        </Button>
                        <Link href="../locations/coover/tla">
                            <Button size="lg"
                                bg={useColorModeValue("orange.300", "orange.400")} _hover={{ bg: useColorModeValue("orange.400", "orange.300") }} _active={{ bg: useColorModeValue("orange.500", "orange.200") }}
                                rightIcon={<Icon as={ArrowForwardIcon} color="black" />}
                                as="a"
                                w="170px"
                            >
                                <Text color="black">
                                    Go to TLA
                                </Text>
                            </Button>
                        </Link>
                    </VStack>
                    <Flex bg="black" h="500px" w="380px" p="30px" borderRadius={15}>
                        <List spacing={3} h="100%">
                            {IPListJSX}
                        </List>
                    </Flex>
                </Stack >
            </Box>;

    }
    else {
        adminStack =
            <Stack direction={["column", "row"]} spacing="20px">
                <Button size="lg"
                    bg={useColorModeValue("orange.300", "orange.400")} _hover={{ bg: useColorModeValue("orange.400", "orange.300") }} _active={{ bg: useColorModeValue("orange.500", "orange.200") }}
                    rightIcon={<Icon as={ArrowForwardIcon} color="black" />}
                    onClick={() => signIn()}
                >
                    <Text color="black">
                        Log In
                    </Text>
                </Button>

                <Link href="../demo">
                    <Button size="lg" as="a">
                        <Text>
                            Try a Demo
                        </Text>
                    </Button>
                </Link>
            </Stack>
    }


    return (
        <div id="Home">
            <NavBar page="Admin" />
            {/* TODO */}
            <Flex bgGradient={useColorModeValue('linear-gradient(to-t, orange.300 0%, orange.200 33%, blue.100 83%, blue.200 100%)',
                'linear-gradient(to-t, orange.900 0%, #4d1215 33%, gray.900 83%, #0c0d12 100%)')}
                h="150vh" w="100%" pt="5vh" direction="column" alignItems="center" mt="6vh">
                <Text as="b" fontSize={["32px", "32px", "48px", "64px"]} align="center" maxWidth={["85vw", "55vw"]}
                    mb={phone ? "1vh" : "6vh"}>
                    <Text as="b" color={useColorModeValue("orange.400", "orange.300")}>ISU Blind Controller</Text> <br />Admin Settings
                </Text>

                {/* <Text fontSize={["16px", "16px", "20px", "28px"]} align="center" maxWidth={["90vw", "55vw"]} mb="50px">
                    The ISU Blind Controller is a project designed to minimize
                    glare from the sun while maximizing productivity. We are retrofitting blinds in the
                    TLA with motor controllers to allow for easy and accessible control of the shades.
                </Text> */}
                {/* The shadiest Senior Design Project yet! */}

                {adminStack}

                <Spacer />
                <Footer />
            </Flex >
        </div >
    )
};

export default Admin;
