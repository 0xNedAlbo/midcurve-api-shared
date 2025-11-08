"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ApiErrorCode: () => ApiErrorCode,
  ApiErrorSchema: () => ApiErrorSchema,
  AprPathParamsSchema: () => AprPathParamsSchema,
  CreateApiKeyRequestSchema: () => CreateApiKeyRequestSchema,
  CreateErc20TokenRequestSchema: () => CreateErc20TokenRequestSchema,
  CreateUniswapV3PositionParamsSchema: () => CreateUniswapV3PositionParamsSchema,
  CreateUniswapV3PositionRequestSchema: () => CreateUniswapV3PositionRequestSchema,
  DEFAULT_PAGINATION: () => DEFAULT_PAGINATION,
  DeleteUniswapV3PositionParamsSchema: () => DeleteUniswapV3PositionParamsSchema,
  DiscoverUniswapV3PoolsQuerySchema: () => DiscoverUniswapV3PoolsQuerySchema,
  ErrorCodeToHttpStatus: () => ErrorCodeToHttpStatus,
  GetTokenBalanceQuerySchema: () => GetTokenBalanceQuerySchema,
  GetUniswapV3PoolParamsSchema: () => GetUniswapV3PoolParamsSchema,
  GetUniswapV3PoolQuerySchema: () => GetUniswapV3PoolQuerySchema,
  GetUniswapV3PositionParamsSchema: () => GetUniswapV3PositionParamsSchema,
  HealthResponseSchema: () => HealthResponseSchema,
  HealthStatus: () => HealthStatus,
  ImportUniswapV3PositionRequestSchema: () => ImportUniswapV3PositionRequestSchema,
  LedgerPathParamsSchema: () => LedgerPathParamsSchema,
  LinkWalletRequestSchema: () => LinkWalletRequestSchema,
  ListPositionsQuerySchema: () => ListPositionsQuerySchema,
  NonceSchema: () => NonceSchema,
  PaginationParamsSchema: () => PaginationParamsSchema,
  PositionSortBySchema: () => PositionSortBySchema,
  PositionStatusSchema: () => PositionStatusSchema,
  SearchErc20TokensQuerySchema: () => SearchErc20TokensQuerySchema,
  SignupRequestSchema: () => SignupRequestSchema,
  SortDirectionSchema: () => SortDirectionSchema,
  UpdateUniswapV3PositionParamsSchema: () => UpdateUniswapV3PositionParamsSchema,
  UpdateUniswapV3PositionRequestSchema: () => UpdateUniswapV3PositionRequestSchema,
  createErrorResponse: () => createErrorResponse,
  createPaginatedResponse: () => createPaginatedResponse,
  createPaginationMeta: () => createPaginationMeta,
  createSuccessResponse: () => createSuccessResponse
});
module.exports = __toCommonJS(index_exports);

