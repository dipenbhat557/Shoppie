import { Request, Response } from "express";
import prisma from "../config/prisma";
import { uploadToS3 } from "../utils/s3";


// Get user by ID
export const getUser = async (req: Request, res: Response): Promise<any> => {
	try {
		const id = req.params.id;
		const user = await prisma.user.findUnique({
			where: { id }
		});
		
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		return res.status(200).json(user);
	} catch (err) {
		return res.status(500).json({ message: "Error retrieving user", error: err });
	}
};

// Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
	try {
		const users = await prisma.user.findMany();
		return res.status(200).json(users);
	} catch (err) {
		return res.status(500).json({ message: "Error retrieving users", error: err });
	}
};

// Create new user
export const createUser = async (req: Request, res: Response): Promise<any> => {
	try {
		const { firstName, lastName, email, phoneNumber, password, dob, gender } = JSON.parse(req.body.input);
		const file = req.file;

		if (!file) {
			return res.status(400).json({ message: "File is required" });
		}

		const imagePath = await uploadToS3(file);

		const user = await prisma.user.create({
			data: {
				firstName,
				lastName,
				email,
				phoneNo: phoneNumber,
				password,
				dob,
				gender,
				profileUrl: imagePath,
				isVerified: false
			}
		});

		return res.status(201).json(user);
	} catch (err) {
		return res.status(400).json({ message: "Error creating user", error: err });
	}
};

// Update existing user
export const updateUser = async (req: Request, res: Response): Promise<any> => {
	try {
		const id = req.params.id;
		const { firstName, lastName, email, phoneNumber, password, dob, gender } = JSON.parse(req.body.input);
		const file = req.file;

		if (!file) {
			return res.status(400).json({ message: "File is required" });
		}

		// Get existing user to delete old image
		const existingUser = await prisma.user.findUnique({
			where: { id }
		});

		if (!existingUser) {
			return res.status(404).json({ message: "User not found" });
		}

		const imagePath = await uploadToS3(file);

		const user = await prisma.user.update({
			where: { id },
			data: {
				firstName,
				lastName,
				email,
				phoneNo: phoneNumber,
				password,
				dob,
				gender,
				profileUrl: imagePath
			}
		});

		return res.status(200).json(user);
	} catch (err) {
		return res.status(400).json({ message: "Error updating user", error: err });
	}
};

// Delete user
export const deleteUser = async (req: Request, res: Response): Promise<any> => {
	try {
		const id = req.params.id;

		const user = await prisma.user.findUnique({
			where: { id }
		});

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		await prisma.user.delete({
			where: { id }
		});

		return res.status(200).json(true);
	} catch (err) {
		return res.status(500).json({ message: "Error deleting user", error: err });
	}
};

// Verify user
export const verifyUser = async (req: Request, res: Response): Promise<any> => {
	try {
		const id = req.params.id;
		
		const user = await prisma.user.update({
			where: { id },
			data: { isVerified: true }
		});

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		return res.status(200).json("User verified successfully");
	} catch (err) {
		return res.status(500).json({ message: "Error verifying user", error: err });
	}
};



