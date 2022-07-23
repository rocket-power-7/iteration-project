const db = require('../db');

const socialController = {};

socialController.getAllPosts = (req, res, next) => {
  // Construct a query to get all posts from the database sorted from newest to oldest
  const query = 'SELECT p.*, u.name_first, u.name_last ' +
                'FROM posts as p JOIN users as u ' +
                'ON p.fk_user_id = u.pk_user_id ' +
                'ORDER BY p.post_created_at DESC'; // ASC and DESC are interchangable
  db.query(query)
    .then((data) => {
      // Format the data that will be sent back to the front-end
      console.log(data.rows);
      const posts = data.rows.map((postData) => ({
        postId: postData.pk_post_id,
        firstName: postData.name_first,
        lastName: postData.name_last,
        message: postData.message,
        statPercent: postData.stat_percent,
        createdAt: postData.post_created_at,
        imageUrl: postData.image_url
      }));
      res.locals.posts = posts;
      return next(); // On success: continue to next middleware function
    })
    .catch((err) => next({ // On failure: continue to global error handler
      log: 'Failed to gather posts from database',
      message: err.message
    }));
};

socialController.createPost = (req, res, next) => {
  // Destructure the message from the request body
  const { message, statPercent, imageUrl } = req.body;
  // Destructure the user id that was decoded from the jwt token
  const { pk_user_id } = res.locals.userData;

  // Construct a query to create a new post
  const values = [ message, statPercent || null, imageUrl || null, pk_user_id ];
  const query = 'INSERT INTO posts (message, stat_percent, image_url, post_created_at, fk_user_id) ' +
                'VALUES ($1, $2, $3, $time, $4) ' +
                'RETURNING pk_post_id';
  db.query(query, values)
    .then((data) => {
      // The query only returns one result
      const postId = data.rows[0].pk_post_id;

      // Save the post id to locals (to be sent back to user later)
      res.locals.postId = postId;

      // On success: continue to next middleware function
      next();
    })
    .catch((err) => next({ // On failure: continue to global error handler
      log: 'Failed to create a post',
      message: err.message
    }));
};

socialController.deleteValitation = (req, res, next) => {
  // Destructure the post id from the request parameters
  const { postId } = req.params;
  // Destructure the user id to verify this post doesn't belong to another user
  const { pk_user_id } = res.locals.userData;

  // Construct a query to get this post's data
  const values = [ postId ];
  const query = 'SELECT fk_user_id FROM posts WHERE pk_post_id = $1';
  db.query(query, values)
    .then((data) => {
      // We are quering a private key that will only return up to one result
      const postData = data.rows[0];

      // Exit early if no post was found
      if (!postData) return next({
        log: 'Client requested a post that could not be found',
        message: 'No post was found with the ID: ' + postId
      });

      // If the users do not match: exit with a 403 (restricted) message
      if (postData.fk_user_id !== pk_user_id) return res.sendStatus(403);

      // Otherwise: the client is given authorization to continue to the next middleware function
      return next();
    })
    .catch((err) => next({ // On failure: continue to global error handler
      log: 'Failed to find the post',
      message: err.message
    }));
};

socialController.deletePost = (req, res, next) => {
  // Destructure the post id from the request parameters
  const { postId } = req.params;

  // Construct a query to delete the post from the database
  const values = [ postId ];
  const query = 'DELETE FROM posts WHERE pk_post_id = $1';
  db.query(query, values)
    .then(() => next()) // On success: continue to next middleware function
    .catch((err) => next({ // On failure: continue to global error handler
      log: 'Failed to delete post from database',
      message: err.message
    }));
};

module.exports = socialController;
