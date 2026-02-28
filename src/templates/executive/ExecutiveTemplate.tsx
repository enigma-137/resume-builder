import React from 'react';
import { useResumeContext } from '@/modules/builder/resume/ResumeLayout';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { ProfileImage } from '@/helpers/common/components/ProfileImage';
import { IWorkIntrf, IEducation, IItem, IAwards } from '@/stores/index.interface';

const SectionHeader = ({ title }: { title: string }) => (
  <div className="mb-3 border-b-2 border-slate-800 pb-1 mt-6">
    <h3 className="text-lg font-bold uppercase tracking-wider text-slate-800">{title}</h3>
  </div>
);

export default function ExecutiveTemplate() {
  const resumeData = useResumeContext();

  return (
    <div className="p-8 bg-white min-h-[1056px] font-serif text-slate-800">
      {/* Header */}
      <header className="flex justify-between items-start border-b-4 border-slate-900 pb-6 mb-8">
        <div className="flex-1">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 italic">
            {resumeData.basics.name}
          </h1>
          <h2 className="text-xl font-medium text-slate-600 mb-4">{resumeData.basics.label}</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
            <span>{resumeData.basics.email}</span>
            <span>{resumeData.basics.phone}</span>
            <span>{resumeData.basics.location.city}</span>
            {resumeData.basics.url && (
              <a href={resumeData.basics.url} className="underline text-blue-600">
                {resumeData.basics.url}
              </a>
            )}
          </div>
        </div>
        <ProfileImage src={resumeData.basics.image} height="120px" width="120px" />
      </header>

      <div className="flex gap-10">
        {/* Main Content */}
        <div className="flex-[2]">
          <SectionValidator value={resumeData.work}>
            <section>
              <SectionHeader title="Professional Experience" />
              {resumeData.work.map((exp: IWorkIntrf, index: number) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-md text-slate-900">{exp.position}</h4>
                    <span className="text-sm font-medium italic">
                      {exp.startDate} — {exp.isWorkingHere ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-slate-700 mb-2 italic">{exp.name}</div>
                  <p className="text-sm leading-relaxed mb-2">{exp.summary}</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {exp.highlights.map((h: string, i: number) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </SectionValidator>

          <SectionValidator value={resumeData.education}>
            <section>
              <SectionHeader title="Education" />
              {resumeData.education.map((edu: IEducation, index: number) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-md text-slate-900">
                      {edu.studyType} in {edu.area}
                    </h4>
                    <span className="text-sm">
                      {edu.startDate} — {edu.endDate}
                    </span>
                  </div>
                  <div className="text-sm italic">{edu.institution}</div>
                </div>
              ))}
            </section>
          </SectionValidator>
        </div>

        {/* Sidebar */}
        <div className="flex-1 bg-slate-50 p-6 rounded-lg self-start">
          <SectionValidator value={resumeData.basics.summary}>
            <section>
              <SectionHeader title="About" />
              <p className="text-sm leading-relaxed italic">{resumeData.basics.summary}</p>
            </section>
          </SectionValidator>

          <SectionValidator value={resumeData.skills.technologies}>
            <section>
              <SectionHeader title="Skills" />
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.technologies.map((skill: IItem, index: number) => (
                  <span
                    key={index}
                    className="bg-slate-800 text-white px-2 py-1 text-xs rounded uppercase font-bold tracking-tight"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          </SectionValidator>

          <SectionValidator value={resumeData.skills.languages}>
            <section>
              <SectionHeader title="Languages" />
              <ul className="text-sm">
                {resumeData.skills.languages.map((lang: IItem, index: number) => (
                  <li key={index} className="flex justify-between mb-1">
                    <span>{lang.name}</span>
                    <span className="text-xs italic text-slate-500">Level {lang.level}/10</span>
                  </li>
                ))}
              </ul>
            </section>
          </SectionValidator>

          {resumeData.awards && resumeData.awards.length > 0 && (
            <SectionValidator value={resumeData.awards}>
              <section>
                <SectionHeader title="Awards" />
                {resumeData.awards.map((award: IAwards, index: number) => (
                  <div key={index} className="mb-3">
                    <div className="text-sm font-bold">{award.title}</div>
                    <div className="text-xs text-slate-600 whitespace-pre-wrap">
                      {award.summary}
                    </div>
                  </div>
                ))}
              </section>
            </SectionValidator>
          )}
        </div>
      </div>
    </div>
  );
}
