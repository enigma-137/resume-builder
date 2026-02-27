import { createContext, useContext, useEffect } from 'react';

import { AVAILABLE_TEMPLATES } from '@/helpers/constants';
import { ThemeProvider } from '@mui/material/styles';
import { useResumeStore } from '@/stores/useResumeStore';
import { useTemplates } from '@/stores/useTemplate';
import { useThemes } from '@/stores/themes';
import { useZoom } from '@/stores/useZoom';

// TODO: tighten this once all resume model interfaces are aligned.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const StateContext = createContext<any>(null);

export const useResumeContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useResumeContext must be used inside ResumeLayout');
  }
  return context;
};

export const ResumeLayout = () => {
  const resumeData = useResumeStore();
  const zoom = useZoom((state) => state.zoom);

  const templateId = useTemplates((state) => state.activeTemplate.id);
  const Template = AVAILABLE_TEMPLATES[templateId]?.component;
  const selectedTheme = useThemes((state) => state.selectedTheme);

  useEffect(() => {
    const selectedTemplateId = localStorage.getItem('selectedTemplateId');
    const selectedTemplate =
      (selectedTemplateId && AVAILABLE_TEMPLATES[selectedTemplateId]) || AVAILABLE_TEMPLATES.modern;
    useTemplates.getState().setTemplate(selectedTemplate);
  }, []);

  return (
    <div className="mx-5 print:mx-0 mb-2 print:mb-0">
      <div
        style={{ transform: `scale(${zoom})` }}
        className="origin-top transition-all duration-300 ease-linear print:!scale-100"
      >
        <div className="w-[210mm] h-[296mm] bg-white my-0 mx-auto">
          <StateContext.Provider value={resumeData}>
            <ThemeProvider theme={selectedTheme}>{Template && <Template />}</ThemeProvider>
          </StateContext.Provider>
        </div>
      </div>
    </div>
  );
};
