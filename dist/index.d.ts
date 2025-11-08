import { z } from 'zod';
import { AuthWalletAddress, UniswapV3Pool, PoolDiscoveryResult, AnyPosition, UniswapV3Position } from '@midcurve/shared';

interface ApiResponse<T> {
    success: true;
    data: T;
    meta?: {
        requestId?: string;
        timestamp?: string;
        [key: string]: unknown;
    };
}
interface ApiError {
    success: false;
    error: {
        code: string;
        message: string;
        details?: unknown;
    };
    meta?: {
        requestId?: string;
        timestamp?: string;
    };
}
type ApiResult<T> = ApiResponse<T> | ApiError;
declare enum ApiErrorCode {
    BAD_REQUEST = "BAD_REQUEST",
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    NOT_FOUND = "NOT_FOUND",
    CONFLICT = "CONFLICT",
    UNPROCESSABLE_ENTITY = "UNPROCESSABLE_ENTITY",
    TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    BAD_GATEWAY = "BAD_GATEWAY",
    SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
    EXTERNAL_SERVICE_ERROR = "EXTERNAL_SERVICE_ERROR",
    VALIDATION_ERROR = "VALIDATION_ERROR",
    TOKEN_NOT_FOUND = "TOKEN_NOT_FOUND",
    POOL_NOT_FOUND = "POOL_NOT_FOUND",
    POSITION_NOT_FOUND = "POSITION_NOT_FOUND",
    CHAIN_NOT_SUPPORTED = "CHAIN_NOT_SUPPORTED",
    INVALID_ADDRESS = "INVALID_ADDRESS",
    WALLET_ALREADY_REGISTERED = "WALLET_ALREADY_REGISTERED",
    INVALID_SIGNATURE = "INVALID_SIGNATURE",
    NONCE_INVALID = "NONCE_INVALID",
    NONCE_EXPIRED = "NONCE_EXPIRED",
    API_KEY_NOT_FOUND = "API_KEY_NOT_FOUND",
    WALLET_NOT_FOUND = "WALLET_NOT_FOUND",
    INVALID_SIWE_MESSAGE = "INVALID_SIWE_MESSAGE"
}
declare const ApiErrorSchema: z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodObject<{
        code: z.ZodNativeEnum<typeof ApiErrorCode>;
        message: z.ZodString;
        details: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        code: ApiErrorCode;
        message: string;
        details?: unknown;
    }, {
        code: ApiErrorCode;
        message: string;
        details?: unknown;
    }>;
    meta: z.ZodOptional<z.ZodObject<{
        requestId: z.ZodOptional<z.ZodString>;
        timestamp: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodUnknown, z.objectOutputType<{
        requestId: z.ZodOptional<z.ZodString>;
        timestamp: z.ZodOptional<z.ZodString>;
    }, z.ZodUnknown, "strip">, z.objectInputType<{
        requestId: z.ZodOptional<z.ZodString>;
        timestamp: z.ZodOptional<z.ZodString>;
    }, z.ZodUnknown, "strip">>>;
}, "strip", z.ZodTypeAny, {
    success: false;
    error: {
        code: ApiErrorCode;
        message: string;
        details?: unknown;
    };
    meta?: z.objectOutputType<{
        requestId: z.ZodOptional<z.ZodString>;
        timestamp: z.ZodOptional<z.ZodString>;
    }, z.ZodUnknown, "strip"> | undefined;
}, {
    success: false;
    error: {
        code: ApiErrorCode;
        message: string;
        details?: unknown;
    };
    meta?: z.objectInputType<{
        requestId: z.ZodOptional<z.ZodString>;
        timestamp: z.ZodOptional<z.ZodString>;
    }, z.ZodUnknown, "strip"> | undefined;
}>;
declare function createSuccessResponse<T>(data: T, meta?: ApiResponse<T>['meta']): ApiResponse<T>;
declare function createErrorResponse(code: ApiErrorCode, message: string, details?: unknown, meta?: ApiError['meta']): ApiError;
declare const ErrorCodeToHttpStatus: Record<ApiErrorCode, number>;

