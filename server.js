const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());

// getting the request and the response
app.get('/', (req, res) => {
    res.sendFile(_dirname + "/index.html");
})

let items = [
    {
        item_id: 1,
        item_name: "Black Jacket",
        item_page: "jacket.html",
        price: 80.00,
        sizes: ["XS", "S", "M", "L", "XL"],
        img_name: "black-jacket.jpg",
        description: "Statement piece with embroidered koi-dragon art. Bold, sleek, and symbolic.",
        best_seller: true,
        newest_arrival: false,
        collectionType: "black"
    },
    {
        item_id: 2,
        item_name: "Sweatshirt",
        item_page: "sweatshirt.html",
        price: 40.00,
        sizes: ["XS", "S", "M", "L", "XL"],
        img_name: "sweatshirt-aba.jpg",
        description: "Relaxed fit with legacy design—perfect for everyday cool.",
        best_seller: true,
        newest_arrival: false,
        collectionType: "black"
    },
    {
        item_id: 3,
        item_name: "Black Hoodie",
        item_page: "black-hoodie.html",
        price: 65.00,
        sizes: ["XS", "S", "M", "L", "XL"],
        img_name: "hoodie-black.jpg",
        description: "Street-ready hoodie featuring the koi's rise—warm and powerful.",
        best_seller: true,
        newest_arrival: false,
        collectionType: "black"
    },
    {
        item_id: 4,
        item_name: "Zip-Up",
        item_page: "zip-up.html",
        price: 89.00,
        sizes: ["XS", "S", "M", "L", "XL"],
        img_name: "zip-up.jpg",
        description: "Sleek zip-up with minimalist front and story-driven back art.",
        best_seller: true,
        newest_arrival: false,
        collectionType: "black"
    },
    {
        item_id: 5,
        item_name: "Jeans",
        item_page: "jeans.html",
        price: 70.00,
        sizes: ["XS", "S", "M", "L", "XL"],
        img_name: "aba-jeans.jpg",
        description: "Structured denim with symbolic stitchwork—effortlessly raw.",
        best_seller: true,
        newest_arrival: false
    },
    {
        item_id: 6,
        item_name: "Joggers",
        item_page: "joggers.html",
        price: 45.00,
        sizes: ["XS", "S", "M", "L", "XL"],
        img_name: "aba-joggers.jpg",
        description: "Comfort meets meaning—tapered joggers with a deeper story.",
        best_seller: true,
        newest_arrival: false
    },
    {
        item_id: 7,
        item_name: "T-Shirt 1.0",
        item_page: "t-shirt-1.html",
        price: 40.00,
        sizes: ["XS", "S", "M", "L", "XL"],
        img_name: "t-shirt-design-1.jpg",
        description: "Clean, simple, and bold—modern storytelling in monochrome.",
        best_seller: false,
        newest_arrival: true
    },
    {
        item_id: 8,
        item_name: "T-Shirt 2.0",
        item_page: "t-shirt-2.html",
        price: 42.00,
        sizes: ["XS", "S", "M", "L", "XL"],
        img_name: "t-shirt-design-2.jpg",
        description: "Second-gen tee with refined koi art—made to turn heads.",
        best_seller: false,
        newest_arrival: true
    },
    {
        item_id: 9,
        item_name: "T-Shirt 3.0",
        item_page: "t-shirt-3.html",
        price: 45.00,
        sizes: ["XS", "S", "M", "L", "XL"],
        img_name: "t-shirt-design-3.jpg",
        description: "Evolved design with bolder lines—where myth meets minimal.",
        best_seller: false,
        newest_arrival: true
    }
];


let payment_methods = [
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


let accounts = {
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

app.get("/api/accounts", (req, res) => {
    res.send(accounts);
});

app.get("/api/payment_methods", (req, res) => {
    res.send(payment_methods);
});

app.get("/api/items", (req, res) => {
    res.send(items);
});

// listening whatever request
app.listen(3001, () => {
    console.log("Im listening")
})

app.post("api/payment_methods", (req, res) => {
    const result = validatePaymentMethod(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const payment_method = {
        payment_type: req.body.payment_type,
        card_number: req.body.card_number,
        card_holder_name: req.body.card_holder_name,
        exp: req.body.exp
    }

    payment_methods.push(payment_method);
    res.status(200).send(payment_method);
})

app.post("api/items", (req, res) => {
    const result = validateItem(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const item = {
        item_id: items.length + 1,
        item_name: req.body.item_name,
        price: req.body.price,
        description: req.body.description,
        best_seller: req.body.best_seller,
        newest_arrival: req.body.newest_arrival,
        collectionType: req.body.collectionType
    }

    items.push(item);
    res.status(200).send(item);
})


const validatePaymentMethod = (payment_method) => {
    const schema = Joi.object({
        payment_type: Joi.string().required(),
        card_number: Joi.string().min(16).required(),
        card_holder_name: Joi.string().min(1).required(),
        exp: Joi.string().required()
    })

    return schema.validate(payment_method)
}

const validateItem = (item) => {
    const schema = Joi.object({
        item_id: items.length + 1,
        item_name: Joi.string().required(),
        item_page: item_name + ".html",
        price: Joi.number().required(),
        sizes: [
            "XS",
            "S",
            "M",
            "L",
            "XL"
        ],
        description: Joi.string().required(),
        best_seller: Joi.bool(),
        newest_arrival: Joi.bool(),
        collectionType: Joi.string()
    })

    return schema.validate(item)
}