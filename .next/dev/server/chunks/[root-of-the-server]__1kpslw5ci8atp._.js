module.exports = [
(()=>{"use strict";return[
"[project]/app/_lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/adapter-pg/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$generated$2f$prisma$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/app/generated/prisma/client.ts [app-route] (ecmascript) <locals>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const createClient = ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$generated$2f$prisma$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PrismaClient"]({
        adapter: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaPg"]({
            connectionString: process.env["DATABASE_URL"]
        })
    });
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ??= createClient();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/app/api/photos/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$_lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/_lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$_lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$_lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
async function GET() {
    const photos = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$_lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].photo.findMany({});
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(photos);
}
async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("files");
        if (!(file instanceof File)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "No file uploaded"
            }, {
                status: 400
            });
        }
        const storagePath = `/uploads/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
        const photo = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$_lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].photo.create({
            data: {
                storagePath,
                label: null,
                ground: "training"
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            photo
        });
    } catch (error) {
        console.error("Upload error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Upload failed"
        }, {
            status: 500
        });
    }
}
async function PATCH(request) {
    const body = await request.json();
    console.log("PATCH body:", body);
    return new Response("Hello, this is the photos PATCH route!", {
        status: 200
    });
}
async function DELETE(request) {
    const body = await request.json();
    console.log("DELETE body:", body);
    return new Response("Hello, this is the photos DELETE route!", {
        status: 200
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/app/generated/prisma/client.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/* !!! This is code generated by Prisma. Do not edit directly. !!! */ /* eslint-disable */ // biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * This file should be your main import to use Prisma. Through it you get access to all the models, enums, and input types.
 * If you're looking for something you can import in the client-side of your application, please refer to the `browser.ts` file instead.
 *
 * 🟢 You can import this file directly.
 */ __turbopack_context__.s([
    "PrismaClient",
    ()=>PrismaClient
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:url [external] (node:url, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$generated$2f$prisma$2f$internal$2f$class$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/generated/prisma/internal/class.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$generated$2f$prisma$2f$internal$2f$prismaNamespace$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/generated/prisma/internal/prismaNamespace.ts [app-route] (ecmascript)");
var __TURBOPACK__import$2e$meta__ = {
    get url () {
        return __turbopack_context__.F("app/generated/prisma/client.ts");
    },
    env: {
        DEV: true,
        PROD: false,
        MODE: "development",
        BASE_URL: "/",
        SSR: true
    },
    get turbopackHot () {
        return __turbopack_context__.m.hot;
    }
};
;
;
globalThis['__dirname'] = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["dirname"]((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__["fileURLToPath"])(__TURBOPACK__import$2e$meta__.url));
;
;
;
;
const PrismaClient = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$generated$2f$prisma$2f$internal$2f$class$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPrismaClientClass"]();
;
}),
"[project]/app/generated/prisma/internal/class.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPrismaClientClass",
    ()=>getPrismaClientClass
]);
/* !!! This is code generated by Prisma. Do not edit directly. !!! */ /* eslint-disable */ // biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * WARNING: This is an internal file that is subject to change!
 *
 * 🛑 Under no circumstances should you import this file directly! 🛑
 *
 * Please import the `PrismaClient` class from the `client.ts` file instead.
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client/runtime/client [external] (@prisma/client/runtime/client, cjs, [project]/node_modules/@prisma/client)");
;
const config = {
    "previewFeatures": [],
    "clientVersion": "7.10.1",
    "engineVersion": "d1b3f377ca835d73fd50954a5e22128b9ebdd6b8",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../app/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nenum Ground {\n  training\n  testing\n}\n\nenum Label {\n  CAT\n  NOT_CAT\n}\n\nenum Status {\n  ACTIVE\n  NOT_ACTIVE\n}\n\nmodel Photo {\n  id          String   @id @default(uuid())\n  storagePath String   @unique\n  label       Label?\n  ground      Ground   @default(training)\n  creativeAt  DateTime @default(now())\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"Photo\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"storagePath\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"label\",\"kind\":\"enum\",\"type\":\"Label\"},{\"name\":\"ground\",\"kind\":\"enum\",\"type\":\"Ground\"},{\"name\":\"creativeAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null,\"schema\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"Photo.findUnique\",\"Photo.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"Photo.findFirst\",\"Photo.findFirstOrThrow\",\"Photo.findMany\",\"data\",\"Photo.createOne\",\"Photo.createMany\",\"Photo.createManyAndReturn\",\"Photo.updateOne\",\"Photo.updateMany\",\"Photo.updateManyAndReturn\",\"create\",\"update\",\"Photo.upsertOne\",\"Photo.deleteOne\",\"Photo.deleteMany\",\"having\",\"_count\",\"_min\",\"_max\",\"Photo.groupBy\",\"Photo.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"storagePath\",\"Label\",\"label\",\"Ground\",\"ground\",\"creativeAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"set\"]"),
    graph: "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"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await __turbopack_context__.A("[externals]/node:buffer [external] (node:buffer, cjs, async loader)");
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async ()=>await __turbopack_context__.A("[externals]/@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs [external] (@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs, esm_import, [project]/node_modules/@prisma/client, async loader)"),
    getQueryCompilerWasmModule: async ()=>{
        const { wasm } = await __turbopack_context__.A("[externals]/@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs [external] (@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs, esm_import, [project]/node_modules/@prisma/client, async loader)");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["getPrismaClient"](config);
}
}),
"[project]/app/generated/prisma/internal/prismaNamespace.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnyNull",
    ()=>AnyNull,
    "DbNull",
    ()=>DbNull,
    "Decimal",
    ()=>Decimal,
    "JsonNull",
    ()=>JsonNull,
    "ModelName",
    ()=>ModelName,
    "NullTypes",
    ()=>NullTypes,
    "NullsOrder",
    ()=>NullsOrder,
    "PhotoScalarFieldEnum",
    ()=>PhotoScalarFieldEnum,
    "PrismaClientInitializationError",
    ()=>PrismaClientInitializationError,
    "PrismaClientKnownRequestError",
    ()=>PrismaClientKnownRequestError,
    "PrismaClientRustPanicError",
    ()=>PrismaClientRustPanicError,
    "PrismaClientUnknownRequestError",
    ()=>PrismaClientUnknownRequestError,
    "PrismaClientValidationError",
    ()=>PrismaClientValidationError,
    "QueryMode",
    ()=>QueryMode,
    "SortOrder",
    ()=>SortOrder,
    "Sql",
    ()=>Sql,
    "TransactionIsolationLevel",
    ()=>TransactionIsolationLevel,
    "defineExtension",
    ()=>defineExtension,
    "empty",
    ()=>empty,
    "getExtensionContext",
    ()=>getExtensionContext,
    "join",
    ()=>join,
    "prismaVersion",
    ()=>prismaVersion,
    "raw",
    ()=>raw,
    "sql",
    ()=>sql
]);
/* !!! This is code generated by Prisma. Do not edit directly. !!! */ /* eslint-disable */ // biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * WARNING: This is an internal file that is subject to change!
 *
 * 🛑 Under no circumstances should you import this file directly! 🛑
 *
 * All exports from this file are wrapped under a `Prisma` namespace object in the client.ts file.
 * While this enables partial backward compatibility, it is not part of the stable public API.
 *
 * If you are looking for your Models, Enums, and Input Types, please import them from the respective
 * model files in the `model` directory!
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client/runtime/client [external] (@prisma/client/runtime/client, cjs, [project]/node_modules/@prisma/client)");
;
const PrismaClientKnownRequestError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientKnownRequestError"];
const PrismaClientUnknownRequestError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientUnknownRequestError"];
const PrismaClientRustPanicError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientRustPanicError"];
const PrismaClientInitializationError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientInitializationError"];
const PrismaClientValidationError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientValidationError"];
const sql = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["sqltag"];
const empty = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["empty"];
const join = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["join"];
const raw = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["raw"];
const Sql = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Sql"];
const Decimal = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Decimal"];
const getExtensionContext = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Extensions"].getExtensionContext;
const prismaVersion = {
    client: "7.10.1",
    engine: "d1b3f377ca835d73fd50954a5e22128b9ebdd6b8"
};
const NullTypes = {
    DbNull: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["NullTypes"].DbNull,
    JsonNull: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["NullTypes"].JsonNull,
    AnyNull: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["NullTypes"].AnyNull
};
const DbNull = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["DbNull"];
const JsonNull = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["JsonNull"];
const AnyNull = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["AnyNull"];
const ModelName = {
    Photo: 'Photo'
};
const TransactionIsolationLevel = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["makeStrictEnum"]({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
const PhotoScalarFieldEnum = {
    id: 'id',
    storagePath: 'storagePath',
    label: 'label',
    ground: 'ground',
    creativeAt: 'creativeAt'
};
const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
const NullsOrder = {
    first: 'first',
    last: 'last'
};
const defineExtension = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Extensions"].defineExtension;
}),
]})(),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/node:url [external] (node:url, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:url", () => require("node:url"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1kpslw5ci8atp._.js.map