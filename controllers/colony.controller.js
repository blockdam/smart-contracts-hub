'use strict';

const eth = require('../connectors/ethereum.connector');
const Promise = require('bluebird');
const logger = require('../services/logger.service');
const TokenService = require('../services/token.service');
const Web3Service = require('../services/web3.service');
const ColonyService = require('../services/colony.service');
const HashService = require('../services/hash.service');
const TaskService = require('../services/task.service');
const DomainService = require('../services/domain.service');
const TemplateService = require('../services/template.service');

const config = require('../config');
const fs = require('graceful-fs');
const BN = require('bn.js');
const { EMPTY_ADDRESS } = require('@colony/colony-js-client');
const executeTaskMultisig = require('../helpers/executeTaskMultisig');


class ColonyController {

    constructor() {

        this.colonyService = new ColonyService();
        this.hashService = new HashService();
        this.taskService = new TaskService();
        this.domainService = new DomainService();
        this.templateService = new TemplateService();

        this.myWalletPrivateKey = '0x0355596cdb5e5242ad082c4fe3f8bbe48c9dba843fe1f99dd8272f487e70efae';
    }


    handleTestCall(req,res) {

            res.json({ msg : 'works!'});
            res.status(200);
    }

    async handleGeneralInfoCall(req,res) {

        let self = this,
        payload = {};

        const  { networkClient, colonyClient, tokenClient, tokenObject, token  } = await this.colonyService.get(config.colonyNetwork,config.colonyID,self.myWalletPrivateKey);

        //console.log(networkClient)
        payload.token = token;

        let totalSupply = await tokenClient.getTotalSupply.call();
        payload.totalSupply = new BN(totalSupply.amount._bn).toString();

       // move minted tokens to reserve
        let claim = await colonyClient.claimColonyFunds.send({ token });

        console.log(claim);

        res.json(payload);
        res.status(200);

        // i want list of skills from the metacolony
    }

    async getTasks(req,res) {

        // get an array of tasks

        // per domain (hierarchical)

        let self = this;

        const  { networkClient, colonyClient, tokenClient, tokenObject  } = await this.colonyService.get(config.colonyNetwork,config.colonyID,self.myWalletPrivateKey);
        let token = tokenObject.address;

        let taskCount  = await colonyClient.getTaskCount.call();

        let taskArray = [];

        for (let i = 0; i <= parseInt(taskCount.count); i++) {
            taskArray.push(await this.taskService.get(colonyClient,i,token));
        }

        for (const task of taskArray) {

            let body = {
                task : task
            }

            console.log(task);
            task.htmlSnippet = await self.templateService.render('task.handlebars', body); // render template
        }

        res.json(taskArray);
        res.status(200);

            // specificationHash
            // brief
            // due date
            // domain
            // skill
            // manager
            // evaluator

    }

    async createTaskCall(req,res) {

        // meesturen?
        // myWalletPrivateKey
        // colonyID
        // domainId
        // specification  { title, specification }

        // list of domains
        // list of skills from metaColony
        // due Date
        //




        let self = this;

        const  { networkClient, colonyClient, tokenClient, tokenObject  } = await this.colonyService.get(config.colonyNetwork,config.colonyID,self.myWalletPrivateKey);

        let specificationHash = await this.hashService.create(req.body.specification);
        let domainId = parseInt(req.body.domainId);


        const { eventData: { taskId } } = await colonyClient.createTask.send({
            specificationHash,
            domainId,
        });

        const task = await colonyClient.getTask.call({ taskId });

        // Check out the logs to see our new task
        console.log('Task:', task);

        res.json(task);
        res.status(200);


        // { specificationHash: 'QmWvM3isCmEY8bsixThuFeUJmE5MN2he1UxaPzMngLZ7Wq',
        //     deliverableHash: null,
        //     status: 'ACTIVE',
        //     dueDate: 2019-06-20T10:27:14.000Z,
        //     payoutsWeCannotMake: 0,
        //     potId: 4,
        //     completionDate: null,
        //     domainId: 1,
        //     skillId: 0,
        //     id: 2 }

    }

