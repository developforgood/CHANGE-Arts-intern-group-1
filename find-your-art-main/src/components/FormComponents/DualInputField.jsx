import { Flex } from '@chakra-ui/layout';
import InputField from './InputField';

export default function DualInputField({
  leftTitle,
  leftType,
  leftPlaceholder,
  leftField,
  rightTitle,
  rightType,
  rightPlaceholder,
  rightField,
  handleData,
}) {
  return (
    <Flex gap={'1rem'}>
      <InputField
        title={leftTitle}
        type={leftType}
        placeholder={leftPlaceholder}
        field={leftField}
        handleData={handleData}
      />
      <InputField
        title={rightTitle}
        type={rightType}
        placeholder={rightPlaceholder}
        field={rightField}
        handleData={handleData}
      />
    </Flex>
  );
}
