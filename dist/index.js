// src/types/common/api-response.ts
import { z } from "zod";
var ApiErrorCode = /* @__PURE__ */ ((ApiErrorCode2) => {
  ApiErrorCode2["BAD_REQUEST"] = "BAD_REQUEST";
  ApiErrorCode2["UNAUTHORIZED"] = "UNAUTHORIZED";
  ApiErrorCode2["FORBIDDEN"] = "FORBIDDEN";
  ApiErrorCode2["NOT_FOUND"] = "NOT_FOUND";
  ApiErrorCode2["CONFLICT"] = "CONFLICT";
  ApiErrorCode2["UNPROCESSABLE_ENTITY"] = "UNPROCESSABLE_ENTITY";
  ApiErrorCode2["TOO_MANY_REQUESTS"] = "TOO_MANY_REQUESTS";
  ApiErrorCode2["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
  ApiErrorCode2["BAD_GATEWAY"] = "BAD_GATEWAY";
  ApiErrorCode2["SERVICE_UNAVAILABLE"] = "SERVICE_UNAVAILABLE";
  ApiErrorCode2["EXTERNAL_SERVICE_ERROR"] = "EXTERNAL_SERVICE_ERROR";
  ApiErrorCode2["VALIDATION_ERROR"] = "VALIDATION_ERROR";
  ApiErrorCode2["TOKEN_NOT_FOUND"] = "TOKEN_NOT_FOUND";
  ApiErrorCode2["POOL_NOT_FOUND"] = "POOL_NOT_FOUND";
  ApiErrorCode2["POSITION_NOT_FOUND"] = "POSITION_NOT_FOUND";
  ApiErrorCode2["CHAIN_NOT_SUPPORTED"] = "CHAIN_NOT_SUPPORTED";
  ApiErrorCode2["INVALID_ADDRESS"] = "INVALID_ADDRESS";
  ApiErrorCode2["WALLET_ALREADY_REGISTERED"] = "WALLET_ALREADY_REGISTERED";
  ApiErrorCode2["INVALID_SIGNATURE"] = "INVALID_SIGNATURE";
  ApiErrorCode2["NONCE_INVALID"] = "NONCE_INVALID";
  ApiErrorCode2["NONCE_EXPIRED"] = "NONCE_EXPIRED";
  ApiErrorCode2["API_KEY_NOT_FOUND"] = "API_KEY_NOT_FOUND";
  ApiErrorCode2["WALLET_NOT_FOUND"] = "WALLET_NOT_FOUND";
  ApiErrorCode2["INVALID_SIWE_MESSAGE"] = "INVALID_SIWE_MESSAGE";
  return ApiErrorCode2;
})(ApiErrorCode || {});
var ApiErrorSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.nativeEnum(ApiErrorCode),
    message: z.string(),
    details: z.unknown().optional()
  }),
  meta: z.object({
    requestId: z.string().optional(),
    timestamp: z.string().optional()
  }).catchall(z.unknown()).optional()
});
function createSuccessResponse(data, meta) {
  return {
    success: true,
    data,
    meta: {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      ...meta
    }
  };
}
function createErrorResponse(code, message, details, meta) {
  return {
    success: false,
    error: {
      code,
      message,
      details
    },
    meta: {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      ...meta
    }
  };
}
var ErrorCodeToHttpStatus = {
  ["BAD_REQUEST" /* BAD_REQUEST */]: 400,
  ["UNAUTHORIZED" /* UNAUTHORIZED */]: 401,
  ["FORBIDDEN" /* FORBIDDEN */]: 403,
  ["NOT_FOUND" /* NOT_FOUND */]: 404,
  ["CONFLICT" /* CONFLICT */]: 409,
  ["UNPROCESSABLE_ENTITY" /* UNPROCESSABLE_ENTITY */]: 422,
  ["TOO_MANY_REQUESTS" /* TOO_MANY_REQUESTS */]: 429,
  ["INTERNAL_SERVER_ERROR" /* INTERNAL_SERVER_ERROR */]: 500,
  ["BAD_GATEWAY" /* BAD_GATEWAY */]: 502,
  ["SERVICE_UNAVAILABLE" /* SERVICE_UNAVAILABLE */]: 503,
  ["EXTERNAL_SERVICE_ERROR" /* EXTERNAL_SERVICE_ERROR */]: 502,
  ["VALIDATION_ERROR" /* VALIDATION_ERROR */]: 400,
  ["TOKEN_NOT_FOUND" /* TOKEN_NOT_FOUND */]: 404,
  ["POOL_NOT_FOUND" /* POOL_NOT_FOUND */]: 404,
  ["POSITION_NOT_FOUND" /* POSITION_NOT_FOUND */]: 404,
  ["CHAIN_NOT_SUPPORTED" /* CHAIN_NOT_SUPPORTED */]: 400,
  ["INVALID_ADDRESS" /* INVALID_ADDRESS */]: 400,
  ["WALLET_ALREADY_REGISTERED" /* WALLET_ALREADY_REGISTERED */]: 409,
  ["INVALID_SIGNATURE" /* INVALID_SIGNATURE */]: 401,
  ["NONCE_INVALID" /* NONCE_INVALID */]: 401,
  ["NONCE_EXPIRED" /* NONCE_EXPIRED */]: 401,
  ["API_KEY_NOT_FOUND" /* API_KEY_NOT_FOUND */]: 404,
  ["WALLET_NOT_FOUND" /* WALLET_NOT_FOUND */]: 404,
  ["INVALID_SIWE_MESSAGE" /* INVALID_SIWE_MESSAGE */]: 400
};

