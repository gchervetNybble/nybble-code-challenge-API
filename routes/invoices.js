import { Helper } from '../utils/helperClass.js';
//const helper = require('../utils/helperClass.js');

const invoiceRoutes = (app, fs) => {

    // variables
    const dataPath = './data/invoices.json';
    const helperMethods = new Helper(fs); // require('../utils/helperClass');

    // READ
    app.get('/invoices', (req, res) => {

        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // CREATE
    app.post('/invoices', (req, res) => {

        helperMethods.readFile(data => {
            const newInvoiceId = Object.keys(data).length + 1;

            // add the new invoice
            req.body.id = newInvoiceId;
            data[(newInvoiceId - 1)] = req.body;

            helperMethods.writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new invoice added');
            }, dataPath);
        }, true, dataPath);
    });

    // UPDATE
    app.put('/invoices/:id', (req, res) => {

        helperMethods.readFile(data => {

            // add the new invoice
            const invoiceId = req.params["id"];
            data[invoiceId] = req.body;

            helperMethods.writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`invoices id:${invoiceId} updated`);
            }, dataPath);
        }, true, dataPath);
    });

    // DELETE
    app.delete('/invoices/:id', (req, res) => {

        helperMethods.readFile(data => {

            // add the new invoice
            const invoiceId = req.params["id"];
            delete data[invoiceId];

            helperMethods.writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`invoices id:${invoiceId} removed`);
            }, dataPath);
        }, true, dataPath);
    });
};

module.exports = invoiceRoutes;