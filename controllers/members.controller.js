'use strict';


const membersCtrl = () => {

    return {

        handleGetCall: (req, res) => {

            res.status(200).send('werkt');

        }

    }
}

module.exports = membersCtrl;

