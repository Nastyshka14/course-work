const {Router} = require('express')
const router = Router()
const Collection = require('../models/Collection')
const auth = require('../middleware/auth.middleware')
 

router.post('/create', auth,
    async (req, res) => {
    try {
      
    const {name, description, theme, image} = req.body
    const collection = new Collection({ owner: req.user.userId, name, description, theme, image})
    console.log('colection: ' , {collection})
    await collection.save()
    res.status(201).json({collection})
    
    } catch(e) {
    console.log(e)
    res.status(500).json({message: 'Something went wrong, please try again', e})
    }
    })


router.get('/', auth, async (req, res) => {
    try {
    const collections = await Collection.find({owner: req.user.userId})
    res.json(collections)
    } catch(e) {
    
    res.status(500).json({message: 'Something went wrong, please try again'})

    }
})

router.get('/all', auth, async (req, res) => {
    try {
    const collections = await Collection.find()
    res.json(collections)
    } catch(e) {
    
    res.status(500).json({message: 'Something went wrong, please try again'})

    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id)
        res.json(collection)
    } catch(e) {
    
    res.status(500).json({message: 'Something went wrong, please try again'})
    }
})






module.exports = router