# Discord Bot with OpenAI and MongoDB

![](https://github.com/jahnnho1/quantum-aidiscord-bot/blob/master/assets/firma.png?raw=true)


This project aims to create a Discord bot that utilizes OpenAI's artificial intelligence technology, specifically the DALL-E model, to generate images and respond to user inquiries. Additionally, the bot will have the capability to store and retrieve user queries in a MongoDB database. 

## Features

- Generate images related to user queries using the DALL-E model
- Respond to user inquiries using OpenAI's language processing technology
- Store user queries in a MongoDB database
- Retrieve past queries to provide more precise and customized responses to users in the future

## Technologies Used

- Discord API for bot integration
- OpenAI's DALL-E model for image generation
- OpenAI's language processing technology for text responses
- MongoDB for database storage and retrieval

## Getting Started

To run this project locally, you will need to have the following:

- A Discord account and a server to host the bot
- A MongoDB account and access to a database
- OpenAI API keys for the DALL-E model and the language processing technology

Once you have these prerequisites, you can clone this repository and set up the necessary configuration files with your API keys and database credentials.

### CREAR ARCHIVO .ENV 

- DISCORD_TOKEN =  "private credentials"
- GTP_TOKEN = "private credentials"
- MONGO_URI = "private credentials"
- PREFIX = "/" #### puede cambiarlo si usted desea

## Usage

To use the bot, users will need to send specific commands in the Discord chat. The bot will then generate an image or respond with text based on the user's query. Additionally, all user queries will be stored in the MongoDB database for future retrieval and improved responses.

#### - !ask command
- The ask slash command allows users to ask any question and receive an exhaustive answer. Simply type !ask followed by your question in a Discord channel where the bot is present, and the bot will use OpenAI's AI models to provide an answer.

#### - !image command
- The image slash command allows users to generate an image using OpenAI's DALL·E technology. Simply type !image followed by a description of the image you want to generate in a Discord channel where the bot is present, and the bot will send you an embedded message with the generated image.


## Contributions

Contributions to this project are welcome. If you have any suggestions or ideas to improve the bot's functionality, feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [MIT License](https://opensource.org/license/mit/ "MIT License") file for details.

---

# Bot de Discord con OpenAI y MongoDB

Este proyecto tiene como objetivo crear un bot de Discord que utilice la tecnología de inteligencia artificial de OpenAI, específicamente el modelo DALL-E, para generar imágenes y responder a las consultas de los usuarios. Además, el bot tendrá la capacidad de almacenar y recuperar las consultas de los usuarios en una base de datos MongoDB.

## Características

- Generar imágenes relacionadas con las consultas de los usuarios utilizando el modelo DALL-E.
- Responder a las consultas de los usuarios utilizando la tecnología de procesamiento de lenguaje de OpenAI.
- Almacenar las consultas de los usuarios en una base de datos MongoDB.
- Recuperar las consultas anteriores para proporcionar respuestas más precisas y personalizadas a los usuarios en el futuro.

## Tecnologías utilizadas

- API de Discord para la integración del bot.
- Modelo DALL-E de OpenAI para la generación de imágenes.
- Tecnología de procesamiento de lenguaje de OpenAI para las respuestas de texto.
- MongoDB para el almacenamiento y recuperación de datos.

## Comenzando

Para ejecutar este proyecto en tu máquina local, necesitarás lo siguiente:

- Una cuenta de Discord y un servidor para alojar el bot.
- Una cuenta de MongoDB y acceso a una base de datos.
- Las claves de API de OpenAI para el modelo DALL-E y la tecnología de procesamiento de lenguaje.

Una vez que tengas estos requisitos previos, puedes clonar este repositorio y configurar los archivos de configuración necesarios con tus claves de API y credenciales de la base de datos.

### CREAR ARCHIVO .ENV 

- DISCORD_TOKEN =  "private credentials"
- GTP_TOKEN = "private credentials"
- MONGO_URI = "private credentials"
- PREFIX = "/" #### puede cambiarlo si usted desea

## Uso

Para usar el bot, los usuarios deberán enviar comandos específicos en el chat de Discord. El bot generará una imagen o responderá con texto en función de la consulta del usuario. Además, todas las consultas de los usuarios se almacenarán en la base de datos MongoDB para su recuperación en el futuro y para mejorar las respuestas.

#### - Comando !ask
El comando slash !ask permite a los usuarios hacer cualquier pregunta y recibir una respuesta exhaustiva. Simplemente escriba !ask seguido de su pregunta en un canal de Discord donde esté presente el bot, y el bot utilizará los modelos de inteligencia artificial de OpenAI para proporcionar una respuesta.

#### - Comando !image
El comando slash !image permite a los usuarios generar una imagen utilizando la tecnología DALL·E de OpenAI. Simplemente escriba !image seguido de una descripción de la imagen que desea generar en un canal de Discord donde esté presente el bot, y el bot le enviará un mensaje incrustado con la imagen generada.



## Contribuciones

Las contribuciones a este proyecto son bienvenidas. Si tienes alguna sugerencia o idea para mejorar la funcionalidad del bot, no dudes en enviar una solicitud de extracción o abrir un problema.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [MIT License](https://opensource.org/license/mit/ "MIT License") para obtener más detalles.



