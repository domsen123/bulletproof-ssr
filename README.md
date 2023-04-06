## Prepare

- ```git clone https://github.com/domsen123/bulletproof-ssr.git``` - clone repo
- ```cd bulletproof-ssr``` - switch to repo
- ```pnpm -r i``` - install all dependencies
- ```pnpm -r build``` - to build everything
- ```pnpm api i mssql|pg|sqlite3|mysql2|oracledb``` - to install database driver
- ```cp ./packages/api/config.example.js ./packages/api/config.dev.js``` - to copy config
- ```nano ./packages/api/config.dev.js``` - to edit config
- ```pnpm api cli db:migrate``` - to migrate the database
- ```pnpm api cli db:seed``` - to seed the database

## Development
Just use ```pnpm api dev```

## Production
Just use ```pnpm build``` or ```pnpm build:start```

## Start Production
Just use ```pnpm start```

## Initial User
Mail: bullet@proof.com
Pass: pass4word

## Features
- ⚡ [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [fastify](https://github.com/fastify/fastify), [pnpm](https://pnpm.io/), [tsup](https://tsup.egoist.dev/) - born with fastness
- ![Vuetify](https://api.iconify.design/logos:vuetifyjs.svg) [Vuetify](https://vuetifyjs.com/en/) Components
- 👾 [Server Side Rendered](https://vitejs.dev/guide/ssr.html)
- 🎨 [UnoCSS](https://github.com/antfu/unocss) - the instant on-demand atomic CSS engine
- 🍍 [State Management via Pinia](https://pinia.vuejs.org/)
- 📥 [APIs auto importing](https://github.com/antfu/unplugin-auto-import)
- 😃 [Use icons from any icon sets with classes](https://github.com/antfu/unocss/tree/main/packages/preset-icons)
- 💾 [Knex](https://knexjs.org/) - low level query builder
- 🔥 Use the [new ```<script setup>``` syntax](https://github.com/vuejs/rfcs/pull/227)
- 💪 TypeScript, of course

## Inspired by
- [antfu/vitesse](https://github.com/antfu/vitesse) - 🏕 Opinionated Vite + Vue Starter Template
- [frandiox/vite-ssr](https://github.com/frandiox/vite-ssr) - Use Vite for server side rendering in Node
- [santiq/bulletproof-nodejs](https://github.com/santiq/bulletproof-nodejs) - Implementation of a bulletproof node.js API 🛡️