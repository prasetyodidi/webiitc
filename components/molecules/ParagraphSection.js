import React from 'react';
import FlashParagraph from '../atoms/FlashParagraph';
import Text from '../atoms/Text';

const ParagraphSection = ({
  flashValue,
  title,
  description,
  isWhite = false,
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <FlashParagraph isHorizontal={true} className="flex" value={flashValue} />
      <Text
        additionals={'text-xl md:text-3xl lg:text-4xl'}
        size={'title'}
        color={isWhite ? 'white' : 'dark'}
        weight={'semi'}
      >
        {title}
      </Text>
      <Text color={isWhite ? 'white' : 'dark'}>{description}</Text>
    </div>
  );
};

export default ParagraphSection;
