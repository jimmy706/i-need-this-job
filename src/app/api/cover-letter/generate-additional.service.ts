import { OpenAIApi } from "openai";
import { SkillOfExperience } from "./models";


export default class GenerateAdditionalInformationService {
    openai: OpenAIApi;

    constructor(openai: OpenAIApi) {
        this.openai = openai;
    }

    generateExperienceSkills(previousPrompt: string, skills: SkillOfExperience[], max_tokens: number) {
        return this.openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            max_tokens,
            messages: [
                {
                    role: 'assistant',
                    content: previousPrompt
                },
                {
                    role: 'user',
                    content: `From above cover letter, update the content match following information that the applier have these skills and experiences:\n ${this.buildPromptSkills(skills)}`
                }
            ]
        })
    }

    generateStandoutSights(previousPrompt: string, standOutSights: string[], max_tokens: number) {
        return this.openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            max_tokens,
            messages: [
                {
                    role: 'assistant',
                    content: previousPrompt
                },
                {
                    role: 'user',
                    content: `From above cover letter, update the content that the applier have following standout sights:\n ${this.buildPromptStandoutSights(standOutSights)}`
                }
            ]
        })
    }

    private buildPromptStandoutSights(standOutSights: string[]) {
        return standOutSights.map((sight: string, index: number) => {
            return `${index + 1}. ${sight}`;
        }).join("\n")
    }

    private buildPromptSkills(skills: SkillOfExperience[]) {
        return skills.map((skill: SkillOfExperience, index: number) => {
            const defaultContext = `${index + 1}. ${skill.name} with ${skill.yearOfExperience} years of experience.`;
            if (!skill.description) {
                return defaultContext;
            }
            return `${defaultContext} ${skill.description}`;
        }).join("\n")
    }
}