interface PaginationMeta {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
}
interface PaginatedResponse<T> {
    success: true;
    data: T[];
    pagination: PaginationMeta;
    meta?: {
        requestId?: string;
        timestamp?: string;
        [key: string]: unknown;
    };
}
interface PaginationParams {
    limit?: number;
    offset?: number;
}
declare const DEFAULT_PAGINATION: {
    readonly LIMIT: 20;
    readonly MAX_LIMIT: 100;
    readonly OFFSET: 0;
};
declare const PaginationParamsSchema: z.ZodObject<{
    limit: z.ZodPipeline<z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>, z.ZodDefault<z.ZodNumber>>;
    offset: z.ZodPipeline<z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>, z.ZodDefault<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    offset: number;
}, {
    limit?: string | undefined;
    offset?: string | undefined;
}>;
declare function createPaginationMeta(total: number, limit: number, offset: number): PaginationMeta;
declare function createPaginatedResponse<T>(data: T[], total: number, limit: number, offset: number, meta?: PaginatedResponse<T>['meta']): PaginatedResponse<T>;

type SerializedValue = string | number | boolean | null | undefined | SerializedValue[] | {
    [key: string]: SerializedValue;
};
type BigIntToString<T> = T extends bigint ? string : T extends Date ? string : T extends Array<infer U> ? Array<BigIntToString<U>> : T extends object ? {
    [K in keyof T]: BigIntToString<T[K]>;
} : T;

interface NonceData {
    nonce: string;
}
type NonceResponse = ApiResponse<NonceData>;
declare const NonceSchema: z.ZodObject<{
    nonce: z.ZodString;
}, "strip", z.ZodTypeAny, {
    nonce: string;
}, {
    nonce: string;
}>;

interface UserData {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    wallets: AuthWalletAddress[];
    createdAt: string;
    updatedAt: string;
}
type GetCurrentUserResponse = ApiResponse<UserData>;

interface CreateApiKeyRequest {
    name: string;
}
interface CreateApiKeyData {
    id: string;
    name: string;
    key: string;
    keyPrefix: string;
    createdAt: string;
}
interface CreateApiKeyResponse extends ApiResponse<CreateApiKeyData> {
    meta?: {
        warning: string;
        timestamp?: string;
        requestId?: string;
    };
}
interface ApiKeyDisplay {
    id: string;
    name: string;
    keyPrefix: string;
    lastUsed: string | null;
    createdAt: string;
    updatedAt: string;
}
type ListApiKeysResponse = ApiResponse<ApiKeyDisplay[]>;
interface RevokeApiKeyData {
    message: string;
}
type RevokeApiKeyResponse = ApiResponse<RevokeApiKeyData>;
declare const CreateApiKeyRequestSchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;

interface LinkWalletRequest {
    message: string;
    signature: string;
}
interface LinkWalletData {
    id: string;
    address: string;
    chainId: number;
    isPrimary: boolean;
    createdAt: string;
}
type LinkWalletResponse = ApiResponse<LinkWalletData>;
type ListWalletsResponse = ApiResponse<AuthWalletAddress[]>;
type SetPrimaryWalletResponse = ApiResponse<LinkWalletData>;
declare const LinkWalletRequestSchema: z.ZodObject<{
    message: z.ZodString;
    signature: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    signature: string;
}, {
    message: string;
    signature: string;
}>;

interface AuthenticatedUser {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    wallets?: AuthWalletAddress[];
}

declare const SignupRequestSchema: z.ZodObject<{
    address: z.ZodString;
    chainId: z.ZodNumber;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    address: string;
    chainId: number;
    name?: string | undefined;
}, {
    address: string;
    chainId: number;
    name?: string | undefined;
}>;
type SignupRequest = z.infer<typeof SignupRequestSchema>;
interface SignupResponse {
    user: {
        id: string;
        name: string | null;
        email: string | null;
        image: string | null;
        createdAt: string;
        updatedAt: string;
    };
    walletAddress: {
        id: string;
        address: string;
        chainId: number;
        isPrimary: boolean;
        createdAt: string;
        updatedAt: string;
    };
}

