import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getAddress = async (req: Request, res: Response): Promise<any> => {
  const id = parseInt(req.params.id);
  const address = await prisma.address.findUnique({
    where: { id }
  });
  if (!address) {
    return res.status(404).json({ message: "Address not found" });
  }
  res.status(200).json(address);
};

export const listAddresses = async (_req: Request, res: Response) => {
  const addresses = await prisma.address.findMany();
  res.status(200).json(addresses);
};

export const createAddress = async (req: Request, res: Response) => {
  const { houseNo, street, city, district, state, pinCode, landmark, isPrimary, userId } = req.body;
  const address = await prisma.address.create({
    data: { houseNo, street, city, district, state, pinCode, landmark, isPrimary, userId }
  });
  res.status(201).json(address);
};

export const updateAddress = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { houseNo, street, city, district, state, pinCode, landmark, isPrimary, userId } = req.body;
  
  const address = await prisma.address.update({
    where: { id },
    data: { houseNo, street, city, district, state, pinCode, landmark, isPrimary, userId }
  });
  res.status(200).json(address);
};

export const deleteAddress = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await prisma.address.delete({
    where: { id }
  });
  res.status(200).json(true);
};

export const setPrimaryAddress = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const userId = parseInt(req.params.userId);
  await prisma.address.updateMany({
    where: { userId },
    data: { isPrimary: false }
  });

  await prisma.address.update({
    where: { id },
    data: { isPrimary: true }
  });

  res.status(200).json("Primary address updated successfully");
};
