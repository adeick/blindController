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
    HStack,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { FaMoon, FaCloudSun, FaCloud, FaSun } from 'react-icons/fa';

import BlindSlider from '../components/BlindSlider';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import mapboxgl from 'mapbox-gl';

const Demo = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [windowSize, setWindowSize] = useState(0);
    const [updated, setUpdated] = useState(false);
    const [count, setCount] = useState(0);
    const [preset, setPreset] = useState(0);
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
        count++
        setUpdated(updated);
        setCount(count);
        // console.log("UseEffect");

    }, [updated]);

    const rowColumn = useBreakpointValue({ base: 'row', md: 'column' });
    const smallMedium = useBreakpointValue({ base: 'sm', md: 'md' });

    const phone = windowSize < 768; //number should be adjusted
    let lastSpacer = phone ? <></> : <Spacer />;

    return (
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
                                onClick={() => setPreset(1)}
                            >
                                <Text color="white">
                                    All Closed
                                </Text>
                            </Button>
                            <Spacer />
                            <Button my="5px" w="110px" variant="solid" size={smallMedium}
                                bg="gray.600" _hover={{ bg: "gray.500" }} _active={{ bg: "gray.400" }} leftIcon={<Icon as={FaCloud} color="gray.300" />}
                                disabled={preset == 2}
                                onClick={() => setPreset(2)}>
                                <Text color="white">
                                    All Dim
                                </Text>
                            </Button>
                            <Spacer />
                            <Button my="5px" w="110px" variant="solid" size={smallMedium}
                                bg="gray.50" _hover={{ bg: "gray.200" }} _active={{ bg: "gray.100" }} leftIcon={<Icon as={FaSun} color="yellow.500" />}
                                disabled={preset == 3}
                                onClick={() => setPreset(3)}>
                                <Text color="black">
                                    All Open
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
                            <BlindSlider phone={phone} updateVar={setUpdated} />
                            <BlindSlider phone={phone} updateVar={setUpdated} />
                            <BlindSlider phone={phone} updateVar={setUpdated} />
                            <Spacer />
                            <BlindSlider phone={phone} updateVar={setUpdated} />
                            <BlindSlider phone={phone} updateVar={setUpdated} />
                            <BlindSlider phone={phone} updateVar={setUpdated} />
                            <Spacer />
                            <BlindSlider phone={phone} updateVar={setUpdated} />
                            <BlindSlider phone={phone} updateVar={setUpdated} />
                            <BlindSlider phone={phone} updateVar={setUpdated} />
                            <Spacer />
                            <BlindSlider phone={phone} updateVar={setUpdated} />
                            <BlindSlider phone={phone} updateVar={setUpdated} />
                            <BlindSlider phone={phone} updateVar={setUpdated} />
                            <Spacer />
                            <BlindSlider phone={phone} updateVar={setUpdated} />
                            <BlindSlider phone={phone} updateVar={setUpdated} />
                            <BlindSlider phone={phone} updateVar={setUpdated} />
                            {lastSpacer}
                        </Flex>
                        <Button alignSelf="flex-end" right="30px" bottom="15px" my="5px" w="80px" h="40px" variant="solid"
                            bg="orange.400" _hover={{ bg: "orange.500" }} _active={{ bg: "orange.600" }} disabled={!updated || !inTla}
                            /* leftIcon={<Icon as={FaSun} color="yellow.500" />} */
                            onClick={() => {
                                setUpdated(false);
                                setPreset(0);
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
    )
};

export default Demo;