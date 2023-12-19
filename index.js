const puppeteer = require('puppeteer');

const hbs = require('handlebars')

const fs = require('fs-extra')

const path = require('path')

// const data = require('./data.json');
const data = require('C:/Users/prakh/OneDrive/Desktop/pupdf/data.json');


//compile the hbs template to pdf doc.

const compile = async function (templateName, data) {
    const filePath = path.join(process.cwd(), 'templates',`${templateName}.hbs`)
    //get the html
    const html = await fs.readFile(filePath, 'utf8')
    return hbs.compile(html)(data)
    
};
(async function (){
    try {
        const browser = await puppeteer.launch();

        const page = await browser.newPage();

        const content = await compile('index', data);

        await page.setContent(content);
        //create pdf document
        await page.pdf({
            path: 'output.pdf',
            format: 'A4',
            printBackground: true
        })
        console.log("Done creating pdf");

        await browser.close();
        process.exit();
    } catch (error) {
        console.log(error);
        
    }
})()