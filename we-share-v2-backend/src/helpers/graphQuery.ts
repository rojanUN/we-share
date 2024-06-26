import { GraphQLRequestConfig, ProblemsetQuestionListResponse } from "../interfaces";
import { LeetcodeGraphqlEndPoint } from "../config";
import { problemQuery } from "../queries";
import { badRequest } from "@hapi/boom";

async function fetchProblemDetails({ variables }: GraphQLRequestConfig): Promise<ProblemsetQuestionListResponse> {
  try {
    const response = await fetch(LeetcodeGraphqlEndPoint.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
      },
      body: JSON.stringify({
        operationName: "problemsetQuestionList",
        variables,
        query: problemQuery,
      }),
    });
    if (!response) {
      throw badRequest("Error fetching problems");
    }

    const result = await response.json();
    return result.data;
  } catch (error: any) {
    throw new Error(`Error fetching data from GraphQL endpoint: ${error}`);
  }
}

export { fetchProblemDetails };
