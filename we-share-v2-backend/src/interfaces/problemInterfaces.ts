import { CodeSnippet } from "leetcode-api-typescript";

export interface singleProblemInterfaceOutput {
    id?: number;
    content?: string;
    testCase?: string;
    codeSnippets?: CodeSnippet[],
}