// src/types/common/api-response.ts
var import_zod = require("zod");
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
var ApiErrorSchema = import_zod.z.object({
  success: import_zod.z.literal(false),
  error: import_zod.z.object({
    code: import_zod.z.nativeEnum(ApiErrorCode),
    message: import_zod.z.string(),
    details: import_zod.z.unknown().optional()
  }),
  meta: import_zod.z.object({
    requestId: import_zod.z.string().optional(),
    timestamp: import_zod.z.string().optional()
  }).catchall(import_zod.z.unknown()).optional()
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
var import_zod2 = require("zod");
var DEFAULT_PAGINATION = {
  LIMIT: 20,
  MAX_LIMIT: 100,
  OFFSET: 0
};
var PaginationParamsSchema = import_zod2.z.object({
  limit: import_zod2.z.string().optional().transform((val) => val ? parseInt(val, 10) : DEFAULT_PAGINATION.LIMIT).pipe(
    import_zod2.z.number().int().positive().max(DEFAULT_PAGINATION.MAX_LIMIT).default(DEFAULT_PAGINATION.LIMIT)
  ),
  offset: import_zod2.z.string().optional().transform((val) => val ? parseInt(val, 10) : DEFAULT_PAGINATION.OFFSET).pipe(
    import_zod2.z.number().int().nonnegative().default(DEFAULT_PAGINATION.OFFSET)
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
var import_zod3 = require("zod");
var NonceSchema = import_zod3.z.object({
  nonce: import_zod3.z.string().regex(/^siwe_[A-Za-z0-9_-]{32}$/, "Invalid nonce format")
});

// src/types/auth/api-key.ts
var import_zod4 = require("zod");
var CreateApiKeyRequestSchema = import_zod4.z.object({
  name: import_zod4.z.string().min(1, "Name is required").max(100, "Name too long")
});

// src/types/auth/link-wallet.ts
var import_zod5 = require("zod");
var LinkWalletRequestSchema = import_zod5.z.object({
  message: import_zod5.z.string().min(1, "SIWE message is required"),
  signature: import_zod5.z.string().regex(/^0x[a-fA-F0-9]{130}$/, "Invalid signature format")
});

// src/types/auth/signup.ts
var import_zod6 = require("zod");
var SignupRequestSchema = import_zod6.z.object({
  address: import_zod6.z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  chainId: import_zod6.z.number().int().positive(),
  name: import_zod6.z.string().optional()
});

// src/types/health/health.ts
var import_zod7 = require("zod");
var HealthStatus = /* @__PURE__ */ ((HealthStatus2) => {
  HealthStatus2["HEALTHY"] = "healthy";
  HealthStatus2["DEGRADED"] = "degraded";
  HealthStatus2["UNHEALTHY"] = "unhealthy";
  return HealthStatus2;
})(HealthStatus || {});
var HealthResponseSchema = import_zod7.z.object({
  status: import_zod7.z.enum(["healthy", "degraded", "unhealthy"]),
  timestamp: import_zod7.z.string().datetime(),
  environment: import_zod7.z.string(),
  version: import_zod7.z.string().optional(),
  uptime: import_zod7.z.number().optional()
});

// src/types/tokens/erc20.ts
var import_zod8 = require("zod");
var CreateErc20TokenRequestSchema = import_zod8.z.object({
  address: import_zod8.z.string().min(1, "Address is required").regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format"),
  chainId: import_zod8.z.number().int("Chain ID must be an integer").positive("Chain ID must be positive")
});
var SearchErc20TokensQuerySchema = import_zod8.z.object({
  chainId: import_zod8.z.coerce.number().int("Chain ID must be an integer").positive("Chain ID must be positive"),
  query: import_zod8.z.string().min(1, "Query must not be empty").optional(),
  address: import_zod8.z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format").optional()
}).refine(
  (data) => data.query !== void 0 || data.address !== void 0,
  {
    message: "At least one of query or address must be provided",
    path: ["query", "address"]
  }
);

// src/types/tokens/token-balance.ts
var import_zod9 = require("zod");
var GetTokenBalanceQuerySchema = import_zod9.z.object({
  /**
   * Wallet address to check balance for (will be normalized with EIP-55)
   * Example: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
   */
  walletAddress: import_zod9.z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  /**
   * ERC-20 token contract address (will be normalized with EIP-55)
   * Example: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" (WETH)
   */
  tokenAddress: import_zod9.z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  /**
   * EVM chain ID
   * Example: 1 (Ethereum), 42161 (Arbitrum), 8453 (Base)
   */
  chainId: import_zod9.z.string().transform((val) => parseInt(val, 10))
});

// src/types/pools/uniswapv3.ts
var import_zod10 = require("zod");
var GetUniswapV3PoolParamsSchema = import_zod10.z.object({
  chainId: import_zod10.z.string().min(1, "chainId is required").regex(/^\d+$/, "chainId must be a positive integer").transform((val) => parseInt(val, 10)).pipe(
    import_zod10.z.number().int("chainId must be an integer").positive("chainId must be positive")
  ),
  address: import_zod10.z.string().min(1, "Pool address is required").regex(/^0x[a-fA-F0-9]{40}$/, "Invalid pool address format")
});
var GetUniswapV3PoolQuerySchema = import_zod10.z.object({
  metrics: import_zod10.z.string().optional().default("false").transform((val) => val === "true").pipe(import_zod10.z.boolean()),
  fees: import_zod10.z.string().optional().default("false").transform((val) => val === "true").pipe(import_zod10.z.boolean())
});

// src/types/pools/uniswapv3-discovery.ts
var import_zod11 = require("zod");
var DiscoverUniswapV3PoolsQuerySchema = import_zod11.z.object({
  chainId: import_zod11.z.coerce.number().int("Chain ID must be an integer").positive("Chain ID must be positive"),
  tokenA: import_zod11.z.string().min(1, "tokenA is required").regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format for tokenA"),
  tokenB: import_zod11.z.string().min(1, "tokenB is required").regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format for tokenB")
});

// src/types/positions/common/list.ts
var import_zod12 = require("zod");
var PositionStatusSchema = import_zod12.z.enum(["active", "closed", "all"]);
var PositionSortBySchema = import_zod12.z.enum([
  "createdAt",
  "positionOpenedAt",
  "currentValue",
  "unrealizedPnl"
]);
var SortDirectionSchema = import_zod12.z.enum(["asc", "desc"]);
var ListPositionsQuerySchema = PaginationParamsSchema.extend({
  protocols: import_zod12.z.string().optional().transform((val) => val ? val.split(",").map((p) => p.trim()) : void 0).pipe(import_zod12.z.array(import_zod12.z.string()).optional()),
  status: import_zod12.z.string().optional().default("all").transform((val) => val).pipe(PositionStatusSchema),
  sortBy: import_zod12.z.string().optional().default("createdAt").transform(
    (val) => val
  ).pipe(PositionSortBySchema),
  sortDirection: import_zod12.z.string().optional().default("desc").transform((val) => val).pipe(SortDirectionSchema)
});

// src/types/positions/common/ledger.ts
var import_zod13 = require("zod");
var LedgerPathParamsSchema = import_zod13.z.object({
  /**
   * Chain ID (e.g., 1 for Ethereum, 42161 for Arbitrum)
   * Must be a valid positive integer
   */
  chainId: import_zod13.z.string().regex(/^\d+$/, "Chain ID must be a valid number").transform((val) => parseInt(val, 10)).pipe(import_zod13.z.number().int().positive()),
  /**
   * NFT Position Manager token ID
   * Can be very large, so we keep as string for validation
   * Service layer will convert to bigint
   */
  nftId: import_zod13.z.string().regex(/^\d+$/, "NFT ID must be a valid number").min(1, "NFT ID is required")
});

// src/types/positions/common/apr.ts
var import_zod14 = require("zod");
var AprPathParamsSchema = import_zod14.z.object({
  /**
   * Chain ID (e.g., 1 for Ethereum, 42161 for Arbitrum)
   * Must be a valid positive integer
   */
  chainId: import_zod14.z.string().regex(/^\d+$/, "Chain ID must be a valid number").transform((val) => parseInt(val, 10)).pipe(import_zod14.z.number().int().positive()),
  /**
   * NFT Position Manager token ID
   * Can be very large, so we keep as string for validation
   * Service layer will convert to bigint
   */
  nftId: import_zod14.z.string().regex(/^\d+$/, "NFT ID must be a valid number").min(1, "NFT ID is required")
});

// src/types/positions/uniswapv3/create.ts
var import_zod15 = require("zod");
var ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
var txHashRegex = /^(0x)?[0-9a-fA-F]{64}$/;
var bigIntStringRegex = /^[0-9]+$/;
var CreateUniswapV3PositionRequestSchema = import_zod15.z.object({
  // Position Config
  poolAddress: import_zod15.z.string().regex(ethereumAddressRegex, "Pool address must be a valid Ethereum address"),
  tickUpper: import_zod15.z.number().int("Tick upper must be an integer"),
  tickLower: import_zod15.z.number().int("Tick lower must be an integer"),
  // Owner
  ownerAddress: import_zod15.z.string().regex(ethereumAddressRegex, "Owner address must be a valid Ethereum address"),
  // Optional: Quote Token Selection
  quoteTokenAddress: import_zod15.z.string().regex(ethereumAddressRegex, "Quote token address must be a valid Ethereum address").optional(),
  // INCREASE_LIQUIDITY Event Data
  increaseEvent: import_zod15.z.object({
    timestamp: import_zod15.z.string().datetime({ message: "Timestamp must be a valid ISO 8601 date string" }),
    blockNumber: import_zod15.z.string().regex(bigIntStringRegex, "Block number must be a numeric string"),
    transactionIndex: import_zod15.z.number().int("Transaction index must be an integer").nonnegative("Transaction index must be non-negative"),
    logIndex: import_zod15.z.number().int("Log index must be an integer").nonnegative("Log index must be non-negative"),
    transactionHash: import_zod15.z.string().regex(txHashRegex, "Transaction hash must be a valid hex string"),
    liquidity: import_zod15.z.string().regex(bigIntStringRegex, "Liquidity must be a numeric string"),
    amount0: import_zod15.z.string().regex(bigIntStringRegex, "Amount0 must be a numeric string"),
    amount1: import_zod15.z.string().regex(bigIntStringRegex, "Amount1 must be a numeric string")
  })
});
var CreateUniswapV3PositionParamsSchema = import_zod15.z.object({
  chainId: import_zod15.z.string().regex(/^[0-9]+$/, "Chain ID must be a numeric string").transform((val) => parseInt(val, 10)).refine((val) => val > 0, { message: "Chain ID must be positive" }),
  nftId: import_zod15.z.string().regex(/^[0-9]+$/, "NFT ID must be a numeric string").transform((val) => parseInt(val, 10)).refine((val) => val > 0, { message: "NFT ID must be positive" })
});

// src/types/positions/uniswapv3/get.ts
var import_zod16 = require("zod");
var GetUniswapV3PositionParamsSchema = import_zod16.z.object({
  /**
   * EVM chain ID as a string (will be coerced to number)
   * Must be a valid positive integer
   */
  chainId: import_zod16.z.string().transform((val, ctx) => {
    const parsed = parseInt(val, 10);
    if (isNaN(parsed) || parsed <= 0) {
      ctx.addIssue({
        code: import_zod16.z.ZodIssueCode.custom,
        message: "chainId must be a valid positive integer"
      });
      return import_zod16.z.NEVER;
    }
    return parsed;
  }),
  /**
   * Uniswap V3 NFT token ID
   * Must be a non-empty string representing a valid token ID
   */
  nftId: import_zod16.z.string().min(1, "nftId must not be empty")
});

// src/types/positions/uniswapv3/update.ts
var import_zod17 = require("zod");
var ethereumAddressRegex2 = /^(0x)?[0-9a-fA-F]{40}$/;
var txHashRegex2 = /^(0x)?[0-9a-fA-F]{64}$/;
var bigIntStringRegex2 = /^[0-9]+$/;
var eventTypeSchema = import_zod17.z.enum(["INCREASE_LIQUIDITY", "DECREASE_LIQUIDITY", "COLLECT"], {
  errorMap: () => ({
    message: "Event type must be INCREASE_LIQUIDITY, DECREASE_LIQUIDITY, or COLLECT"
  })
});
var eventSchema = import_zod17.z.object({
  eventType: eventTypeSchema,
  timestamp: import_zod17.z.string().datetime({ message: "Timestamp must be a valid ISO 8601 date string" }),
  blockNumber: import_zod17.z.string().regex(bigIntStringRegex2, "Block number must be a numeric string"),
  transactionIndex: import_zod17.z.number().int("Transaction index must be an integer").nonnegative("Transaction index must be non-negative"),
  logIndex: import_zod17.z.number().int("Log index must be an integer").nonnegative("Log index must be non-negative"),
  transactionHash: import_zod17.z.string().regex(txHashRegex2, "Transaction hash must be a valid 64-character hex string"),
  liquidity: import_zod17.z.string().regex(bigIntStringRegex2, "Liquidity must be a numeric string").optional(),
  amount0: import_zod17.z.string().regex(bigIntStringRegex2, "Amount0 must be a numeric string"),
  amount1: import_zod17.z.string().regex(bigIntStringRegex2, "Amount1 must be a numeric string"),
  recipient: import_zod17.z.string().regex(ethereumAddressRegex2, "Recipient must be a valid Ethereum address").optional()
}).superRefine((data, ctx) => {
  if (data.eventType === "INCREASE_LIQUIDITY" || data.eventType === "DECREASE_LIQUIDITY") {
    if (!data.liquidity) {
      ctx.addIssue({
        code: import_zod17.z.ZodIssueCode.custom,
        path: ["liquidity"],
        message: `Liquidity is required for ${data.eventType} events`
      });
    }
    if (data.recipient) {
      ctx.addIssue({
        code: import_zod17.z.ZodIssueCode.custom,
        path: ["recipient"],
        message: `Recipient is not allowed for ${data.eventType} events (only for COLLECT)`
      });
    }
  }
  if (data.eventType === "COLLECT") {
    if (!data.recipient) {
      ctx.addIssue({
        code: import_zod17.z.ZodIssueCode.custom,
        path: ["recipient"],
        message: "Recipient is required for COLLECT events"
      });
    }
  }
});
var UpdateUniswapV3PositionRequestSchema = import_zod17.z.object({
  events: import_zod17.z.array(eventSchema).min(1, "At least one event is required").max(100, "Maximum 100 events allowed per request")
});
var UpdateUniswapV3PositionParamsSchema = import_zod17.z.object({
  chainId: import_zod17.z.string().regex(/^[0-9]+$/, "Chain ID must be a numeric string").transform((val) => parseInt(val, 10)).refine((val) => val > 0, { message: "Chain ID must be positive" }),
  nftId: import_zod17.z.string().regex(/^[0-9]+$/, "NFT ID must be a numeric string").transform((val) => parseInt(val, 10)).refine((val) => val > 0, { message: "NFT ID must be positive" })
});

// src/types/positions/uniswapv3/delete.ts
var import_zod18 = require("zod");
var DeleteUniswapV3PositionParamsSchema = import_zod18.z.object({
  /**
   * EVM chain ID as a string (will be coerced to number)
   * Must be a valid positive integer
   */
  chainId: import_zod18.z.string().transform((val, ctx) => {
    const parsed = parseInt(val, 10);
    if (isNaN(parsed) || parsed <= 0) {
      ctx.addIssue({
        code: import_zod18.z.ZodIssueCode.custom,
        message: "chainId must be a valid positive integer"
      });
      return import_zod18.z.NEVER;
    }
    return parsed;
  }),
  /**
   * Uniswap V3 NFT token ID as a string (will be coerced to number)
   * Must be a valid positive integer
   */
  nftId: import_zod18.z.string().transform((val, ctx) => {
    const parsed = parseInt(val, 10);
    if (isNaN(parsed) || parsed <= 0) {
      ctx.addIssue({
        code: import_zod18.z.ZodIssueCode.custom,
        message: "nftId must be a valid positive integer"
      });
      return import_zod18.z.NEVER;
    }
    return parsed;
  })
});

// src/types/positions/uniswapv3/import.ts
var import_zod19 = require("zod");
var ImportUniswapV3PositionRequestSchema = import_zod19.z.object({
  chainId: import_zod19.z.number().int("Chain ID must be an integer").positive("Chain ID must be positive"),
  nftId: import_zod19.z.number().int("NFT ID must be an integer").positive("NFT ID must be positive")
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