declare enum HealthStatus {
    HEALTHY = "healthy",
    DEGRADED = "degraded",
    UNHEALTHY = "unhealthy"
}
declare const HealthResponseSchema: z.ZodObject<{
    status: z.ZodEnum<["healthy", "degraded", "unhealthy"]>;
    timestamp: z.ZodString;
    environment: z.ZodString;
    version: z.ZodOptional<z.ZodString>;
    uptime: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    timestamp: string;
    status: "healthy" | "degraded" | "unhealthy";
    environment: string;
    version?: string | undefined;
    uptime?: number | undefined;
}, {
    timestamp: string;
    status: "healthy" | "degraded" | "unhealthy";
    environment: string;
    version?: string | undefined;
    uptime?: number | undefined;
}>;
type HealthResponseData = z.infer<typeof HealthResponseSchema>;
interface HealthCheckData {
    status: HealthStatus;
    timestamp: string;
    environment: string;
    version?: string;
    uptime?: number;
}
type HealthResponse = ApiResponse<HealthResponseData>;

interface CreateErc20TokenRequest {
    address: string;
    chainId: number;
}
declare const CreateErc20TokenRequestSchema: z.ZodObject<{
    address: z.ZodString;
    chainId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    address: string;
    chainId: number;
}, {
    address: string;
    chainId: number;
}>;
interface CreateErc20TokenData {
    id: string;
    tokenType: 'erc20';
    name: string;
    symbol: string;
    decimals: number;
    logoUrl?: string;
    coingeckoId?: string;
    marketCap?: number;
    config: {
        address: string;
        chainId: number;
    };
    createdAt: string;
    updatedAt: string;
}
type CreateErc20TokenResponse = ApiResponse<CreateErc20TokenData>;
interface TokenSearchCandidate {
    coingeckoId: string;
    symbol: string;
    name: string;
    address: string;
    chainId: number;
    logoUrl?: string;
    marketCap?: number;
}
interface SearchErc20TokensQuery {
    chainId: number;
    query?: string;
    address?: string;
}
declare const SearchErc20TokensQuerySchema: z.ZodEffects<z.ZodObject<{
    chainId: z.ZodNumber;
    query: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    chainId: number;
    address?: string | undefined;
    query?: string | undefined;
}, {
    chainId: number;
    address?: string | undefined;
    query?: string | undefined;
}>, {
    chainId: number;
    address?: string | undefined;
    query?: string | undefined;
}, {
    chainId: number;
    address?: string | undefined;
    query?: string | undefined;
}>;
type SearchErc20TokensData = TokenSearchCandidate[];
interface SearchErc20TokensResponse extends ApiResponse<SearchErc20TokensData> {
    meta?: {
        count: number;
        limit: number;
        timestamp: string;
    };
}

declare const GetTokenBalanceQuerySchema: z.ZodObject<{
    walletAddress: z.ZodString;
    tokenAddress: z.ZodString;
    chainId: z.ZodEffects<z.ZodString, number, string>;
}, "strip", z.ZodTypeAny, {
    chainId: number;
    walletAddress: string;
    tokenAddress: string;
}, {
    chainId: string;
    walletAddress: string;
    tokenAddress: string;
}>;
type GetTokenBalanceQuery = z.infer<typeof GetTokenBalanceQuerySchema>;
interface TokenBalanceData {
    walletAddress: string;
    tokenAddress: string;
    chainId: number;
    balance: string;
    timestamp: string;
    cached: boolean;
}
type GetTokenBalanceResponse = ApiResponse<TokenBalanceData>;

