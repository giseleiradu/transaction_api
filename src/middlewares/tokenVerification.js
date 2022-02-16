import jwt from 'jsonwebtoken';

class protectedRoute {
    static loggedInUser = (req, res, next) => {
        const token = req.header('auth-token');
        if(!token) return res.status(401).json({message: 'Access denied'});
    
        try {
            
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified.user;
    
            next();
    
        } catch (error) {
            res.status(400).json({message:'Invalid token'});
        }
    
    }
}

export default protectedRoute;