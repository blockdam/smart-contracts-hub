'use strict';


const membersCtrl = () => {

    return {

        handleGetCall: (req, res) => {

            if (req.params.id) {

                res.status(200).send(req.params.id);

            } else {

                res.status(200).send('werkt');

            }


        }

    }
}

module.exports = membersCtrl;

