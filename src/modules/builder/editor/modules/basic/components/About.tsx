import React, { Fragment } from 'react';
import { RichtextEditor } from '@/helpers/common/components/richtext';
import { AIAssistButton } from '@/helpers/common/components/AIAssistButton';

import { IBasics } from '@/stores/index.interface';

const About = ({
  basicTabs,
  onChangeHandler,
}: {
  basicTabs: IBasics;
  onChangeHandler: (value: string, key: string) => void;
}) => {
  return (
    <Fragment>
      <div className="flex flex-col mb-4">
        <AIAssistButton
          type="summary"
          currentText={basicTabs.summary}
          onEnhanced={(text) => onChangeHandler(text, 'summary')}
        />
        <RichtextEditor
          label="About me"
          value={basicTabs.summary}
          onChange={(htmlOutput) => {
            onChangeHandler(htmlOutput, 'summary');
          }}
          name="summary"
        />
      </div>

      <div className="flex flex-col mb-4">
        <AIAssistButton
          type="objective"
          currentText={basicTabs.objective}
          onEnhanced={(text) => onChangeHandler(text, 'objective')}
        />
        <RichtextEditor
          label="Career objective"
          value={basicTabs.objective}
          onChange={(htmlOutput) => {
            onChangeHandler(htmlOutput, 'objective');
          }}
          name="objective"
        />
      </div>
    </Fragment>
  );
};

export default About;
