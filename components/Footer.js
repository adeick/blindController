import React, { Component, useEffect } from 'react';
import {
    Image, Center, VStack, Button, Box, Square, Circle, Collapse, Flex, Text, Tooltip, useDisclosure, useColorModeValue, IconButton,
    Drawer, HStack,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useBreakpointValue,
} from "@chakra-ui/react";
import Link from 'next/link'


import { FiGitlab } from 'react-icons/fi'
import { BsGlobe2 } from 'react-icons/bs'

import { CgFileDocument } from 'react-icons/cg'

const Footer = (props) => {
    const color = "#822727";
    return (
        <>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill={color} fill-opacity="1" d="M0,256L120,224C240,192,480,128,720,128C960,128,1200,192,1320,224L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z">
                </path>
            </svg>
            <Box w="100%" bg={useColorModeValue("#90CDF4", color)} h={["140px", "140px", "80px", "50px"]} borderColor={color} border="5px" /> */}
            <Flex position="absolute" bottom="20px" width="100%" alignItems="center" flexDirection="column">
                <Text textAlign="center" mb="10px">
                    Proudly made by SD Team 11
                </Text>
                <HStack>
                    <IconButton size="sm" target="_blank" as="a" mx="10px" variant={useColorModeValue("link", "solid")} fontSize="20px" icon={<FiGitlab />} href="https://git.ece.iastate.edu/sd/sddec22-11" aria-label="GitLab" />
                    <IconButton size="sm" target="_blank" as="a" mx="10px" variant={useColorModeValue("link", "solid")} fontSize="20px" icon={<BsGlobe2 />} href="https://sddec22-11.sd.ece.iastate.edu/" aria-label="GitLab" />
                </HStack>
            </Flex>
        </>
    )
}

export default Footer;