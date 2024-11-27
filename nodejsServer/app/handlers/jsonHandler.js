import bodyParser from "body-parser";
const jsonbody = bodyParser.json({
    verify: (req, res, buf) => {
      try {
        JSON.parse(buf);
      } catch (e) {
        res.status(400).json({ error: 'Invalid JSON' });
        throw e; // Rethrow the error to be caught by the error handling middleware
      }
    }
  });

export default jsonbody;
