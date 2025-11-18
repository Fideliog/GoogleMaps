App de Mapa com Busca (React Native + Expo + Google Maps)

Este projeto é um aplicativo simples em React Native com Expo, que exibe um mapa utilizando o Google Maps.

Tecnologias utilizadas

React Native

Expo

react-native-maps

Google Maps API

1. Instalação
Clone o repositório:
git clone https://github.com/Fideliog/GoogleMaps.git

Entre na pasta do projeto:
cd my-maps-app

Instale as dependências:
npm install

Instale o react-native-maps:
expo install react-native-maps

2. Configurando a API Key do Google

O projeto usa variáveis de ambiente através do @env.

Instale o dotenv para Expo:
expo install react-native-dotenv

Crie um arquivo .env na raiz do projeto:
GOOGLE_MAPS_API_KEY=SUA_CHAVE_AQUI


 3. Executando o projeto
Inicie o Expo:
expo start --tunnel

No seu celular:

Instale o aplicativo Expo Go

Escaneie o QR Code exibido no terminal ou no navegador

O app será carregado automaticamente no seu dispositivo


Digite um endereço, cidade ou CEP no campo de busca

Pressione OK

O mapa será centralizado no local encontrado

Um marcador será exibido na posição da busca
