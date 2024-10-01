const express = require('express')
const router = express.Router()
const TrackModel = require('../models/tracks')

// INDEX ROUTE
// listens for get requests at '/tracks'
router.get('/', async function(req, res) {
	try {
		// here we use our model to find all the tracks in the database
		const foundTracks = await TrackModel.find({})
		// foundTracks is an array objects (json compatible)
		// 200 - means Request fulfilled!	
		res.status(200).json(foundTracks)
	} catch(err) {
		console.log(err)
		res.status(500).json({error: err.message})
	}
});

// SHOW ROUTE
// listens to get request to '/tracks/:trackId'
router.get('/:trackId', async function(req, res) {
	try {
		const foundTrack = await TrackModel.findById(req.params.trackId)
		// if TrackModel cant find a track it returns undefined
		if(!foundTrack){
			// lets tell the client we coudlnt find anything in the db
			res.status(404)
			throw new error('Track not found'); // throws the catch block!
		}
		// if everything is good send back the track!
		res.status(200).json(foundTrack)
	} catch(err){
		if(res.statusCode === 404) {
			res.json({error: err.message})
		}
		res.status(500).json({error: err.message})
	}
	// res.json({message: `SHOW ROUTE PARAM IS :${req.params.trackId}`})
});



// UPDATE ROUTE
// listen to put requests to /tracks/:trackId
router.put('/:trackId', async function (req, res) {
	try {
		const updatedTrack = await TrackModel.findByIdAndUpdate(req.params.trackId, req.body, {new: true})
		if(!updatedTrack) {
			// tells the client that it coudlnt find anything matching in the DB
			res.status(404)
			throw new error('Track not found'); // throws the catch block
		}
		res.status(200).json(updatedTrack)
	} catch(err) {
		if(res.statusCode === 404) {
			return res.json({error: err.message});
		}
		res.status(500).json({error: err.message});
	}
});

// delete route
// listen to delete requests to /tracks/:trackId
router.delete('/:trackId', async function(req, res) {
	try {
		const deleteTrack = await TrackModel.findByIdAndDelete(req.params.trackId)
		//
		if(!deleteTrack){
			//
			res.status(404)
			throw new error('Track not found'); // throws the catch block
		}
		// if everything is good and track is deleted
		res.status(200).json(deleteTrack)
	} catch(err){
		if(res.statusCode === 404) {
			res.json({error: err.message})
		}
		res.status(500).json({error: err.message})
	}
});

// endpoint '/tracks'
router.post('/', async function(req, res) {
	try {
		// here we are using our model to create the req.body in mongodb  as a new track document!
		const createdTrack = await TrackModel.create(req.body)
		// 201 means (data successfully created)
		res.status(201).json({data: createdTrack})
	} catch(err) {
		console.log(err)
		// 500 means something went wrong
		res.status(500).json({error: err.message})
	}
	// console.log(req.body, "<req.body")
	// res.json({message: "create route"})
});

module.exports = router;