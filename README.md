# Influu - WebApp

## Stack

- [Vue.js](https://vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vuetify](https://vuetifyjs.com/)
- [Vue CLI](https://cli.vuejs.org/)
- [Axios](https://github.com/axios/axios)
- [Stylus](https://stylus-lang.com/)
- [@brazilian-utils/validators](https://github.com/brazilian-utils/brazilian-utils)

Recomenda-se a versão [`v10.15+` de Node](https://nodejs.org/en/download/) e a utilização do [`gitmoji cli`](https://github.com/carloscuesta/gitmoji-cli) para as mensagens de commit.

### ESLint / Padrões

O projeto usa o [ESLint](https://eslint.org/) para validar o estilo e padrão básico de código.
O conjunto de regras do [Prettier Style](https://github.com/prettier/prettier-eslint) é utilizado.

- Todo o código utiliza ES2015+
- Componentes devem ser CamelCase: `Page.vue`, `AuthButton.vue`...
- Evitar o uso de `inline style`
- Evitar chamadas http dentro de componentes
- `const` é utilizado preferencialmente.
- `let` é utilizado caso seja possível usar `const`.
- `var` nunca é utilizado.
- `window` deve ser evitado a todo custo, nenhuma váriavel pode ser declarada nele.

## Estrutura
Há 3 pastas principais dentro de `src/app`: `Apps`, `Business` e `Common`

### app/Apps
Contém a lógica de apresentação, rotas e componentes de rotas.
Atualmente há `auth` e `dashboard`, esta estrutura prevê a existencia de `backoffice` no futuro.

### app/Business
Regras de negócio (domínios), parte lógica não visual.
Módulos do vuex entram nessa camada.

### app/Common
Camada comum entre as outras camadas.
Contém componentes úteis ou comuns nas outras camadas.
Além de componentes possui funções úteis.

## Mais detalhes da estrutura

### Business/services
Onde ficam os arquivos para fazer requisição HTTP para a API.

### Components comuns ou não
Components que são usados apenas em 1 contexto (ex: Campanhas), fica na mesma pasta da view.
Components comuns que podem ser usados em mais contextos, ficam no `@Common/components`.

## Menu
O arquivo `menu.js` é responsável pelas rotas do app (exceto auth) e também pelas routas do Vue.
O campo `visible` define se a rota aparece no menu não, inclsuive no submenu.

Para mostrar o texto no topo da página e o ícone, deve se usar:
```
props:{
        icon: "mdi-account-circle",
        text: "menu.profile.data"
      }
```

Mas se for um menu apenas para expandir e não direciona para alguma página, deve-se usar sem o props:
```
text: "menu.profile.expandMenu",
icon: "mdi-account-circle",
```

### Submenus
No arquivo `menu.js`, se o menu possuir submenu, deve ser colocado como `children[]`, além de ter um component como layout (podendo ter somente o `<router-view>` ou não).

## Alias

Os seguintes _alias_ estão configurados no projeto.

```
@assets   => src/assets
@utils    => src/utils
@Apps     => src/app/Apps
@Business => src/app/Business
@Common   => src/app/Common
```

## Instalando e Rodando Localmente

O Yarn é usado para o gerenciamento das dependências. O arquivo yarn.lock deve ser incluído nos commits para garantir builds reprodutíveis.

Para rodar o projeto é necessário um arquivo .env contendo as configurações de locales e as URLs das APIs utilizados. O projeto contém templates para possíveis configurações, nos arquivos .env.*. Para rodar localmente, escolha o arquivo deseja e copie-o para .env. Em produção, o sistema de CI cuida disso automaticamente.

Após clonar o projeto, instalar as dependências com o Yarn e criar o arquivo .env, execute

```
npm run serve
```

para rodar em modo de desenvolvimento. Para a build, execute

```
npm run build
```

## Internacionalização

Deve-se seguir o padrão com i18n para internacionalização do projeto.
Os arquivos estão localizados dentro de `@Common/locales`.


## Style Guide

| Key | Value |
|--|--|
| Font Family | Roboto |
| Icon set | [Material Design Icons](https://materialdesignicons.com) |

![](assets/images/colors.jpeg)
