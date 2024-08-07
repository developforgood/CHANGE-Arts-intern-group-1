import { useState } from 'react';
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
  Tooltip,
} from '@chakra-ui/react';

export default function AgeSlider({
  onValuesChange,
  isDisabled,
  initialMin,
  initialMax,
}) {
  const [sliderMinValue, setSliderMinValue] = useState(initialMin);
  const [sliderMaxValue, setSliderMaxValue] = useState(initialMax);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSliderChange = newValues => {
    setSliderMinValue(newValues[0]);
    setSliderMaxValue(newValues[1]);
    onValuesChange(sliderMinValue, sliderMaxValue);
  };

  return (
    <RangeSlider
      id="age-slider"
      min={0}
      max={21}
      step={1}
      colorScheme="white"
      defaultValue={[parseInt(initialMin), parseInt(initialMax)]}
      onChange={handleSliderChange}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      isDisabled={isDisabled}
    >
      <RangeSliderMark value={0} mt="1" ml="0" fontSize="sm">
        0
      </RangeSliderMark>
      <RangeSliderMark value={21} mt="1" ml="-2.5" fontSize="sm">
        21+
      </RangeSliderMark>

      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <Tooltip
        hasArrow
        bg="white"
        color="black"
        placement="top"
        isOpen={showTooltip}
        label={`${sliderMinValue}`}
      >
        <RangeSliderThumb index={0} />
      </Tooltip>

      <Tooltip
        hasArrow
        bg="white"
        color="black"
        placement="top"
        isOpen={showTooltip}
        label={`${sliderMaxValue}`}
      >
        <RangeSliderThumb index={1} />
      </Tooltip>
    </RangeSlider>
  );
}