interface GetUniswapV3PoolParams {
    chainId: string;
    address: string;
}
interface GetUniswapV3PoolQuery {
    metrics?: boolean;
    fees?: boolean;
}
interface GetUniswapV3PoolData {
    pool: UniswapV3Pool;
    metrics?: {
        tvlUSD: string;
        volumeUSD: string;
        feesUSD: string;
    };
    feeData?: {
        token0DailyVolume: string;
        token1DailyVolume: string;
        token0Price: string;
        token1Price: string;
        poolLiquidity: string;
        calculatedAt: string;
    };
}
declare const GetUniswapV3PoolParamsSchema: z.ZodObject<{
    chainId: z.ZodPipeline<z.ZodEffects<z.ZodString, number, string>, z.ZodNumber>;
    address: z.ZodString;
}, "strip", z.ZodTypeAny, {
    address: string;
    chainId: number;
}, {
    address: string;
    chainId: string;
}>;
declare const GetUniswapV3PoolQuerySchema: z.ZodObject<{
    metrics: z.ZodPipeline<z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>, z.ZodBoolean>;
    fees: z.ZodPipeline<z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>, z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    metrics: boolean;
    fees: boolean;
}, {
    metrics?: string | undefined;
    fees?: string | undefined;
}>;

interface DiscoverUniswapV3PoolsQuery {
    chainId: number;
    tokenA: string;
    tokenB: string;
}
type DiscoverUniswapV3PoolsData = PoolDiscoveryResult<'uniswapv3'>[];
interface DiscoverUniswapV3PoolsResponse extends ApiResponse<DiscoverUniswapV3PoolsData> {
    meta?: {
        count: number;
        chainId: number;
        timestamp: string;
    };
}
declare const DiscoverUniswapV3PoolsQuerySchema: z.ZodObject<{
    chainId: z.ZodNumber;
    tokenA: z.ZodString;
    tokenB: z.ZodString;
}, "strip", z.ZodTypeAny, {
    chainId: number;
    tokenA: string;
    tokenB: string;
}, {
    chainId: number;
    tokenA: string;
    tokenB: string;
}>;

interface GetPoolMetricsRequest {
    chainId: string;
    poolAddress: string;
}
interface PoolMetricsData {
    chainId: number;
    poolAddress: string;
    tvlUSD: string;
    volumeUSD: string;
    feesUSD: string;
    volumeToken0: string;
    volumeToken1: string;
    token0Price: string;
    token1Price: string;
    calculatedAt: Date;
}
type GetPoolMetricsResponse = ApiResponse<PoolMetricsData>;

interface GetPoolPriceRequest {
    chainId: string;
    poolAddress: string;
}
interface GetPoolPriceResponse {
    sqrtPriceX96: string;
    currentTick: number;
    timestamp: string;
}
interface GetPoolPriceError {
    code: 'INVALID_CHAIN' | 'INVALID_ADDRESS' | 'POOL_NOT_FOUND' | 'RPC_ERROR';
    message: string;
    details?: unknown;
}

type PositionStatus = 'active' | 'closed' | 'all';
type PositionSortBy = 'createdAt' | 'positionOpenedAt' | 'currentValue' | 'unrealizedPnl';
type SortDirection = 'asc' | 'desc';
interface ListPositionsParams {
    protocols?: string[];
    status?: PositionStatus;
    sortBy?: PositionSortBy;
    sortDirection?: SortDirection;
    limit?: number;
    offset?: number;
}
type ListPositionData = BigIntToString<AnyPosition>;
type ListPositionsResponse = PaginatedResponse<ListPositionData> & {
    meta: {
        timestamp: string;
        filters: {
            protocols?: string[];
            status: PositionStatus;
            sortBy: PositionSortBy;
            sortDirection: SortDirection;
        };
    };
};
declare const PositionStatusSchema: z.ZodEnum<["active", "closed", "all"]>;
declare const PositionSortBySchema: z.ZodEnum<["createdAt", "positionOpenedAt", "currentValue", "unrealizedPnl"]>;
declare const SortDirectionSchema: z.ZodEnum<["asc", "desc"]>;
declare const ListPositionsQuerySchema: z.ZodObject<{
    limit: z.ZodPipeline<z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>, z.ZodDefault<z.ZodNumber>>;
    offset: z.ZodPipeline<z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>, z.ZodDefault<z.ZodNumber>>;
} & {
    protocols: z.ZodPipeline<z.ZodEffects<z.ZodOptional<z.ZodString>, string[] | undefined, string | undefined>, z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    status: z.ZodPipeline<z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, "active" | "closed" | "all", string | undefined>, z.ZodEnum<["active", "closed", "all"]>>;
    sortBy: z.ZodPipeline<z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, "createdAt" | "positionOpenedAt" | "currentValue" | "unrealizedPnl", string | undefined>, z.ZodEnum<["createdAt", "positionOpenedAt", "currentValue", "unrealizedPnl"]>>;
    sortDirection: z.ZodPipeline<z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, "asc" | "desc", string | undefined>, z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "closed" | "all";
    limit: number;
    offset: number;
    sortBy: "createdAt" | "positionOpenedAt" | "currentValue" | "unrealizedPnl";
    sortDirection: "asc" | "desc";
    protocols?: string[] | undefined;
}, {
    status?: string | undefined;
    limit?: string | undefined;
    offset?: string | undefined;
    protocols?: string | undefined;
    sortBy?: string | undefined;
    sortDirection?: string | undefined;
}>;
type ListPositionsQuery = z.infer<typeof ListPositionsQuerySchema>;