// src/types/common/pagination.ts
import { z as z2 } from "zod";
var DEFAULT_PAGINATION = {
  LIMIT: 20,
  MAX_LIMIT: 100,
  OFFSET: 0
};
var PaginationParamsSchema = z2.object({
  limit: z2.string().optional().transform((val) => val ? parseInt(val, 10) : DEFAULT_PAGINATION.LIMIT).pipe(
    z2.number().int().positive().max(DEFAULT_PAGINATION.MAX_LIMIT).default(DEFAULT_PAGINATION.LIMIT)
  ),
  offset: z2.string().optional().transform((val) => val ? parseInt(val, 10) : DEFAULT_PAGINATION.OFFSET).pipe(
    z2.number().int().nonnegative().default(DEFAULT_PAGINATION.OFFSET)
  )
});
function createPaginationMeta(total, limit, offset) {
  return {
    total,
    limit,
    offset,
    hasMore: offset + limit < total
  };
}
function createPaginatedResponse(data, total, limit, offset, meta) {
  return {
    success: true,
    data,
    pagination: createPaginationMeta(total, limit, offset),
    meta: {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      ...meta
    }
  };
}

// src/types/auth/nonce.ts
import { z as z3 } from "zod";
var NonceSchema = z3.object({
  nonce: z3.string().regex(/^siwe_[A-Za-z0-9_-]{32}$/, "Invalid nonce format")
});

// src/types/auth/api-key.ts
import { z as z4 } from "zod";
var CreateApiKeyRequestSchema = z4.object({
  name: z4.string().min(1, "Name is required").max(100, "Name too long")
});

// src/types/auth/link-wallet.ts
import { z as z5 } from "zod";
var LinkWalletRequestSchema = z5.object({
  message: z5.string().min(1, "SIWE message is required"),
  signature: z5.string().regex(/^0x[a-fA-F0-9]{130}$/, "Invalid signature format")
});

// src/types/auth/signup.ts
import { z as z6 } from "zod";
var SignupRequestSchema = z6.object({
  address: z6.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  chainId: z6.number().int().positive(),
  name: z6.string().optional()
});

// src/types/health/health.ts
import { z as z7 } from "zod";
var HealthStatus = /* @__PURE__ */ ((HealthStatus2) => {
  HealthStatus2["HEALTHY"] = "healthy";
  HealthStatus2["DEGRADED"] = "degraded";
  HealthStatus2["UNHEALTHY"] = "unhealthy";
  return HealthStatus2;
})(HealthStatus || {});
var HealthResponseSchema = z7.object({
  status: z7.enum(["healthy", "degraded", "unhealthy"]),
  timestamp: z7.string().datetime(),
  environment: z7.string(),
  version: z7.string().optional(),
  uptime: z7.number().optional()
});

// src/types/tokens/erc20.ts
import { z as z8 } from "zod";
var CreateErc20TokenRequestSchema = z8.object({
  address: z8.string().min(1, "Address is required").regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format"),
  chainId: z8.number().int("Chain ID must be an integer").positive("Chain ID must be positive")
});
var SearchErc20TokensQuerySchema = z8.object({
  chainId: z8.coerce.number().int("Chain ID must be an integer").positive("Chain ID must be positive"),
  query: z8.string().min(1, "Query must not be empty").optional(),
  address: z8.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format").optional()
}).refine(
  (data) => data.query !== void 0 || data.address !== void 0,
  {
    message: "At least one of query or address must be provided",
    path: ["query", "address"]
  }
);

