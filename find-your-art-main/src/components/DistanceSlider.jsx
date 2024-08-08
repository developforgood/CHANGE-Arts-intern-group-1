import { useState } from "react";
import {
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  Tooltip,
  SliderThumb,
} from "@chakra-ui/react";

export default function DistanceSlider({ onValueChange, color, initialValue }) {
  const [sliderValue, setSliderValue] = useState(
    initialValue ? initialValue : 0
  );
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSliderChange = (newValue) => {
    setSliderValue(newValue);
    onValueChange(newValue);
  };

  return (
    <Slider
      id="slider"
      defaultValue={initialValue}
      min={0}
      max={100}
      step={10}
      colorScheme={color}
      onChange={handleSliderChange}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      display="inline-block"
    >
      <SliderMark value={0} mt="4" ml="-2.5" fontSize="sm" color={"white"}>
        Off
      </SliderMark>
      <SliderMark value={50} mt="4" ml="-2.5" fontSize="sm" color={"white"}>
        50
      </SliderMark>
      <SliderMark value={100} mt="4" ml="-2.5" fontSize="sm" color={"white"}>
        100
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg={"white"}
        color="black"
        placement="top"
        isOpen={showTooltip}
        label={`${sliderValue} miles`}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
}
