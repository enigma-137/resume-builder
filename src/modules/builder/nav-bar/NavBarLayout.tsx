import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { NavBarActions, NavBarMenu, StyledButton } from './atoms';
import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from '@/stores/skills';

import { AVAILABLE_TEMPLATES } from '@/helpers/constants';
import DEFAULT_RESUME_JSON from '@/helpers/constants/resume-data.json';
import Image from 'next/image';
import Link from 'next/link';
import { NavMenuItem } from './components/MenuItem';
import { PrintResume } from './components/PrintResume';
import { TemplateSelect } from './components/TemplateSelect';
import { ThemeSelect } from './components/ThemeSelect';
import { Toast } from '@/helpers/common/atoms/Toast';
import exportFromJSON from 'export-from-json';
import { useActivity } from '@/stores/activity';
import { useAwards } from '@/stores/awards';
import { useBasicDetails } from '@/stores/basic';
import { useEducations } from '@/stores/education';
import { useExperiences } from '@/stores/experience';
import { useVoluteeringStore } from '@/stores/volunteering';
import { Menu, MenuItem } from '@mui/material';

const TOTAL_TEMPLATES_AVAILABLE = Object.keys(AVAILABLE_TEMPLATES).length;

const NavBarLayout = () => {
  const [openToast, setOpenToast] = useState(false);
  const [toastContent, setToastContent] = useState('Resume data was successfully imported.');
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const exportResumeData = useCallback(() => {
    const updatedResumeJson = {
      ...DEFAULT_RESUME_JSON,
      basics: {
        ...DEFAULT_RESUME_JSON.basics,
        ...useBasicDetails.getState().values,
      },
      work: useExperiences.getState().experiences,
      education: useEducations.getState().academics,
      awards: useAwards.getState().awards,
      volunteer: useVoluteeringStore.getState().volunteeredExps,
      skills: {
        languages: useLanguages.getState().get(),
        frameworks: useFrameworks.getState().get(),
        technologies: useTechnologies.getState().get(),
        libraries: useLibraries.getState().get(),
        databases: useDatabases.getState().get(),
        practices: usePractices.getState().get(),
        tools: useTools.getState().get(),
      },
      activities: useActivity.getState().activities,
    };
    const fileName = updatedResumeJson.basics.name + '_' + new Date().toLocaleString();
    const exportType = exportFromJSON.types.json;
    exportFromJSON({
      data: updatedResumeJson,
      fileName,
      exportType,
    });
  }, []);

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    const reader = new FileReader();

    reader.readAsText(fileObj);

    event.target.value = ''; // To read the same file

    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        try {
          const uploadedResumeJSON = JSON.parse(e.target?.result);
          const {
            basics = {},
            skills = {},
            work = [],
            education = [],
            activities = {
              involvements: '',
              achievements: '',
            },
            volunteer = [],
            awards = [],
          } = uploadedResumeJSON;
          const {
            languages = [],
            frameworks = [],
            libraries = [],
            databases = [],
            technologies = [],
            practices = [],
            tools = [],
          } = skills;
          useBasicDetails.getState().reset(basics);
          useLanguages.getState().reset(languages);
          useFrameworks.getState().reset(frameworks);
          useLibraries.getState().reset(libraries);
          useDatabases.getState().reset(databases);
          useTechnologies.getState().reset(technologies);
          usePractices.getState().reset(practices);
          useTools.getState().reset(tools);
          useExperiences.getState().reset(work);
          useEducations.getState().reset(education);
          useVoluteeringStore.getState().reset(volunteer);
          useAwards.getState().reset(awards);
          useActivity.getState().reset(activities);
          setToastContent('Resume data was successfully imported.');
        } catch {
          setToastContent('Import failed. Please upload a valid resume JSON file.');
        }
        setOpenToast(true);
      }
    };

    reader.onerror = () => {
      setToastContent('Import failed. Unable to read the selected file.');
      setOpenToast(true);
    };
  }, []);

  return (
    <nav className="h-14 w-full bg-black relative flex py-2.5 pl-2 md:pl-5 pr-1 nd:pr-4 items-center shadow-level-8dp z-20 print:hidden">
      <Link href="/">
        <Image
          src={'https://cdn-icons-png.flaticon.com/128/3135/3135800.png'}
          alt="logo"
          height="36"
          width="36"
        />
      </Link>
      <div className="flex-auto flex justify-between items-center xs:ml-3 md:ml-5">
        <NavBarMenu>
          <NavMenuItem
            caption={`Templates (${TOTAL_TEMPLATES_AVAILABLE})`}
            popoverChildren={<TemplateSelect />}
          />
          <NavMenuItem caption="Colours" popoverChildren={<ThemeSelect />} />
        </NavBarMenu>
        <div className="hidden md:flex">
          <NavBarActions>
            <StyledButton variant="text" onClick={exportResumeData}>
              Export
            </StyledButton>
            <StyledButton
              variant="text"
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
            >
              Import
            </StyledButton>
            <PrintResume />
          </NavBarActions>
        </div>
        <button
          className="flex md:hidden text-white"
          onClick={handleMenuOpen}
          aria-label="Open menu"
        >
          <Image src="/icons/more-horizontal.svg" alt="back" width={25} height={25} />
        </button>
      </div>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={exportResumeData}>Export</MenuItem>
        <MenuItem
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.click();
            }
            handleMenuClose();
          }}
        >
          Import
        </MenuItem>
        <PrintResume isMenuButton />
      </Menu>
      <input
        type="file"
        hidden
        ref={fileInputRef}
        accept="application/json"
        onChange={handleFileChange}
      />
      <Toast
        open={openToast}
        onClose={() => {
          setOpenToast(false);
        }}
        content={toastContent}
      />
    </nav>
  );
};

export default NavBarLayout;