// src/types/tokens/token-balance.ts
import { z as z9 } from "zod";
var GetTokenBalanceQuerySchema = z9.object({
  /**
   * Wallet address to check balance for (will be normalized with EIP-55)
   * Example: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
   */
  walletAddress: z9.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  /**
   * ERC-20 token contract address (will be normalized with EIP-55)
   * Example: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" (WETH)
   */
  tokenAddress: z9.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  /**
   * EVM chain ID
   * Example: 1 (Ethereum), 42161 (Arbitrum), 8453 (Base)
   */
  chainId: z9.string().transform((val) => parseInt(val, 10))
});

// src/types/pools/uniswapv3.ts
import { z as z10 } from "zod";
var GetUniswapV3PoolParamsSchema = z10.object({
  chainId: z10.string().min(1, "chainId is required").regex(/^\d+$/, "chainId must be a positive integer").transform((val) => parseInt(val, 10)).pipe(
    z10.number().int("chainId must be an integer").positive("chainId must be positive")
  ),
  address: z10.string().min(1, "Pool address is required").regex(/^0x[a-fA-F0-9]{40}$/, "Invalid pool address format")
});
var GetUniswapV3PoolQuerySchema = z10.object({
  metrics: z10.string().optional().default("false").transform((val) => val === "true").pipe(z10.boolean()),
  fees: z10.string().optional().default("false").transform((val) => val === "true").pipe(z10.boolean())
});

// src/types/pools/uniswapv3-discovery.ts
import { z as z11 } from "zod";
var DiscoverUniswapV3PoolsQuerySchema = z11.object({
  chainId: z11.coerce.number().int("Chain ID must be an integer").positive("Chain ID must be positive"),
  tokenA: z11.string().min(1, "tokenA is required").regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format for tokenA"),
  tokenB: z11.string().min(1, "tokenB is required").regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format for tokenB")
});

// src/types/positions/common/list.ts
import { z as z12 } from "zod";
var PositionStatusSchema = z12.enum(["active", "closed", "all"]);
var PositionSortBySchema = z12.enum([
  "createdAt",
  "positionOpenedAt",
  "currentValue",
  "unrealizedPnl"
]);
var SortDirectionSchema = z12.enum(["asc", "desc"]);
var ListPositionsQuerySchema = PaginationParamsSchema.extend({
  protocols: z12.string().optional().transform((val) => val ? val.split(",").map((p) => p.trim()) : void 0).pipe(z12.array(z12.string()).optional()),
  status: z12.string().optional().default("all").transform((val) => val).pipe(PositionStatusSchema),
  sortBy: z12.string().optional().default("createdAt").transform(
    (val) => val
  ).pipe(PositionSortBySchema),
  sortDirection: z12.string().optional().default("desc").transform((val) => val).pipe(SortDirectionSchema)
});

// src/types/positions/common/ledger.ts
import { z as z13 } from "zod";
var LedgerPathParamsSchema = z13.object({
  /**
   * Chain ID (e.g., 1 for Ethereum, 42161 for Arbitrum)
   * Must be a valid positive integer
   */
  chainId: z13.string().regex(/^\d+$/, "Chain ID must be a valid number").transform((val) => parseInt(val, 10)).pipe(z13.number().int().positive()),
  /**
   * NFT Position Manager token ID
   * Can be very large, so we keep as string for validation
   * Service layer will convert to bigint
   */
  nftId: z13.string().regex(/^\d+$/, "NFT ID must be a valid number").min(1, "NFT ID is required")
});

// src/types/positions/common/apr.ts
import { z as z14 } from "zod";
var AprPathParamsSchema = z14.object({
  /**
   * Chain ID (e.g., 1 for Ethereum, 42161 for Arbitrum)
   * Must be a valid positive integer
   */
  chainId: z14.string().regex(/^\d+$/, "Chain ID must be a valid number").transform((val) => parseInt(val, 10)).pipe(z14.number().int().positive()),
  /**
   * NFT Position Manager token ID
   * Can be very large, so we keep as string for validation
   * Service layer will convert to bigint
   */
  nftId: z14.string().regex(/^\d+$/, "NFT ID must be a valid number").min(1, "NFT ID is required")
});

