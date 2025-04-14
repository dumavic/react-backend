const express = require("express");
const app = express();
app.use(express.static("public"));

// getting the request and the response
app.get('/', (req, res) => {
    res.sendFile(_dirname + "/index.html");
})

app.get("/api/accounts", (req, res) => {
    const accounts = {
        "accounts": [
            {
                "account_id": "001",
                "account_name": "Victor Nguyen",
                "payment_methods": [
                    {
                        "payment_type": "visa",
                        "card_number": "4111111111111234",
                        "card_holder_name": "Victor Nguyen",
                        "exp": "12/26"
                    },
                    {
                        "payment_type": "amex",
                        "card_number": "4111111111114321",
                        "card_holder_name": "Victor Nguyen",
                        "exp": "10/27"
                    }
                ]
            },
            {
                "account_id": "002",
                "account_name": "Jane Smith",
                "payment_methods": [
                    {
                        "payment_type": "mastercard",
                        "card_number": "5555555555555678",
                        "card_holder_name": "Jane Smith",
                        "exp": "09/25"
                    },
                    {
                        "payment_type": "debit",
                        "card_number": "6011111111112222",
                        "card_holder_name": "Jane Smith",
                        "exp": "11/27"
                    }
                ]
            },
            {
                "account_id": "003",
                "account_name": "Alex Johnson",
                "payment_methods": [
                    {
                        "payment_type": "amex",
                        "card_number": "3782822463109012",
                        "card_holder_name": "Alex Johnson",
                        "exp": "01/28"
                    },
                    {
                        "payment_type": "credit",
                        "card_number": "3056930902590456",
                        "card_holder_name": "Alex Johnson",
                        "exp": "05/26"
                    }
                ]
            }
        ]
    }
        ;
    res.send(accounts);
})

// listening whatever request
app.listen(3001, () => {
    console.log("Im listening")
})

