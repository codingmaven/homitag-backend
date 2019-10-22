const mongoose = require('mongoose');
const _ = require('lodash');

function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = function (model, param = 'id', unlessPaths = []) {
  // load the mongoose model of the passed model string
  const m = mongoose.model(model);

  return async function(req, res, next) {
    // end execution if the passed objectId isn't valid
    if (!mongoose.Types.ObjectId.isValid(req.params[param])) {
      return res.error('Invalid object Id');
    }
    let found;
    try {
      

      const query = {
        _id: req.params[param]
      };
      
      if(model === 'listing') {
        //load model of contact
        const cm = mongoose.model('contact');

        const contacts = await cm.find({
          'connected_wid': req.headers['x-workspace-id']
        });
        
        query.$or = [{
          'contacts': {
            $elemMatch: {
              contact_id: {
                $in: contacts
              }
            }
          }
        },
        {
          wid: req.headers['x-workspace-id']
        }
        ];
      }

      // find the document based on id
      found = await m.findOne(query);
    } catch (err) {
      return res.error('Could not query model');
    }
    if (!found) {
      return res.error(`${capitalize(model)} not found.`, 404);
    }
    if (model === 'listing') {
      let matchUnlessPath = false;
      _.forEach(unlessPaths, (regex) => {
        if (regex.test(req.path)) matchUnlessPath = true;
      });

      if (matchUnlessPath) return next();
    }
    if (!req[model]) {
      req[model] = found;
    }
    next();
  };
};
