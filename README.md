# 🚀 Cache Components Demo - Next.js 16

> Demostración práctica de cacheo granular por campo usando Cache Components en Next.js 16

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)

## 🎯 ¿Qué resuelve?

Este proyecto demuestra cómo cachear **campos individuales de un registro** con diferentes estrategias en Next.js 16.

### Problema común

Tienes un producto con 3 campos que cambian a diferentes velocidades:

- **Texto** (nombre + descripción): Rara vez cambia
- **Precio**: Cambia ocasionalmente
- **Stock**: Debe estar siempre actualizado

¿Cómo cacheas cada campo independientemente?

### Solución

Cada campo es un **componente async separado** con su propia query y estrategia de cache.

```tsx
// ✅ Cada campo con su estrategia
<ProductText productId={id} />      // Cacheado 1 semana
<ProductPrice productId={id} />     // Cacheado 1 hora
<Suspense>
  <ProductStock productId={id} />   // Sin cache (streaming)
</Suspense>
```

## ✨ Features

- ✅ **Cacheo granular por campo** - Control independiente de cada dato
- ✅ **Queries separadas** - Una query por campo, optimización automática
- ✅ **Tags para revalidación** - Invalida solo lo que cambió
- ✅ **Static shell + Streaming** - HTML instantáneo + datos frescos
- ✅ **Suspense correcto** - Ejemplos de dónde va y por qué
- ✅ **Demo interactiva** - Botones para probar revalidación en vivo
- ✅ **Tailwind + shadcn/ui** - UI moderna y profesional
- ✅ **TypeScript** - Type-safe en toda la app
- ✅ **Mock DB con logs** - Ve qué queries se ejecutan y cuándo

## 🏗️ Arquitectura

```
ProductPage (padre - sync)
│
└─ <Suspense>
   └─ ProductContent (async - accede a params)
      ├─ ProductText (async + 'use cache' + cacheLife('weeks'))
      ├─ ProductPrice (async + 'use cache' + cacheLife('hours'))
      └─ <Suspense>
         └─ ProductStock (async sin cache - streaming)
```

## 📦 Instalación

```bash
# Clonar el repo
git clone https://github.com/tu-usuario/cache-components-demo.git
cd cache-components-demo

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 🎮 Cómo usar

### 1. Ver la demo en acción

- Home muestra lista de productos
- Click en cualquier producto
- Observa los badges de color indicando qué está cacheado

### 2. Ver en Network tab

- Abre DevTools → Network
- Disable cache
- Navega a un producto
- Ve cómo el HTML inicial ya tiene texto y precio
- Ve cómo el stock llega después (streaming)

### 3. Ver logs del servidor

En la consola verás:

```
[DB Query] 📝 getProductText - Product 1
[DB Query] 💰 getProductPrice - Product 1
[DB Query] 📦 getProductStock - Product 1
```

### 4. Probar revalidación

- Click en "Revalidar Precio"
- Refresh la página
- Solo el precio se regenera
- El texto mantiene su cache

## 📂 Estructura del proyecto

```
.
├── app/
│   ├── page.tsx                    # Home con lista de productos
│   ├── actions.ts                  # Server Actions para revalidación
│   ├── layout.tsx                  # Layout principal
│   └── product/[id]/
│       ├── page.tsx                # ⭐ Página del producto (cacheo granular)
│       └── RevalidateButtons.tsx   # Botones de revalidación (client)
├── lib/
│   └── db.ts                       # Mock de database con queries separadas
├── components/ui/                  # Componentes de shadcn/ui
├── next.config.ts                  # Config con cacheComponents: true
└── README.md
```

## 🔑 Conceptos clave

### 1. Componente async = Promesa

```tsx
// El componente async ES una promesa
async function ProductStock({ productId }) {
  const stock = await db.getStock(productId)
  return <div>{stock}</div>
}

// Por eso Suspense va en el PADRE
<Suspense fallback="Loading...">
  <ProductStock />  {/* ← Esta línea crea la promesa */}
</Suspense>
```

### 2. Múltiples queries vs Cache

Sí, son múltiples queries, pero:

- Las **cacheadas** se ejecutan en **build time** → static shell
- Las **dinámicas** se ejecutan en **request time** → streaming
- Total: Mejor performance percibida

### 3. Tags para revalidación

```tsx
// Cachear con tag
cacheTag('product-price', productId)  // → 'product-price-1'

// Revalidar solo ese campo
revalidateTag('product-price-1', 'max')
```

### 4. Runtime data requiere Suspense

```tsx
// params es runtime data
export default function ProductPage({ params }) {
  return (
    <Suspense>
      <ProductContent params={params} />
    </Suspense>
  )
}
```

## 🎨 Tech Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **React:** 19
- **TypeScript:** 5
- **Styling:** Tailwind CSS 3
- **Components:** shadcn/ui
- **Cache:** Cache Components (PPR)

## 📚 Recursos

- [Documentación oficial de Cache Components](https://nextjs.org/docs/app/getting-started/cache-components)
- [use cache directive](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- [cacheLife API](https://nextjs.org/docs/app/api-reference/functions/cacheLife)
- [cacheTag API](https://nextjs.org/docs/app/api-reference/functions/cacheTag)
- [revalidateTag API](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)

## 🚢 Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/cache-components-demo)

```bash
npm i -g vercel
vercel
```

### Otros providers

Asegúrate de:

- ✅ Usar Node.js runtime (no Edge)
- ✅ `cacheComponents: true` en next.config.ts
- ✅ Next.js 16.1.6 o superior

## 🐛 Troubleshooting

### Error: "Uncached data was accessed outside of Suspense"

**Causa:** Componente async sin cache ni Suspense

**Solución:** Agregar `<Suspense>` en el padre o `'use cache'` en el componente

### Stock no cambia en refresh

**Causa:** Browser cache activado

**Solución:** Hard refresh (Ctrl+Shift+R) o ventana privada

### Revalidación no funciona

**Causa:** Tag incorrecto

**Solución:** Verificar: `cacheTag('x', id)` → `revalidateTag('x-' + id, 'max')`

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📝 Licencia

MIT

## 👤 Autor

Creado para demostrar Cache Components en Next.js 16

---

**⭐ Si este proyecto te ayudó a entender Cache Components, dale una estrella!**

## 💡 ¿Aprendiste algo?

Este proyecto demuestra patrones avanzados de Next.js 16:

- Cacheo granular con `use cache`
- Suspense boundaries correctos
- Runtime data handling
- Revalidación selectiva con tags
- Static shell + Streaming (PPR)

Úsalo como referencia para tus proyectos reales.
