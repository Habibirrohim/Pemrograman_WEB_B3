const WebSocket = require('ws');

// Membuat server WebSocket pada port 3000
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Kirim pesan ke klien setiap 3 detik
    const intervalId = setInterval(() => {
        const message = {
            message: 'Data dari server',
            timestamp: new Date().toISOString() // Menggunakan format ISO untuk timestamp
        };
        ws.send(JSON.stringify(message));
    }, 3000);

    // Menerima pesan dari klien
    ws.on('message', (message) => {
        console.log(`Pesan dari client: ${message}`);
    });

    // Menangani penutupan koneksi
    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(intervalId); // Menghentikan pengiriman pesan saat klien terputus
    });
});

// Menampilkan pesan bahwa server WebSocket berjalan
console.log('WebSocket server berjalan di ws://localhost:3000');