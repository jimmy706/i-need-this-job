export interface TargetCompany {
  name: string;
  managerName: string;
  locationBased?: string;
}

export type ConversationStyle = "Professional" | "Precise" | "Creative";

export interface Options {
  style: ConversationStyle;
}

export interface GenerateCoverLetterRequestBody {
  name: string;
  applyPossition: string;
  targetCompany: TargetCompany;
  options?: Options;
  signedName: string;
  skills: string[];
}

export interface GenerateCoverLetterParams {
  applyerName: string;
  applyPossition: string;
  targetCompany: string;
  managerName: string;
  locationBased?: string;
  skills: string;
}

export type GeneratedCoverLetter = {
  result: string;
};
