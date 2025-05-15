import { ACTIONS_CORS_HEADERS, ActionsJson } from "@solana/actions";

export const GET = async () => {
  const payload: ActionsJson = {
    rules: [
      {
        pathPattern: "/*",
        apiPath: "/api/actions/*",
      },
      {
        pathPattern: "api/actions/**",
        apiPath: "/api/actions/**",
      },
    ],
  };
  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

const blockchain = "eip155:10143";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, x-blockchain-ids, x-action-version",
  "Content-Type": "application/json",
  "x-blockchain-ids": blockchain,
  "x-action-version": "2.0",
};

export const OPTIONS = async () => {
  return new Response(null, {
    headers,
  });
};