// src/types/positions/uniswapv3/create.ts
import { z as z15 } from "zod";
var ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
var txHashRegex = /^(0x)?[0-9a-fA-F]{64}$/;
var bigIntStringRegex = /^[0-9]+$/;
var CreateUniswapV3PositionRequestSchema = z15.object({
  // Position Config
  poolAddress: z15.string().regex(ethereumAddressRegex, "Pool address must be a valid Ethereum address"),
  tickUpper: z15.number().int("Tick upper must be an integer"),
  tickLower: z15.number().int("Tick lower must be an integer"),
  // Owner
  ownerAddress: z15.string().regex(ethereumAddressRegex, "Owner address must be a valid Ethereum address"),
  // Optional: Quote Token Selection
  quoteTokenAddress: z15.string().regex(ethereumAddressRegex, "Quote token address must be a valid Ethereum address").optional(),
  // INCREASE_LIQUIDITY Event Data
  increaseEvent: z15.object({
    timestamp: z15.string().datetime({ message: "Timestamp must be a valid ISO 8601 date string" }),
    blockNumber: z15.string().regex(bigIntStringRegex, "Block number must be a numeric string"),
    transactionIndex: z15.number().int("Transaction index must be an integer").nonnegative("Transaction index must be non-negative"),
    logIndex: z15.number().int("Log index must be an integer").nonnegative("Log index must be non-negative"),
    transactionHash: z15.string().regex(txHashRegex, "Transaction hash must be a valid hex string"),
    liquidity: z15.string().regex(bigIntStringRegex, "Liquidity must be a numeric string"),
    amount0: z15.string().regex(bigIntStringRegex, "Amount0 must be a numeric string"),
    amount1: z15.string().regex(bigIntStringRegex, "Amount1 must be a numeric string")
  })
});
var CreateUniswapV3PositionParamsSchema = z15.object({
  chainId: z15.string().regex(/^[0-9]+$/, "Chain ID must be a numeric string").transform((val) => parseInt(val, 10)).refine((val) => val > 0, { message: "Chain ID must be positive" }),
  nftId: z15.string().regex(/^[0-9]+$/, "NFT ID must be a numeric string").transform((val) => parseInt(val, 10)).refine((val) => val > 0, { message: "NFT ID must be positive" })
});

// src/types/positions/uniswapv3/get.ts
import { z as z16 } from "zod";
var GetUniswapV3PositionParamsSchema = z16.object({
  /**
   * EVM chain ID as a string (will be coerced to number)
   * Must be a valid positive integer
   */
  chainId: z16.string().transform((val, ctx) => {
    const parsed = parseInt(val, 10);
    if (isNaN(parsed) || parsed <= 0) {
      ctx.addIssue({
        code: z16.ZodIssueCode.custom,
        message: "chainId must be a valid positive integer"
      });
      return z16.NEVER;
    }
    return parsed;
  }),
  /**
   * Uniswap V3 NFT token ID
   * Must be a non-empty string representing a valid token ID
   */
  nftId: z16.string().min(1, "nftId must not be empty")
});

