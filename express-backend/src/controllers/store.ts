import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createStore = async (req: Request, res: Response): Promise<any> => {
	try {
		const { name, location, contact } = req.body;
		const store = await prisma.store.create({
			data: {
				name,
				location,
				contact
			}
		});
		return res.status(200).json(store);
	} catch (err) {
		return res.status(400).json({ message: "Error creating store", error: err });
	}
};

export const getAllStores = async (req: Request, res: Response): Promise<any> => {
	try {
		const stores = await prisma.store.findMany();
		return res.status(200).json(stores);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching stores", error: err });
	}
};

export const getStoreById = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		const store = await prisma.store.findUnique({
			where: { id: parseInt(id) }
		});

		if (!store) {
			return res.status(404).json({ message: "Store not found" });
		}

		return res.status(200).json(store);
	} catch (err) {
		return res.status(500).json({ message: "Error fetching store", error: err });
	}
};

export const updateStore = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		const { name, location, contact } = req.body;

		const store = await prisma.store.update({
			where: { id: parseInt(id) },
			data: {
				name,
				location, 
				contact
			}
		});

		return res.status(200).json(store);
	} catch (err) {
		return res.status(400).json({ message: "Error updating store", error: err });
	}
};

export const deleteStore = async (req: Request, res: Response): Promise<any> => {
	try {
		const { id } = req.params;
		await prisma.store.delete({
			where: { id: parseInt(id) }
		});
		return res.status(200).json({ message: "Store deleted successfully" });
	} catch (err) {
		return res.status(500).json({ message: "Error deleting store", error: err });
	}
};
