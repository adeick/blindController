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
    HStack,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { FaMoon, FaCloudSun, FaCloud, FaSun } from 'react-icons/fa';
import { ArrowForwardIcon } from '@chakra-ui/icons';


import BlindSlider from '/components/BlindSlider';
import NavBar from '/components/NavBar';
import Footer from '/components/Footer';
import mapboxgl from 'mapbox-gl';

import { useSelector, useDispatch } from 'react-redux';
import { updateBlinds } from "/store/blinds/action";

import { signIn, signOut, useSession } from 'next-auth/react'


const useTLA = () => {
    const tlaBlinds = useSelector((state) => state.blinds.tlaBlinds);
    return { tlaBlinds };
}

const TLA = () => {
    const { tlaBlinds } = useTLA();
    //const initialState = [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60];
    //const { tlaBlinds, setTlaBlinds } = useState(initialState);
    const dispatch = useDispatch();
    const { data: session } = useSession();

    const { colorMode, toggleColorMode } = useColorMode();
    const [windowSize, setWindowSize] = useState(0);
    const [updated, setUpdated] = useState(false);
    const [preset, setPreset] = useState(0);
    //0 is manual, 1 is closed, 2 is dim, 3 is open

    const [closedConfirmation, setClosedConfirmation] = useState(false);
    const [dimConfirmation, setDimConfirmation] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);

    const [manualBlinds, setManualBlinds] = useState([...tlaBlinds]);

    const sliderUpdated = (value, id) => {
        setManualBlinds([...manualBlinds.slice(0, id), value, ...manualBlinds.slice(id + 1)]);
    }

    const [inTla, setInTla] = useState(false);
    //0 is manual, 1 is closed, 2 is dim, 3 is open


    mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

    //const southWest = new mapboxgl.LngLat(-94, 42); //testing at towers
    //const northEast = new mapboxgl.LngLat(-93, 43);
    //const southWest = new mapboxgl.LngLat(-93.654345, 42.022847); //just on campus
    //const northEast = new mapboxgl.LngLat(-93.633316, 42.030215);
    const southWest = new mapboxgl.LngLat(-93.652080, 42.028100); //for tla
    const northEast = new mapboxgl.LngLat(-93.650080, 42.028900);

    const bounds = new mapboxgl.LngLatBounds(southWest, northEast); //set bounds 

    function checkPos(position) {
        const { latitude, longitude } = position.coords;
        const inTla = bounds.contains([longitude, latitude]);
        setInTla(inTla);
        if (inTla) {
            console.log("in tla");
        }
        else {
            console.log("not in tla");
        }
    }

    navigator.geolocation.watchPosition(checkPos); //continuosly check user position


    useEffect(() => {
        setWindowSize(window.outerWidth);
        let resize = function () { setWindowSize(window.outerWidth) };
        window.addEventListener('resize', resize, false);
        return (() => {
            window.removeEventListener('resize', resize, false);
        });
    }, [windowSize]);

    useEffect(() => {
        setUpdated(updated);
    }, [updated]);

    useEffect(() => {
        setClosedConfirmation(false);
        setDimConfirmation(false);
        setOpenConfirmation(false);
        for (let i = 0; i < 15; i++) {
            if (manualBlinds[i] != tlaBlinds[i]) {
                setUpdated(true);
                return;
            }
        }
        setUpdated(false);
    }, [manualBlinds]);

    useEffect(() => {
        getChanges();
    }, []);

    const applyChanges = (blindArray) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blindArray)
        };
        // fetch('https://reqres.in/api/posts', requestOptions) //TODO
        //     .then(response => response.json());

        // fetch('http://sddec22-11.ece.iastate.edu:8080/blinds') //Un-comment THIS one
        //     .then(response => response.json())
        //     .then(data => dispatch(updateBlinds((data.total)))); //This will be post request not GET request
        // console.log("HERE!");
        //dispatch(updateBlinds(blindArray)); //comment this
        getChanges();
    }

    const getChanges = () => {
        // GET request using fetch inside useEffect React hook
        // fetch('http://sddec22-11.ece.iastate.edu:8080/blinds')
        //     .then(response => response.json())
        //     .then(data => dispatch(updateBlinds((data.total)))); //TODO
    }

    const rowColumn = useBreakpointValue({ base: 'row', md: 'column' });
    const smallMedium = useBreakpointValue({ base: 'sm', md: 'md' });

    const phone = windowSize < 768; //number should be adjusted
    let lastSpacer = phone ? <></> : <Spacer />;

    return (
        <>
            {session && session.user.email.endsWith("@iastate.edu") && (
                <div id="Demo">
                    <NavBar page="Transformative Learning Area (TLA)" shortPage="TLA" />
                    <Flex bgGradient={useColorModeValue('linear-gradient(to-t, orange.300 0%, orange.200 33%, blue.100 83%, blue.200 100%)',
                        'linear-gradient(to-t, orange.900 0%, #4d1215 33%, gray.900 83%, #0c0d12 100%)')}
                        h={phone ? "170vh" : "130vh"} w="100%" mt="6vh" pt="5vh">
                        <VStack spacing="5vh" w="100%">
                            <Flex bg={preset == 0 ? 'orange.200' : 'orange.300'} h="25vh" w="80vw" py="3vh" pr="80px" pl="30px" borderRadius="15px" direction={rowColumn}>
                                <Text color="black" as="b" mb={phone ? "1vh" : "6vh"} position="absolute">
                                    Presets
                                </Text>
                                <Stack direction={['column', 'row']} w="100%" h="100%" alignItems='flex-end'>
                                    <Spacer />
                                    <Button my="5px" w="110px" variant="solid" size={smallMedium}
                                        bg="gray.900" _hover={{ bg: "gray.700" }} _active={{ bg: "gray.800" }} leftIcon={<Icon as={FaMoon} color="yellow.200" />}
                                        disabled={preset == 1}
                                        onClick={() => {
                                            if (closedConfirmation) {
                                                setPreset(1);
                                                dispatch(updateBlinds([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]));
                                                applyChanges([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
                                                setManualBlinds([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
                                                setClosedConfirmation(false);
                                            }
                                            else {
                                                setClosedConfirmation(true);
                                                setDimConfirmation(false);
                                                setOpenConfirmation(false);
                                            }
                                        }}
                                    >
                                        <Text color="white">
                                            {closedConfirmation ? "Confirm?" : "All Closed"}
                                        </Text>
                                    </Button>
                                    <Spacer />
                                    <Button my="5px" w="110px" variant="solid" size={smallMedium}
                                        bg="gray.600" _hover={{ bg: "gray.500" }} _active={{ bg: "gray.400" }} leftIcon={<Icon as={FaCloud} color="gray.300" />}
                                        disabled={preset == 2}
                                        onClick={() => {
                                            if (dimConfirmation) {
                                                setPreset(2)
                                                dispatch(updateBlinds([40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40]));
                                                applyChanges([40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40]);
                                                setManualBlinds([40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40]);
                                                setDimConfirmation(false);
                                            }
                                            else {
                                                setClosedConfirmation(false);
                                                setDimConfirmation(true);
                                                setOpenConfirmation(false);
                                            }
                                        }}>
                                        <Text color="white">
                                            {dimConfirmation ? "Confirm?" : "All Dim"}
                                        </Text>
                                    </Button>
                                    <Spacer />
                                    <Button my="5px" w="110px" variant="solid" size={smallMedium}
                                        bg="gray.50" _hover={{ bg: "gray.200" }} _active={{ bg: "gray.100" }} leftIcon={<Icon as={FaSun} color="yellow.500" />}
                                        disabled={preset == 3}
                                        onClick={() => {
                                            if (openConfirmation) {
                                                setPreset(3)
                                                dispatch(updateBlinds([60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60,]));
                                                applyChanges([60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60]);
                                                setManualBlinds([60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60]);
                                                setOpenConfirmation(false);
                                            }
                                            else {
                                                setClosedConfirmation(false);
                                                setDimConfirmation(false);
                                                setOpenConfirmation(true);
                                            }
                                        }}>
                                        <Text color="black">
                                            {openConfirmation ? "Confirm?" : "All Open"}
                                        </Text>
                                    </Button>
                                    <Spacer />
                                </Stack>
                            </Flex>
                            <Flex bg={preset == 0 ? 'orange.300' : 'orange.200'} direction="column" h={phone ? "120vh" : "50vh"} w="80vw" borderRadius="15px">
                                <Text pl="30px" py="3vh" color="black" as="b" position="absolute">
                                    Manual
                                </Text>
                                <Flex w="100%" h="100%" pt="8%"
                                    direction={phone ? "column" : "row"}
                                    alignItems="center" pb="30px">
                                    <Spacer />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} value={tlaBlinds[0]} id={0} />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} value={tlaBlinds[1]} id={1} />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} value={tlaBlinds[2]} id={2} /><Spacer />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} value={tlaBlinds[3]} id={3} />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} value={tlaBlinds[4]} id={4} />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} value={tlaBlinds[5]} id={5} />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} value={tlaBlinds[6]} id={6} />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} value={tlaBlinds[7]} id={7} /><Spacer />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} value={tlaBlinds[8]} id={8} />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} value={tlaBlinds[9]} id={9} />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} value={tlaBlinds[10]} id={10} />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} value={tlaBlinds[11]} id={11} />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} value={tlaBlinds[12]} id={12} /><Spacer />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} value={tlaBlinds[13]} id={13} />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} value={tlaBlinds[14]} id={14} />
                                    {lastSpacer}
                                </Flex>
                                <Button alignSelf="flex-end" right="30px" bottom="15px" my="5px" w="80px" h="40px" variant="solid" title={inTla ? "" : "Must be in TLA"}
                                    bg="orange.400" _hover={{ bg: "orange.500" }} _active={{ bg: "orange.600" }} disabled={!updated || !inTla}
                                    /* leftIcon={<Icon as={FaSun} color="yellow.500" />} */
                                    onClick={() => {
                                        setUpdated(false);
                                        setPreset(0);
                                        dispatch(updateBlinds(manualBlinds));
                                        applyChanges(manualBlinds);
                                        setClosedConfirmation(false);
                                        setDimConfirmation(false);
                                        setOpenConfirmation(false);
                                    }}
                                >
                                    <Text color="black">
                                        Apply
                                    </Text>
                                </Button>
                            </Flex>
                        </VStack>
                        <Spacer />
                        <Footer />
                    </Flex >
                </div >
            )}
            {!(session && session.user.email.endsWith("@iastate.edu")) && (
                <>
                    <NavBar page="Transformative Learning Area (TLA)" shortPage="TLA" />
                    <Flex bgGradient={useColorModeValue('linear-gradient(to-t, orange.300 0%, orange.200 33%, blue.100 83%, blue.200 100%)',
                        'linear-gradient(to-t, orange.900 0%, #4d1215 33%, gray.900 83%, #0c0d12 100%)')}
                        h={phone ? "170vh" : "130vh"} w="100%" mt="6vh" pt="5vh">
                        <VStack spacing="5vh" w="100%">
                            <Text fontSize={["16px", "16px", "20px", "28px"]} align="center" maxWidth={["70vw", "35vw"]} mt="20vh" mb="50px">
                                Looks like you aren't signed in. You need to login with Iowa State account to control the blinds!
                                {/* The shadiest Senior Design Project yet! */}
                            </Text>
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

                                <Link href="/demo">
                                    <Button size="lg" as="a">
                                        <Text>
                                            Try a Demo
                                        </Text>
                                    </Button>
                                </Link>
                            </Stack>
                        </VStack>
                        <Spacer />
                        <Footer />
                    </Flex >
                </>
            )}
        </>
    )
};

export default TLA;
