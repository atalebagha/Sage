var Org = require('../models/org');

module.exports = {
  /**
   * Returns all organizations in db
   * @return {[array]}        [all organizations]
   */
  allOrganizations: function(req, res, next) {
    Org.find({}, function(err, orgs) {
      if (err) return res.status(500).send(err);
      res.status(200).send(orgs);
    });
  },

  /**
   * Creates a new organization
   * @param  {[object]}   req  [{title: ...}]
   */
  createOrganization: function(req, res, next) {
    Org.findOne({
      title: req.body.title
    }, function(err, org) {
      if (err) return res.status(500).send(err);
      if (org) return res.status(400).send('Organziation already exists');

      var newOrg = new Org({
        title: req.body.title
      });

      newOrg.save(function(err, newOrg) {
        if (err) return res.status(400).send(err);
        res.sendStatus(201);
      });
    });
  },

  /**
   * [updateOrganization description]
   * @param  {[object]}   req  [fields to be update.  Must include _id]
   * @return {[object]}        [updated organization]
   */
  updateOrganization: function(req, res, next) {
    Org.findOne({
      _id: req.body._id
    }, function(err, org) {

      if (err) return res.sendStatus(404, err);

      org.title = req.body.title;

      org.save(function(err, org) {
        if (err) return res.sendStatus(500, err);
        if (err) return res.sendStatus(404, err);

        res.status(205).send(org);
      });
    });
  },

  /**
   * [Removes organization at req.params.id]
   * @return {[object]}        [removed organization]
   */
  removeOrganization: function(req, res, next) {
    Org.findOneAndRemove(req.params.id, function(err, org) {
      if (err) return res.sendStatus(500, err);
      if (!org) return res.sendStatus(404, err);
      res.status(200).send(org);
    });
  }
  
};
