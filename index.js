const fs = require("fs")
const http = require("http")
const url = require("url")

const replaceTemplate = (temp, product) => {
    // /{% ProductName %}/g means replace all product_names
    let output = temp.replace(/{% ProductName %}/g, product.productName)
    output = output.replace(/{% Image %}/g, product.image)
    output = output.replace(/{% Price %}/g, product.price)
    output = output.replace(/{% From %}/g, product.from)
    output = output.replace(/{% Nutrients %}/g, product.nutrients)
    output = output.replace(/{% Quantity %}/g, product.quantity)
    output = output.replace(/{% Description %}/g, product.description)
    output = output.replace(/{% Id %}/g, product.id)

    if (!product.organic) {
        output = output.replace(/{% NotOrganic %}/g, 'not-organic')
    }
    return output
}

// Can use blocking code because this code will be executed only once because it is outside the callback function (createServer)
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf8')
const dataObject = JSON.parse(data)
// Same logic above, These files are read once
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf8')

// ---- SERVER ----
const server = http.createServer((req, res) => {
    // const pathName = req.url
    const { query, pathname } = url.parse(req.url, true)
    
    // Overview page
    if (pathname === "/" || pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'})

        const cardsHTML = dataObject.map(element => replaceTemplate(tempCard, element)).join('')
        const output = tempOverview.replace('{% ProductCards %}', cardsHTML)

        res.end(output) // sending a response

    // Product page
    } else if (pathname === "/product") {
        res.writeHead(200, {'Content-type': 'text/html'})
        const product = dataObject[query.id]
        const output = replaceTemplate(tempProduct, product)
        res.end(output)

    // API --------------------------------
    } else if (pathname === "/api") {
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end( data )

    // Not found --------------------------------
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html' // pass header
        }) // send 404 error
        res.end("<h1>la9ad dalalta al-taree9</h1>")

    }
})

server.listen(8000, '127.0.0.1', () => { //listen for incoming requests
    console.log("Listening to request on port 8000")
})