interface LedgerEventData {
    id: string;
    createdAt: string;
    updatedAt: string;
    positionId: string;
    protocol: 'uniswapv3';
    previousId: string | null;
    timestamp: string;
    eventType: 'INCREASE_POSITION' | 'DECREASE_POSITION' | 'COLLECT';
    inputHash: string;
    poolPrice: string;
    token0Amount: string;
    token1Amount: string;
    tokenValue: string;
    rewards: Array<{
        tokenId: string;
        tokenAmount: string;
        tokenValue: string;
    }>;
    deltaCostBasis: string;
    costBasisAfter: string;
    deltaPnl: string;
    pnlAfter: string;
    config: SerializedValue;
    state: SerializedValue;
}
interface LedgerPathParams {
    chainId: string;
    nftId: string;
}
interface LedgerEventsResponse extends ApiResponse<LedgerEventData[]> {
    meta?: {
        timestamp: string;
        count: number;
        requestId?: string;
    };
}
declare const LedgerPathParamsSchema: z.ZodObject<{
    chainId: z.ZodPipeline<z.ZodEffects<z.ZodString, number, string>, z.ZodNumber>;
    nftId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    chainId: number;
    nftId: string;
}, {
    chainId: string;
    nftId: string;
}>;

interface AprPeriodData {
    id: string;
    createdAt: string;
    updatedAt: string;
    positionId: string;
    startEventId: string;
    endEventId: string;
    startTimestamp: string;
    endTimestamp: string;
    durationSeconds: number;
    costBasis: string;
    collectedFeeValue: string;
    aprBps: number;
    eventCount: number;
}
interface AprPathParams {
    chainId: string;
    nftId: string;
}
interface AprPeriodsResponse extends ApiResponse<AprPeriodData[]> {
    meta?: {
        timestamp: string;
        count: number;
        requestId?: string;
    };
}
declare const AprPathParamsSchema: z.ZodObject<{
    chainId: z.ZodPipeline<z.ZodEffects<z.ZodString, number, string>, z.ZodNumber>;
    nftId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    chainId: number;
    nftId: string;
}, {
    chainId: string;
    nftId: string;
}>;

