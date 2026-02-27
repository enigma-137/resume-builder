import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { IResume, IWorkIntrf, IEducation, IItem } from '@/stores/index.interface';
import { dateParser } from './index';

// Helper to strip HTML tags
const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ');
};

export const generateDocx = async (resumeData: IResume) => {
  const { basics, work, education, skills } = resumeData;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header
          new Paragraph({
            text: basics.name,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun(`${basics.email} | ${basics.phone}`),
              new TextRun({
                text: basics.url ? ` | ${basics.url}` : '',
              }),
            ],
          }),
          new Paragraph({
            text: `${basics.location.city}, ${basics.location.region} ${basics.location.postalCode}`,
            alignment: AlignmentType.CENTER,
          }),

          // Summary
          ...(basics.summary
            ? [
                new Paragraph({ text: 'Professional Summary', heading: HeadingLevel.HEADING_2 }),
                new Paragraph({ text: stripHtml(basics.summary) }),
              ]
            : []),

          // Objective
          ...(basics.objective
            ? [
                new Paragraph({ text: 'Career Objective', heading: HeadingLevel.HEADING_2 }),
                new Paragraph({ text: stripHtml(basics.objective) }),
              ]
            : []),

          // Experience
          new Paragraph({ text: 'Work Experience', heading: HeadingLevel.HEADING_2 }),
          ...work.flatMap((exp: IWorkIntrf) => [
            new Paragraph({
              children: [
                new TextRun({ text: exp.name, bold: true }),
                new TextRun({ text: ` | ${exp.position}`, italics: true }),
              ],
            }),
            new Paragraph({
              text: `${dateParser(exp.startDate)} - ${
                exp.isWorkingHere ? 'Present' : dateParser(exp.endDate)
              }`,
            }),
            new Paragraph({ text: stripHtml(exp.summary) }),
            new Paragraph({ text: '' }), // Spacer
          ]),

          // Education
          new Paragraph({ text: 'Education', heading: HeadingLevel.HEADING_2 }),
          ...education.flatMap((edu: IEducation) => [
            new Paragraph({
              children: [
                new TextRun({ text: edu.institution, bold: true }),
                new TextRun({ text: ` | ${edu.studyType} in ${edu.area}`, italics: true }),
              ],
            }),
            new Paragraph({
              text: `${dateParser(edu.startDate)} - ${
                edu.isStudyingHere ? 'Present' : dateParser(edu.endDate)
              }`,
            }),
            new Paragraph({ text: '' }), // Spacer
          ]),

          // Skills
          new Paragraph({ text: 'Skills', heading: HeadingLevel.HEADING_2 }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Languages: ', bold: true }),
              new TextRun(skills.languages.map((s: IItem) => s.name).join(', ')),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Frameworks & Technologies: ', bold: true }),
              new TextRun(
                [...skills.frameworks, ...skills.technologies].map((s: IItem) => s.name).join(', ')
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Libraries & Databases: ', bold: true }),
              new TextRun(
                [...skills.libraries, ...skills.databases].map((s: IItem) => s.name).join(', ')
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Tools & Practices: ', bold: true }),
              new TextRun(
                [...skills.tools, ...skills.practices].map((s: IItem) => s.name).join(', ')
              ),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `Resume_${basics.name.replace(/\s+/g, '_')}.docx`);
};
