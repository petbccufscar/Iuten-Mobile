# Iuten-Mobile

Aplicativo que implementa o jogo Iuten usando Expo + React Native.

## Rodando o projeto
Para rodar o projeto, é necessário a instalação do node.js e do yarn.

Para instalar o yarn basta fazer:

```bash
npm install -g yarn
```

Após isso, na raiz do projeto clonado deve-se rodar:

```bash
yarn install
```

Isso irá instalar todas as dependências do projeto.

Para instalar o expo globalmente, basta fazer:

```bash
npm install --global expo-cli
```

Com isso, basta fazer:

```bash
expo start
```

Isso irá abrir uma guia no seu navegador, 
você pode escolherá as opções LAN, LOCAL, TUNNEL

O tunnel demorará um pouco para instalar, mas ele é o mais recomendado para projetos em grupo, pois outras pessoas poderão rodar o app em seus próprios celulares.

OK, temos um QR code, mas ... como rodar???

Para isso, é necessário a instalação do aplicativo Expo, tem tanto para Android quanto para IOS. 
Basta ler o codigo QR com ele e o aplicativo estará no seu celular!

## Estrutura do Projeto

O projeto é bem básico, há cinco arquivos principais:
- Tutorial.js : O tutorial
- App.js : O componente Raiz
- Menu.js : O menu inicial
- Jogo.js : A interface do jogo e as "IAs"
- iuten.js : Parte lógica do jogo, que gerencia a partida, etc.


