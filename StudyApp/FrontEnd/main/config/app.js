const costanti_globali = {

    'etichette' : [
        {
            'id' : 0,
            'name' : 'Collina',
            'image' : require('_images/ambientazioni/collina.jpg'),
            'image_gif' : require('_images/percorsi/collina.gif'),
            'sound' : require('_assets/sounds/collina.mp3')
        },
        {
            'id' : 1,
            'name' : 'Deserto',
            'image' : require('_images/ambientazioni/deserto.jpg'),
            'image_gif' : require('_images/percorsi/deserto.gif'),
            'sound' : require('_assets/sounds/deserto.mp3')

        },
        {
            'id' : 2,
            'name' : 'Montagna',
            'image' : require('_images/ambientazioni/montagna.jpg'),
            'image_gif' : require('_images/percorsi/montagna.gif'),
            'sound' : require('_assets/sounds/montagna.mp3')

        },
        {
            'id' : 3,
            'name' : 'Citta',
            'image' : require('_images/ambientazioni/citta.jpg'),
            'image_gif' : require('_images/percorsi/citta.gif'),
            'sound' : require('_assets/sounds/citta.mp3')

        }
    ],
    'backend_link' : 'http://localhost:3000/',
    'max_time' : 90, //in minuti

}
export default costanti_globali