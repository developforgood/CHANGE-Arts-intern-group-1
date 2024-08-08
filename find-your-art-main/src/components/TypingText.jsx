import { useState, useEffect } from "react";
import { Text, Flex } from "@chakra-ui/react";

const TypingText = ({ text, delayBetweenChars }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let animationTimeout;

    const animation = async () => {
      for (let i = 0; i < text.length; i++) {
        setCurrentIndex(i);
        await new Promise((resolve) => setTimeout(resolve, delayBetweenChars));
      }
    };

    animation();

    // Clear animation timeout on component unmount
    return () => {
      clearTimeout(animationTimeout);
    };
  }, [text, delayBetweenChars]);

  // Use currentIndex to derive animatedText
  const animatedText = text.slice(0, currentIndex + 1);

  return (
    <Flex direction="column">
      {/* Animated Text with Cursor */}
      <Text
        fontSize="6xl"
        color="white"
        whiteSpace="pre-line"
        font="DM Sans"
        fontWeight={800}
        mb="4"
        //textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
      >
        {animatedText}
      </Text>
    </Flex>
  );
};

export default TypingText;
