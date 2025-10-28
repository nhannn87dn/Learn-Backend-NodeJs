import { Request, Response } from "express";
import createError from 'http-errors';
import staffsService from "../services/staffs.service";
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";

/** Get All Staffs */
const findAll = async (req: Request, res: Response) => {
	const staffs = await staffsService.findAll(req.query);
	sendJsonSuccess({
		res,
		data: staffs
	});
}

/* Find a staff by id */
const findById = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!id) {
		throw createError(400, "ID not found");
	}

	const staff = await staffsService.findById({ id });
	sendJsonSuccess({
		res,
		data: staff
	});
}

// create a new staff
const create = async (req: Request, res: Response) => {
	const newStaff = await staffsService.create({
		fullName: req.body.fullName,
		email: req.body.email,
		password: req.body.password,
		active: req.body.active,
		role: req.body.role,
	});

	sendJsonSuccess({
		res,
		status: SUCCESS.CREATED,
		data: newStaff
	});
}

/* Update a staff by Id */
const updateById = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!id) {
		throw createError(400, "ID not found");
	}

	const staff = await staffsService.updateById({
		id,
		payload: {
			fullName: req.body.fullName,
			email: req.body.email,
			password: req.body.password,
			active: req.body.active,
			role: req.body.role,
		}
	});

	sendJsonSuccess({
		res,
		status: SUCCESS.OK,
		data: staff
	});
}

/* Delete a staff by Id */
const deleteById = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!id) {
		throw createError(400, "ID not found");
	}

	const staff = await staffsService.deleteById(id);
	sendJsonSuccess({
		res,
		status: SUCCESS.OK,
		data: staff
	});
}

export default {
	findAll,
	findById,
	create,
	updateById,
	deleteById,
}

