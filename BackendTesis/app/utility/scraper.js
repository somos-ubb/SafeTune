const puppeteer = require('puppeteer');

async function scrape(nombre, artista) {
    let lyrics = null;
    let browser;

    const cleanNombre = (nombre) => {
        // Replace & with y
        const replacedNombre = nombre.replace(/&/g, 'y');
        artista = artista.replace(/&/g, 'y');
        // Find the index of the first occurrence of a special character
        const index = replacedNombre.search(/[-(?]/);
        // Return the substring before the special character or the cleaned nombre if no special character is found
        return index !== -1 ? replacedNombre.substring(0, index).trim() : replacedNombre.trim();
    };

    // Clean the nombre variable
    const cleanedNombre = cleanNombre(nombre);

    try {
        browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
        await page.goto('https://www.letras.com/');

        // Wait for the search input and type the cleaned search query
        const input = await page.waitForSelector('.searchBar-input', { timeout: 1000 });
        await input.type(`${cleanedNombre} ${artista} `);

        // Wait for the suggest-song to appear
        await page.waitForSelector('.suggest-song', { timeout: 1000 });

        // Extract the suggestions from the suggest-list
        const suggestions = await page.evaluate(() => {
            const suggestItems = document.querySelectorAll('.suggest-song');
            return Array.from(suggestItems).map(item => {
                const text = item.querySelector('div').innerText;
                return text;
            });
        });

        // Find the index of the suggestion that matches the criteria
        const index = suggestions.findIndex(suggestion => {
            const [songTitle, artistName] = suggestion.split(' - ').map(part => part.trim());
            return songTitle.toLowerCase().includes(cleanedNombre.toLowerCase()) && artistName.toLowerCase().includes(artista.toLowerCase());
        });

        // If a matching suggestion is found, click on it
        if (index !== -1) {
            await Promise.all([
                page.waitForSelector('.lyric-original', { timeout: 1000 }), // Wait for the lyric-original selector to appear
                page.evaluate((index) => {
                    const suggestItems = document.querySelectorAll('.suggest-song');
                    suggestItems[index].querySelector('a').click();
                }, index)
            ]);

            // Extract the content inside the lyric-original selector and replace \n with spaces
            lyrics = await page.evaluate(() => {
                const lyricElement = document.querySelector('.lyric-original');
                return lyricElement ? lyricElement.innerText : null;
            });
        }

    } catch (error) {
        console.error('An error occurred during scraping:', error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }

    return lyrics;
}

module.exports = scrape;
