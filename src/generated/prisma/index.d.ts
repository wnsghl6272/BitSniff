
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model BitcoinTransaction
 * 
 */
export type BitcoinTransaction = $Result.DefaultSelection<Prisma.$BitcoinTransactionPayload>
/**
 * Model EthereumTransaction
 * 
 */
export type EthereumTransaction = $Result.DefaultSelection<Prisma.$EthereumTransactionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more BitcoinTransactions
 * const bitcoinTransactions = await prisma.bitcoinTransaction.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more BitcoinTransactions
   * const bitcoinTransactions = await prisma.bitcoinTransaction.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.bitcoinTransaction`: Exposes CRUD operations for the **BitcoinTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BitcoinTransactions
    * const bitcoinTransactions = await prisma.bitcoinTransaction.findMany()
    * ```
    */
  get bitcoinTransaction(): Prisma.BitcoinTransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ethereumTransaction`: Exposes CRUD operations for the **EthereumTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EthereumTransactions
    * const ethereumTransactions = await prisma.ethereumTransaction.findMany()
    * ```
    */
  get ethereumTransaction(): Prisma.EthereumTransactionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    BitcoinTransaction: 'BitcoinTransaction',
    EthereumTransaction: 'EthereumTransaction'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "bitcoinTransaction" | "ethereumTransaction"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      BitcoinTransaction: {
        payload: Prisma.$BitcoinTransactionPayload<ExtArgs>
        fields: Prisma.BitcoinTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BitcoinTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BitcoinTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BitcoinTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BitcoinTransactionPayload>
          }
          findFirst: {
            args: Prisma.BitcoinTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BitcoinTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BitcoinTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BitcoinTransactionPayload>
          }
          findMany: {
            args: Prisma.BitcoinTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BitcoinTransactionPayload>[]
          }
          create: {
            args: Prisma.BitcoinTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BitcoinTransactionPayload>
          }
          createMany: {
            args: Prisma.BitcoinTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BitcoinTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BitcoinTransactionPayload>[]
          }
          delete: {
            args: Prisma.BitcoinTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BitcoinTransactionPayload>
          }
          update: {
            args: Prisma.BitcoinTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BitcoinTransactionPayload>
          }
          deleteMany: {
            args: Prisma.BitcoinTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BitcoinTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BitcoinTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BitcoinTransactionPayload>[]
          }
          upsert: {
            args: Prisma.BitcoinTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BitcoinTransactionPayload>
          }
          aggregate: {
            args: Prisma.BitcoinTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBitcoinTransaction>
          }
          groupBy: {
            args: Prisma.BitcoinTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<BitcoinTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.BitcoinTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<BitcoinTransactionCountAggregateOutputType> | number
          }
        }
      }
      EthereumTransaction: {
        payload: Prisma.$EthereumTransactionPayload<ExtArgs>
        fields: Prisma.EthereumTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EthereumTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EthereumTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EthereumTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EthereumTransactionPayload>
          }
          findFirst: {
            args: Prisma.EthereumTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EthereumTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EthereumTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EthereumTransactionPayload>
          }
          findMany: {
            args: Prisma.EthereumTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EthereumTransactionPayload>[]
          }
          create: {
            args: Prisma.EthereumTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EthereumTransactionPayload>
          }
          createMany: {
            args: Prisma.EthereumTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EthereumTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EthereumTransactionPayload>[]
          }
          delete: {
            args: Prisma.EthereumTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EthereumTransactionPayload>
          }
          update: {
            args: Prisma.EthereumTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EthereumTransactionPayload>
          }
          deleteMany: {
            args: Prisma.EthereumTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EthereumTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EthereumTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EthereumTransactionPayload>[]
          }
          upsert: {
            args: Prisma.EthereumTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EthereumTransactionPayload>
          }
          aggregate: {
            args: Prisma.EthereumTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEthereumTransaction>
          }
          groupBy: {
            args: Prisma.EthereumTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<EthereumTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.EthereumTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<EthereumTransactionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    bitcoinTransaction?: BitcoinTransactionOmit
    ethereumTransaction?: EthereumTransactionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model BitcoinTransaction
   */

  export type AggregateBitcoinTransaction = {
    _count: BitcoinTransactionCountAggregateOutputType | null
    _avg: BitcoinTransactionAvgAggregateOutputType | null
    _sum: BitcoinTransactionSumAggregateOutputType | null
    _min: BitcoinTransactionMinAggregateOutputType | null
    _max: BitcoinTransactionMaxAggregateOutputType | null
  }

  export type BitcoinTransactionAvgAggregateOutputType = {
    id: number | null
    blockNumber: number | null
    value: Decimal | null
    fee: Decimal | null
  }

  export type BitcoinTransactionSumAggregateOutputType = {
    id: number | null
    blockNumber: bigint | null
    value: Decimal | null
    fee: Decimal | null
  }

  export type BitcoinTransactionMinAggregateOutputType = {
    id: number | null
    hash: string | null
    blockNumber: bigint | null
    timestamp: Date | null
    value: Decimal | null
    fee: Decimal | null
    fromAddress: string | null
    toAddress: string | null
    createdAt: Date | null
  }

  export type BitcoinTransactionMaxAggregateOutputType = {
    id: number | null
    hash: string | null
    blockNumber: bigint | null
    timestamp: Date | null
    value: Decimal | null
    fee: Decimal | null
    fromAddress: string | null
    toAddress: string | null
    createdAt: Date | null
  }

  export type BitcoinTransactionCountAggregateOutputType = {
    id: number
    hash: number
    blockNumber: number
    timestamp: number
    value: number
    fee: number
    fromAddress: number
    toAddress: number
    createdAt: number
    _all: number
  }


  export type BitcoinTransactionAvgAggregateInputType = {
    id?: true
    blockNumber?: true
    value?: true
    fee?: true
  }

  export type BitcoinTransactionSumAggregateInputType = {
    id?: true
    blockNumber?: true
    value?: true
    fee?: true
  }

  export type BitcoinTransactionMinAggregateInputType = {
    id?: true
    hash?: true
    blockNumber?: true
    timestamp?: true
    value?: true
    fee?: true
    fromAddress?: true
    toAddress?: true
    createdAt?: true
  }

  export type BitcoinTransactionMaxAggregateInputType = {
    id?: true
    hash?: true
    blockNumber?: true
    timestamp?: true
    value?: true
    fee?: true
    fromAddress?: true
    toAddress?: true
    createdAt?: true
  }

  export type BitcoinTransactionCountAggregateInputType = {
    id?: true
    hash?: true
    blockNumber?: true
    timestamp?: true
    value?: true
    fee?: true
    fromAddress?: true
    toAddress?: true
    createdAt?: true
    _all?: true
  }

  export type BitcoinTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BitcoinTransaction to aggregate.
     */
    where?: BitcoinTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BitcoinTransactions to fetch.
     */
    orderBy?: BitcoinTransactionOrderByWithRelationInput | BitcoinTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BitcoinTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BitcoinTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BitcoinTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BitcoinTransactions
    **/
    _count?: true | BitcoinTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BitcoinTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BitcoinTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BitcoinTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BitcoinTransactionMaxAggregateInputType
  }

  export type GetBitcoinTransactionAggregateType<T extends BitcoinTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateBitcoinTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBitcoinTransaction[P]>
      : GetScalarType<T[P], AggregateBitcoinTransaction[P]>
  }




  export type BitcoinTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BitcoinTransactionWhereInput
    orderBy?: BitcoinTransactionOrderByWithAggregationInput | BitcoinTransactionOrderByWithAggregationInput[]
    by: BitcoinTransactionScalarFieldEnum[] | BitcoinTransactionScalarFieldEnum
    having?: BitcoinTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BitcoinTransactionCountAggregateInputType | true
    _avg?: BitcoinTransactionAvgAggregateInputType
    _sum?: BitcoinTransactionSumAggregateInputType
    _min?: BitcoinTransactionMinAggregateInputType
    _max?: BitcoinTransactionMaxAggregateInputType
  }

  export type BitcoinTransactionGroupByOutputType = {
    id: number
    hash: string
    blockNumber: bigint
    timestamp: Date
    value: Decimal
    fee: Decimal
    fromAddress: string
    toAddress: string
    createdAt: Date
    _count: BitcoinTransactionCountAggregateOutputType | null
    _avg: BitcoinTransactionAvgAggregateOutputType | null
    _sum: BitcoinTransactionSumAggregateOutputType | null
    _min: BitcoinTransactionMinAggregateOutputType | null
    _max: BitcoinTransactionMaxAggregateOutputType | null
  }

  type GetBitcoinTransactionGroupByPayload<T extends BitcoinTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BitcoinTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BitcoinTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BitcoinTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], BitcoinTransactionGroupByOutputType[P]>
        }
      >
    >


  export type BitcoinTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hash?: boolean
    blockNumber?: boolean
    timestamp?: boolean
    value?: boolean
    fee?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["bitcoinTransaction"]>

  export type BitcoinTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hash?: boolean
    blockNumber?: boolean
    timestamp?: boolean
    value?: boolean
    fee?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["bitcoinTransaction"]>

  export type BitcoinTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hash?: boolean
    blockNumber?: boolean
    timestamp?: boolean
    value?: boolean
    fee?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["bitcoinTransaction"]>

  export type BitcoinTransactionSelectScalar = {
    id?: boolean
    hash?: boolean
    blockNumber?: boolean
    timestamp?: boolean
    value?: boolean
    fee?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    createdAt?: boolean
  }

  export type BitcoinTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "hash" | "blockNumber" | "timestamp" | "value" | "fee" | "fromAddress" | "toAddress" | "createdAt", ExtArgs["result"]["bitcoinTransaction"]>

  export type $BitcoinTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BitcoinTransaction"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      hash: string
      blockNumber: bigint
      timestamp: Date
      value: Prisma.Decimal
      fee: Prisma.Decimal
      fromAddress: string
      toAddress: string
      createdAt: Date
    }, ExtArgs["result"]["bitcoinTransaction"]>
    composites: {}
  }

  type BitcoinTransactionGetPayload<S extends boolean | null | undefined | BitcoinTransactionDefaultArgs> = $Result.GetResult<Prisma.$BitcoinTransactionPayload, S>

  type BitcoinTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BitcoinTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BitcoinTransactionCountAggregateInputType | true
    }

  export interface BitcoinTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BitcoinTransaction'], meta: { name: 'BitcoinTransaction' } }
    /**
     * Find zero or one BitcoinTransaction that matches the filter.
     * @param {BitcoinTransactionFindUniqueArgs} args - Arguments to find a BitcoinTransaction
     * @example
     * // Get one BitcoinTransaction
     * const bitcoinTransaction = await prisma.bitcoinTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BitcoinTransactionFindUniqueArgs>(args: SelectSubset<T, BitcoinTransactionFindUniqueArgs<ExtArgs>>): Prisma__BitcoinTransactionClient<$Result.GetResult<Prisma.$BitcoinTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BitcoinTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BitcoinTransactionFindUniqueOrThrowArgs} args - Arguments to find a BitcoinTransaction
     * @example
     * // Get one BitcoinTransaction
     * const bitcoinTransaction = await prisma.bitcoinTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BitcoinTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, BitcoinTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BitcoinTransactionClient<$Result.GetResult<Prisma.$BitcoinTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BitcoinTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BitcoinTransactionFindFirstArgs} args - Arguments to find a BitcoinTransaction
     * @example
     * // Get one BitcoinTransaction
     * const bitcoinTransaction = await prisma.bitcoinTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BitcoinTransactionFindFirstArgs>(args?: SelectSubset<T, BitcoinTransactionFindFirstArgs<ExtArgs>>): Prisma__BitcoinTransactionClient<$Result.GetResult<Prisma.$BitcoinTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BitcoinTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BitcoinTransactionFindFirstOrThrowArgs} args - Arguments to find a BitcoinTransaction
     * @example
     * // Get one BitcoinTransaction
     * const bitcoinTransaction = await prisma.bitcoinTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BitcoinTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, BitcoinTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__BitcoinTransactionClient<$Result.GetResult<Prisma.$BitcoinTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BitcoinTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BitcoinTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BitcoinTransactions
     * const bitcoinTransactions = await prisma.bitcoinTransaction.findMany()
     * 
     * // Get first 10 BitcoinTransactions
     * const bitcoinTransactions = await prisma.bitcoinTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bitcoinTransactionWithIdOnly = await prisma.bitcoinTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BitcoinTransactionFindManyArgs>(args?: SelectSubset<T, BitcoinTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BitcoinTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BitcoinTransaction.
     * @param {BitcoinTransactionCreateArgs} args - Arguments to create a BitcoinTransaction.
     * @example
     * // Create one BitcoinTransaction
     * const BitcoinTransaction = await prisma.bitcoinTransaction.create({
     *   data: {
     *     // ... data to create a BitcoinTransaction
     *   }
     * })
     * 
     */
    create<T extends BitcoinTransactionCreateArgs>(args: SelectSubset<T, BitcoinTransactionCreateArgs<ExtArgs>>): Prisma__BitcoinTransactionClient<$Result.GetResult<Prisma.$BitcoinTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BitcoinTransactions.
     * @param {BitcoinTransactionCreateManyArgs} args - Arguments to create many BitcoinTransactions.
     * @example
     * // Create many BitcoinTransactions
     * const bitcoinTransaction = await prisma.bitcoinTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BitcoinTransactionCreateManyArgs>(args?: SelectSubset<T, BitcoinTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BitcoinTransactions and returns the data saved in the database.
     * @param {BitcoinTransactionCreateManyAndReturnArgs} args - Arguments to create many BitcoinTransactions.
     * @example
     * // Create many BitcoinTransactions
     * const bitcoinTransaction = await prisma.bitcoinTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BitcoinTransactions and only return the `id`
     * const bitcoinTransactionWithIdOnly = await prisma.bitcoinTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BitcoinTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, BitcoinTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BitcoinTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BitcoinTransaction.
     * @param {BitcoinTransactionDeleteArgs} args - Arguments to delete one BitcoinTransaction.
     * @example
     * // Delete one BitcoinTransaction
     * const BitcoinTransaction = await prisma.bitcoinTransaction.delete({
     *   where: {
     *     // ... filter to delete one BitcoinTransaction
     *   }
     * })
     * 
     */
    delete<T extends BitcoinTransactionDeleteArgs>(args: SelectSubset<T, BitcoinTransactionDeleteArgs<ExtArgs>>): Prisma__BitcoinTransactionClient<$Result.GetResult<Prisma.$BitcoinTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BitcoinTransaction.
     * @param {BitcoinTransactionUpdateArgs} args - Arguments to update one BitcoinTransaction.
     * @example
     * // Update one BitcoinTransaction
     * const bitcoinTransaction = await prisma.bitcoinTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BitcoinTransactionUpdateArgs>(args: SelectSubset<T, BitcoinTransactionUpdateArgs<ExtArgs>>): Prisma__BitcoinTransactionClient<$Result.GetResult<Prisma.$BitcoinTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BitcoinTransactions.
     * @param {BitcoinTransactionDeleteManyArgs} args - Arguments to filter BitcoinTransactions to delete.
     * @example
     * // Delete a few BitcoinTransactions
     * const { count } = await prisma.bitcoinTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BitcoinTransactionDeleteManyArgs>(args?: SelectSubset<T, BitcoinTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BitcoinTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BitcoinTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BitcoinTransactions
     * const bitcoinTransaction = await prisma.bitcoinTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BitcoinTransactionUpdateManyArgs>(args: SelectSubset<T, BitcoinTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BitcoinTransactions and returns the data updated in the database.
     * @param {BitcoinTransactionUpdateManyAndReturnArgs} args - Arguments to update many BitcoinTransactions.
     * @example
     * // Update many BitcoinTransactions
     * const bitcoinTransaction = await prisma.bitcoinTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BitcoinTransactions and only return the `id`
     * const bitcoinTransactionWithIdOnly = await prisma.bitcoinTransaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BitcoinTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, BitcoinTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BitcoinTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BitcoinTransaction.
     * @param {BitcoinTransactionUpsertArgs} args - Arguments to update or create a BitcoinTransaction.
     * @example
     * // Update or create a BitcoinTransaction
     * const bitcoinTransaction = await prisma.bitcoinTransaction.upsert({
     *   create: {
     *     // ... data to create a BitcoinTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BitcoinTransaction we want to update
     *   }
     * })
     */
    upsert<T extends BitcoinTransactionUpsertArgs>(args: SelectSubset<T, BitcoinTransactionUpsertArgs<ExtArgs>>): Prisma__BitcoinTransactionClient<$Result.GetResult<Prisma.$BitcoinTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BitcoinTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BitcoinTransactionCountArgs} args - Arguments to filter BitcoinTransactions to count.
     * @example
     * // Count the number of BitcoinTransactions
     * const count = await prisma.bitcoinTransaction.count({
     *   where: {
     *     // ... the filter for the BitcoinTransactions we want to count
     *   }
     * })
    **/
    count<T extends BitcoinTransactionCountArgs>(
      args?: Subset<T, BitcoinTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BitcoinTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BitcoinTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BitcoinTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BitcoinTransactionAggregateArgs>(args: Subset<T, BitcoinTransactionAggregateArgs>): Prisma.PrismaPromise<GetBitcoinTransactionAggregateType<T>>

    /**
     * Group by BitcoinTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BitcoinTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BitcoinTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BitcoinTransactionGroupByArgs['orderBy'] }
        : { orderBy?: BitcoinTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BitcoinTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBitcoinTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BitcoinTransaction model
   */
  readonly fields: BitcoinTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BitcoinTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BitcoinTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BitcoinTransaction model
   */
  interface BitcoinTransactionFieldRefs {
    readonly id: FieldRef<"BitcoinTransaction", 'Int'>
    readonly hash: FieldRef<"BitcoinTransaction", 'String'>
    readonly blockNumber: FieldRef<"BitcoinTransaction", 'BigInt'>
    readonly timestamp: FieldRef<"BitcoinTransaction", 'DateTime'>
    readonly value: FieldRef<"BitcoinTransaction", 'Decimal'>
    readonly fee: FieldRef<"BitcoinTransaction", 'Decimal'>
    readonly fromAddress: FieldRef<"BitcoinTransaction", 'String'>
    readonly toAddress: FieldRef<"BitcoinTransaction", 'String'>
    readonly createdAt: FieldRef<"BitcoinTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BitcoinTransaction findUnique
   */
  export type BitcoinTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BitcoinTransaction
     */
    select?: BitcoinTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BitcoinTransaction
     */
    omit?: BitcoinTransactionOmit<ExtArgs> | null
    /**
     * Filter, which BitcoinTransaction to fetch.
     */
    where: BitcoinTransactionWhereUniqueInput
  }

  /**
   * BitcoinTransaction findUniqueOrThrow
   */
  export type BitcoinTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BitcoinTransaction
     */
    select?: BitcoinTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BitcoinTransaction
     */
    omit?: BitcoinTransactionOmit<ExtArgs> | null
    /**
     * Filter, which BitcoinTransaction to fetch.
     */
    where: BitcoinTransactionWhereUniqueInput
  }

  /**
   * BitcoinTransaction findFirst
   */
  export type BitcoinTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BitcoinTransaction
     */
    select?: BitcoinTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BitcoinTransaction
     */
    omit?: BitcoinTransactionOmit<ExtArgs> | null
    /**
     * Filter, which BitcoinTransaction to fetch.
     */
    where?: BitcoinTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BitcoinTransactions to fetch.
     */
    orderBy?: BitcoinTransactionOrderByWithRelationInput | BitcoinTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BitcoinTransactions.
     */
    cursor?: BitcoinTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BitcoinTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BitcoinTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BitcoinTransactions.
     */
    distinct?: BitcoinTransactionScalarFieldEnum | BitcoinTransactionScalarFieldEnum[]
  }

  /**
   * BitcoinTransaction findFirstOrThrow
   */
  export type BitcoinTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BitcoinTransaction
     */
    select?: BitcoinTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BitcoinTransaction
     */
    omit?: BitcoinTransactionOmit<ExtArgs> | null
    /**
     * Filter, which BitcoinTransaction to fetch.
     */
    where?: BitcoinTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BitcoinTransactions to fetch.
     */
    orderBy?: BitcoinTransactionOrderByWithRelationInput | BitcoinTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BitcoinTransactions.
     */
    cursor?: BitcoinTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BitcoinTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BitcoinTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BitcoinTransactions.
     */
    distinct?: BitcoinTransactionScalarFieldEnum | BitcoinTransactionScalarFieldEnum[]
  }

  /**
   * BitcoinTransaction findMany
   */
  export type BitcoinTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BitcoinTransaction
     */
    select?: BitcoinTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BitcoinTransaction
     */
    omit?: BitcoinTransactionOmit<ExtArgs> | null
    /**
     * Filter, which BitcoinTransactions to fetch.
     */
    where?: BitcoinTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BitcoinTransactions to fetch.
     */
    orderBy?: BitcoinTransactionOrderByWithRelationInput | BitcoinTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BitcoinTransactions.
     */
    cursor?: BitcoinTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BitcoinTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BitcoinTransactions.
     */
    skip?: number
    distinct?: BitcoinTransactionScalarFieldEnum | BitcoinTransactionScalarFieldEnum[]
  }

  /**
   * BitcoinTransaction create
   */
  export type BitcoinTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BitcoinTransaction
     */
    select?: BitcoinTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BitcoinTransaction
     */
    omit?: BitcoinTransactionOmit<ExtArgs> | null
    /**
     * The data needed to create a BitcoinTransaction.
     */
    data: XOR<BitcoinTransactionCreateInput, BitcoinTransactionUncheckedCreateInput>
  }

  /**
   * BitcoinTransaction createMany
   */
  export type BitcoinTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BitcoinTransactions.
     */
    data: BitcoinTransactionCreateManyInput | BitcoinTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BitcoinTransaction createManyAndReturn
   */
  export type BitcoinTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BitcoinTransaction
     */
    select?: BitcoinTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BitcoinTransaction
     */
    omit?: BitcoinTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many BitcoinTransactions.
     */
    data: BitcoinTransactionCreateManyInput | BitcoinTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BitcoinTransaction update
   */
  export type BitcoinTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BitcoinTransaction
     */
    select?: BitcoinTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BitcoinTransaction
     */
    omit?: BitcoinTransactionOmit<ExtArgs> | null
    /**
     * The data needed to update a BitcoinTransaction.
     */
    data: XOR<BitcoinTransactionUpdateInput, BitcoinTransactionUncheckedUpdateInput>
    /**
     * Choose, which BitcoinTransaction to update.
     */
    where: BitcoinTransactionWhereUniqueInput
  }

  /**
   * BitcoinTransaction updateMany
   */
  export type BitcoinTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BitcoinTransactions.
     */
    data: XOR<BitcoinTransactionUpdateManyMutationInput, BitcoinTransactionUncheckedUpdateManyInput>
    /**
     * Filter which BitcoinTransactions to update
     */
    where?: BitcoinTransactionWhereInput
    /**
     * Limit how many BitcoinTransactions to update.
     */
    limit?: number
  }

  /**
   * BitcoinTransaction updateManyAndReturn
   */
  export type BitcoinTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BitcoinTransaction
     */
    select?: BitcoinTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BitcoinTransaction
     */
    omit?: BitcoinTransactionOmit<ExtArgs> | null
    /**
     * The data used to update BitcoinTransactions.
     */
    data: XOR<BitcoinTransactionUpdateManyMutationInput, BitcoinTransactionUncheckedUpdateManyInput>
    /**
     * Filter which BitcoinTransactions to update
     */
    where?: BitcoinTransactionWhereInput
    /**
     * Limit how many BitcoinTransactions to update.
     */
    limit?: number
  }

  /**
   * BitcoinTransaction upsert
   */
  export type BitcoinTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BitcoinTransaction
     */
    select?: BitcoinTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BitcoinTransaction
     */
    omit?: BitcoinTransactionOmit<ExtArgs> | null
    /**
     * The filter to search for the BitcoinTransaction to update in case it exists.
     */
    where: BitcoinTransactionWhereUniqueInput
    /**
     * In case the BitcoinTransaction found by the `where` argument doesn't exist, create a new BitcoinTransaction with this data.
     */
    create: XOR<BitcoinTransactionCreateInput, BitcoinTransactionUncheckedCreateInput>
    /**
     * In case the BitcoinTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BitcoinTransactionUpdateInput, BitcoinTransactionUncheckedUpdateInput>
  }

  /**
   * BitcoinTransaction delete
   */
  export type BitcoinTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BitcoinTransaction
     */
    select?: BitcoinTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BitcoinTransaction
     */
    omit?: BitcoinTransactionOmit<ExtArgs> | null
    /**
     * Filter which BitcoinTransaction to delete.
     */
    where: BitcoinTransactionWhereUniqueInput
  }

  /**
   * BitcoinTransaction deleteMany
   */
  export type BitcoinTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BitcoinTransactions to delete
     */
    where?: BitcoinTransactionWhereInput
    /**
     * Limit how many BitcoinTransactions to delete.
     */
    limit?: number
  }

  /**
   * BitcoinTransaction without action
   */
  export type BitcoinTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BitcoinTransaction
     */
    select?: BitcoinTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BitcoinTransaction
     */
    omit?: BitcoinTransactionOmit<ExtArgs> | null
  }


  /**
   * Model EthereumTransaction
   */

  export type AggregateEthereumTransaction = {
    _count: EthereumTransactionCountAggregateOutputType | null
    _avg: EthereumTransactionAvgAggregateOutputType | null
    _sum: EthereumTransactionSumAggregateOutputType | null
    _min: EthereumTransactionMinAggregateOutputType | null
    _max: EthereumTransactionMaxAggregateOutputType | null
  }

  export type EthereumTransactionAvgAggregateOutputType = {
    id: number | null
    blockNumber: number | null
    value: Decimal | null
    gasFee: Decimal | null
    gasPrice: Decimal | null
    gasUsed: number | null
  }

  export type EthereumTransactionSumAggregateOutputType = {
    id: number | null
    blockNumber: bigint | null
    value: Decimal | null
    gasFee: Decimal | null
    gasPrice: Decimal | null
    gasUsed: bigint | null
  }

  export type EthereumTransactionMinAggregateOutputType = {
    id: number | null
    hash: string | null
    blockNumber: bigint | null
    timestamp: Date | null
    value: Decimal | null
    gasFee: Decimal | null
    gasPrice: Decimal | null
    gasUsed: bigint | null
    fromAddress: string | null
    toAddress: string | null
    createdAt: Date | null
  }

  export type EthereumTransactionMaxAggregateOutputType = {
    id: number | null
    hash: string | null
    blockNumber: bigint | null
    timestamp: Date | null
    value: Decimal | null
    gasFee: Decimal | null
    gasPrice: Decimal | null
    gasUsed: bigint | null
    fromAddress: string | null
    toAddress: string | null
    createdAt: Date | null
  }

  export type EthereumTransactionCountAggregateOutputType = {
    id: number
    hash: number
    blockNumber: number
    timestamp: number
    value: number
    gasFee: number
    gasPrice: number
    gasUsed: number
    fromAddress: number
    toAddress: number
    createdAt: number
    _all: number
  }


  export type EthereumTransactionAvgAggregateInputType = {
    id?: true
    blockNumber?: true
    value?: true
    gasFee?: true
    gasPrice?: true
    gasUsed?: true
  }

  export type EthereumTransactionSumAggregateInputType = {
    id?: true
    blockNumber?: true
    value?: true
    gasFee?: true
    gasPrice?: true
    gasUsed?: true
  }

  export type EthereumTransactionMinAggregateInputType = {
    id?: true
    hash?: true
    blockNumber?: true
    timestamp?: true
    value?: true
    gasFee?: true
    gasPrice?: true
    gasUsed?: true
    fromAddress?: true
    toAddress?: true
    createdAt?: true
  }

  export type EthereumTransactionMaxAggregateInputType = {
    id?: true
    hash?: true
    blockNumber?: true
    timestamp?: true
    value?: true
    gasFee?: true
    gasPrice?: true
    gasUsed?: true
    fromAddress?: true
    toAddress?: true
    createdAt?: true
  }

  export type EthereumTransactionCountAggregateInputType = {
    id?: true
    hash?: true
    blockNumber?: true
    timestamp?: true
    value?: true
    gasFee?: true
    gasPrice?: true
    gasUsed?: true
    fromAddress?: true
    toAddress?: true
    createdAt?: true
    _all?: true
  }

  export type EthereumTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EthereumTransaction to aggregate.
     */
    where?: EthereumTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EthereumTransactions to fetch.
     */
    orderBy?: EthereumTransactionOrderByWithRelationInput | EthereumTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EthereumTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EthereumTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EthereumTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EthereumTransactions
    **/
    _count?: true | EthereumTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EthereumTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EthereumTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EthereumTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EthereumTransactionMaxAggregateInputType
  }

  export type GetEthereumTransactionAggregateType<T extends EthereumTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateEthereumTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEthereumTransaction[P]>
      : GetScalarType<T[P], AggregateEthereumTransaction[P]>
  }




  export type EthereumTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EthereumTransactionWhereInput
    orderBy?: EthereumTransactionOrderByWithAggregationInput | EthereumTransactionOrderByWithAggregationInput[]
    by: EthereumTransactionScalarFieldEnum[] | EthereumTransactionScalarFieldEnum
    having?: EthereumTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EthereumTransactionCountAggregateInputType | true
    _avg?: EthereumTransactionAvgAggregateInputType
    _sum?: EthereumTransactionSumAggregateInputType
    _min?: EthereumTransactionMinAggregateInputType
    _max?: EthereumTransactionMaxAggregateInputType
  }

  export type EthereumTransactionGroupByOutputType = {
    id: number
    hash: string
    blockNumber: bigint
    timestamp: Date
    value: Decimal
    gasFee: Decimal
    gasPrice: Decimal
    gasUsed: bigint
    fromAddress: string
    toAddress: string
    createdAt: Date
    _count: EthereumTransactionCountAggregateOutputType | null
    _avg: EthereumTransactionAvgAggregateOutputType | null
    _sum: EthereumTransactionSumAggregateOutputType | null
    _min: EthereumTransactionMinAggregateOutputType | null
    _max: EthereumTransactionMaxAggregateOutputType | null
  }

  type GetEthereumTransactionGroupByPayload<T extends EthereumTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EthereumTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EthereumTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EthereumTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], EthereumTransactionGroupByOutputType[P]>
        }
      >
    >


  export type EthereumTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hash?: boolean
    blockNumber?: boolean
    timestamp?: boolean
    value?: boolean
    gasFee?: boolean
    gasPrice?: boolean
    gasUsed?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["ethereumTransaction"]>

  export type EthereumTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hash?: boolean
    blockNumber?: boolean
    timestamp?: boolean
    value?: boolean
    gasFee?: boolean
    gasPrice?: boolean
    gasUsed?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["ethereumTransaction"]>

  export type EthereumTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hash?: boolean
    blockNumber?: boolean
    timestamp?: boolean
    value?: boolean
    gasFee?: boolean
    gasPrice?: boolean
    gasUsed?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["ethereumTransaction"]>

  export type EthereumTransactionSelectScalar = {
    id?: boolean
    hash?: boolean
    blockNumber?: boolean
    timestamp?: boolean
    value?: boolean
    gasFee?: boolean
    gasPrice?: boolean
    gasUsed?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    createdAt?: boolean
  }

  export type EthereumTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "hash" | "blockNumber" | "timestamp" | "value" | "gasFee" | "gasPrice" | "gasUsed" | "fromAddress" | "toAddress" | "createdAt", ExtArgs["result"]["ethereumTransaction"]>

  export type $EthereumTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EthereumTransaction"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      hash: string
      blockNumber: bigint
      timestamp: Date
      value: Prisma.Decimal
      gasFee: Prisma.Decimal
      gasPrice: Prisma.Decimal
      gasUsed: bigint
      fromAddress: string
      toAddress: string
      createdAt: Date
    }, ExtArgs["result"]["ethereumTransaction"]>
    composites: {}
  }

  type EthereumTransactionGetPayload<S extends boolean | null | undefined | EthereumTransactionDefaultArgs> = $Result.GetResult<Prisma.$EthereumTransactionPayload, S>

  type EthereumTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EthereumTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EthereumTransactionCountAggregateInputType | true
    }

  export interface EthereumTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EthereumTransaction'], meta: { name: 'EthereumTransaction' } }
    /**
     * Find zero or one EthereumTransaction that matches the filter.
     * @param {EthereumTransactionFindUniqueArgs} args - Arguments to find a EthereumTransaction
     * @example
     * // Get one EthereumTransaction
     * const ethereumTransaction = await prisma.ethereumTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EthereumTransactionFindUniqueArgs>(args: SelectSubset<T, EthereumTransactionFindUniqueArgs<ExtArgs>>): Prisma__EthereumTransactionClient<$Result.GetResult<Prisma.$EthereumTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EthereumTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EthereumTransactionFindUniqueOrThrowArgs} args - Arguments to find a EthereumTransaction
     * @example
     * // Get one EthereumTransaction
     * const ethereumTransaction = await prisma.ethereumTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EthereumTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, EthereumTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EthereumTransactionClient<$Result.GetResult<Prisma.$EthereumTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EthereumTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EthereumTransactionFindFirstArgs} args - Arguments to find a EthereumTransaction
     * @example
     * // Get one EthereumTransaction
     * const ethereumTransaction = await prisma.ethereumTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EthereumTransactionFindFirstArgs>(args?: SelectSubset<T, EthereumTransactionFindFirstArgs<ExtArgs>>): Prisma__EthereumTransactionClient<$Result.GetResult<Prisma.$EthereumTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EthereumTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EthereumTransactionFindFirstOrThrowArgs} args - Arguments to find a EthereumTransaction
     * @example
     * // Get one EthereumTransaction
     * const ethereumTransaction = await prisma.ethereumTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EthereumTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, EthereumTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__EthereumTransactionClient<$Result.GetResult<Prisma.$EthereumTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EthereumTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EthereumTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EthereumTransactions
     * const ethereumTransactions = await prisma.ethereumTransaction.findMany()
     * 
     * // Get first 10 EthereumTransactions
     * const ethereumTransactions = await prisma.ethereumTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ethereumTransactionWithIdOnly = await prisma.ethereumTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EthereumTransactionFindManyArgs>(args?: SelectSubset<T, EthereumTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EthereumTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EthereumTransaction.
     * @param {EthereumTransactionCreateArgs} args - Arguments to create a EthereumTransaction.
     * @example
     * // Create one EthereumTransaction
     * const EthereumTransaction = await prisma.ethereumTransaction.create({
     *   data: {
     *     // ... data to create a EthereumTransaction
     *   }
     * })
     * 
     */
    create<T extends EthereumTransactionCreateArgs>(args: SelectSubset<T, EthereumTransactionCreateArgs<ExtArgs>>): Prisma__EthereumTransactionClient<$Result.GetResult<Prisma.$EthereumTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EthereumTransactions.
     * @param {EthereumTransactionCreateManyArgs} args - Arguments to create many EthereumTransactions.
     * @example
     * // Create many EthereumTransactions
     * const ethereumTransaction = await prisma.ethereumTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EthereumTransactionCreateManyArgs>(args?: SelectSubset<T, EthereumTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EthereumTransactions and returns the data saved in the database.
     * @param {EthereumTransactionCreateManyAndReturnArgs} args - Arguments to create many EthereumTransactions.
     * @example
     * // Create many EthereumTransactions
     * const ethereumTransaction = await prisma.ethereumTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EthereumTransactions and only return the `id`
     * const ethereumTransactionWithIdOnly = await prisma.ethereumTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EthereumTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, EthereumTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EthereumTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EthereumTransaction.
     * @param {EthereumTransactionDeleteArgs} args - Arguments to delete one EthereumTransaction.
     * @example
     * // Delete one EthereumTransaction
     * const EthereumTransaction = await prisma.ethereumTransaction.delete({
     *   where: {
     *     // ... filter to delete one EthereumTransaction
     *   }
     * })
     * 
     */
    delete<T extends EthereumTransactionDeleteArgs>(args: SelectSubset<T, EthereumTransactionDeleteArgs<ExtArgs>>): Prisma__EthereumTransactionClient<$Result.GetResult<Prisma.$EthereumTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EthereumTransaction.
     * @param {EthereumTransactionUpdateArgs} args - Arguments to update one EthereumTransaction.
     * @example
     * // Update one EthereumTransaction
     * const ethereumTransaction = await prisma.ethereumTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EthereumTransactionUpdateArgs>(args: SelectSubset<T, EthereumTransactionUpdateArgs<ExtArgs>>): Prisma__EthereumTransactionClient<$Result.GetResult<Prisma.$EthereumTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EthereumTransactions.
     * @param {EthereumTransactionDeleteManyArgs} args - Arguments to filter EthereumTransactions to delete.
     * @example
     * // Delete a few EthereumTransactions
     * const { count } = await prisma.ethereumTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EthereumTransactionDeleteManyArgs>(args?: SelectSubset<T, EthereumTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EthereumTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EthereumTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EthereumTransactions
     * const ethereumTransaction = await prisma.ethereumTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EthereumTransactionUpdateManyArgs>(args: SelectSubset<T, EthereumTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EthereumTransactions and returns the data updated in the database.
     * @param {EthereumTransactionUpdateManyAndReturnArgs} args - Arguments to update many EthereumTransactions.
     * @example
     * // Update many EthereumTransactions
     * const ethereumTransaction = await prisma.ethereumTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EthereumTransactions and only return the `id`
     * const ethereumTransactionWithIdOnly = await prisma.ethereumTransaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EthereumTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, EthereumTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EthereumTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EthereumTransaction.
     * @param {EthereumTransactionUpsertArgs} args - Arguments to update or create a EthereumTransaction.
     * @example
     * // Update or create a EthereumTransaction
     * const ethereumTransaction = await prisma.ethereumTransaction.upsert({
     *   create: {
     *     // ... data to create a EthereumTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EthereumTransaction we want to update
     *   }
     * })
     */
    upsert<T extends EthereumTransactionUpsertArgs>(args: SelectSubset<T, EthereumTransactionUpsertArgs<ExtArgs>>): Prisma__EthereumTransactionClient<$Result.GetResult<Prisma.$EthereumTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EthereumTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EthereumTransactionCountArgs} args - Arguments to filter EthereumTransactions to count.
     * @example
     * // Count the number of EthereumTransactions
     * const count = await prisma.ethereumTransaction.count({
     *   where: {
     *     // ... the filter for the EthereumTransactions we want to count
     *   }
     * })
    **/
    count<T extends EthereumTransactionCountArgs>(
      args?: Subset<T, EthereumTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EthereumTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EthereumTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EthereumTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EthereumTransactionAggregateArgs>(args: Subset<T, EthereumTransactionAggregateArgs>): Prisma.PrismaPromise<GetEthereumTransactionAggregateType<T>>

    /**
     * Group by EthereumTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EthereumTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EthereumTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EthereumTransactionGroupByArgs['orderBy'] }
        : { orderBy?: EthereumTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EthereumTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEthereumTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EthereumTransaction model
   */
  readonly fields: EthereumTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EthereumTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EthereumTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EthereumTransaction model
   */
  interface EthereumTransactionFieldRefs {
    readonly id: FieldRef<"EthereumTransaction", 'Int'>
    readonly hash: FieldRef<"EthereumTransaction", 'String'>
    readonly blockNumber: FieldRef<"EthereumTransaction", 'BigInt'>
    readonly timestamp: FieldRef<"EthereumTransaction", 'DateTime'>
    readonly value: FieldRef<"EthereumTransaction", 'Decimal'>
    readonly gasFee: FieldRef<"EthereumTransaction", 'Decimal'>
    readonly gasPrice: FieldRef<"EthereumTransaction", 'Decimal'>
    readonly gasUsed: FieldRef<"EthereumTransaction", 'BigInt'>
    readonly fromAddress: FieldRef<"EthereumTransaction", 'String'>
    readonly toAddress: FieldRef<"EthereumTransaction", 'String'>
    readonly createdAt: FieldRef<"EthereumTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EthereumTransaction findUnique
   */
  export type EthereumTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EthereumTransaction
     */
    select?: EthereumTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EthereumTransaction
     */
    omit?: EthereumTransactionOmit<ExtArgs> | null
    /**
     * Filter, which EthereumTransaction to fetch.
     */
    where: EthereumTransactionWhereUniqueInput
  }

  /**
   * EthereumTransaction findUniqueOrThrow
   */
  export type EthereumTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EthereumTransaction
     */
    select?: EthereumTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EthereumTransaction
     */
    omit?: EthereumTransactionOmit<ExtArgs> | null
    /**
     * Filter, which EthereumTransaction to fetch.
     */
    where: EthereumTransactionWhereUniqueInput
  }

  /**
   * EthereumTransaction findFirst
   */
  export type EthereumTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EthereumTransaction
     */
    select?: EthereumTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EthereumTransaction
     */
    omit?: EthereumTransactionOmit<ExtArgs> | null
    /**
     * Filter, which EthereumTransaction to fetch.
     */
    where?: EthereumTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EthereumTransactions to fetch.
     */
    orderBy?: EthereumTransactionOrderByWithRelationInput | EthereumTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EthereumTransactions.
     */
    cursor?: EthereumTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EthereumTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EthereumTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EthereumTransactions.
     */
    distinct?: EthereumTransactionScalarFieldEnum | EthereumTransactionScalarFieldEnum[]
  }

  /**
   * EthereumTransaction findFirstOrThrow
   */
  export type EthereumTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EthereumTransaction
     */
    select?: EthereumTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EthereumTransaction
     */
    omit?: EthereumTransactionOmit<ExtArgs> | null
    /**
     * Filter, which EthereumTransaction to fetch.
     */
    where?: EthereumTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EthereumTransactions to fetch.
     */
    orderBy?: EthereumTransactionOrderByWithRelationInput | EthereumTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EthereumTransactions.
     */
    cursor?: EthereumTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EthereumTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EthereumTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EthereumTransactions.
     */
    distinct?: EthereumTransactionScalarFieldEnum | EthereumTransactionScalarFieldEnum[]
  }

  /**
   * EthereumTransaction findMany
   */
  export type EthereumTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EthereumTransaction
     */
    select?: EthereumTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EthereumTransaction
     */
    omit?: EthereumTransactionOmit<ExtArgs> | null
    /**
     * Filter, which EthereumTransactions to fetch.
     */
    where?: EthereumTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EthereumTransactions to fetch.
     */
    orderBy?: EthereumTransactionOrderByWithRelationInput | EthereumTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EthereumTransactions.
     */
    cursor?: EthereumTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EthereumTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EthereumTransactions.
     */
    skip?: number
    distinct?: EthereumTransactionScalarFieldEnum | EthereumTransactionScalarFieldEnum[]
  }

  /**
   * EthereumTransaction create
   */
  export type EthereumTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EthereumTransaction
     */
    select?: EthereumTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EthereumTransaction
     */
    omit?: EthereumTransactionOmit<ExtArgs> | null
    /**
     * The data needed to create a EthereumTransaction.
     */
    data: XOR<EthereumTransactionCreateInput, EthereumTransactionUncheckedCreateInput>
  }

  /**
   * EthereumTransaction createMany
   */
  export type EthereumTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EthereumTransactions.
     */
    data: EthereumTransactionCreateManyInput | EthereumTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EthereumTransaction createManyAndReturn
   */
  export type EthereumTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EthereumTransaction
     */
    select?: EthereumTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EthereumTransaction
     */
    omit?: EthereumTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many EthereumTransactions.
     */
    data: EthereumTransactionCreateManyInput | EthereumTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EthereumTransaction update
   */
  export type EthereumTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EthereumTransaction
     */
    select?: EthereumTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EthereumTransaction
     */
    omit?: EthereumTransactionOmit<ExtArgs> | null
    /**
     * The data needed to update a EthereumTransaction.
     */
    data: XOR<EthereumTransactionUpdateInput, EthereumTransactionUncheckedUpdateInput>
    /**
     * Choose, which EthereumTransaction to update.
     */
    where: EthereumTransactionWhereUniqueInput
  }

  /**
   * EthereumTransaction updateMany
   */
  export type EthereumTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EthereumTransactions.
     */
    data: XOR<EthereumTransactionUpdateManyMutationInput, EthereumTransactionUncheckedUpdateManyInput>
    /**
     * Filter which EthereumTransactions to update
     */
    where?: EthereumTransactionWhereInput
    /**
     * Limit how many EthereumTransactions to update.
     */
    limit?: number
  }

  /**
   * EthereumTransaction updateManyAndReturn
   */
  export type EthereumTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EthereumTransaction
     */
    select?: EthereumTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EthereumTransaction
     */
    omit?: EthereumTransactionOmit<ExtArgs> | null
    /**
     * The data used to update EthereumTransactions.
     */
    data: XOR<EthereumTransactionUpdateManyMutationInput, EthereumTransactionUncheckedUpdateManyInput>
    /**
     * Filter which EthereumTransactions to update
     */
    where?: EthereumTransactionWhereInput
    /**
     * Limit how many EthereumTransactions to update.
     */
    limit?: number
  }

  /**
   * EthereumTransaction upsert
   */
  export type EthereumTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EthereumTransaction
     */
    select?: EthereumTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EthereumTransaction
     */
    omit?: EthereumTransactionOmit<ExtArgs> | null
    /**
     * The filter to search for the EthereumTransaction to update in case it exists.
     */
    where: EthereumTransactionWhereUniqueInput
    /**
     * In case the EthereumTransaction found by the `where` argument doesn't exist, create a new EthereumTransaction with this data.
     */
    create: XOR<EthereumTransactionCreateInput, EthereumTransactionUncheckedCreateInput>
    /**
     * In case the EthereumTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EthereumTransactionUpdateInput, EthereumTransactionUncheckedUpdateInput>
  }

  /**
   * EthereumTransaction delete
   */
  export type EthereumTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EthereumTransaction
     */
    select?: EthereumTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EthereumTransaction
     */
    omit?: EthereumTransactionOmit<ExtArgs> | null
    /**
     * Filter which EthereumTransaction to delete.
     */
    where: EthereumTransactionWhereUniqueInput
  }

  /**
   * EthereumTransaction deleteMany
   */
  export type EthereumTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EthereumTransactions to delete
     */
    where?: EthereumTransactionWhereInput
    /**
     * Limit how many EthereumTransactions to delete.
     */
    limit?: number
  }

  /**
   * EthereumTransaction without action
   */
  export type EthereumTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EthereumTransaction
     */
    select?: EthereumTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EthereumTransaction
     */
    omit?: EthereumTransactionOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const BitcoinTransactionScalarFieldEnum: {
    id: 'id',
    hash: 'hash',
    blockNumber: 'blockNumber',
    timestamp: 'timestamp',
    value: 'value',
    fee: 'fee',
    fromAddress: 'fromAddress',
    toAddress: 'toAddress',
    createdAt: 'createdAt'
  };

  export type BitcoinTransactionScalarFieldEnum = (typeof BitcoinTransactionScalarFieldEnum)[keyof typeof BitcoinTransactionScalarFieldEnum]


  export const EthereumTransactionScalarFieldEnum: {
    id: 'id',
    hash: 'hash',
    blockNumber: 'blockNumber',
    timestamp: 'timestamp',
    value: 'value',
    gasFee: 'gasFee',
    gasPrice: 'gasPrice',
    gasUsed: 'gasUsed',
    fromAddress: 'fromAddress',
    toAddress: 'toAddress',
    createdAt: 'createdAt'
  };

  export type EthereumTransactionScalarFieldEnum = (typeof EthereumTransactionScalarFieldEnum)[keyof typeof EthereumTransactionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type BitcoinTransactionWhereInput = {
    AND?: BitcoinTransactionWhereInput | BitcoinTransactionWhereInput[]
    OR?: BitcoinTransactionWhereInput[]
    NOT?: BitcoinTransactionWhereInput | BitcoinTransactionWhereInput[]
    id?: IntFilter<"BitcoinTransaction"> | number
    hash?: StringFilter<"BitcoinTransaction"> | string
    blockNumber?: BigIntFilter<"BitcoinTransaction"> | bigint | number
    timestamp?: DateTimeFilter<"BitcoinTransaction"> | Date | string
    value?: DecimalFilter<"BitcoinTransaction"> | Decimal | DecimalJsLike | number | string
    fee?: DecimalFilter<"BitcoinTransaction"> | Decimal | DecimalJsLike | number | string
    fromAddress?: StringFilter<"BitcoinTransaction"> | string
    toAddress?: StringFilter<"BitcoinTransaction"> | string
    createdAt?: DateTimeFilter<"BitcoinTransaction"> | Date | string
  }

  export type BitcoinTransactionOrderByWithRelationInput = {
    id?: SortOrder
    hash?: SortOrder
    blockNumber?: SortOrder
    timestamp?: SortOrder
    value?: SortOrder
    fee?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type BitcoinTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    hash?: string
    AND?: BitcoinTransactionWhereInput | BitcoinTransactionWhereInput[]
    OR?: BitcoinTransactionWhereInput[]
    NOT?: BitcoinTransactionWhereInput | BitcoinTransactionWhereInput[]
    blockNumber?: BigIntFilter<"BitcoinTransaction"> | bigint | number
    timestamp?: DateTimeFilter<"BitcoinTransaction"> | Date | string
    value?: DecimalFilter<"BitcoinTransaction"> | Decimal | DecimalJsLike | number | string
    fee?: DecimalFilter<"BitcoinTransaction"> | Decimal | DecimalJsLike | number | string
    fromAddress?: StringFilter<"BitcoinTransaction"> | string
    toAddress?: StringFilter<"BitcoinTransaction"> | string
    createdAt?: DateTimeFilter<"BitcoinTransaction"> | Date | string
  }, "id" | "hash">

  export type BitcoinTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    hash?: SortOrder
    blockNumber?: SortOrder
    timestamp?: SortOrder
    value?: SortOrder
    fee?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    createdAt?: SortOrder
    _count?: BitcoinTransactionCountOrderByAggregateInput
    _avg?: BitcoinTransactionAvgOrderByAggregateInput
    _max?: BitcoinTransactionMaxOrderByAggregateInput
    _min?: BitcoinTransactionMinOrderByAggregateInput
    _sum?: BitcoinTransactionSumOrderByAggregateInput
  }

  export type BitcoinTransactionScalarWhereWithAggregatesInput = {
    AND?: BitcoinTransactionScalarWhereWithAggregatesInput | BitcoinTransactionScalarWhereWithAggregatesInput[]
    OR?: BitcoinTransactionScalarWhereWithAggregatesInput[]
    NOT?: BitcoinTransactionScalarWhereWithAggregatesInput | BitcoinTransactionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BitcoinTransaction"> | number
    hash?: StringWithAggregatesFilter<"BitcoinTransaction"> | string
    blockNumber?: BigIntWithAggregatesFilter<"BitcoinTransaction"> | bigint | number
    timestamp?: DateTimeWithAggregatesFilter<"BitcoinTransaction"> | Date | string
    value?: DecimalWithAggregatesFilter<"BitcoinTransaction"> | Decimal | DecimalJsLike | number | string
    fee?: DecimalWithAggregatesFilter<"BitcoinTransaction"> | Decimal | DecimalJsLike | number | string
    fromAddress?: StringWithAggregatesFilter<"BitcoinTransaction"> | string
    toAddress?: StringWithAggregatesFilter<"BitcoinTransaction"> | string
    createdAt?: DateTimeWithAggregatesFilter<"BitcoinTransaction"> | Date | string
  }

  export type EthereumTransactionWhereInput = {
    AND?: EthereumTransactionWhereInput | EthereumTransactionWhereInput[]
    OR?: EthereumTransactionWhereInput[]
    NOT?: EthereumTransactionWhereInput | EthereumTransactionWhereInput[]
    id?: IntFilter<"EthereumTransaction"> | number
    hash?: StringFilter<"EthereumTransaction"> | string
    blockNumber?: BigIntFilter<"EthereumTransaction"> | bigint | number
    timestamp?: DateTimeFilter<"EthereumTransaction"> | Date | string
    value?: DecimalFilter<"EthereumTransaction"> | Decimal | DecimalJsLike | number | string
    gasFee?: DecimalFilter<"EthereumTransaction"> | Decimal | DecimalJsLike | number | string
    gasPrice?: DecimalFilter<"EthereumTransaction"> | Decimal | DecimalJsLike | number | string
    gasUsed?: BigIntFilter<"EthereumTransaction"> | bigint | number
    fromAddress?: StringFilter<"EthereumTransaction"> | string
    toAddress?: StringFilter<"EthereumTransaction"> | string
    createdAt?: DateTimeFilter<"EthereumTransaction"> | Date | string
  }

  export type EthereumTransactionOrderByWithRelationInput = {
    id?: SortOrder
    hash?: SortOrder
    blockNumber?: SortOrder
    timestamp?: SortOrder
    value?: SortOrder
    gasFee?: SortOrder
    gasPrice?: SortOrder
    gasUsed?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type EthereumTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    hash?: string
    AND?: EthereumTransactionWhereInput | EthereumTransactionWhereInput[]
    OR?: EthereumTransactionWhereInput[]
    NOT?: EthereumTransactionWhereInput | EthereumTransactionWhereInput[]
    blockNumber?: BigIntFilter<"EthereumTransaction"> | bigint | number
    timestamp?: DateTimeFilter<"EthereumTransaction"> | Date | string
    value?: DecimalFilter<"EthereumTransaction"> | Decimal | DecimalJsLike | number | string
    gasFee?: DecimalFilter<"EthereumTransaction"> | Decimal | DecimalJsLike | number | string
    gasPrice?: DecimalFilter<"EthereumTransaction"> | Decimal | DecimalJsLike | number | string
    gasUsed?: BigIntFilter<"EthereumTransaction"> | bigint | number
    fromAddress?: StringFilter<"EthereumTransaction"> | string
    toAddress?: StringFilter<"EthereumTransaction"> | string
    createdAt?: DateTimeFilter<"EthereumTransaction"> | Date | string
  }, "id" | "hash">

  export type EthereumTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    hash?: SortOrder
    blockNumber?: SortOrder
    timestamp?: SortOrder
    value?: SortOrder
    gasFee?: SortOrder
    gasPrice?: SortOrder
    gasUsed?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    createdAt?: SortOrder
    _count?: EthereumTransactionCountOrderByAggregateInput
    _avg?: EthereumTransactionAvgOrderByAggregateInput
    _max?: EthereumTransactionMaxOrderByAggregateInput
    _min?: EthereumTransactionMinOrderByAggregateInput
    _sum?: EthereumTransactionSumOrderByAggregateInput
  }

  export type EthereumTransactionScalarWhereWithAggregatesInput = {
    AND?: EthereumTransactionScalarWhereWithAggregatesInput | EthereumTransactionScalarWhereWithAggregatesInput[]
    OR?: EthereumTransactionScalarWhereWithAggregatesInput[]
    NOT?: EthereumTransactionScalarWhereWithAggregatesInput | EthereumTransactionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"EthereumTransaction"> | number
    hash?: StringWithAggregatesFilter<"EthereumTransaction"> | string
    blockNumber?: BigIntWithAggregatesFilter<"EthereumTransaction"> | bigint | number
    timestamp?: DateTimeWithAggregatesFilter<"EthereumTransaction"> | Date | string
    value?: DecimalWithAggregatesFilter<"EthereumTransaction"> | Decimal | DecimalJsLike | number | string
    gasFee?: DecimalWithAggregatesFilter<"EthereumTransaction"> | Decimal | DecimalJsLike | number | string
    gasPrice?: DecimalWithAggregatesFilter<"EthereumTransaction"> | Decimal | DecimalJsLike | number | string
    gasUsed?: BigIntWithAggregatesFilter<"EthereumTransaction"> | bigint | number
    fromAddress?: StringWithAggregatesFilter<"EthereumTransaction"> | string
    toAddress?: StringWithAggregatesFilter<"EthereumTransaction"> | string
    createdAt?: DateTimeWithAggregatesFilter<"EthereumTransaction"> | Date | string
  }

  export type BitcoinTransactionCreateInput = {
    hash: string
    blockNumber: bigint | number
    timestamp: Date | string
    value: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    fromAddress: string
    toAddress: string
    createdAt?: Date | string
  }

  export type BitcoinTransactionUncheckedCreateInput = {
    id?: number
    hash: string
    blockNumber: bigint | number
    timestamp: Date | string
    value: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    fromAddress: string
    toAddress: string
    createdAt?: Date | string
  }

  export type BitcoinTransactionUpdateInput = {
    hash?: StringFieldUpdateOperationsInput | string
    blockNumber?: BigIntFieldUpdateOperationsInput | bigint | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fromAddress?: StringFieldUpdateOperationsInput | string
    toAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BitcoinTransactionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    hash?: StringFieldUpdateOperationsInput | string
    blockNumber?: BigIntFieldUpdateOperationsInput | bigint | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fromAddress?: StringFieldUpdateOperationsInput | string
    toAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BitcoinTransactionCreateManyInput = {
    id?: number
    hash: string
    blockNumber: bigint | number
    timestamp: Date | string
    value: Decimal | DecimalJsLike | number | string
    fee: Decimal | DecimalJsLike | number | string
    fromAddress: string
    toAddress: string
    createdAt?: Date | string
  }

  export type BitcoinTransactionUpdateManyMutationInput = {
    hash?: StringFieldUpdateOperationsInput | string
    blockNumber?: BigIntFieldUpdateOperationsInput | bigint | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fromAddress?: StringFieldUpdateOperationsInput | string
    toAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BitcoinTransactionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    hash?: StringFieldUpdateOperationsInput | string
    blockNumber?: BigIntFieldUpdateOperationsInput | bigint | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fromAddress?: StringFieldUpdateOperationsInput | string
    toAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EthereumTransactionCreateInput = {
    hash: string
    blockNumber: bigint | number
    timestamp: Date | string
    value: Decimal | DecimalJsLike | number | string
    gasFee: Decimal | DecimalJsLike | number | string
    gasPrice: Decimal | DecimalJsLike | number | string
    gasUsed: bigint | number
    fromAddress: string
    toAddress: string
    createdAt?: Date | string
  }

  export type EthereumTransactionUncheckedCreateInput = {
    id?: number
    hash: string
    blockNumber: bigint | number
    timestamp: Date | string
    value: Decimal | DecimalJsLike | number | string
    gasFee: Decimal | DecimalJsLike | number | string
    gasPrice: Decimal | DecimalJsLike | number | string
    gasUsed: bigint | number
    fromAddress: string
    toAddress: string
    createdAt?: Date | string
  }

  export type EthereumTransactionUpdateInput = {
    hash?: StringFieldUpdateOperationsInput | string
    blockNumber?: BigIntFieldUpdateOperationsInput | bigint | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gasFee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gasPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gasUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    fromAddress?: StringFieldUpdateOperationsInput | string
    toAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EthereumTransactionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    hash?: StringFieldUpdateOperationsInput | string
    blockNumber?: BigIntFieldUpdateOperationsInput | bigint | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gasFee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gasPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gasUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    fromAddress?: StringFieldUpdateOperationsInput | string
    toAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EthereumTransactionCreateManyInput = {
    id?: number
    hash: string
    blockNumber: bigint | number
    timestamp: Date | string
    value: Decimal | DecimalJsLike | number | string
    gasFee: Decimal | DecimalJsLike | number | string
    gasPrice: Decimal | DecimalJsLike | number | string
    gasUsed: bigint | number
    fromAddress: string
    toAddress: string
    createdAt?: Date | string
  }

  export type EthereumTransactionUpdateManyMutationInput = {
    hash?: StringFieldUpdateOperationsInput | string
    blockNumber?: BigIntFieldUpdateOperationsInput | bigint | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gasFee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gasPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gasUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    fromAddress?: StringFieldUpdateOperationsInput | string
    toAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EthereumTransactionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    hash?: StringFieldUpdateOperationsInput | string
    blockNumber?: BigIntFieldUpdateOperationsInput | bigint | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gasFee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gasPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    gasUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    fromAddress?: StringFieldUpdateOperationsInput | string
    toAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type BitcoinTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    hash?: SortOrder
    blockNumber?: SortOrder
    timestamp?: SortOrder
    value?: SortOrder
    fee?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type BitcoinTransactionAvgOrderByAggregateInput = {
    id?: SortOrder
    blockNumber?: SortOrder
    value?: SortOrder
    fee?: SortOrder
  }

  export type BitcoinTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    hash?: SortOrder
    blockNumber?: SortOrder
    timestamp?: SortOrder
    value?: SortOrder
    fee?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type BitcoinTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    hash?: SortOrder
    blockNumber?: SortOrder
    timestamp?: SortOrder
    value?: SortOrder
    fee?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type BitcoinTransactionSumOrderByAggregateInput = {
    id?: SortOrder
    blockNumber?: SortOrder
    value?: SortOrder
    fee?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EthereumTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    hash?: SortOrder
    blockNumber?: SortOrder
    timestamp?: SortOrder
    value?: SortOrder
    gasFee?: SortOrder
    gasPrice?: SortOrder
    gasUsed?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type EthereumTransactionAvgOrderByAggregateInput = {
    id?: SortOrder
    blockNumber?: SortOrder
    value?: SortOrder
    gasFee?: SortOrder
    gasPrice?: SortOrder
    gasUsed?: SortOrder
  }

  export type EthereumTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    hash?: SortOrder
    blockNumber?: SortOrder
    timestamp?: SortOrder
    value?: SortOrder
    gasFee?: SortOrder
    gasPrice?: SortOrder
    gasUsed?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type EthereumTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    hash?: SortOrder
    blockNumber?: SortOrder
    timestamp?: SortOrder
    value?: SortOrder
    gasFee?: SortOrder
    gasPrice?: SortOrder
    gasUsed?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type EthereumTransactionSumOrderByAggregateInput = {
    id?: SortOrder
    blockNumber?: SortOrder
    value?: SortOrder
    gasFee?: SortOrder
    gasPrice?: SortOrder
    gasUsed?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}