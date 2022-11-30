import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Box,
    useBreakpointValue,
    Text,
    useSlider
} from '@chakra-ui/react'

import { MdGraphicEq } from 'react-icons/md';
import { FaMoon, FaCloudSun, FaCloud, FaSun } from 'react-icons/fa';
import { useState, useEffect } from 'react';


const BlindSlider = (props) => {
    //This variable is for ALL sliders, not just this component
    // const [updated, setUpdated] = useState(updateVar);
    const [sliderValue, setSliderValue] = useState(props.TLAvalue);
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        setSliderValue(props.TLAvalue);
    }, [props.TLAvalue]);

    let icon;
    if (sliderValue < 3.0 || sliderValue > 8) {
        icon =
            <SliderThumb bg="gray.700" boxSize={6}>
                <Box
                    color="yellow"
                    as={FaMoon}
                />
            </SliderThumb>;
    }
    else if (sliderValue < 4.5 || sliderValue > 7.0) {
        icon =
            <SliderThumb bg="gray.600" boxSize={6}>
                <Box
                    color="gray.300"
                    as={FaCloud}
                />
            </SliderThumb>;
    }
    else {
        icon =
            <SliderThumb bg="gray.200" boxSize={6}>
                <Box
                    color="orange"
                    as={FaSun}
                />
            </SliderThumb>;
    }

    const firstSlider = props.id == 0 ?
        <>
            <SliderMark value={0} mt='-6' ml={props.phone ? '-5' : '-14'} fontSize='sm' color="black" placement="">
                Closed
            </SliderMark>
            <SliderMark value={6} mt='-6' ml={props.phone ? '-5' : '-14'} fontSize='sm' color="black">
                Open
            </SliderMark>
            <SliderMark value={9} mt='-6' ml={props.phone ? '-5' : '-14'} fontSize='sm' color="black">
                Closed
            </SliderMark>
        </>
        :
        <></>;



    return (
        <Box h={props.phone ? "4.5%" : "70%"} w={props.phone ? "70%" : "4%"}>
            <Slider
                aria-label='slider-ex-3'
                min={0} max={9}
                //defaultValue={sliderValue}
                value={sliderValue}
                orientation={props.phone ? 'horizontal' : 'vertical'}
                minH={props.phone ? "40px" : '100px'}
                minW={props.phone ? '100px' : '10px'}
                step={1}
                onChange={(val) => setSliderValue(val)}
                onChangeEnd={() => {
                    props.updateVar(sliderValue, props.id);
                }}
            >
                {firstSlider}
                <SliderTrack bg='red.100'>
                    <SliderFilledTrack bg={sliderValue == props.TLAvalue ? 'yellow.500' : 'orange.400'} />
                </SliderTrack>
                {icon}

            </Slider>

        </Box >
    )
};

export default BlindSlider;
