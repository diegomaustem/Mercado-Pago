const express = require("express")
const MercadoPago = require("mercadopago")
const app = express()

MercadoPago.configure({
    sandbox: true,
    access_token: "JIHFSIHFWUEHFIUWHEIFW"
})

app.get("/", (req, res) => {
    res.send("App Running")
})

app.get("/pagar", async (req, res) => {

    let id = Date.now().toString()
    let emailDoPagador = "diego.skeep@gmail.com"

    var dados = {
        items: [
            item = {
                id: id,
                title: "Playstation 4 slim",
                quantity: 2,
                currency_id: "BRL",
                unit_price: parseFloat(255)
            }
        ],
        payer:{
            email: emailDoPagador
        },
        external_reference: id
    }

    try{
        let pagamento = await MercadoPago.preferences.create(dados)
        console.log(pagamento)
        return res.redirect(pagamento.body.init_point)
    }catch(err){
        return res.send(err.message)
    }
})

app.post("/not", (req, res) => {
    let id = req.query.id 

    setTimeout(() => {
        let filtro = {
            "order.id": id
        }

        MercadoPago.payment.search({
            qs: filtro
        }).then(data => {
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    }, 20000);
    
    res.send('Ok')
})



app.listen(3000, (req, res) => {
    console.log("Aplication Run!")
})