interface CreateUniswapV3PositionRequest {
    poolAddress: string;
    tickUpper: number;
    tickLower: number;
    ownerAddress: string;
    quoteTokenAddress?: string;
    increaseEvent: {
        timestamp: string;
        blockNumber: string;
        transactionIndex: number;
        logIndex: number;
        transactionHash: string;
        liquidity: string;
        amount0: string;
        amount1: string;
    };
}
type CreateUniswapV3PositionData = BigIntToString<UniswapV3Position>;
type CreateUniswapV3PositionResponse = ApiResponse<CreateUniswapV3PositionData>;
declare const CreateUniswapV3PositionRequestSchema: z.ZodObject<{
    poolAddress: z.ZodString;
    tickUpper: z.ZodNumber;
    tickLower: z.ZodNumber;
    ownerAddress: z.ZodString;
    quoteTokenAddress: z.ZodOptional<z.ZodString>;
    increaseEvent: z.ZodObject<{
        timestamp: z.ZodString;
        blockNumber: z.ZodString;
        transactionIndex: z.ZodNumber;
        logIndex: z.ZodNumber;
        transactionHash: z.ZodString;
        liquidity: z.ZodString;
        amount0: z.ZodString;
        amount1: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
        blockNumber: string;
        transactionIndex: number;
        logIndex: number;
        transactionHash: string;
        liquidity: string;
        amount0: string;
        amount1: string;
    }, {
        timestamp: string;
        blockNumber: string;
        transactionIndex: number;
        logIndex: number;
        transactionHash: string;
        liquidity: string;
        amount0: string;
        amount1: string;
    }>;
}, "strip", z.ZodTypeAny, {
    poolAddress: string;
    tickUpper: number;
    tickLower: number;
    ownerAddress: string;
    increaseEvent: {
        timestamp: string;
        blockNumber: string;
        transactionIndex: number;
        logIndex: number;
        transactionHash: string;
        liquidity: string;
        amount0: string;
        amount1: string;
    };
    quoteTokenAddress?: string | undefined;
}, {
    poolAddress: string;
    tickUpper: number;
    tickLower: number;
    ownerAddress: string;
    increaseEvent: {
        timestamp: string;
        blockNumber: string;
        transactionIndex: number;
        logIndex: number;
        transactionHash: string;
        liquidity: string;
        amount0: string;
        amount1: string;
    };
    quoteTokenAddress?: string | undefined;
}>;
declare const CreateUniswapV3PositionParamsSchema: z.ZodObject<{
    chainId: z.ZodEffects<z.ZodEffects<z.ZodString, number, string>, number, string>;
    nftId: z.ZodEffects<z.ZodEffects<z.ZodString, number, string>, number, string>;
}, "strip", z.ZodTypeAny, {
    chainId: number;
    nftId: number;
}, {
    chainId: string;
    nftId: string;
}>;

interface GetUniswapV3PositionParams {
    chainId: string;
    nftId: string;
}
type GetUniswapV3PositionResponse = BigIntToString<UniswapV3Position>;
declare const GetUniswapV3PositionParamsSchema: z.ZodObject<{
    chainId: z.ZodEffects<z.ZodString, number, string>;
    nftId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    chainId: number;
    nftId: string;
}, {
    chainId: string;
    nftId: string;
}>;
type GetUniswapV3PositionParamsInput = z.input<typeof GetUniswapV3PositionParamsSchema>;
type GetUniswapV3PositionParamsOutput = z.output<typeof GetUniswapV3PositionParamsSchema>;

