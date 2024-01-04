const router = require('express').Router();
const { thoughtRoutes, userRoutes } = require('./api');

//this consoles what method is being requested and from which path
router.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    next();
});

router.use('/api/thoughts', thoughtRoutes);
router.use('/api/users', userRoutes);

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;