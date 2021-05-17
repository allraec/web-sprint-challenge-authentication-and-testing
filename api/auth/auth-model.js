const db = require("../../data/dbConfig")

async function add(user) {
	const [id] = await db("users").insert(user)
	return findById(id)
}

function find() {
	return db("users as u")
		.select("u.id", "u.username")
}

function findById(id) {
	return db("users as u")
		.where("u.id", id)
		.first("u.id", "u.username")
}

function findByUsername(username) {
	return db("users as u")
		.where("u.username", username)
		.first("u.id", "u.username", "u.password")
}

module.exports = {
	add,
	find,
	findById,
	findByUsername,
}