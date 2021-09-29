
import { readFileSync } from 'fs';
import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');

function getCss(theme: string, fontSize: string) {
    let background = 'white';
    let foreground = 'black';
    let radial = 'lightgray';

    if (theme === 'dark') {
        background = 'black';
        foreground = 'white';
        radial = 'dimgray';
    }
    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        background: ${background};
        background-image: radial-gradient(circle at 25px 25px, ${radial} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${radial} 2%, transparent 0%);
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .logo-wrapper svg {
      width: 350px;
    }

    .logo {
        margin: 0 75px;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        font-family: 'Inter', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: ${foreground};
        line-height: 1.5;
        font-weight: 700;
    }
    
    .meta {
        font-family: 'Inter', sans-serif;
        font-size: 2.5rem;
        color: ${foreground};
        line-height: 1.5;
        opacity: 0.7;
    }
    .meta span:not(:last-child):after {
      content: '/';
      padding: 0 0.5rem 0 1rem;
    }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, theme, md, fontSize, author, date } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontSize)}
    </style>
    <body>
        <div>
            <div class="spacer">
            <div class="logo-wrapper">
              <svg viewBox="0 0 91 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M89.3302 12.6529V11.6529H88.3302H82.0425V5.36523V4.36523H81.0425H73.1943H72.1943V5.36523V31.1522V39.0004V40.0004H73.1943H88.3302H89.3302V39.0004V31.1522V30.1522H88.3302H82.0425V21.5011H88.3302H89.3302V20.5011V12.6529Z" fill="#1E221D" stroke="white" stroke-width="2"/>
              <path d="M61.9829 11.6511H60.9829V12.6511V38.9987V39.9987H61.9829H69.8311H70.8311V38.9987V12.6511V11.6511H69.8311H61.9829ZM61.9829 1H60.9829V2V9.8482V10.8482H61.9829H69.8311H70.8311V9.8482V2V1H69.8311H61.9829Z" fill="#1E221D" stroke="white" stroke-width="2"/>
              <path d="M58.619 39.9987H59.619V38.9987V31.1505V20.4993V12.6511V11.6511H58.619H48.4073V2V1H47.4073H39.5591H38.5591V2V31.1505V38.9987V39.9987H39.5591H58.619ZM48.4073 30.1505V21.4993H49.7708V30.1505H48.4073Z" fill="#1E221D" stroke="white" stroke-width="2"/>
              <path d="M37.1952 31.1505V30.1505H36.1952H25.9835V25.4234H28.347H36.1952H37.1952V24.4234V9.8482V2V1H36.1952H17.1353H16.1353V2V9.8482V10.8482H17.1353H27.347V15.5752H24.9835H17.1353H16.1353V16.5752V38.9987V39.9987H17.1353H24.9835H36.1952H37.1952V38.9987V31.1505Z" fill="#56BD77" stroke="white" stroke-width="2"/>
              <path d="M13.7723 39.9987H14.7723V38.9987V9.8482V2V1H13.7723H2H1V2V9.8482V10.8482H2H4.9241V38.9987V39.9987H5.9241H13.7723Z" fill="#56BD77" stroke="white" stroke-width="2"/>
              </svg>
            </div>
            <div class="spacer">
            <div class="heading">${emojify(
                md ? marked(text) : sanitizeHtml(text)
            )} 
            </div>
            <div class="meta">
              <span>${sanitizeHtml(date)}</span>
              <span>${sanitizeHtml(author)}</span>
            </div>
        </div>
    </body>
</html>`;
}
