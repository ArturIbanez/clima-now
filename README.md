ClimaNow - Aplicativo de Clima em Tempo Real 🌦️
=================================================

ClimaNow é uma aplicação web desenvolvida em React + TypeScript que permite aos usuários pesquisarem o clima atual e a previsão dos próximos dias de qualquer cidade do mundo.

FUNCIONALIDADES
---------------
- Busca por cidade com resposta em tempo real
- Botões rápidos com cidades brasileiras populares
- Exibição de ícones representando o clima (sol, chuva, nevoeiro, etc.)
- Previsão para os próximos 4 dias
- Exibe nascer e pôr do sol com horário local
- Mostra vento, umidade e pressão atmosférica
- Notificação em caso de erro (cidade não encontrada)

TECNOLOGIAS UTILIZADAS
-----------------------
- React
- TypeScript
- React Router DOM
- React Icons
- React Toastify
- OpenWeather API
- CSS Modules

COMO RODAR O PROJETO
---------------------
1. Clone o repositório:
   git clone https://github.com/ArturIbanez/ClimaNow.git
   cd ClimaNow

2. Instale as dependências:
   npm install

3. Adicione sua chave da API:
   Crie um arquivo .env e adicione:
   VITE_API_KEY=sua_chave_aqui

4. Execute o projeto:
   npm run dev

OBSERVAÇÃO SOBRE A API
-----------------------
Este projeto utiliza a OpenWeather API:
- Para converter nomes de cidades em coordenadas (lat/lon)
- Para buscar o clima e previsão baseados nessas coordenadas

Você pode gerar sua chave de API gratuita em:
https://openweathermap.org/api

AUTOR
-----
Desenvolvido por Artur Ibañez
GitHub: https://github.com/ArturIbanez
