const productControllers = require('./products.controllers')

const getAllProducts = (req, res) => {
    productControllers.findAllProducts()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({message: 'Bad Request', err})
        })
}

const getProductById = (req, res) => {
    const id = Number(req.param.id)
    productControllers.findProductById(id)
        .then(data => {
            if (!data) return res.status(404).json({message: 'Invalid ID'})

            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({message: 'Bad Request', err})
        })
}

const postNewProduct = (req, res) => {
    const productObj = req.body
    productControllers.createProduct(productObj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({message: 'Bad Request', err})
        })
}

const patchProduct = (req, res) => {
    const id = Number(req.params.id)
    const productObj = req.body

    productControllers.updateProduct(id, productObj)
        .then(data => {
            if (!data) return res.status(404).json({message: 'Invalid ID'})

            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({message: 'Bad Request', err})
        })
}

const deleteProduct = (req, res) => {
    const id = Number(req.params.id)

    productControllers.deleteProduct(id)
        .then(data => {
            if (!data) return res.status(404).json({message: 'Invalid ID'})

            res.status(204).json(data)
        })
        .catch(err => {
            res.status(400).json({message: 'Bad Request', err})
        })
}

module.exports = {
    getAllProducts,
    getProductById,
    postNewProduct,
    patchProduct,
    deleteProduct
}