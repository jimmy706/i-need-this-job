const REGEX_EXTRACT_PARAMS = /\$\{(\w+)\}/g;
const REGEX_EXTRACT_PARAM_NAME = /\${(.*)}/

export type TextParams = {
  [key: string]: any;
};

export function convertGeneratedPromptToCoverLetter(
  prompt: string,
  params: TextParams
): String {
  let result = new String(prompt);
  const matchedParams = result.match(REGEX_EXTRACT_PARAMS);
  matchedParams?.forEach(matched => {
    const paramName = extractParamName(matched);
    if (paramName) {
        result = result.replace(matched, params[paramName]);
    }
  })

  return result.trim();
}

function extractParamName(param: string) {
    const match = param.match(REGEX_EXTRACT_PARAM_NAME);
    return match ? match[1] : null;
}