// src/types/positions/uniswapv3/update.ts
import { z as z17 } from "zod";
var ethereumAddressRegex2 = /^(0x)?[0-9a-fA-F]{40}$/;
var txHashRegex2 = /^(0x)?[0-9a-fA-F]{64}$/;
var bigIntStringRegex2 = /^[0-9]+$/;
var eventTypeSchema = z17.enum(["INCREASE_LIQUIDITY", "DECREASE_LIQUIDITY", "COLLECT"], {
  errorMap: () => ({
    message: "Event type must be INCREASE_LIQUIDITY, DECREASE_LIQUIDITY, or COLLECT"
  })
});
var eventSchema = z17.object({
  eventType: eventTypeSchema,
  timestamp: z17.string().datetime({ message: "Timestamp must be a valid ISO 8601 date string" }),
  blockNumber: z17.string().regex(bigIntStringRegex2, "Block number must be a numeric string"),
  transactionIndex: z17.number().int("Transaction index must be an integer").nonnegative("Transaction index must be non-negative"),
  logIndex: z17.number().int("Log index must be an integer").nonnegative("Log index must be non-negative"),
  transactionHash: z17.string().regex(txHashRegex2, "Transaction hash must be a valid 64-character hex string"),
  liquidity: z17.string().regex(bigIntStringRegex2, "Liquidity must be a numeric string").optional(),
  amount0: z17.string().regex(bigIntStringRegex2, "Amount0 must be a numeric string"),
  amount1: z17.string().regex(bigIntStringRegex2, "Amount1 must be a numeric string"),
  recipient: z17.string().regex(ethereumAddressRegex2, "Recipient must be a valid Ethereum address").optional()
}).superRefine((data, ctx) => {
  if (data.eventType === "INCREASE_LIQUIDITY" || data.eventType === "DECREASE_LIQUIDITY") {
    if (!data.liquidity) {
      ctx.addIssue({
        code: z17.ZodIssueCode.custom,
        path: ["liquidity"],
        message: `Liquidity is required for ${data.eventType} events`
      });
    }
    if (data.recipient) {
      ctx.addIssue({
        code: z17.ZodIssueCode.custom,
        path: ["recipient"],
        message: `Recipient is not allowed for ${data.eventType} events (only for COLLECT)`
      });
    }
  }
  if (data.eventType === "COLLECT") {
    if (!data.recipient) {
      ctx.addIssue({
        code: z17.ZodIssueCode.custom,
        path: ["recipient"],
        message: "Recipient is required for COLLECT events"
      });
    }
  }
});
var UpdateUniswapV3PositionRequestSchema = z17.object({
  events: z17.array(eventSchema).min(1, "At least one event is required").max(100, "Maximum 100 events allowed per request")
});
var UpdateUniswapV3PositionParamsSchema = z17.object({
  chainId: z17.string().regex(/^[0-9]+$/, "Chain ID must be a numeric string").transform((val) => parseInt(val, 10)).refine((val) => val > 0, { message: "Chain ID must be positive" }),
  nftId: z17.string().regex(/^[0-9]+$/, "NFT ID must be a numeric string").transform((val) => parseInt(val, 10)).refine((val) => val > 0, { message: "NFT ID must be positive" })
});

// src/types/positions/uniswapv3/delete.ts
import { z as z18 } from "zod";
var DeleteUniswapV3PositionParamsSchema = z18.object({
  /**
   * EVM chain ID as a string (will be coerced to number)
   * Must be a valid positive integer
   */
  chainId: z18.string().transform((val, ctx) => {
    const parsed = parseInt(val, 10);
    if (isNaN(parsed) || parsed <= 0) {
      ctx.addIssue({
        code: z18.ZodIssueCode.custom,
        message: "chainId must be a valid positive integer"
      });
      return z18.NEVER;
    }
    return parsed;
  }),
  /**
   * Uniswap V3 NFT token ID as a string (will be coerced to number)
   * Must be a valid positive integer
   */
  nftId: z18.string().transform((val, ctx) => {
    const parsed = parseInt(val, 10);
    if (isNaN(parsed) || parsed <= 0) {
      ctx.addIssue({
        code: z18.ZodIssueCode.custom,
        message: "nftId must be a valid positive integer"
      });
      return z18.NEVER;
    }
    return parsed;
  })
});

// src/types/positions/uniswapv3/import.ts
import { z as z19 } from "zod";
var ImportUniswapV3PositionRequestSchema = z19.object({
  chainId: z19.number().int("Chain ID must be an integer").positive("Chain ID must be positive"),
  nftId: z19.number().int("NFT ID must be an integer").positive("NFT ID must be positive")
});
export {
  ApiErrorCode,
  ApiErrorSchema,
  AprPathParamsSchema,
  CreateApiKeyRequestSchema,
  CreateErc20TokenRequestSchema,
  CreateUniswapV3PositionParamsSchema,
  CreateUniswapV3PositionRequestSchema,
  DEFAULT_PAGINATION,
  DeleteUniswapV3PositionParamsSchema,
  DiscoverUniswapV3PoolsQuerySchema,
  ErrorCodeToHttpStatus,
  GetTokenBalanceQuerySchema,
  GetUniswapV3PoolParamsSchema,
  GetUniswapV3PoolQuerySchema,
  GetUniswapV3PositionParamsSchema,
  HealthResponseSchema,
  HealthStatus,
  ImportUniswapV3PositionRequestSchema,
  LedgerPathParamsSchema,
  LinkWalletRequestSchema,
  ListPositionsQuerySchema,
  NonceSchema,
  PaginationParamsSchema,
  PositionSortBySchema,
  PositionStatusSchema,
  SearchErc20TokensQuerySchema,
  SignupRequestSchema,
  SortDirectionSchema,
  UpdateUniswapV3PositionParamsSchema,
  UpdateUniswapV3PositionRequestSchema,
  createErrorResponse,
  createPaginatedResponse,
  createPaginationMeta,
  createSuccessResponse
};