    async modifyTaskCall(req,res) {

        let self = this;
        const {networkClient, colonyClient, tokenClient, tokenObject, token} = await this.colonyService.get(config.colonyNetwork,config.colonyID, self.myWalletPrivateKey);

        let task = await this.taskService.modify(colonyClient, taskId, req.body, token);

        let fromPot = 1;
        let toPot = parseInt(task.potId);
        let amount = new BN('30000');

        let funds = await colonyClient.moveFundsBetweenPots.send({fromPot, toPot, amount, token});

        // Set the skill of our new task using the "setTaskSkill" example and then
        // store the updated "task" in the state object. In this case, we are going
        // to update the "skillId" of our new task using our new global skill.
        let skillId = task.skillId;

        const operation = await colonyClient.setTaskSkill.startOperation({
            taskId,
            skillId,
        });
        // Sign the operation associated with our changes to the task skill using
        // the "signSetTaskSkill" example. The requested changes were made before we
        // assigned a worker to our task, so the changes only need to be approved
        // by the manager of the task, which is the account that created the task.
        await executeTaskMultisig(
            colonyClient,
            colonyClient.setTaskSkill,
            taskId,
        );

        // Set the due date of our new task using the "setTaskDueDate" example. The
        // "setTaskDueDate" example starts a multisig operation and then stores the
        // operation in our database. The operation will need to be signed by all
        // "requiredSignees" before the changes to our task will take affect.
        // await setTaskDueDate(
        //     state.colonyClient[0],              // colonyClient
        //     state.task.id,                      // taskId
        //     new Date(Date.now() + 2678400000),  // dueDate
        // );

        // Sign the operation associated with our changes to the task due date using
        // the "signSetTaskDueDate" example and then store the updated task in the state
        // object. The requested changes were made before we assigned a worker to our
        // task, so the changes only need to be approved by the manager of the task.
        // await signSetTaskDueDate(
        //     state.colonyClient[0],          // colonyClient
        //     state.task.id,                  // taskId
        // );

        // Set the amount of tokens we want to payout the manager of our task using
        // the "setTaskManagerPayout" example.
        // await setTaskManagerPayout(
        //     state.colonyClient[0],          // colonyClient
        //     state.task.id,                  // taskId
        //     new BN('1000000000000000000'),  // amount
        //     state.tokenAddress,             // token
        // );

        // Sign the multisig operation associated with our changes to the manager
        // payout using the "signSetTaskManagerPayout" example. The requested changes
        // were made before we assigned a manager to our task, so the changes will
        // only need to be approved by the current manager of the task.
        // await signSetTaskManagerPayout(
        //     state.colonyClient[0],          // colonyClient
        //     state.task.id,                  // taskId
        //     state.tokenAddress,             // token
        // );

        // Set the amount of ether we want to payout the manager of our task using
        // the "setTaskManagerPayout" example.
        // await setTaskManagerPayout(
        //     state.colonyClient[0],          // colonyClient
        //     state.task.id,                  // taskId
        //     new BN('1000000000000000000'),  // amount
        //     EMPTY_ADDRESS,                  // token
        // );

        // Sign the multisig operation associated with our changes to the manager
        // payout using the "signSetTaskManagerPayout" example. The requested changes
        // were made before we assigned a manager to our task, so the changes will
        // only need to be approved by the current manager of the task.
        // await signSetTaskManagerPayout(
        //     state.colonyClient[0],          // colonyClient
        //     state.task.id,                  // taskId
        //     EMPTY_ADDRESS,                  // token
        // );
        //
        // Set the amount of tokens we want to payout the evaluator of our task using
        // the "setTaskEvaluatorPayout" example. The "setTaskEvaluatorPayout" example
        // starts a multisig operation and then stores the operation in our database.
        // The operation will need to be signed by all "requiredSignees" before the
        // changes to the payout will take affect.
        // await setTaskEvaluatorPayout(
        //     state.colonyClient[0],          // colonyClient
        //     state.task.id,                  // taskId
        //     new BN('1000000000000000000'),  // amount
        //     state.tokenAddress,             // token
        // );
        //
        // Sign the multisig operation associated with our changes to the evaluator
        // payout using the "signSetTaskEvaluatorPayout" example. The requested changes
        // were made before we assigned an evaluator to our task, so the changes will
        // only need to be approved by the manager of the task.
        // await signSetTaskEvaluatorPayout(
        //     state.colonyClient[0],          // colonyClient
        //     state.task.id,                  // taskId
        //     state.tokenAddress,             // token
        // );

        // Set the amount of ether we want to payout the evaluator of our task using
        // the "setTaskEvaluatorPayout" example. The "setTaskEvaluatorPayout" example
        // starts a multisig operation and then stores the operation in our database.
        // The operation will need to be signed by all "requiredSignees" before the
        // changes to the payout will take affect.
        // await setTaskEvaluatorPayout(
        //     state.colonyClient[0],          // colonyClient
        //     state.task.id,                  // taskId
        //     new BN('1000000000000000000'),  // amount
        //     EMPTY_ADDRESS,                  // token
        // );

        // Sign the multisig operation associated with our changes to the evaluator
        // payout using the "signSetTaskEvaluatorPayout" example. The requested changes
        // were made before we assigned an evaluator to our task, so the changes will
        // only need to be approved by the manager of the task.
        // await signSetTaskEvaluatorPayout(
        //     state.colonyClient[0],          // colonyClient
        //     state.task.id,                  // taskId
        //     EMPTY_ADDRESS,                  // token
        // );

        // Set the amount of tokens we want to payout the worker of our task using
        // the "setTaskWorkerPayout" example. The "setTaskWorkerPayout" example
        // starts a multisig operation and then stores the operation in our database.
        // The operation will need to be signed by all "requiredSignees" before the
        // changes to the payout will take affect.
        // await setTaskWorkerPayout(
        //     state.colonyClient[0],          // colonyClient
        //     state.task.id,                  // taskId
        //     new BN('1000000000000000000'),  // amount
        //     state.tokenAddress,             // token
        // );

        // Sign the multisig operation associated with our changes to the worker
        // payout using the "signSetTaskWorkerPayout" example. The requested changes
        // were made before we assigned a worker to our task, so the changes will
        // only need to be approved by the manager of the task.
        // await signSetTaskWorkerPayout(
        //     state.colonyClient[0],          // colonyClient
        //     state.task.id,                  // taskId
        //     state.tokenAddress,             // token
        // );

        // Set the amount of ether we want to payout the worker of our task using
        // the "setTaskWorkerPayout" example. The "setTaskWorkerPayout" example
        // starts a multisig operation and then stores the operation in our database.
        // The operation will need to be signed by all "requiredSignees" before the
        // changes to the payout will take affect.
        // await setTaskWorkerPayout(
        //     state.colonyClient[0],          // colonyClient
        //     state.task.id,                  // taskId
        //     new BN('1000000000000000000'),  // amount
        //     EMPTY_ADDRESS,                  // token
        // );

        // Sign the multisig operation associated with our changes to the worker
        // payout using the "signSetTaskWorkerPayout" example. The requested changes
        // were made before we assigned a worker to our task, so the changes will
        // only need to be approved by the manager of the task.
        // await signSetTaskWorkerPayout(
        //     state.colonyClient[0],          // colonyClient
        //     state.task.id,                  // taskId
        //     EMPTY_ADDRESS,                  // token
        // );

        // Remove the evaluator of our task using the "removeTaskEvaluatorRole" example.
        // await removeTaskEvaluatorRole(
        //     state.colonyClient[0],          // colonyClient
        //     state.task.id,                  // taskId
        // );

        // await signRemoveTaskEvaluatorRole(
        //     state.colonyClient[0],          // colonyClient
        //     state.task.id,                  // taskId
        // );

        // Set the worker of our task using the "setTaskEvaluatorRole" example.
        // await setTaskEvaluatorRole(
        //     state.colonyClient[0],          // colonyClient
        //     state.task.id,                  // taskId
        //     state.accounts[1][0],           // user
        // );
        //
        // await signSetTaskEvaluatorRole(
        //     state.colonyClient[0],          // colonyClient
        //     state.task.id,                  // taskId
        // );


        // worker
        // list of skills from metaColony
        // due Date
        //
    }

