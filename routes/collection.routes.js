const {Router} = require('express')
const router = Router()
const Collection = require('../models/Collection')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const shortid = require('shortid')
const multer = require('multer')
const fs = require('fs')

const upload = multer({ dest: './public/data/uploads/' })
router.post('/stats', upload.single('uploaded_file'), function (req, res) {
    const collection = new Collection
    collection.image.data = fs.readFileSync(req.file.path);
    collection.image.contentType = 'image/png'
   collection.save()
   console.log('collection', req.file.path, collection)
});

router.get('/', function (req, res, next) {
    Collection.findById(collection, function (err, doc) {
      if (err) return next(err);
      res.contentType(doc.image.contentType);
      res.send(doc.image.data);
      console.log('ggg', res)
    });
  });

  


router.post('/create', auth,
    async (req, res) => {
    try {
      
    const {name, description, theme} = req.body
    const collection = new Collection({name, description, theme, owner: req.user.userId})
    console.log('colection: ' , {collection})
    await collection.save()
    res.status(201).json({collection})
    
    } catch(e) {
    console.log(e)
    res.status(500).json({message: 'Something went wrong, please try again', e})
    }
    })

// router.get('/', auth, async (req, res) => {
//     try {
//     const collections = await Collection.find({owner: req.user.userId})
//     res.json(collections)
//     } catch(e) {
    
//     res.status(500).json({message: 'Something went wrong, please try again'})

//     }
// })

// router.get('/:id', auth, async (req, res) => {
//     try {
//         const collection = await Collection.findById(req.params.id)
//         res.json(collection)
//     } catch(e) {
    
//     res.status(500).json({message: 'Something went wrong, please try again'})
//     }
// })






module.exports = router