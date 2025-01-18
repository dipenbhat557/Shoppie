"use strict";
// export const getAddress = async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   const address = await prisma.address.findUnique({
//     where: { id }
//   });
//   if (!address) {
//     return res.status(404).json({ message: "Address not found" });
//   }
//   res.status(200).json(address);
// };
// export const listAddresses = async (_req: Request, res: Response) => {
//   const addresses = await prisma.address.findMany();
//   res.status(200).json(addresses);
// };
// export const createAddress = async (req: Request, res: Response) => {
//   const input = req.body;
//   const address = await prisma.address.create({
//     data: input
//   });
//   res.status(201).json(address);
// };
// export const updateAddress = async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   const input = req.body;
//   const address = await prisma.address.update({
//     where: { id },
//     data: input
//   });
//   res.status(200).json(address);
// };
// export const deleteAddress = async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   await prisma.address.delete({
//     where: { id }
//   });
//   res.status(200).json(true);
// };
// export const setPrimaryAddress = async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   // First set all addresses as non-primary
//   await prisma.address.updateMany({
//     data: { isPrimary: false }
//   });
//   // Set the selected address as primary
//   await prisma.address.update({
//     where: { id },
//     data: { isPrimary: true }
//   });
//   res.status(200).json("Primary address updated successfully");
// };
