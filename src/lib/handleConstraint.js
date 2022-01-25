const handleConstraint = (res, error) => {
    try {
        if(error.table==="category"){
            console.log(error)
        }
        if(error.table==="client"){
            console.log(error)
        }
        if(error.table==="employee"){
            console.log(error)
        }
        if(error.table==="invoice_buy"){
            console.log(error)
        }
        if(error.table==="invoice_sell"){
            console.log(error)
        }
        if(error.table==="money"){
            console.log(error)
        }
        if(error.table==="numbers_invoice"){
            console.log(error)
        }
        if(error.table==="pay_purchases_history"){
            console.log(error)
        }
        if(error.table==="pay_sales_history"){
            console.log(error)
        }
        if(error.table==="permissions"){
            console.log(error)
        }
        if(error.table==="product_buy"){
            console.log(error)
        }
        if(error.table==="product_sell"){
            console.log(error)
        }
        if(error.table==="products"){
            console.log(error)
        }
        if(error.table==="services"){
            console.log(error)
        }
        if(error.table==="services_sell"){
            console.log(error)
        }
        if(error.table==="sessions"){
            console.log(error)
        }
        if(error.table==="setting"){
            console.log(error)
        }
        if(error.table==="supplier"){
            console.log(error)
        }
        if(error.table==="users"){
            console.log(error)
        }
    } catch (err) {
        res.status(500)
        res.send({ code: "50115" , err})
    }
}

module.exports = { handleConstraint }