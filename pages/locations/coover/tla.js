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
    useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { FaMoon, FaCloudSun, FaCloud, FaSun } from 'react-icons/fa';
import { ArrowForwardIcon } from '@chakra-ui/icons';


import BlindSlider from '/components/BlindSlider';
import NavBar from '/components/NavBar';
import Footer from '/components/Footer';
import mapboxgl from 'mapbox-gl';

import { useSelector, useDispatch } from 'react-redux';
// import { updateBlinds, deleteBlinds } from "/store/blinds/action";

import { signIn, signOut, useSession } from 'next-auth/react'


// const useTLA = () => {
//     const tlaBlinds = useSelector((state) => state.blinds);
//     console.log("TLA Blinds: ");
//     console.log(tlaBlinds);

//     return { tlaBlinds };
// }

const TLA = () => {
    // const { tlaBlinds } = useTLA();
    //const initialState = [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60];
    //const { tlaBlinds, setTlaBlinds } = useState(initialState);
    const dispatch = useDispatch();
    const { data: session } = useSession();

    const toast = useToast();

    const { colorMode, toggleColorMode } = useColorMode();
    const [windowSize, setWindowSize] = useState(0);
    const [preset, setPreset] = useState(0);
    //0 is manual, 1 is closed, 2 is dim, 3 is open

    const [closedConfirmation, setClosedConfirmation] = useState(false);
    const [dimConfirmation, setDimConfirmation] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);

    // const [manualBlinds, setManualBlinds] = useState(tlaBlinds.map(blind => {
    //     return blind.blindsPos;
    // }));

    const [changedBlinds, setChangedBlinds] = useState([
        // {
        //     blindsIP: "sddec22-11-2.ece.iastate.edu",
        //     blindsPos: 9
        // }
    ]);
    const [browserBlinds, setBrowserBlinds] = useState([
        {
            blindsId: -1,
            blindsIP: "sddec22-11-1.ece.iastate.edu",
            blindsPos: -1
        },
        {
            blindsId: -1,
            blindsIP: "sddec22-11-2.ece.iastate.edu",
            blindsPos: -1
        },
        {
            blindsId: -1,
            blindsIP: "sddec22-11-3.ece.iastate.edu",
            blindsPos: -1
        },
        {
            blindsId: -1,
            blindsIP: "sddec22-11-4.ece.iastate.edu",
            blindsPos: -1
        },
        {
            blindsId: -1,
            blindsIP: "sddec22-11-5.ece.iastate.edu",
            blindsPos: -1
        },
        {
            blindsId: -1,
            blindsIP: "sddec22-11-6.ece.iastate.edu",
            blindsPos: -1
        },
        {
            blindsId: -1,
            blindsIP: "sddec22-11-7.ece.iastate.edu",
            blindsPos: -1
        },
        {
            blindsId: -1,
            blindsIP: "sddec22-11-8.ece.iastate.edu",
            blindsPos: -1
        },
        {
            blindsId: -1,
            blindsIP: "sddec22-11-9.ece.iastate.edu",
            blindsPos: -1
        },
        {
            blindsId: -1,
            blindsIP: "sddec22-11-10.ece.iastate.edu",
            blindsPos: -1
        },
        {
            blindsId: -1,
            blindsIP: "sddec22-11-11.ece.iastate.edu",
            blindsPos: -1
        },
        {
            blindsId: -1,
            blindsIP: "sddec22-11-12.ece.iastate.edu",
            blindsPos: -1
        },
        {
            blindsId: -1,
            blindsIP: "sddec22-11-13.ece.iastate.edu",
            blindsPos: -1
        },
        {
            blindsId: -1,
            blindsIP: "sddec22-11-14.ece.iastate.edu",
            blindsPos: -1
        },
        {
            blindsId: -1,
            blindsIP: "sddec22-11-15.ece.iastate.edu",
            blindsPos: -1
        }]);

    //tlaBlinds: values from database and saved in redux
    //manualBlinds: array that interacts with sliders in browser

    //Alternatively,
    //browserBlinds: values to be updated from database (and includes -1 )

    useEffect(() => {
        getBlinds();
    }, []);

    useEffect(() => {
        console.log("Browser Blinds");
        console.log(browserBlinds);
    }, [browserBlinds]);

    useEffect(() => {
        console.log("Changed Blinds");
        console.log(changedBlinds);
    }, [changedBlinds]);


    const getBlinds = () => {
        fetch('https://sddec22-11.ece.iastate.edu/blinds')
            .then(response => response.json())
            .then(data => {
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
            });
    }

    const applyPreset = (value) => {
        setChangedBlinds([...(changedBlinds.map((blind) => {
            if (blind.blindsPos == value) {
                return null; //remove from changedBlinds map
            }
            else {
                //update the changed Blind 
                return {
                    blindsIP: blind.blindsIP,
                    blindsPos: value
                }
            }
        }).filter(element => {
            return element !== null;
        })),
        ...(browserBlinds.map((blind) => {
            if (blind.blindsPos == -1) {
                return null; //don't add to changedBlinds map
            }
            else if (blind.blindsPos == value) {
                return null; //don't add to changedBlinds map
            }
            else {
                //update the changed Blind 
                return {
                    blindsIP: blind.blindsIP,
                    blindsPos: value
                }
            }
        }).filter(element => {
            return element !== null;
        }))]);

    }

    const updateBlinds = () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ blinds: changedBlinds })
        };
        fetch('https://sddec22-11.ece.iastate.edu/blindsMove', requestOptions) //TODO
            .then(response => {
                if (response.status == 200) {
                    setChangedBlinds([]);
                    getBlinds();
                }
                else {
                    toast({
                        title: 'Error ' + response.status,
                        description: "Please try again",
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    })
                    getBlinds();
                }
            });
    }

    const sliderUpdated = (value, id) => {
        let found = false;

        //iterate thru changedBlinds to update
        setChangedBlinds(changedBlinds.map(changedBlind => {
            if (changedBlind.blindsIP == "sddec22-11-" + (id + 1) + ".ece.iastate.edu") {
                //Already in the changed list
                found = true;

                //But wait, did they change it back to match the original position?
                const revertedBlind = browserBlinds.find(browserBlind => browserBlind.blindsIP == changedBlind.blindsIP
                    && browserBlind.blindsPos == value);
                if (revertedBlind) {
                    //remove from changed
                    console.log("Removed from Changed list");
                    return null; //will be cleaned up by filter
                }
                else {
                    return {
                        blindsIP: changedBlind.blindsIP,
                        blindsPos: value
                    };
                }
            }
            return changedBlind;
        }).filter(element => {
            return element !== null;
        }
        ));

        if (found == false) {
            // Not found in changedBlinds list

            const newChangedBlind = {
                blindsIP: "sddec22-11-" + (id + 1) + ".ece.iastate.edu",
                blindsPos: value
            }

            const revertedBlind = browserBlinds.find(browserBlind => browserBlind.blindsIP == newChangedBlind.blindsIP
                && browserBlind.blindsPos == newChangedBlind.value);
            if (revertedBlind) {
                console.log("No action taken, slider was slid back to original position.");
            }
            else {
                console.log("Added to Changed List")
                setChangedBlinds([...changedBlinds, newChangedBlind]);
            }
        }



        //setManualBlinds([...manualBlinds.slice(0, id), value, ...manualBlinds.slice(id + 1)]);
    }

    const [inTla, setInTla] = useState(false);
    //0 is manual, 1 is closed, 2 is dim, 3 is open

    mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

    const southWest = new mapboxgl.LngLat(-93.652080, 42.028100); //for tla
    const northEast = new mapboxgl.LngLat(-93.650080, 42.028900);

    const bounds = new mapboxgl.LngLatBounds(southWest, northEast); //set bounds 

    function checkPos(position) {
        const { latitude, longitude } = position.coords;

        setInTla(true);//bounds.contains([longitude, latitude]));
        if (inTla) {
            console.log("in tla");
        }
        else {
            console.log("not in tla");
        }
    }

    navigator.geolocation.watchPosition(checkPos); //continuosly check user position

    const rowColumn = useBreakpointValue({ base: 'row', md: 'column' });
    const smallMedium = useBreakpointValue({ base: 'sm', md: 'md' });

    const phone = false; // windowSize < 768; //number should be adjusted
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
                            <Text as="b" fontSize={["32px", "32px", "48px", "64px"]} align="center" maxWidth={["85vw", "55vw"]}>
                                <Text as="b" color={useColorModeValue("orange.400", "orange.300")}>Twist </Text> the Blinds!
                            </Text>
                            <Flex bg={preset == 0 ? 'orange.200' : 'orange.300'} h="25vh" w="80vw" py="3vh" pr="80px" pl="30px" borderRadius="15px" direction={rowColumn}>
                                <Text color="black" as="b" mb={phone ? "1vh" : "6vh"} position="absolute">
                                    Presets
                                </Text>
                                <Stack direction={['column', 'row']} w="100%" h="100%" alignItems='flex-end'>
                                    <Spacer />
                                    <Button my="5px" w="110px" variant="solid" size={smallMedium}
                                        bg="gray.900" _hover={{ bg: "gray.700" }} _active={{ bg: "gray.800" }} leftIcon={<Icon as={FaMoon} color="yellow.200" />}
                                        disabled={!closedConfirmation && preset == 1}
                                        onClick={() => {
                                            if (closedConfirmation) {
                                                // dispatch(updateBlinds([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]));
                                                // applyChanges([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
                                                // setManualBlinds([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
                                                setClosedConfirmation(false);
                                                updateBlinds();
                                            }
                                            else {
                                                setClosedConfirmation(true);
                                                setDimConfirmation(false);
                                                setOpenConfirmation(false);
                                                applyPreset(1);
                                                setPreset(1);
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
                                        disabled={!dimConfirmation && preset == 2}
                                        onClick={() => {
                                            if (dimConfirmation) {

                                                // dispatch(updateBlinds([40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40]));
                                                // applyChanges([40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40]);
                                                // setManualBlinds([40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40]);
                                                setDimConfirmation(false);
                                                updateBlinds();
                                            }
                                            else {
                                                setClosedConfirmation(false);
                                                setDimConfirmation(true);
                                                setOpenConfirmation(false);
                                                applyPreset(4);
                                                setPreset(2);
                                            }
                                        }}>
                                        <Text color="white">
                                            {dimConfirmation ? "Confirm?" : "All Dim"}
                                        </Text>
                                    </Button>
                                    <Spacer />
                                    <Button my="5px" w="110px" variant="solid" size={smallMedium}
                                        bg="gray.50" _hover={{ bg: "gray.200" }} _active={{ bg: "gray.100" }} leftIcon={<Icon as={FaSun} color="yellow.500" />}
                                        disabled={!openConfirmation && preset == 3}
                                        onClick={() => {
                                            if (openConfirmation) {

                                                // dispatch(updateBlinds([60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60,]));
                                                // applyChanges([60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60]);
                                                // setManualBlinds([60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60]);
                                                setOpenConfirmation(false);
                                                updateBlinds();
                                            }
                                            else {
                                                setClosedConfirmation(false);
                                                setDimConfirmation(false);
                                                setOpenConfirmation(true);
                                                applyPreset(6);
                                                setPreset(3)
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
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} initVal={browserBlinds} preset={preset} id={0} />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} initVal={browserBlinds} preset={preset} id={1} />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} initVal={browserBlinds} preset={preset} id={2} /><Spacer />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} initVal={browserBlinds} preset={preset} id={3} />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} initVal={browserBlinds} preset={preset} id={4} />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} initVal={browserBlinds} preset={preset} id={5} />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} initVal={browserBlinds} preset={preset} id={6} />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} initVal={browserBlinds} preset={preset} id={7} /><Spacer />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} initVal={browserBlinds} preset={preset} id={8} />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} initVal={browserBlinds} preset={preset} id={9} />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} initVal={browserBlinds} preset={preset} id={10} />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} initVal={browserBlinds} preset={preset} id={11} />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} initVal={browserBlinds} preset={preset} id={12} /><Spacer />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} initVal={browserBlinds} preset={preset} id={13} />
                                    <BlindSlider phone={phone} updateVar={sliderUpdated} initVal={browserBlinds} preset={preset} id={14} />
                                    {lastSpacer}
                                </Flex>
                                <Button alignSelf="flex-end" right="30px" bottom="15px" my="5px" w="100px" h="40px" variant="solid" title={inTla ? "" : "Must be in TLA"}
                                    bg="orange.400" _hover={{ bg: "orange.500" }} _active={{ bg: "orange.600" }} disabled={!changedBlinds.length || !inTla}
                                    /* leftIcon={<Icon as={FaSun} color="yellow.500" />} */
                                    onClick={() => {
                                        setPreset(0);
                                        setClosedConfirmation(false);
                                        setDimConfirmation(false);
                                        setOpenConfirmation(false);
                                        updateBlinds();
                                    }}
                                >
                                    <Text color="black">
                                        {!inTla ? "Not in TLA" : "Apply"}
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
