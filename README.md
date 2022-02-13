# Central Purpose
App for students to concentrate
# Tecnologies 
- React Native
- NativeBase
- Async Storage
- React-native-circular-slider
- React-native-svg
- Validator ( to validate input )
- Sanitize ( to sanitize input preventing sql inectjon)
- Uuid ( to create unique id )
- Express ( backend Node.js )
- JWT ( to handle the comunication between backEnd and frontEnd )
- Dotenv ( to handle file .env used for db credentials )
# Images
- Freepink.com
# Database
I percorsi sono una trovata per lo più carina per ambientare il progetto e per far dividere all'utente le ore di studio in relazione alla materia. Tutte le etichette create vengono salvate all'interno della memoria del device mentre nel database salviamo solo l'id unico del Device con cui accedere e creare un JWT per comunicare con il backend. Nel database immagazziniamo tutti i percorsi svolti, salvando ogni volta il nome del percorso e la durata (potrebbe cambiare per via dell'utente quindi è necessario che sia dati permanenti ).