    async getDomains(req,res) {

        // get an array of tasks

        // per domain (hierarchical)

        let self = this;

        const  { networkClient, colonyClient, tokenClient, tokenObject  } = await this.colonyService.get(config.colonyNetwork,config.colonyID,self.myWalletPrivateKey);
        let token = tokenObject.address;


        let count  = await colonyClient.getDomainCount.call();

        let domainArray = [];

        for (let i = 0; i <= parseInt(count.count); i++) {

            domainArray.push(await this.domainService.get(colonyClient,i,token));
        }

        // render domains

        for (const domain of domainArray) {

            domain.htmlSnippet = await self.templateService.render('domain.handlebars', domain); // render template
        }

        res.json(domainArray);
        res.status(200);

    }

    async createDomainCall(req,res) {

        let self = this;

        const  { networkClient, colonyClient, tokenClient, tokenObject  } = await this.colonyService.get(config.colonyNetwork,config.colonyID,self.myWalletPrivateKey);
        let token = tokenObject.address;

        res.json();
        res.status(200);
    }

    async modifyDomainCall(req,res) {


    }


    handlePermissionsCall(req,res,next) {

        let self = this,
            permissions = {};

        //
        // let myWalletPrivateKey = '0x0355596cdb5e5242ad082c4fe3f8bbe48c9dba843fe1f99dd8272f487e70efae';
        // let colonyID =
        //
        //
        // this.colonyService.get('local',myWalletPrivateKey).then( (networkClient) => {
        //
        //     // colonyClient is connectie voor hele netwerk
        //
        //     networkClient.getColonyClient(2).then( (colonyClient) => {
        //
        //         // console.log(colonyClient);
        //
        //         colonyClient.getToken.call().then( (token) => {
        //             logger.info(token.address);
        //             res.status(200);
        //         });
        //     });
        // });

    }

