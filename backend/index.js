const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const upload = require('./storage');
const cookieParser = require('cookie-parser');
const key = new TextEncoder().encode(process.env.JWT_SECRET);
const cloudinary = require('cloudinary').v2;



const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// MongoDB Connection URL
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const uploadMiddleware = (req, res, next) => {
    const uploader = upload.array('files', 3);
    uploader(req, res, function (err) {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        next();
    });
};

const jwtMiddleware = async (req, res, next) => {
    const token = req.cookies.session;
    console.log({ token });
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    try {
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, key, (err, decoded) => {
                if (err) {
                    reject(err);
                }
                resolve(decoded);
            });

        });
        if (!decoded?.userId) throw new Error('Unauthorized');
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ success: false, message: err?.message || 'Unauthorized' });
    }

};

async function run() {
    try {
        // Connect to MongoDB


        const db = client.db('Assingment-9');
        const collection = db.collection('users');
        const session = db.collection('sessions');
        const product = db.collection('products');
        const review = db.collection('reviews');
        const checkout = db.collection('checkout');

        // User Registration
        app.post('/api/v1/register', async (req, res) => {
            const { name, email, password, role } = req.body;
            console.log(req.body);

            try {
                // Check if email already exists
                const existingUser = await collection.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({
                        success: false,
                        message: 'User already exists'
                    });
                }

                // Hash the password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Insert user into the database
                const { insertedId } = await collection.insertOne({ name, email, password: hashedPassword, role });

                res.status(201).json({
                    success: true,
                    message: 'User registered successfully',
                    id: insertedId
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });


        app.get('/api/v1/user/:id', jwtMiddleware, async (req, res) => {
            const id = req.params.id;
            try {
                const user = await collection.findOne({ _id: new ObjectId(id) }, {
                    projection: {
                        password: 0
                    }
                });
                res.json({
                    success: true,
                    data: user
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });

        app.post('/api/v1/session', async (req, res) => {
            const { userId, expiresAt, } = req.body;
            try {
                const { insertedId } = await session.insertOne({ userId, expiresAt });
                res.status(201).json({
                    success: true,
                    message: 'Session created successfully',
                    id: insertedId
                });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });

        app.get('/api/v1/session', async (req, res) => {
            try {
                const userId = req.query.userId;


                const [sessions, userInfo] = await Promise.all([session.find({ userId }).toArray(), collection.findOne({ _id: new ObjectId(userId) })]);

                res.json({
                    success: true,
                    data: {
                        sessions,
                        role: userInfo.role
                    }
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });
        app.delete('/api/v1/session/:userId', async (req, res) => {
            try {
                const userId = req.params.userId;
                const result = await session.deleteOne({ userId });
                res.json({
                    success: true,
                    message: 'Session deleted successfully',
                    data: result
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });

        // User Login
        app.post('/api/v1/login', async (req, res) => {
            const { email, password } = req.body;

            // Find user by email
            const user = await collection.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password', success: false });
            }

            // Compare hashed password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid email or password', success: false });
            }


            res.json({
                success: true,
                message: 'Login successful',
                id: user._id,

            });
        });

        app.put('/api/v1/product/:id', async (req, res) => {
            try {
                const data = req.body;
                const id = req.params.id === 'undefined' ? new ObjectId() : req.params.id;
                console.log(id);
                const filter = { _id: new ObjectId(id) };


                const result = await product.updateOne(filter, {
                    $set: {
                        ...data,
                        price: parseFloat(data.price),
                        stock: parseInt(data.stock),
                        discount: data.discount ? parseFloat(data.discount) : ''
                    }
                }, {
                    upsert: true
                });

                res.send({ success: true, message: result.matchedCount ? 'Product updated successfully' : 'Product created successfully!' });
            } catch (err) {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });
        app.post('/api/v1/upload', uploadMiddleware, async (req, res) => {
            const filesArray = req.files.map(i => i.path);
            res.send({ success: true, message: 'Image successfully', data: filesArray });
        });
        app.delete('/api/v1/deleteImage', async (req, res) => {
            const images = req.body.images;
            console.log(images);
            const deletePromises = images.map(i => {
                const public_id = i.split('/').pop().split('.')[0];
                console.log({ public_id });
                return new Promise((res, rej) => {
                    cloudinary.uploader.destroy('Assignment-9/' + public_id, { resource_type: 'image' }, (err, result) => {
                        if (err) {
                            rej(err);
                        }
                        if (result.result === 'ok') {
                            res(result);
                        }
                        rej(result);
                    });
                });
            });
            try {
                const data = await Promise.all(deletePromises);
                const resolved = data.every(i => i.result === 'ok');
                if (resolved) {
                    res.json({ success: true, message: 'Image deleted successfully' });
                } else {
                    res.json({ success: false, message: 'Image deletion failed' });
                }

            } catch (err) {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: err.message || 'Internal Server Error'
                });
            }
        });

        app.get('/api/v1/products', async (req, res) => {
            try {
                const products = await product.find().toArray();
                res.json({
                    success: true,
                    data: products
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });


        app.get('/api/v1/product/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            try {
                const productData = await product.findOne({ _id: new ObjectId(id) });
                if (!productData) {
                    return res.status(404).json({
                        success: false,
                        message: 'Product not found'
                    });
                }
                res.json({
                    success: true,
                    data: productData
                });
            } catch (err) {
                console.log(err);
                console.log(err.message);
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        }
        );

        app.delete('/api/v1/product/:id', async (req, res) => {
            const id = req.params.id;
            try {
                const result = await product.deleteOne({ _id: new ObjectId(id) });
                res.json({
                    success: true,
                    message: 'Product deleted successfully',
                    data: result
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });


        app.get('/api/v1/reviews/:productId', async (req, res) => {
            const productId = req.params.productId;
            try {
                const reviews = await review.aggregate([
                    {
                        $match: { productId: new ObjectId(productId) },

                    }, {
                        $lookup: {
                            from: 'users',
                            localField: 'userID',
                            foreignField: '_id',
                            as: 'user'
                        }
                    }, {
                        $unwind: '$user'
                    }, {
                        $project: {
                            reviewText: 1,
                            timestamp: 1,
                            'user.name': 1,
                        }
                    }
                ]).toArray();
                res.json({
                    success: true,
                    data: reviews || []
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });

        app.post('/api/v1/review', async (req, res) => {
            const { userID, productId, reviewText, } = req.body;
            try {
                const { insertedId } = await review.insertOne({ userID: new ObjectId(userID), productId: new ObjectId(productId), reviewText, timestamp: new Date() });
                res.status(201).json({
                    success: true,
                    message: 'Review added successfully',
                    id: insertedId
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });


        app.post('/api/v1/cart', async (req, res) => {

            const ids = req.body.data.map(i => new ObjectId(i.id));
            // const products = await product.find({ _id: { $in: ids } }, {
            //     projection: {
            //         name: 1,
            //         price: 1,

            //         image: 1
            //     }
            // }).toArray();
            const products = await product.aggregate([
                {
                    $match: { _id: { $in: ids } }
                },
                {
                    $project: {
                        name: 1,
                        price: 1,
                        image: 1,
                        quantity: 1
                    }
                }
            ]).toArray();
            products.forEach(i => {
                i.quantity = req.body.data.find(j => j.id === i._id.toString()).quantity;
            });
            res.status(201).json({
                success: true,
                message: 'Cart retrieved successfully',
                data: products

            });
        });

        app.post('/api/v1/checkout', async (req, res) => {
            const { userID, data: products } = req.body;

            try {
                const { insertedId } = await checkout.insertOne({ userId: new ObjectId(userID), products, timestamp: new Date(), status: 'pending' });
                res.status(201).json({
                    success: true,
                    message: 'Checkout successful',
                    id: insertedId
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });

        app.get('/api/v1/orders', async (req, res) => {
            const { userId } = req.query;
            console.log(userId);
            try {
                const orders = await checkout.aggregate([
                    {
                        $match: userId ? { userId: new ObjectId(userId) } : {}
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'userId',
                            foreignField: '_id',
                            as: 'user'
                        }
                    }, {
                        $unwind: '$user'
                    }, {
                        $project: {

                            timestamp: 1,
                            'user.name': 1,
                            'user.email': 1,
                            products: 1,
                            status: 1,
                            rating: 1
                        }
                    }
                ]).toArray();
                res.json({
                    success: true,
                    data: orders
                });

            } catch (err) {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });

        app.put('/api/v1/order/:id', async (req, res) => {
            const id = req.params.id;
            console.log(req.body);
            try {
                const result = await checkout.updateOne({ _id: new ObjectId(id) }, {
                    $set: {
                        ...req.body
                    }
                });
                if (result.modifiedCount) {
                    res.json({
                        success: true,
                        message: req.body.status ? 'Order delivered successfully' : 'Rating added successfully',
                        data: result
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'Order not found',
                        data: result
                    });
                }

            } catch (err) {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });


        // ==============================================================
        // WRITE YOUR CODE HERE
        // ==============================================================


        // Start the server
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });

    } finally {
    }
}

run().catch(console.dir);

// Test route
app.get('/', (req, res) => {
    const serverStatus = {
        message: 'Server is running smoothly',
        timestamp: new Date()
    };
    res.json(serverStatus);
});