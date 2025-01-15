export default function formatLyrics(text) {
    return text.replace(/(?!^)([A-Z])/g, '\n$1').trim();
}