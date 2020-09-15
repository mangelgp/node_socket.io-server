const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band('Hillsong') );
bands.addBand( new Band('Un Corazon') );
bands.addBand( new Band('IBI') );
bands.addBand( new Band('Zoe') );
bands.addBand( new Band('Leave') );

console.log(bands);


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);
        io.emit('mensaje', {admin: 'Nuevo mensaje'})
    });

    client.on('vote-band', (payload) => {
        console.log(payload);
        bands.voteBand(payload.id);
        io.emit('bands', bands.getBands());
    });

    client.on('emitir-mensaje',(payload) => {
        // console.log(payload);
        // io.emit('nuevo-mensaje', payload); // emite a todos!
        client.broadcast.emit('nuevo-mensaje', payload); // emite a todos menos al que lo emitio
    })
});