    async handleMintCall(req,res,next) {

        let self = this;

        const  { networkClient, colonyClient, tokenClient, tokenObject  } = await this.colonyService.get(config.colonyNetwork,config.colonyID,self.myWalletPrivateKey);
        let token = tokenObject.address;

        let amount = new BN(req.body.amount);
        // Mint tokens
        await colonyClient.mintTokens.send({ amount });

        // Get the total supply of tokens
        const totalSupply = await colonyClient.tokenClient.getTotalSupply.call();

        res.json('Total Supply Amount: ' + totalSupply.amount);
        res.status(200);
    }

    async handleBurnCall(req,res,next) {

        let self = this;

        const  { networkClient, colonyClient, tokenClient, tokenObject  } = await this.colonyService.get(config.colonyNetwork,config.colonyID,self.myWalletPrivateKey);

        let amount = new BN(req.body.amount);
        // Mint tokens
        await colonyClient.burnTokens.send({ amount });

        // Get the total supply of tokens
        const totalSupply = await tokenClient.getTotalSupply.call();

        res.json('Total Supply Amount: ' + totalSupply.amount);
        res.status(200);
    }

    async handleTransferCall(req,res,next) {

        let self = this;

        const  { networkClient, colonyClient, tokenClient, tokenObject  } = await this.colonyService.get(config.colonyNetwork,config.colonyID,self.myWalletPrivateKey);
        let token = tokenObject.address;

        let fromPot = parseInt(req.body.fromPot);
        let toPot = parseInt(req.body.toPot);
        let amount = new BN('30000000000000'); // new BN(req.body.amount);

        // Mint tokens

        // Get the balance for the pot that funds were withdrawn from
        const fromPotBalanceBefore = await colonyClient.getFundingPotBalance.call({
            potId: fromPot,
            token,
        });

        // Get the balance for the pot that funds were deposited into
        const toPotBalanceBefore = await colonyClient.getFundingPotBalance.call({
            potId: toPot,
            token,
        });


        let transfer = await colonyClient.moveFundsBetweenPots.send({ fromPot, toPot, amount, token });

        // Get the balance for the pot that funds were withdrawn from
        const fromPotBalanceAfter = await colonyClient.getFundingPotBalance.call({
            potId: fromPot,
            token,
        });

        // Get the balance for the pot that funds were deposited into
        const toPotBalanceAfter = await colonyClient.getFundingPotBalance.call({
            potId: toPot,
            token,
        });

        // Check out the log to see the pot balance
        console.log('Pot Balance From (Before):', fromPotBalanceBefore.balance.toString());

        // Check out the log to see the pot balance
        console.log('Pot Balance To (Before):', toPotBalanceBefore.balance.toString());

        // Check out the log to see the pot balance
        console.log('Pot Balance From (After):', fromPotBalanceAfter.balance.toString());

        // Check out the log to see the pot balance
        console.log('Pot Balance To (After):', toPotBalanceAfter.balance.toString());

        // Get the total supply of tokens

        res.json(transfer);
        res.status(200);
    }



    eligibleVoters() {


    }
}

module.exports = ColonyController;