type UniswapV3EventType = 'INCREASE_LIQUIDITY' | 'DECREASE_LIQUIDITY' | 'COLLECT';
interface UpdateUniswapV3PositionEvent {
    eventType: UniswapV3EventType;
    timestamp: string;
    blockNumber: string;
    transactionIndex: number;
    logIndex: number;
    transactionHash: string;
    liquidity?: string;
    amount0: string;
    amount1: string;
    recipient?: string;
}
interface UpdateUniswapV3PositionRequest {
    events: UpdateUniswapV3PositionEvent[];
}
type UpdateUniswapV3PositionData = BigIntToString<UniswapV3Position>;
type UpdateUniswapV3PositionResponse = ApiResponse<UpdateUniswapV3PositionData>;
declare const UpdateUniswapV3PositionRequestSchema: z.ZodObject<{
    events: z.ZodArray<z.ZodEffects<z.ZodObject<{
        eventType: z.ZodEnum<["INCREASE_LIQUIDITY", "DECREASE_LIQUIDITY", "COLLECT"]>;
        timestamp: z.ZodString;
        blockNumber: z.ZodString;
        transactionIndex: z.ZodNumber;
        logIndex: z.ZodNumber;
        transactionHash: z.ZodString;
        liquidity: z.ZodOptional<z.ZodString>;
        amount0: z.ZodString;
        amount1: z.ZodString;
        recipient: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
        blockNumber: string;
        transactionIndex: number;
        logIndex: number;
        transactionHash: string;
        amount0: string;
        amount1: string;
        eventType: "COLLECT" | "INCREASE_LIQUIDITY" | "DECREASE_LIQUIDITY";
        liquidity?: string | undefined;
        recipient?: string | undefined;
    }, {
        timestamp: string;
        blockNumber: string;
        transactionIndex: number;
        logIndex: number;
        transactionHash: string;
        amount0: string;
        amount1: string;
        eventType: "COLLECT" | "INCREASE_LIQUIDITY" | "DECREASE_LIQUIDITY";
        liquidity?: string | undefined;
        recipient?: string | undefined;
    }>, {
        timestamp: string;
        blockNumber: string;
        transactionIndex: number;
        logIndex: number;
        transactionHash: string;
        amount0: string;
        amount1: string;
        eventType: "COLLECT" | "INCREASE_LIQUIDITY" | "DECREASE_LIQUIDITY";
        liquidity?: string | undefined;
        recipient?: string | undefined;
    }, {
        timestamp: string;
        blockNumber: string;
        transactionIndex: number;
        logIndex: number;
        transactionHash: string;
        amount0: string;
        amount1: string;
        eventType: "COLLECT" | "INCREASE_LIQUIDITY" | "DECREASE_LIQUIDITY";
        liquidity?: string | undefined;
        recipient?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    events: {
        timestamp: string;
        blockNumber: string;
        transactionIndex: number;
        logIndex: number;
        transactionHash: string;
        amount0: string;
        amount1: string;
        eventType: "COLLECT" | "INCREASE_LIQUIDITY" | "DECREASE_LIQUIDITY";
        liquidity?: string | undefined;
        recipient?: string | undefined;
    }[];
}, {
    events: {
        timestamp: string;
        blockNumber: string;
        transactionIndex: number;
        logIndex: number;
        transactionHash: string;
        amount0: string;
        amount1: string;
        eventType: "COLLECT" | "INCREASE_LIQUIDITY" | "DECREASE_LIQUIDITY";
        liquidity?: string | undefined;
        recipient?: string | undefined;
    }[];
}>;
declare const UpdateUniswapV3PositionParamsSchema: z.ZodObject<{
    chainId: z.ZodEffects<z.ZodEffects<z.ZodString, number, string>, number, string>;
    nftId: z.ZodEffects<z.ZodEffects<z.ZodString, number, string>, number, string>;
}, "strip", z.ZodTypeAny, {
    chainId: number;
    nftId: number;
}, {
    chainId: string;
    nftId: string;
}>;

interface DeleteUniswapV3PositionParams {
    chainId: string;
    nftId: string;
}
interface DeleteUniswapV3PositionResponse {
    [key: string]: never;
}
declare const DeleteUniswapV3PositionParamsSchema: z.ZodObject<{
    chainId: z.ZodEffects<z.ZodString, number, string>;
    nftId: z.ZodEffects<z.ZodString, number, string>;
}, "strip", z.ZodTypeAny, {
    chainId: number;
    nftId: number;
}, {
    chainId: string;
    nftId: string;
}>;
type DeleteUniswapV3PositionParamsInput = z.input<typeof DeleteUniswapV3PositionParamsSchema>;
type DeleteUniswapV3PositionParamsOutput = z.output<typeof DeleteUniswapV3PositionParamsSchema>;

interface ImportUniswapV3PositionRequest {
    chainId: number;
    nftId: number;
}
type ImportUniswapV3PositionData = BigIntToString<UniswapV3Position>;
type ImportUniswapV3PositionResponse = ApiResponse<ImportUniswapV3PositionData>;
declare const ImportUniswapV3PositionRequestSchema: z.ZodObject<{
    chainId: z.ZodNumber;
    nftId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    chainId: number;
    nftId: number;
}, {
    chainId: number;
    nftId: number;
}>;

export { type ApiError, ApiErrorCode, ApiErrorSchema, type ApiKeyDisplay, type ApiResponse, type ApiResult, type AprPathParams, AprPathParamsSchema, type AprPeriodData, type AprPeriodsResponse, type AuthenticatedUser, type BigIntToString, type CreateApiKeyData, type CreateApiKeyRequest, CreateApiKeyRequestSchema, type CreateApiKeyResponse, type CreateErc20TokenData, type CreateErc20TokenRequest, CreateErc20TokenRequestSchema, type CreateErc20TokenResponse, type CreateUniswapV3PositionData, CreateUniswapV3PositionParamsSchema, type CreateUniswapV3PositionRequest, CreateUniswapV3PositionRequestSchema, type CreateUniswapV3PositionResponse, DEFAULT_PAGINATION, type DeleteUniswapV3PositionParams, type DeleteUniswapV3PositionParamsInput, type DeleteUniswapV3PositionParamsOutput, DeleteUniswapV3PositionParamsSchema, type DeleteUniswapV3PositionResponse, type DiscoverUniswapV3PoolsData, type DiscoverUniswapV3PoolsQuery, DiscoverUniswapV3PoolsQuerySchema, type DiscoverUniswapV3PoolsResponse, ErrorCodeToHttpStatus, type GetCurrentUserResponse, type GetPoolMetricsRequest, type GetPoolMetricsResponse, type GetPoolPriceError, type GetPoolPriceRequest, type GetPoolPriceResponse, type GetTokenBalanceQuery, GetTokenBalanceQuerySchema, type GetTokenBalanceResponse, type GetUniswapV3PoolData, type GetUniswapV3PoolParams, GetUniswapV3PoolParamsSchema, type GetUniswapV3PoolQuery, GetUniswapV3PoolQuerySchema, type GetUniswapV3PositionParams, type GetUniswapV3PositionParamsInput, type GetUniswapV3PositionParamsOutput, GetUniswapV3PositionParamsSchema, type GetUniswapV3PositionResponse, type HealthCheckData, type HealthResponse, type HealthResponseData, HealthResponseSchema, HealthStatus, type ImportUniswapV3PositionData, type ImportUniswapV3PositionRequest, ImportUniswapV3PositionRequestSchema, type ImportUniswapV3PositionResponse, type LedgerEventData, type LedgerEventsResponse, type LedgerPathParams, LedgerPathParamsSchema, type LinkWalletData, type LinkWalletRequest, LinkWalletRequestSchema, type LinkWalletResponse, type ListApiKeysResponse, type ListPositionData, type ListPositionsParams, type ListPositionsQuery, ListPositionsQuerySchema, type ListPositionsResponse, type ListWalletsResponse, type NonceData, type NonceResponse, NonceSchema, type PaginatedResponse, type PaginationMeta, type PaginationParams, PaginationParamsSchema, type PoolMetricsData, type PositionSortBy, PositionSortBySchema, type PositionStatus, PositionStatusSchema, type RevokeApiKeyData, type RevokeApiKeyResponse, type SearchErc20TokensData, type SearchErc20TokensQuery, SearchErc20TokensQuerySchema, type SearchErc20TokensResponse, type SerializedValue, type SetPrimaryWalletResponse, type SignupRequest, SignupRequestSchema, type SignupResponse, type SortDirection, SortDirectionSchema, type TokenBalanceData, type TokenSearchCandidate, type UniswapV3EventType, type UpdateUniswapV3PositionData, type UpdateUniswapV3PositionEvent, UpdateUniswapV3PositionParamsSchema, type UpdateUniswapV3PositionRequest, UpdateUniswapV3PositionRequestSchema, type UpdateUniswapV3PositionResponse, type UserData, createErrorResponse, createPaginatedResponse, createPaginationMeta, createSuccessResponse };
