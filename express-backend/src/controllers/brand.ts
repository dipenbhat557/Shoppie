import { Request, Response } from "express";
import prisma from "../config/prisma"
import { getExactFileUrl, uploadToS3 } from "../utils/s3";

export const createBrand = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: "Brand name is required" });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "Logo file is required" });
    }

    const logoUrl = await uploadToS3(file);

    const brand = await prisma.brand.create({
      data: {
        name,
        logoUrl
      }
    });

    return res.status(201).json(brand);
  } catch (err) {
    console.error('Create brand error:', err);
    return res.status(500).json({ message: "Error creating brand", error: err });
  }
};

export const getAllBrands = async (req: Request, res: Response): Promise<any> => {
  try {
    const brands = await prisma.brand.findMany();

    const formattedBrands = brands.map((brand: any) => ({
      ...brand,
      logoUrl: brand.logoUrl ? getExactFileUrl(brand.logoUrl) : null,
    }));

    return res.status(200).json(formattedBrands);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching brands", error: err });
  }
};

export const getBrandById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const brand = await prisma.brand.findUnique({
      where: { id: parseInt(id) }
    });

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    const formattedBrand = {
      ...brand,
      logoUrl: brand.logoUrl ? getExactFileUrl(brand.logoUrl) : null,
    };

    return res.status(200).json(formattedBrand);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching brand", error: err });
  }
};

export const updateBrand = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: "Brand name is required" });
    }

    const file = req.file;
    let logoUrl: string | undefined;
    
    if (file) {
      logoUrl = await uploadToS3(file);
    }

    const brand = await prisma.brand.update({
      where: { id: parseInt(id) },
      data: {
        name,
        ...(logoUrl && { logoUrl })
      }
    });

    return res.status(200).json(brand);
  } catch (err) {
    console.error('Update brand error:', err);
    return res.status(500).json({ message: "Error updating brand", error: err });
  }
};

export const deleteBrand = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    await prisma.brand.delete({
      where: { id: parseInt(id) }
    });
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting brand", error: err });
  }
};
