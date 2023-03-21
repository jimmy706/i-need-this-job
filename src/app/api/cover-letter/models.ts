export interface TargetCompany {
    name: string,
    managerName: string,
    locationBased?: string,
}

export type ConversationStyle = 'Professional' | 'Precise' | 'Creative';

export interface Options {
    style: ConversationStyle
}

export interface RequestBody {
    name: string,
    applyPossition: string,
    targetCompany:TargetCompany,
    options?: Options,
    signedName: string,
    skills: string[]
}