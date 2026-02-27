import React, { useState } from 'react';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import { BsStars } from 'react-icons/bs';
import { generateEnhancedText, getEnhancementPrompt } from '../../utils/gemini';

interface AIAssistButtonProps {
  type: 'summary' | 'objective' | 'experience';
  currentText: string;
  onEnhanced: (text: string) => void;
}

export const AIAssistButton: React.FC<AIAssistButtonProps> = ({
  type,
  currentText,
  onEnhanced,
}) => {
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    if (!currentText || currentText.trim() === '<p></p>' || currentText.trim() === '') {
      alert('Please enter some text first so AI can enhance it.');
      return;
    }

    setLoading(true);
    try {
      const prompt = getEnhancementPrompt(type, currentText);
      const enhancedText = await generateEnhancedText(prompt);
      onEnhanced(enhancedText);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'AI Enhancement failed';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tooltip title={`Enhance ${type} with AI`}>
      <Button
        variant="text"
        size="small"
        onClick={handleEnhance}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={16} /> : <BsStars />}
        sx={{
          textTransform: 'none',
          color: '#7c3aed', // Purple color for AI
          '&:hover': {
            backgroundColor: 'rgba(124, 58, 237, 0.04)',
          },
          marginBottom: '8px',
        }}
      >
        {loading ? 'Enhancing...' : 'AI Enhance'}
      </Button>
    </Tooltip>
  );
};
