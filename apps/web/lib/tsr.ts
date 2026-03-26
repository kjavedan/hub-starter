import { apiContract } from "@hub-starter/contracts";
import { initTsrReactQuery } from "@ts-rest/react-query/v5";

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export const tsr = initTsrReactQuery(apiContract, {
  baseUrl,
});
