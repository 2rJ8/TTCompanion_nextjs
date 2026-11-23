module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/page.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TableTopApp$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/TableTopApp.jsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$games$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/games.js [app-rsc] (ecmascript)");
;
;
;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tabletopcompanion.app';
function Page() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Table Top Companion',
        url: siteUrl,
        description: 'Descubre juegos de mesa, compara mecánicas y encuentra tu próxima partida con la comunidad.',
        inLanguage: 'es-ES'
    };
    const organizationJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Table Top Companion',
        url: siteUrl,
        logo: `${siteUrl}/assets/images/App_Icon.svg`
    };
    const catalogJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Catálogo de juegos de mesa',
        description: 'Juegos de mesa recomendados por la comunidad de Table Top Companion.',
        numberOfItems: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$games$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["games"].length,
        itemListElement: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$games$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["games"].map((game, index)=>({
                '@type': 'ListItem',
                position: index + 1,
                url: `${siteUrl}/#game/${game.slug}`,
                name: game.name
            }))
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            [
                jsonLd,
                organizationJsonLd,
                catalogJsonLd
            ].map((structuredData)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                    type: "application/ld+json",
                    dangerouslySetInnerHTML: {
                        __html: JSON.stringify(structuredData).replace(/</g, '\\u003c')
                    }
                }, structuredData['@type'], false, {
                    fileName: "[project]/app/page.jsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TableTopApp$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/page.jsx",
                lineNumber: 48,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.jsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/page.jsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.jsx [app-rsc] (ecmascript)"));
}),
"[project]/src/components/TableTopApp.jsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/TableTopApp.jsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/TableTopApp.jsx", "default");
}),
"[project]/src/components/TableTopApp.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TableTopApp$2e$jsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/TableTopApp.jsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TableTopApp$2e$jsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/data/games.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "games",
    ()=>games
]);
const games = [
    {
        slug: 'arcs',
        name: 'Arcs',
        category: 'estrategia',
        players: '2–4 jugadores',
        time: '60–120 min',
        rating: '8,7',
        badge: 'Destacado',
        description: 'Decisiones grandes en una galaxia pequeña.',
        search: 'arcs estrategia galaxia campaña negociación',
        year: '2024',
        designer: 'Cole Wehrle',
        complexity: 'Alta',
        mechanics: [
            'Control de áreas',
            'Gestión de cartas',
            'Negociación'
        ],
        longDescription: 'Arcs es un juego de estrategia y conflicto en un universo al borde del colapso. Cada ronda te obliga a interpretar tus cartas y convertir una pequeña ventaja en una gran oportunidad.',
        highlights: [
            'Campañas con historias emergentes',
            'Conflicto directo y negociación',
            'Alta rejugabilidad'
        ]
    },
    {
        slug: 'sky-team',
        name: 'Sky Team',
        category: 'cooperativo',
        players: '2 jugadores',
        time: '15–20 min',
        rating: '9,3',
        badge: 'Comunidad',
        description: 'Coordinación y silencio a miles de metros.',
        search: 'sky team cooperativo dados aviones',
        year: '2023',
        designer: 'Luc Rémond',
        complexity: 'Media',
        mechanics: [
            'Cooperativo',
            'Dados',
            'Comunicación limitada'
        ],
        longDescription: 'Tú y tu copiloto estáis solos en la cabina. Lanzad los dados, tomad decisiones en silencio y conseguid aterrizar en aeropuertos de todo el mundo.',
        highlights: [
            'Partidas rápidas y tensas',
            'Escenarios con dificultad creciente',
            'Cooperación para dos'
        ]
    },
    {
        slug: 'heat',
        name: 'Heat',
        category: 'familiar',
        players: '1–6 jugadores',
        time: '60 min',
        rating: '8,5',
        badge: 'Más jugado',
        description: 'La carrera que convierte cada curva en una decisión.',
        search: 'heat carreras coches familiar velocidad',
        year: '2022',
        designer: 'Asger Harding Granerud',
        complexity: 'Media',
        mechanics: [
            'Carreras',
            'Gestión de mano',
            'Movimiento',
            'Riesgo'
        ],
        longDescription: 'Pisa el acelerador, domina las curvas y gestiona el calor de tu motor en una carrera de coches llena de adelantamientos y decisiones arriesgadas.',
        highlights: [
            'Modo campeonato',
            'Reglas accesibles',
            'Hasta seis pilotos'
        ]
    },
    {
        slug: 'the-white-castle',
        name: 'The White Castle',
        category: 'estrategia',
        players: '1–4 jugadores',
        time: '80 min',
        rating: '8,8',
        badge: 'Recomendado',
        description: 'Pequeño en mesa, enorme en decisiones.',
        search: 'white castle castillo estrategia dados europa',
        year: '2023',
        designer: 'Israel Cendrero y Sheila Santos',
        complexity: 'Media',
        mechanics: [
            'Colocación de trabajadores',
            'Dados',
            'Gestión de recursos'
        ],
        longDescription: 'En la corte del castillo Himeji, cada dado puede abrirte una puerta. Planifica tus acciones para ganar influencia, cuidar tus jardines y prosperar durante tres intensos turnos.',
        highlights: [
            'Gran profundidad en poco tiempo',
            'Componentes cuidados',
            'Excelente a cualquier número de jugadores'
        ]
    },
    {
        slug: 'pax-pamir',
        name: 'Pax Pamir',
        category: 'solitario',
        players: '1–5 jugadores',
        time: '90–120 min',
        rating: '8,9',
        badge: 'Para ti',
        description: 'Historia, alianzas y poder en cada carta.',
        search: 'pax pamir solitario historia cartas',
        year: '2019',
        designer: 'Cole Wehrle',
        complexity: 'Alta',
        mechanics: [
            'Construcción de tableau',
            'Alianzas',
            'Control de áreas'
        ],
        longDescription: 'Construye tu propia coalición en el Afganistán del siglo XIX. Las alianzas cambian, los imperios avanzan y solo sobrevivirá quien sepa adaptarse.',
        highlights: [
            'Tema histórico inmersivo',
            'Sistema de mercado único',
            'Modo solitario incluido'
        ]
    },
    {
        slug: 'pandemic',
        name: 'Pandemic',
        category: 'cooperativo',
        players: '2–4 jugadores',
        time: '45 min',
        rating: '8,2',
        badge: 'Clásico',
        description: 'Un equipo, cuatro enfermedades y poco tiempo.',
        search: 'pandemic cooperativo medicina familia',
        year: '2008',
        designer: 'Matt Leacock',
        complexity: 'Media',
        mechanics: [
            'Cooperativo',
            'Gestión de mano',
            'Colección de sets'
        ],
        longDescription: 'Cuatro enfermedades se extienden por el mundo y el tiempo corre. Coordina a tu equipo de especialistas para encontrar las curas antes de que sea demasiado tarde.',
        highlights: [
            'Un clásico cooperativo',
            'Roles con habilidades únicas',
            'Ideal para jugar en familia'
        ]
    },
    {
        slug: 'cascadia',
        name: 'Cascadia',
        category: 'familiar',
        players: '1–4 jugadores',
        time: '30–45 min',
        rating: '8,6',
        badge: 'Popular',
        description: 'Construye el hábitat natural más equilibrado.',
        search: 'cascadia familiar naturaleza colocacion losetas',
        year: '2021',
        designer: 'Randy Flynn',
        complexity: 'Baja',
        mechanics: [
            'Colocación de losetas',
            'Colocación de fichas',
            'Patrones'
        ],
        longDescription: 'Crea un ecosistema equilibrado en el noroeste del Pacífico. Combina hábitats y animales para formar el paisaje más armonioso.',
        highlights: [
            'Reglas sencillas y decisiones interesantes',
            'Modo solitario rejugable',
            'Partidas relajadas'
        ]
    }
];
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__10qo5eat5ean5._.js.map