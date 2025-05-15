import { ActionGetResponse } from "@solana/actions";

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

export const GET = async (req: Request) => {
  const response: ActionGetResponse = {
    type: "action",
    icon: `${new URL("/donation-mon.png", req.url).toString}`,
    label: "1 MON",
    title: "Donate MON",
    description:
      "This Blink demonstrates how to donate MON on the Monad blockchain. It is a part of the official Blink Starter Guides by Dialect Labs.  \n\nLearn how to build this Blink: https://dialect.to/docs/guides/donate-mon",
    links: {
      actions: [
        {
          type: "transaction",
          label: "0.01 MON",
          href: "/api/actions/donate-mon?amount=0.01",
        },
        {
          type: "transaction",
          label: "0.05 MON",
          href: "/api/actions/donate-mon?amount=0.05",
        },
        {
          type: "transaction",
          label: "0.1 MON",
          href: "/api/actions/donate-mon?amount=0.1",
        },
        {
          type: "transaction",
          label: "donate",
          href: "/api/actions/donate-mon?amount={amount}",
          parameters: [
            {
              name: "amount",
              label: "Enter a custom amount",
              type: "number",
            },
          ],
        },
      ],
    },
  };
  return new Response(JSON.stringify(response), {
    status: 200,
    headers,
  });
};
