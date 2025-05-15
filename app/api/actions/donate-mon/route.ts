import { ActionGetResponse, ActionPostResponse } from "@solana/actions";
import { parseEther } from "viem";
import { serialize } from "wagmi";

const blockchain = "eip155:10143";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, x-blockchain-ids, x-action-version",
  "Access-Control-Expose-Headers": "x-blockchain-ids, x-action-version",
  "Content-Type": "application/json",
  "x-blockchain-ids": blockchain,
  "x-action-version": "2.4",
};

export const OPTIONS = async () => {
  return new Response(null, {
    headers,
  });
};

export const GET = async (req: Request) => {
  const response: ActionGetResponse = {
    type: "action",
    icon: `${new URL("/donation-mon.png", req.url).toString()}`,
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

const donationWallet = "0x335073168449d687f2df7373b61b6a398c852248";

export const POST = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const amount = url.searchParams.get("amount");
    if (!amount) {
      throw new Error("amount is required");
    }
    const transaction = {
      to: donationWallet,
      value: parseEther(amount).toString(),
      chainId: 10143,
    };
    const transactionJson = serialize(transaction);

    const response: ActionPostResponse = {
      type: "transaction",
      transaction: transactionJson,
      message: `Donating ${amount} MON`,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers,
    });
  } catch (e) {
    console.error("error process request", e);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers,
    });
  }
};
