'use strict';


const membersCtrl = () => {

    return {

        getAll: (req, res) => {

            res.status(200).send('werkt');
        },

        findOne: (req, res) => {

            if (req.params.id) {

                res.status(200).send('werkt' + req.params.id);
            }
        }

    }
}

module.exports = membersCtrl;

