import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateEnhancedText = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error(
      'Gemini API key is missing. Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env file.'
    );
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean up markdown if AI returns it
    text = text.replace(/^```html\n?/, '').replace(/\n?```$/, '');
    text = text.replace(/^```text\n?/, '').replace(/\n?```$/, '');

    return text.trim();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to generate text using AI. Please try again.');
  }
};

export const getEnhancementPrompt = (
  type: 'summary' | 'objective' | 'experience',
  currentText: string
): string => {
  const basePrompt = `You are a professional resume writer. Your goal is to enhance the following ${type} to make it more professional, impactful, and concise. Maintain the core information but improve the vocabulary and structure.`;

  if (type === 'experience') {
    return `${basePrompt} Please format the output as a few concise bullet points if applicable. The input might be raw notes or partial sentences. Input: "${currentText}" Enhanced:`;
  }

  return `${basePrompt} Return only the enhanced text. Input: "${currentText}" Enhanced:`;
};
