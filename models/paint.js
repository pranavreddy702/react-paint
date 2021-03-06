const { sqlDB } = require('./dbConnect');

module.exports = {
  getDrawings(req, res, next) {
    sqlDB.any(`
      SELECT * FROM canvas;
      `)
      .then((canvas) => {
        res.rows = canvas;
        console.log('num items: ', canvas.length);
        next();
      })
      .catch(error => next(error));
  },

  addDrawing(req,res,next) {
    sqlDB.one(`
      INSERT INTO
        canvas(title,description,drawing,url, username)
      VALUES
        ($/title/, $/description/, $/drawing/, $/url/, $/username/)
      RETURNING *;
    `, req.body)
    .then((canvas) => {
      res.rows = canvas;
      next();
    })
    .catch(error => next(error));
  },
  getDrawing(req,res,next) {
    console.log(req.params);
    sqlDB.one(`
      SELECT * FROM canvas
      WHERE id = $/id/;
      `, req.params)
      .then(canvas => {
        res.rows = canvas;
        next();
      })
      .catch(err => next(err));
  },
  deletePainting(req, res, next) {
    sqlDB.none(`
      DELETE FROM canvas
      WHERE id = $/id/;
      `, req.params)
      .then(next())
      .catch( error => next(error));
  },

};
