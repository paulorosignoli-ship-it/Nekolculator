export interface LegalSection {
  heading: string;
  body: string[]; // paragraphs
}

export interface LegalDocument {
  title: string;
  effectiveDate: string;
  intro: string[];
  sections: LegalSection[];
}

export interface LegalContent {
  privacy: LegalDocument;
  terms: LegalDocument;
  cookies: LegalDocument;
}
