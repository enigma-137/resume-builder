import { useEffect, useCallback } from 'react';
import { StyledButton } from '../atoms';
import { MenuItem, Menu } from '@mui/material';
import { useResumeStore } from '@/stores/useResumeStore';
import { generateDocx } from '@/helpers/utils/generateDocx';
import React from 'react';

export const PrintResume: React.FC<{ isMenuButton?: boolean }> = ({ isMenuButton }) => {
  const resumeData = useResumeStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleBeforePrint = () => {
      globalThis.document.title = `Resume_Builder_${Date.now()}`;
    };
    const handleAfterPrint = () => {
      globalThis.document.title = 'Single Page Resume Builder';
    };

    globalThis?.addEventListener('beforeprint', handleBeforePrint);
    globalThis?.addEventListener('afterprint', handleAfterPrint);

    return () => {
      globalThis?.removeEventListener('beforeprint', handleBeforePrint);
      globalThis?.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  const downloadDocx = useCallback(async () => {
    await generateDocx(resumeData);
    handleClose();
  }, [resumeData]);

  if (isMenuButton) {
    return (
      <>
        <MenuItem onClick={globalThis?.print}>Download as PDF</MenuItem>
        <MenuItem onClick={downloadDocx}>Download as DOCX</MenuItem>
      </>
    );
  }

  return (
    <div>
      <StyledButton
        id="download-button"
        aria-controls={open ? 'download-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
      >
        Download
      </StyledButton>
      <Menu
        id="download-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'download-button',
        }}
      >
        <MenuItem onClick={globalThis?.print}>Download as PDF</MenuItem>
        <MenuItem onClick={downloadDocx}>Download as DOCX</MenuItem>
      </Menu>
    </div>
  );
};
