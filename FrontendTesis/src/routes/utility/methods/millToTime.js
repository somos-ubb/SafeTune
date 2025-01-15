export default function millToTime(milliseconds) {
    // Convertir milisegundos a segundos
    let totalSeconds = Math.trunc(milliseconds / 1000);
    
    // Calcular minutos y segundos
    let minutes = Math.trunc(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    
    // Formatear la salida en minutos:segundos
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}